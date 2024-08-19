# Setup and development

- [Setup and development](#setup-and-development)
  - [First-time setup](#first-time-setup)
  - [Installation](#installation)
    - [Database](#database)
    - [Configuration](#configuration)
    - [Dev server](#dev-server)
  - [Generators](#generators)
  - [Docker](#docker)
    - [Docker installation](#docker-installation)
    - [Docker-compose installation](#docker-compose-installation)
    - [Run](#run)

## First-time setup

Make sure you have the following installed:

- [Node](https://nodejs.org/en/) (at least the latest LTS)
- [Yarn](https://yarnpkg.com/lang/en/docs/install/) (at least 1.0)

## Installation

```bash
# Install dependencies from package.json
yarn install
```

> Note: don't delete yarn.lock before installation, See more [in yarn docs](https://classic.yarnpkg.com/en/docs/yarn-lock/)

### Database

> Note: Awesome NestJS Boilerplate uses [TypeORM](https://github.com/typeorm/typeorm) with Data Mapper pattern.

### Configuration

Before start fill correct configurations in `.env` file

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=nest
```

Some helper script to work with database

```bash
# To create new migration file
yarn migration:create migration_name

# Truncate full database (note: it isn't deleting the database)
yarn schema:drop

# Generate migration from update of entities
yarn migration:generate migration_name
```

### Dev server

```bash
# Launch the dev server
yarn start:dev

# Launch the dev server with file watcher
yarn watch:dev

# Launch the dev server and enable remote debugger with file watcher
yarn debug:dev
```
