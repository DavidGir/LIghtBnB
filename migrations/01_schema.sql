DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS property_reviews CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email_address VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE properties(
    id SERIAL PRIMARY KEY NOT NULL,
    owner_id INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    cost_per_night INT NOT NULL DEFAULT 0,
    parking_spaces INT NOT NULL DEFAULT 0,
    number_of_bathrooms INT NOT NULL DEFAULT 0,
    number_of_bedrooms INT NOT NULL DEFAULT 0,
    thumbnail_photo_url VARCHAR(255) NOT NULL,
    large_cover_photo_url VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    province VARCHAR(255) NOT NULL,
    post_code VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

COMMENT
ON COLUMN
    properties.owner_id IS 'One user (owner) can own multiple properties.';
COMMENT
ON COLUMN
    properties.is_active IS 'Property is either active or not depending on weather or if currently rented out.';

CREATE TABLE reservations(
    id SERIAL PRIMARY KEY NOT NULL,
    guest_id INT REFERENCES users(id) ON DELETE CASCADE,
    property_id INT REFERENCES properties(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

COMMENT
ON COLUMN
    reservations.guest_id IS 'A user (guest) can make many reservations.';
COMMENT
ON COLUMN
    reservations.property_id IS 'A property can have many reservations.';

CREATE TABLE property_reviews(
    id SERIAL PRIMARY KEY NOT NULL,
    guest_id INT REFERENCES users(id) ON DELETE CASCADE,
    reservation_id INT REFERENCES reservations(id) ON DELETE CASCADE,
    property_id INT REFERENCES properties(id) ON DELETE CASCADE,
    message TEXT,
    rating SMALLINT NOT NULL DEFAULT 0
);

COMMENT
ON COLUMN
    property_reviews.guest_id IS 'A user (guest) can make many reviews.';
COMMENT
ON COLUMN
    property_reviews.reservation_id IS 'Associated with a single reservation.';
COMMENT
ON COLUMN
    property_reviews.property_id IS 'A property can have many reviews.';
COMMENT
ON COLUMN
    property_reviews.rating IS '1 to 5 stars.';
