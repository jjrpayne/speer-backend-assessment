# speer-backend-assessment
Backend assessment for a position at speer.

## Prerequisites
Postgres and NPM

## Installation
Create a database in your local postgres instance named "speerdb" (or any name you want), restore the database from the db/speerdb.sql file.

Navigate to the cloned folder in a terminal, run command
```
npm install
```
to install prerequisites.

## Configuration
Create a file called .env to store the environment variables. You can copy the contents of the sample_env file.

Set DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT to the values of your local Postgres instance.

Since we are just running this app locally, we can use the JWT_SECRET as set in the sample_env. In a production environment, you would want to change this to a unique key.

RATE_LIMIT_WINDOW sets the rate limiting window in minutes.
RATE_LIMIT_MAX sets the maximum requests allowed for the given window.

## Running
To run the application run the command
```
node index.js
```
in the root folder.

To run tests, run the command
```
npm test
```
in the root folder.

## Route summary

### Auth routes

#### POST /api/auth/signup
Create an account.
Body:
```
{"username":"user123",
"password":"password"}
```

#### POST /api/auth/login
Log in to an existing account.
Body:
```
{"username":"user123",
"password":"password"}
```
Returns a token. Add this token to the Authorization header for the below routes for authentication

### Note routes

#### GET /api/notes
Return all notes for a given user.

#### GET /api/notes/:id
Return the note at the given id.

#### POST /api/notes
Create a new note.
Body:
```
{"note": "this is a note"}
```

#### PUT /api/notes/:id
Update an existing note.
Body:
```
{"note": "this is an updated note"}
```

#### DELETE /api/notes/:id
Delete the note at the given id.

#### GET /api/search?q=:query
Search for notes based on a keyword.