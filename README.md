# BrainBox
A BrainBox-like web game

## Prerequisites:

***1. Docker***





### How to install:

***Windows / Mac OS:***

Download from https://www.docker.com/products/docker-desktop/

***Linux:***

1. Run the dependencies shell script (make sure to chmod the file)

2. Run the following `sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`




### How to run:

***I. Database***
  1. On your Terminal, go to the folder including the Dockerfile for the mysql server (with `cd Database`)

  2. Run the following command `docker build -t {name_of_your_database_image} .`

  3. After the docker image is built, run the following command to run the container `docker run -e MYSQL_ROOT_PASSWORD={example_password_for_root_user} -e MYSQL_PASSWORD={example_password_for_default_user} -p 3306:3306 {name_of_your_database_image}`
  
  ***!! Keep in mind that the MYSQL_PASSWORD should be the same password as the one provided in schema.sql file !!***

  4. The database server is now running on localhost on 3306 (default) port


  ***II. Webserver***
  1. On your Terminal, go to the folder including the Dockerfile for the website server (with `cd Website`)

  2. Run the following command `docker build -t {name_of_your_webserver_image} .`

  3. After the docker image is built, run the following command to run the container `docker run -p 8080:8080 {name_of_your_webserver_image}`

  4. The website server is now running on localhost on port 8080

   ***!! PS. Currently only supports http calls, no https as its a dev environment. The next thing in to-do is to add letsencrypt certificate creation to enable SSL and https calls !!***






