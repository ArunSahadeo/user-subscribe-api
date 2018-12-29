## Pre requisites

Make sure you have the latest versions of `Node`, `NPM`, and `Webpack` installed.
You will also need `MySQL` to be installed on your machine.

## Installation instructions

1. Run `npm install` in the base directory, in `client` and in `server`
2. Copy `.env.example` and update with your credentials for the DB connection, as well as your credentials for the dummy admin user that is to be seeded
3. Run `npm run dev` in the base directory to launch both the client and the server

## DB migrations / seeding

To run DB schema migrations and run seeders, please do as follows:

1. `cd server`
2. `./node_modules/.bin/sequelize db:migrate`

To seed dummy subscribers:

1. `./node_modules/.bin/sequelize db:seed --seed seeders/20181224004513-dummy-users.js`

To seed a default admin user:

1. `./node_modules/.bin/sequelize db:seed --seed seeders/20181227193137-addDefaultAdminUsers.js`
