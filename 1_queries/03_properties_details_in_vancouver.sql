-- Show specific details about properties located in Vancouver including their average rating.

SELECT properties.id as id, title, cost_per_night, avg(property_reviews.rating) as average_rating
FROM properties
JOIN property_reviews ON properties.id = property_id
WHERE city LIKE '%ancouve%'
GROUP BY properties.id
HAVING avg(property_reviews.rating) >= 4
ORDER BY cost_per_night
LIMIT 10;