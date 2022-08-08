# Docker files

## here are a short list of docker-compose files and their purposes:

### [compose.dev.yml](./docker-compose.dev.yml)
This compose file can be used for development databases, keep in mind password and links are corresponding up with .env files.

### [compose.prod.yml](./docker-compose.prod.yml)
This compose file can be used for hosting your application inside vm, keep in mind in case you're using your vm with an admin account you need to make some changes to your web docker files, you can find it [here](../web/Dockerfile). Keep in mind before hosting your application you have to update couples of env files in `compose.prod.yml`, we recommend making a copy of the original file and applying your changes to the copied version.