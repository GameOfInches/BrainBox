FROM mysql:latest


ENV MYSQL_ROOT_PASSWORD=
ENV MYSQL_DATABASE=BrainBox
ENV MYSQL_USER=BrainboxDefault
ENV MYSQL_PASSWORD=


COPY schema.sql /docker-entrypoint-schemadb.d/
COPY schema.sql /docker-entrypoint-initdb.d/
COPY questions.csv /var/lib/mysql-files/