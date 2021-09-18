const { Client } = require('pg');

let database;
let user;
let password;
let host;

if (process.env.NODE_ENV === 'development') {
  database = 'galileo';
  user = process.env.PG_DB_USER_DEV;
  password = process.env.PG_DB_PASS_DEV;
  host = 'localhost';
} else if (process.env.NODE_ENV === 'test') {
  database = 'galileo_test';
  user = 'haoshenli';
  password = process.env.PG_DB_PASS_TEST;
  host = 'localhost';
}

const client = new Client({
  database: database,
  user: user,
  password: password,
  host: host,
  port: 5432,
});
console.log('DB env', process.env.NODE_ENV)

client.connect()
  .then((client) => {
    console.log(`CONNECTED TO PG: DATABASE: ${database}`);
  })
  .catch((err) => console.log(`ERROR CONNECTING TO PG: DATABASE ${database}`, err))


module.exports.client = client;
