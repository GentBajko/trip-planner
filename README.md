# Trip Planner

## Description

Trip Planner is a web application built with NestJS and TypeORM that allows users to search, save, and manage trips. It interacts with an external trips API to fetch available trips based on user criteria.

## Features

- Search for trips based on origin, destination, and sorting preferences.
- Save favorite trips to a PostgreSQL database.
- List and delete saved trips.

## Technologies

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Axios](https://axios-http.com/)
- [Jest](https://jestjs.io/) for testing

## Installation

1. **Install Dependencies**

```
npm install
```

2. **Connect to PostgreSQL**

To connect to postgreSQL, either run the docker container using ``docker compose up`` or use change the environment variables to connect to the instance of your choice.

3. **Start the development server:**

```
npm run start
```

4. **API Endpoints:**

    - `GET /trips`: Fetch trips based on query parameters.
    - `POST /trips`: Save a new trip.
    - `GET /trips/saved`: List saved trips.
    - `DELETE /trips/:id`: Delete a saved trip.

    Refer to ``http://localhost:3000/docs`` for request and response formats.

## Testing

Run tests using Jest:

```
npm run test
```
## Environment Variables

Refer to `.env.example` for the list of required environment variables.
