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
  const queryString = `
  SELECT reservations.*, properties.*, cost_per_night, reservations.start_date as start_date, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  GROUP BY reservations.id, properties.id, cost_per_night
  ORDER BY reservations.start_date
  LIMIT $2
  `;
  const values = [guest_id, limit];

  return client
    .query(queryString, values)
    .then((result) => {
      // console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;
  const values = [];
  // If user uses city filter option
  if (options.city) {
    values.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${values.length} `;
  }
  // If an owner_id is passed in, return properties belonging to that owner
  if (options.owner_id) {
    values.push(options.owner_id);
    queryString += `WHERE owner_id = $${values.length} `;
  }
  // If minimum price filter has been inputted by user
  if (options.minimum_price_per_night) {
    //  Convert to cents for the db
    values.push(options.minimum_price_per_night * 100);
    // If the values array has more than one element, it means there's already a filter condition in the query (expression if false). Any additional conditions should be appended with the AND and with WHERE if array has only one element
    queryString += values.length === 1 ? 'WHERE ' : 'AND ';
    queryString += `cost_per_night >= $${values.length} `;
  }
  // If maximum price has been inputted by user
  if (options.maximum_price_per_night) {
    values.push(options.maximum_price_per_night * 100);
    queryString += values.length === 1 ? 'WHERE ' : 'AND ';
    queryString += `cost_per_night <= $${values.length} `;
  }
  // If minimum filer has been inputted by the user
  if (options.minimum_rating) {
    values.push(options.minimum_rating);
    queryString += values.length === 1 ? 'WHERE ' : 'AND ';
    queryString += `rating >= $${values.length} `;
  }
  // Add any query that comes after the WHERE clause
  values.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${values.length};
  `;

  console.log(queryString, values);

  return client
    .query(queryString, values)
    .then((result) => {
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
  const queryString = `
  INSERT INTO properties (
    owner_id, title, description, thumbnail_photo_url, cover_photo_url, 
    cost_per_night, street, city, province, post_code, country, 
    parking_spaces, number_of_bathrooms, number_of_bedrooms
  )
  VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
  )
  RETURNING *;
  `;
  
  const values = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms
  ];

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

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
