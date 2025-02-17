CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP function if exists cuid_generate;

CREATE FUNCTION cuid_generate() RETURNS TEXT AS $$
DECLARE
    ts BIGINT := extract(epoch FROM clock_timestamp()) * 1000; -- Milliseconds timestamp
    rand TEXT := encode(gen_random_bytes(4), 'hex'); -- 4 bytes (8 hex characters) for randomness
BEGIN
    RETURN 'c' || ts::TEXT || rand;
END;
$$ LANGUAGE plpgsql;

CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Drop existing indexes and triggers if they exist
DROP INDEX IF EXISTS idx_tsvector;
DROP INDEX IF EXISTS idx_gin_trgm_nama;
DROP INDEX IF EXISTS idx_gin_trgm_alamat;
DROP TRIGGER IF EXISTS tsvectorupdate ON sekolah;
DROP FUNCTION IF EXISTS update_tsvector;
ALTER TABLE sekolah DROP COLUMN IF EXISTS tsv;
ALTER TABLE sekolah DROP COLUMN IF EXISTS tsv_no_stemming;

-- Add tsvector columns for full-text search
ALTER TABLE sekolah ADD COLUMN tsv tsvector;
ALTER TABLE sekolah ADD COLUMN tsv_no_stemming tsvector;

-- Update the tsvector columns with the combined text of nama and alamat
UPDATE sekolah SET tsv = to_tsvector('indonesian', coalesce(nama, '') || ' ' || coalesce(alamat, ''));
UPDATE sekolah SET tsv_no_stemming = to_tsvector('simple', coalesce(nama, '') || ' ' || coalesce(alamat, ''));

-- Create a trigger function to update the tsvector columns on insert or update
CREATE FUNCTION update_tsvector() RETURNS trigger AS $$
BEGIN
  NEW.tsv := to_tsvector('indonesian', coalesce(NEW.nama, '') || ' ' || coalesce(NEW.alamat, ''));
  NEW.tsv_no_stemming := to_tsvector('simple', coalesce(NEW.nama, '') || ' ' || coalesce(NEW.alamat, ''));
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- Create a trigger to call the update_tsvector function on insert or update
CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
ON sekolah FOR EACH ROW EXECUTE FUNCTION update_tsvector();

-- Create a GIN index on the tsvector columns for FTS
CREATE INDEX idx_tsvector ON sekolah USING GIN(tsv);
CREATE INDEX idx_tsvector_no_stemming ON sekolah USING GIN(tsv_no_stemming);

-- Create GIN indexes on the nama and alamat columns for trigram similarity
CREATE INDEX idx_gin_trgm_nama ON sekolah USING GIN (nama gin_trgm_ops);
CREATE INDEX idx_gin_trgm_alamat ON sekolah USING GIN (alamat gin_trgm_ops);

-- Perform a search using both FTS and trigram similarity
-- SELECT * FROM sekolah
-- WHERE tsv @@ plainto_tsquery('indonesian', 'sma 1 paciran')
-- or (nama % 'sma 1 paciran' OR alamat % 'sma 1 paciran');

-- Perform a search using both FTS and trigram similarity
-- SELECT * FROM sekolah
-- WHERE (tsv @@ websearch_to_tsquery('indonesian', 'sma 1 paciran'))
-- AND (nama % 'sma 1 paciran' OR alamat % 'sma 1 paciran');

-- --------------------------------------------------
--  START FTS
-- --------------------------------------------------
-- usage
-- SELECT * FROM fts_cari_sekolah('sma 1 paciran');
-- usage
-- SELECT * FROM fts_cari_sekolah_alt1('sma 1 paciran');
-- select * from ts_debug('indonesian', 'sma 1 paciran');

DROP function if exists fts_cari_sekolah;
DROP function if exists fts_cari_sekolah_alt1;

-- select * from fts_cari_sekolah('sma 2 bulu kambang');

-- select * from fts_cari_sekolah_alt1('sma 2 bulu kambang');


