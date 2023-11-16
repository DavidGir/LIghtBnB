-- Show all reservations for a user.

SELECT reservations.id as id, properties.title as title, cost_per_night, reservations.start_date as start_date, avg(rating) as average_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = 1
GROUP BY reservations.id, title, cost_per_night
ORDER BY reservations.start_date
LIMIT 10;