# Prisma

reference

<https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql>

## database auth

```sh
pnpm prisma db push --schema=./prisma/db-auth/schema.prisma
pnpm prisma generate --schema=./prisma/db-auth/schema.prisma

pnpm prisma migrate deploy --schema=./prisma/db-auth/schema.prisma

```

## database spmb

```sh
pnpm prisma db push --schema=./prisma/db-spmb/schema.prisma
pnpm prisma generate --schema=./prisma/db-spmb/schema.prisma

pnpm prisma migrate deploy --schema=./prisma/db-spmb/schema.prisma

```

```sh

# Generate a secure password
# https://developer.mozilla.org/en-US/docs/Glossary/Percent-encoding
secure_password=$(openssl rand -base64 32 | tr -dc 'A-Za-z0-9!@#$%^&*()_+-=' | head -c 32)
echo $secure_password

# Connect to PostgreSQL as the postgres user
sudo -u postgres psql

# Create a new database
CREATE DATABASE new_database_name;

# FOR PRISMA NEED ELEVATED USER
# Create a new user with a password
CREATE USER new_username WITH PASSWORD 'your_password';

# Grant all privileges on a specific database to the new user
GRANT ALL PRIVILEGES ON DATABASE your_database TO new_username;

# FOR RUNTIME WE NEED LIMITED PRIVILEGES

-- Create the elevated user
CREATE USER prisma_admin WITH PASSWORD 'admin_password';

-- Create the limited user
CREATE USER prisma_user WITH PASSWORD 'user_password';

-- Grant all privileges on the database to the elevated user
GRANT ALL PRIVILEGES ON DATABASE your_database TO prisma_admin;

-- Grant limited privileges on the database to the limited user
GRANT CONNECT ON DATABASE your_database TO prisma_user;
GRANT USAGE ON SCHEMA public TO prisma_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO prisma_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO prisma_user;

CREATE ROLE new_power_user WITH LOGIN SUPERUSER PASSWORD 'your_password';


# Exit psql
\q
```

## Seeding

```sh
pnpm add -D ts-node typescript @types/node
```

add to `package.json`

```diff
 "scripts": {
+    "prisma:seed:spmb": "tsx prisma/db-spmb/seed.ts"
  },
```

run seed

```sh
pnpm prisma:seed:spmb
```