CREATE OR REPLACE FUNCTION fts_cari_sekolah(search_query TEXT)
RETURNS TABLE (
    npsn VARCHAR(10),
    nama VARCHAR(255),
    alamat VARCHAR, 
    kelurahan_desa VARCHAR(255),
    dapo_wilayah_id VARCHAR(20),
    status VARCHAR(50),
    rank DOUBLE PRECISION,
    rank_no_stemming DOUBLE PRECISION,
    sim_in_nama DOUBLE PRECISION,
    sim_in_alamat DOUBLE PRECISION,
    sim_in_kelurahan_desa DOUBLE PRECISION,
    -- dapo_wilayah columns
    kode_wilayah VARCHAR,
    nama_wilayah VARCHAR,
    id_level_wilayah INT4,
    mst_kode_wilayah VARCHAR ,
    induk_provinsi VARCHAR ,
    kode_wilayah_induk_provinsi VARCHAR ,
    induk_kabupaten VARCHAR ,
    kode_wilayah_induk_kabupaten VARCHAR 
) 
AS $$
BEGIN
    RETURN QUERY 
    WITH query_data AS (
        SELECT search_query,
               to_tsquery('indonesian', string_agg(word, ' & ')) AS tsquery,
               to_tsquery('simple', string_agg(word, ' & ')) AS tsquery_no_stemming,  -- No Stemming
               split_part(search_query, ' ', array_length(string_to_array(search_query, ' '), 1)) AS search_query_last_word
        FROM unnest(string_to_array(search_query, ' ')) AS word
    )
    SELECT 
        s.npsn, s.nama, s.alamat, s.kelurahan_desa, s.dapo_wilayah_id, s.status,
        ts_rank(s.tsv, qd.tsquery)::DOUBLE PRECISION AS rank,  
        ts_rank(s.tsv_no_stemming, qd.tsquery_no_stemming)::DOUBLE PRECISION AS rank_no_stemming,  	
        similarity(s.nama, qd.search_query)::DOUBLE PRECISION AS sim_in_nama,  
        similarity(s.alamat, qd.search_query_last_word)::DOUBLE PRECISION AS sim_in_alamat,  
        similarity(s.kelurahan_desa, qd.search_query_last_word)::DOUBLE PRECISION AS sim_in_kelurahan_desa,
        -- dapo_wilayah columns
        w.kode_wilayah, w.nama AS nama_wilayah, w.id_level_wilayah, w.mst_kode_wilayah,
        w.induk_provinsi, w.kode_wilayah_induk_provinsi, w.induk_kabupaten, w.kode_wilayah_induk_kabupaten
    FROM sekolah s
    JOIN dapo_wilayah w ON s.dapo_wilayah_id = w.kode_wilayah  -- Join the wilayah table
    CROSS JOIN query_data qd
    WHERE s.tsv @@ qd.tsquery  
       OR s.tsv_no_stemming @@ qd.tsquery_no_stemming  -- Ensure no-stemming search works
       OR s.nama % qd.search_query  
    ORDER BY rank DESC, sim_in_nama DESC, sim_in_kelurahan_desa DESC, sim_in_alamat DESC  
    LIMIT 50;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION fts_cari_sekolah_alt1(search_query TEXT)
RETURNS TABLE (
    npsn VARCHAR(10),
    nama VARCHAR(255),
    alamat VARCHAR, 
    kelurahan_desa VARCHAR(255),
    dapo_wilayah_id VARCHAR(20),
    status VARCHAR(50),
    rank DOUBLE PRECISION,
    rank_no_stemming DOUBLE PRECISION,
    sim_in_nama DOUBLE PRECISION,
    sim_in_alamat DOUBLE PRECISION,
    sim_in_kelurahan_desa DOUBLE precision,
    -- dapo_wilayah columns
    kode_wilayah VARCHAR,
    nama_wilayah VARCHAR,
    id_level_wilayah INT4,
    mst_kode_wilayah VARCHAR ,
    induk_provinsi VARCHAR ,
    kode_wilayah_induk_provinsi VARCHAR ,
    induk_kabupaten VARCHAR ,
    kode_wilayah_induk_kabupaten VARCHAR 
) 
AS $$
BEGIN
    RETURN QUERY 
    WITH query_data AS (
        SELECT search_query,
               plainto_tsquery('indonesian', search_query) AS tsquery,  -- Use plainto_tsquery for better matching
               plainto_tsquery('simple', search_query) AS tsquery_no_stemming,  
               split_part(search_query, ' ', array_length(string_to_array(search_query, ' '), 1)) AS search_query_last_word
    )
    SELECT s.npsn, s.nama, s.alamat, s.kelurahan_desa, s.dapo_wilayah_id, s.status,
           ts_rank(s.tsv, qd.tsquery)::DOUBLE PRECISION AS rank,  
           ts_rank(s.tsv_no_stemming, qd.tsquery_no_stemming)::DOUBLE PRECISION AS rank_no_stemming,  	
           similarity(s.nama, qd.search_query)::DOUBLE PRECISION AS sim_in_nama,  
           similarity(s.alamat, qd.search_query_last_word)::DOUBLE PRECISION AS sim_in_alamat,  
           similarity(s.kelurahan_desa, qd.search_query_last_word)::DOUBLE PRECISION AS sim_in_kelurahan_desa ,
 		-- dapo_wilayah columns
        w.kode_wilayah, w.nama AS nama_wilayah, w.id_level_wilayah, w.mst_kode_wilayah,
        w.induk_provinsi, w.kode_wilayah_induk_provinsi, w.induk_kabupaten, w.kode_wilayah_induk_kabupaten
     FROM sekolah s
    JOIN dapo_wilayah w ON s.dapo_wilayah_id = w.kode_wilayah  -- Join the wilayah table
    CROSS JOIN query_data qd
    WHERE (s.tsv @@ qd.tsquery AND similarity(s.nama, qd.search_query) > 0.3)
       OR (s.tsv_no_stemming @@ qd.tsquery_no_stemming AND similarity(s.nama, qd.search_query) > 0.3)
       OR (s.nama % qd.search_query AND similarity(s.nama, qd.search_query) > 0.4)  
    ORDER BY rank DESC, sim_in_nama DESC, sim_in_kelurahan_desa DESC, sim_in_alamat DESC  
    LIMIT 50;
END;
$$ LANGUAGE plpgsql;
