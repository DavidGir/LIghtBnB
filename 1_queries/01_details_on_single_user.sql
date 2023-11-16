-- When a user logs in, we will need to get all of their details to compare their email and password, and to show them a customized home page.

SELECT users.id as id, users.name as name, users.email as email, users.password as password
FROM users
WHERE email = 'tristanjacobs@gmail.com';
