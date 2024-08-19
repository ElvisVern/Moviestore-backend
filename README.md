# MovieStore Backend

### Development

```bash
# excute data.sql to create database and tables
mysql -u root -p < data.sql

# copy `.env.axample` to `.env` and change your own environment
cp .env.example .env

# Install dependencies
yarn
# Run development server and open http://localhost:8080
yarn start:dev
# Dev Swagger documentation open http://localhost:8080/documentation#

```

### Test

```bash
yarn test:e2e
```

### Build

To build the App, run

```bash
yarn build:prod
```

## Features

- see `docs/` for more details and architecture
- This project use `AOP` style middleware interceptor to do some auto validation and permission check similarity with `SpringBoot`
- `JWT` to do authentication
- `Swagger` to do API documentation
- use Restful API style

## Design

- use two tables `movies` and `movie_ratings` to do CRUD operations
- split `movies` and `movie_ratings` we can do some optimization

  - use `Redis` to store `movies` data, because `movies` data is not frequently changed
  - use `MySQL` and others to store `movie_ratings` data, because `movie_ratings` data is frequently changed, and we can also use `Redis` for rating's highly concurrent writes
  - use `Elasticsearch` to fetch movies with different `genre` types and some complex query
  - Do a paged query against the movie's data, then use the movie's ID to batch query the ratings at onc using a limited number of the movie's IDs by `IN(...IDS)`, Improve performance by merging data through in-memory calculations
  - only store one rating per movie avoid fetch large amount of rating data, and use `version` to record every update, then use `rating / version` to get the average rating

#### The High Concurrency High Availability design of services can be viewed at [shop-backend](https://github.com/ElvisVern/shop-backend)
