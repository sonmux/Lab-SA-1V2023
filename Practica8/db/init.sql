CREATE DATABASE mydatabase;

USE mydatabase;

CREATE TABLE alumno (
  nombre VARCHAR(500)
);

INSERT INTO alumno (nombre) VALUES ('Anggelo Santiago Son Mux - 201709502');

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';