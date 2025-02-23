const SyaratDanKetentuanPage = () => {
  return (
    <div className="p-4 max-w-xl mx-auto bg-white my-4 flex flex-col gap-2">
      <h1 className="text-xl font-bold">SYARAT DAN KETENTUAN PENGGUNAAN</h1>
      <h2 className="text-lg font-semibold">
        SIAP SPMB - SISTEM PENERIMAAN MURID BARU
      </h2>
      <p className="text-sm mb-2">Terakhir diperbarui: 22 Februari 2025</p>

      <h3 className="font-semibold">1. PENGANTAR</h3>
      <p>
        Selamat datang di Siap SPMB, platform SaaS untuk sistem penerimaan murid
        baru yang memungkinkan pendaftaran online, pengisian data pribadi,
        unggahan dokumen, dan pembayaran secara digital. Dengan menggunakan
        layanan ini, pengguna menyetujui syarat dan ketentuan berikut.
      </p>

      <h3 className="font-semibold">2. DEFINISI</h3>
      <ul>
        <li>
          <strong>Siap SPMB</strong>: Platform SaaS untuk sistem penerimaan
          murid baru yang dioperasikan oleh PT. Stargan Mitra Teknologi.
        </li>

        <li>
          <strong>SaaS</strong>: Software as a Service, model layanan perangkat
          lunak berbasis cloud yang diakses melalui internet.
        </li>
        <li>
          <strong>Pendaftar</strong>: Calon murid baru yang mendaftarkan diri
          melalui platform.
        </li>
        <li>
          <strong>Sekolah</strong>: Institusi pendidikan yang menggunakan Siap
          SPMB untuk proses penerimaan murid baru.
        </li>

        <li>
          <strong>Pengguna</strong>: Pendaftar, sekolah, dan pihak terkait yang
          menggunakan layanan Siap SPMB.
        </li>
        <li>
          <strong>Dokumen Pribadi</strong>: Dokumen seperti KTP, KK, dan dokumen
          lain yang diperlukan dalam proses pendaftaran.
        </li>
        <li>
          <strong>Public Key</strong>: Kunci enkripsi yang digunakan untuk
          mengenkripsi dokumen pendaftar sebelum dikirim ke sekolah tujuan.
        </li>
        <li>
          <strong>Private Key</strong>: Kunci dekripsi yang digunakan untuk
          membuka dokumen pendaftar yang telah dienkripsi dengan public key.
        </li>
        <li>
          <strong>User ID</strong>: Identitas pengguna berupa email yang
          digunakan untuk melakukan login.
        </li>
        <li>
          <strong>PIN</strong>: Kode rahasia 6 digit yang digunakan untuk
          membuka dokumen pribadi yang dienkripsi.
        </li>
        <li>
          <strong>Public Key Sekolah</strong>: Kunci enkripsi yang digunakan
          untuk mengenkripsi dokumen pendaftar sebelum dikirim ke sekolah.
        </li>
        <li>
          <strong>Private Key Sekolah</strong>: Kunci dekripsi yang hanya
          dimiliki oleh sekolah untuk membuka dokumen pendaftar yang telah
          dienkripsi dengan public key mereka.
        </li>
        <li>
          <strong>Midtrans</strong>: Layanan pembayaran digital yang digunakan
          oleh Siap SPMB.
        </li>
      </ul>

      <h3 className="font-semibold">3. PENGGUNAAN LAYANAN</h3>
      <ul>
        <li>
          Pendaftar wajib mengisi data pribadi dan data orang tua secara benar
          dan akurat.
        </li>
        <li>
          Pendaftar wajib mengunggah dokumen yang diperlukan dalam format PDF.
        </li>
        <li>
          Setiap dokumen PDF yang diunggah akan diproteksi dengan password yang
          dihasilkan melalui proses derived password dari PIN dan User ID.
        </li>
        <li>
          Saat pendaftar mendaftar ke sekolah pilihan, sistem akan meminta PIN
          untuk membuka dokumen dan mengenkripsi ulang dengan public key sekolah
          tujuan.
        </li>
        <li>
          Dokumen yang telah dienkripsi hanya dapat dibuka oleh sekolah tujuan
          menggunakan private key mereka.
        </li>
        <li>
          Sekolah memiliki kewenangan untuk menetapkan ketentuan pendaftaran,
          verifikasi, seleksi, dan penerimaan sesuai kebijakan masing-masing.
        </li>
      </ul>

      <h3 className="font-semibold">4. KEAMANAN DAN PRIVASI</h3>
      <ul>
        <li>
          Setiap pendaftar bertanggung jawab atas keamanan PIN-nya. Siap SPMB
          tidak bertanggung jawab atas kehilangan akses akibat kelalaian
          pengguna dalam menjaga PIN.
        </li>
        <li>
          Semua data dienkripsi untuk memastikan keamanan dan kerahasiaan
          informasi pribadi.
        </li>
        <li>
          Public key sekolah digunakan untuk mengenkripsi dokumen pendaftar
          sebelum dikirim ke sekolah tujuan.
        </li>
        <li>
          Private key sekolah harus disimpan dengan aman oleh pihak sekolah
          untuk memastikan hanya pihak berwenang yang dapat mengakses dokumen
          pendaftar.
        </li>
        <li>
          Siap SPMB tidak akan membagikan data pribadi pengguna kepada pihak
          ketiga tanpa izin kecuali diwajibkan oleh hukum.
        </li>
      </ul>

      <h3 className="font-semibold">5. PEMBAYARAN</h3>
      <ul>
        <li>
          Pembayaran dilakukan melalui Midtrans dan mengikuti kebijakan yang
          ditetapkan oleh penyedia layanan pembayaran.
        </li>
        <li>
          Biaya yang telah dibayarkan tidak dapat dikembalikan kecuali dalam
          keadaan tertentu yang ditetapkan oleh sekolah.
        </li>
      </ul>

      <h3 className="font-semibold">6. HAK DAN KEWAJIBAN PENGGUNA</h3>
      <ul>
        <li>
          Pengguna wajib menggunakan layanan sesuai dengan hukum yang berlaku.
        </li>
        <li>
          Dilarang melakukan tindakan yang dapat merusak sistem atau mengganggu
          operasional Siap SPMB.
        </li>
        <li>
          Sekolah bertanggung jawab atas validasi dan seleksi pendaftar sesuai
          kebijakan yang berlaku di institusi masing-masing.
        </li>
        <li>
          Sekolah bertanggung jawab atas penyimpanan dan penggunaan private key
          untuk menjaga keamanan dokumen pendaftar.
        </li>
      </ul>

      <h3 className="font-semibold">7. BATASAN TANGGUNG JAWAB</h3>
      <ul>
        <li>
          Siap SPMB hanya menyediakan platform teknologi dan tidak bertanggung
          jawab atas keputusan penerimaan yang dilakukan oleh sekolah.
        </li>
        <li>
          Siap SPMB tidak bertanggung jawab atas kesalahan input data oleh
          pengguna.
        </li>
        <li>
          Siap SPMB tidak bertanggung jawab atas kebocoran data akibat kelalaian
          sekolah dalam menjaga private key mereka.
        </li>
      </ul>

      <h3 className="font-semibold">8. PERUBAHAN SYARAT DAN KETENTUAN</h3>
      <p>
        Siap SPMB berhak untuk mengubah syarat dan ketentuan ini sewaktu-waktu.
        Pengguna disarankan untuk secara berkala memeriksa halaman ini.
      </p>

      <h3 className="font-semibold">9. KONTAK</h3>
      <p>
        Untuk pertanyaan lebih lanjut, silakan hubungi email{" "}
        <a href="mailto:info@siap-spmb.id">info@siap-spmb.id</a>
      </p>
    </div>
  );
};

export default SyaratDanKetentuanPage;
