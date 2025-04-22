## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This is a simple customer billing record application that allows user to retrieve, create, update, and delete customer billing records build with NestJS, Postgres, and TypeORM.

## Project setup

To setup the project locally:

1. Install Docker Desktop
2. Clone the repository
3. `cd` into the project directory and run `docker-compose up --build` in the terminal
4. Go to [localhost:3000/api](http://localhost:3000/api/) to access the application's endpoints on Swagger
5. Use the Auth generate-token endpoint to generate the JWT token for user role authorization. Update the payload according to user role `admin` or `viewer` in the `role` property. Copy the jwt token returned and authorize using Swagger authorization to access the endpoints according to the assessment's requirements.
6. To tear down and stop the containers run `docker-compose down -v`

To run the project using the application's docker image and without cloning the repository:

1. Create a docker-compose.yml file
2. Copy below yml configuration into the file:

```
services:
  postgres:
    image: postgres:12-alpine
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: root
      POSTGRES_DB: customer_billing_portal
    networks:
      - app

  adminer:
    image: adminer
    restart: always
    depends_on:
      - postgres
    networks:
      - app
    ports:
      - '8080:8080'

  billing-dev:
    image: deannarustham/zurich-assessment
    networks:
      - app
    ports:
      - '3000:3000'
    depends_on:
      - postgres
      - adminer
    command: [sh, -c, 'npm run start:dev']

networks:
  app:

```

3. In the directory of the docker-compose file just created, run `docker-compose up --build` in the terminal
4. Go to [localhost:3000/api](http://localhost:3000/api/) to access the application's endpoints on Swagger
5. Use the Auth generate-token endpoint to generate the JWT token for user role authorization. Update the payload according to user role `admin` or `viewer` in the `role` property. Copy the jwt token returned and authorize using Swagger authorization to access the endpoints according to the assessment's requirements.
6. To tear down and stop the containers run `docker-compose down -v`
