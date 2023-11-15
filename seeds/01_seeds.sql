INSERT INTO users (name, email_address, password)
VALUES ('David Fledger', 'feldger@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Crimson Script', 'crimson@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Blade Runner', 'runner@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, thumbnail_photo_url, large_cover_photo_url, country, street, city, province, post_code, is_active)
VALUES (1, 'Nightmare On Elm Street', 'description', 1500.00, 6, 5, 12, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bortolotto.com%2FProjects%2FResidential%2FBezier-Curve-House&psig=AOvVaw1EjwzdhK2KJb8s8q_eOYQO&ust=1700169642263000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCr8c73xoIDFQAAAAAdAAAAABAE', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bortolotto.com%2FProjects%2FResidential%2FBezier-Curve-House&psig=AOvVaw1EjwzdhK2KJb8s8q_eOYQO&ust=1700169642263000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCr8c73xoIDFQAAAAAdAAAAABAJ', 'Canada', '123 Elm Street', 'City of Freddy Krueger', 'BC', 'V2V 3N4', true),

(2, 'Camp Crystal Lake', 'description', 700.00, 4, 2, 2, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bortolotto.com%2FProjects%2FResidential%2FBezier-Curve-House&psig=AOvVaw1EjwzdhK2KJb8s8q_eOYQO&ust=1700169642263000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCr8c73xoIDFQAAAAAdAAAAABAE', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bortolotto.com%2FProjects%2FResidential%2FBezier-Curve-House&psig=AOvVaw1EjwzdhK2KJb8s8q_eOYQO&ust=1700169642263000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCr8c73xoIDFQAAAAAdAAAAABAJ', 'Canada', '123 Crystal Lake Street', 'City of Jason Voorhes', 'BC', 'V2VC 3N8', true),

(3, 'Riviera-Maya', 'description', 400.00, 3, 2, 1, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bortolotto.com%2FProjects%2FResidential%2FBezier-Curve-House&psig=AOvVaw1EjwzdhK2KJb8s8q_eOYQO&ust=1700169642263000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCr8c73xoIDFQAAAAAdAAAAABAE', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bortolotto.com%2FProjects%2FResidential%2FBezier-Curve-House&psig=AOvVaw1EjwzdhK2KJb8s8q_eOYQO&ust=1700169642263000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCr8c73xoIDFQAAAAAdAAAAABAJ', 'Canada', 'Party Street', 'City of Let Me Chill', 'BC', 'V2T 3N7', true);

INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT into property_reviews (guest_id, reservation_id, property_id, message, rating)
VALUES (1, 1, 1, 'message', 4),
(2, 2, 2, 'message', 5),
(3, 3, 3, 'message', 3);
