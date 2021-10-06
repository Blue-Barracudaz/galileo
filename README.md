# Galileo
## Create a .env file and add the following keys:
1. NODE_ENV="development"
2. PG_DB_USER_DEV="<YOUR_USERNAME>"
3. PG_DB_PASS_DEV="<YOUR_PASSWORD>"
4. PG_DB_PASS_TEST="<CIRCLECI_DB_PASSWORD>"
5. GOOGLE_API="<YOUR_API_KEY>"

To get a Google Map API, please check out this link: https://developers.google.com/maps/gmp-get-started#create-project

## To intialize the db
1. Install PostGIS using homebrew (preferred). https://postgis.net/install/
2. Create a db called 'galileo'.
3. Run 'psql galileo < schema.sql' in the terminal.

## To initialize the project:
1. npm install
2. npm run react-dev
3. npm start

Go to http://localhost:3000 to view the project.

## Testing
Run tests once: npm test.
Run tests in watch-mode: npm run test-w.
Check coverage of tests: npm run coverage.

