-- must change your name and databasename, passward.
CREATE ROLE bun_elysia_admin LOGIN PASSWORD 'bun_elysia_psql';
CREATE DATABASE bun_elysia_admin;
CREATE DATABASE bun_elysia_test;
GRANT ALL PRIVILEGES ON DATABASE bun_elysia_admin TO bun_elysia_admin;
GRANT ALL PRIVILEGES ON DATABASE bun_elysia_test TO bun_elysia_admin;
ALTER ROLE bun_elysia_admin WITH CREATEROLE CREATEDB SUPERUSER;
