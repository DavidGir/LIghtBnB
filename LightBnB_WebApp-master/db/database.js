// Populates process.env
require('dotenv').config();

const properties = require("./json/properties.json");
const users = require("./json/users.json");

// Config:
const pg = require("pg");
const Client = pg.Client;

const config = {
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
};

const client = new Client(config);

// Queries:

client.connect();

// client.query(`
// SELECT title
// FROM properties
// LIMIT 10;
// `)
//   .then(response => {
//     console.log(response);
//     client.end();
//   });

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString = `SELECT * FROM users WHERE email = $1`;
  const values = [email];

  return client
    .query(queryString, values)
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      }
      // client.end();
      // Return single user
      return result.rows [0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `SELECT * FROM users WHERE id = $1;`;
  const values = [id];

  return client
    .query(queryString, values)
    .then((result) => {
      if (result.rows.length === 0) {
        console.log(`No user found with id: ${id}`);
        return null;
      }
      // client.end();
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
  // return Promise.resolve(users[id]);
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  const queryString = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
  const values = [user.name, user.email, user.password];

  return client
    .query(queryString, values)
    .then((result) => {
      console.log(result.rows);
      // client.end();
      // Returns the newly added user
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return getAllProperties(null, 2);
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryString = `SELECT * FROM properties LIMIT $1`;
  const values = [limit];

  return client
    .query(queryString, values)
    .then((result) => {
      // console.log(result.rows);
      // client.end();
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
