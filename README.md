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
  1. On your Terminal, go to the folder including the Dockerfile for the mysql server (with `cd`)

  2. Run the following command `docker build -t {name_of_your_image} .`

  3. After the docker image is built, run the following command to run the container `docker run -e MYSQL_ROOT_PASSWORD={example_password_for_root_user} -e MYSQL_PASSWORD={example_password_for_default_user} {name_of_your_image}`
  
  ***!! Keep in mind that the MYSQL_PASSWORD should be the same password as the one provided in schema.sql file !!***

  4. The database server is now running on localhost on 3306 (default) port




