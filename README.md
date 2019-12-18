# Documentation
Cars API

## Getting started
- First of all, create `.env` and `.env.test` config files inside root directory:

```shell
cp .env.example .env && cp .env.test.example .env.test
```
- Install node modules by `yarn install` command.

### Development
Let's start docker container for PostgreSQL DB:
```shell
docker-compose -f docker-compose.dev.yml up -d
```
After that, you can serve the app with `yarn start` command.

### Production
Run docker containers with following command:
```shell
docker-compose up
```

## Tests
* To run unit tests, run `yarn test` command.
* To run e2e tests, you must be sure that docker container for PostgreSQL was started in development mode (see development section above). After that, test DB will be createad for e2e purposes. You can start e2e tests by `yarn test:e2e` command.

## Swagger
Go to `/api-docs` URL to read the Swagger API docs.
The documentation is generated automatically, so there may be inaccuracies

## Troubleshooting
If you have `database "cars_test" does not exist` error during execution of e2e tests,
for some reason test DB wasn't created. To fix that issue, try to shutdown docker container with it's volume, and restart it again:
```shell
docker-compose -f docker-compose.dev.yml down -v && docker-compose -f docker-compose.dev.yml up -d
```

## Info
#### Request body validation
All endpoints protected by `class-validator` package

#### Security
There is `helmet` package middleware, that adds some small XSS protections, and useful security headers.
Also, there is Nginx reverse proxy container, because exposing the node instance in public it's a bad practice. 
