FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=password

COPY ./db/init.sql /docker-entrypoint-initdb.d/init.sql

EXPOSE 3306

CMD ["mysqld"]