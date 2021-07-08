# README!

## To run the repo

1. npm install
2. Set .env with DATABASE_URL and SESSION_SECRET which is the url that allows the database to be connected to the server and users persisted.
3. npm run dev

## Usage

Recommended use is with the the front end repo but it can also be used with API clients such as POSTMAN and curl.
To use the api first post to the login route with the credentials email:test@mail.com, password: password.
Then to ask the chatbot a question look in responses.js and post to the response api route with
message:[any question from responses.js].

## Error debugging

If there is a crash restart the server by killing the process and restarting it using npm run dev.
If database is not functioning use the other database connection adapter in ormconfig.js with a local database.
https://www.postgresql.org/download to download and install the correct version of postgresql for your system.
https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/ follow the first few steps of this tutorial to create a database and then user the credentials of the new user and database as values to connect to the db in ormconfig.js.

Production

Make sure to generate a secure session secret before deploying. Using crypto.randomBytes(64).toString('hex'); whilst node is running.
