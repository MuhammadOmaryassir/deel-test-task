# DEEL BACKEND TASK

This backend exercise involves building a Node.js/Express.js app that will serve a REST API.
Time spent ~ 3.5h

## Data Models
### Profile

A profile can be either a `client` or a `contractor`.
clients create contracts with contractors. contractor does jobs for clients and get paid.
Each profile has a balance property.

### Contract

A contract between and client and a contractor.
Contracts have 3 statuses, `new`, `in_progress`, `terminated`. contracts are considered active only when in status `in_progress`
Contracts group jobs within them.

### Job

Contractor get paid for jobs by clients under a certain contract.

## Getting Set Up

1. In the repo root directory, run `npm install` to gather all dependencies.

1. Next, `npm run seed` will seed the local SQLite database. **Warning: This will drop the database if it exists**. The database lives in a local file `database.sqlite3`.

1. Then run `npm start`

## Technical Notes

- The server is running with [nodemon](https://nodemon.io/) which will automatically restart for you when you modify and save a file.

- The database provider is SQLite, which will store data in a file local to your repository called `database.sqlite3` or in memory during tests. You can override it using `DB_STORAGE` env variable 

## APIs To Implement

Swagger UI is located at [/api-docs](http://localhost:3001/api-docs).

## Tests
There are API tests for the main route handlers.
Tests use in memory Sqlite DB which is flushed during every test. It's quite fast and lightweight setup.

To run, execute
```
npm test
```

## Next steps

Due to restriction of time I skipped several things, but I will mention them here:

* setup validation with Joi
* better test setup with fixtures and different levels of tests
* a better separation of layers, e.g. services, route handlers
* admin API with optional dates  
