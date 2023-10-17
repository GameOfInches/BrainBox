# BrainBox
A BrainBox-like web game

## Prerequisites:

***1. Docker***

***2. KeePass***





### How to install:

***Windows / Mac OS:***

Download from https://www.docker.com/products/docker-desktop/ and https://keepass.info/download.html

***Linux:***

1. Run the dependencies shell script (make sure to chmod the file)

2. Run the following `sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`

For KeePass, use the link for Windows / Mac OS




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

  3. After the docker image is built, run the following command to run the container `docker run -p 8081:8081 {name_of_your_webserver_image}`

  4. The website server is now running on localhost on port 8081 but unprotected
  
  ***Optional: Webserver with self-signed dev certificate***
  1. Run the `cert_dependencies.ps` script
  2. On your Terminal, go to the folder including the Dockerfile for the website server (with `cd Website`)
  3. Open the Certificates folder inside Website folder and open the .kdbs file inside with KeePass software (Get the password from Krasi)
  4. When you have accessed the encrypted database file, there are 2 entries in there, certificate and key, save both of them (right click -> attachments -> save as...) in the same directory as the .kdbs file
  5. Proceed with the same Docker build command
  6. Proceed with the same Docker run command above, but also add `-p 443:443` in the parameters (eg. `-p 8081:8081 -p 443:443`)
  7. The website server is now running on localhost on both ports 8080 and 443 with https redirect and secureIPv4 Address connection


  ***III. API***
  1. On your Terminal, go to the folder including the Dockerfile for the api server (with `cd Api`)

  2. Run the following command `docker build -t {name_of_your_database_image} .`

  3. After the docker image is built, run the following command to run the container `docker run -e SPRING_DATASOURCE_PASSWORD={example_password_for_default_user} -e SPRING_DATASOURCE_URL=jdbc:mysql://{your_IPv4_Address}:3306/BrainBox -e SPRING_DATASOURCE_USERNAME=BrainboxDefault -p 8080:8080 -d api`
  
  ***!! Keep in mind that the SPRING_DATASOURCE_PASSWORD should be the same password as the one provided in schema.sql file !!***

  4. The api server is now running on localhost on 8080 (default http) port (Keep in mind the database server should be running too, as it tries to establish connection or startup and it exits if it can't)





