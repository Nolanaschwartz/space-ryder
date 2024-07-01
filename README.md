## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```
## Database - Postgres
Create a `.env` file and follow the template `.sample.env` to set up the database connection.

Once created you can run a docker container with Postgres:
```bash
docker compose up
```

## Migrations
To run the migrations you can use the following command:
```bash
npm run migration:run
```

## Seed
To seed the database you can use the following command:
```bash
npm run seed
```

Then you will want to manually input the initial location ids into the `spaceship.location` column.

## Running the app
```bash
$ npm run start:dev
```
