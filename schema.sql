-- CREATE DATABASE galileo;
CREATE EXTENSION postgis;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username varchar(50) UNIQUE,
  password varchar(50),
  first_name varchar(50),
  last_name varchar(50),
  email varchar(50)
);

CREATE TABLE spots (
  spot_id SERIAL PRIMARY KEY,
  host_id integer,
  lat decimal,
  long decimal,
  address varchar(100),
  type varchar(50),
  price integer,
  photo_url text,
  geom GEOMETRY(Point, 4326)
);

CREATE TABLE bookings (
  booking_id SERIAL PRIMARY KEY,
  spot_id integer,
  renter_id integer,
  start_time bigint,
  end_time bigint
);

CREATE INDEX spots_gix  ON spots USING GIST (geom);

<<<<<<< HEAD
-- Add 2 rows
INSERT INTO spots (host_id, lat, long, address, type, price, photo_url, geom) VALUES (1, 41.3954, 2.162, 'location1', 'driveway', 5, 'photo1', 'POINT(41.3954 2.162)');
INSERT INTO spots (host_id, lat, long, address, type, price, photo_url, geom) VALUES (1, 41.3917, 2.1649, 'location2', 'driveway', 15, 'photo2', 'POINT(41.3917 2.1649)');
=======
-- Add Fake Spot Data
INSERT INTO spots (host_id, lat, long, address, type, price, photo_url, geom) VALUES (1, 37.761980, -122.502070, '1323 42nd Ave, San Francisco, CA 94122', 'driveway', 5, 'https://images.newscientist.com/wp-content/uploads/2013/10/mg22029415.600-1_800.jpg?width=778', 'POINT(37.761980 -122.502070)');
INSERT INTO spots (host_id, lat, long, address, type, price, photo_url, geom) VALUES (1, 37.761840, -122.502060, '1329 42nd Ave, San Francisco, CA 94122', 'driveway', 15, 'https://images.newscientist.com/wp-content/uploads/2013/10/mg22029415.600-1_800.jpg?width=778', 'POINT(37.761840 -122.502060)');
INSERT INTO spots (host_id, lat, long, address, type, price, photo_url, geom) VALUES (2, 37.762565959993495, -122.50153009990579, '4055 Irving St, San Francisco, CA 94122', 'driveway', 14, 'https://images.newscientist.com/wp-content/uploads/2013/10/mg22029415.600-1_800.jpg?width=778', 'POINT(37.762565959993495 -122.50153009990579)');
INSERT INTO spots (host_id, lat, long, address, type, price, photo_url, geom) VALUES (2, 37.762592178167665, -122.5063187612811, '4500 Irving St, San Francisco, CA 94122', 'driveway', 18, 'https://images.newscientist.com/wp-content/uploads/2013/10/mg22029415.600-1_800.jpg?width=778', 'POINT(37.762592178167665 -122.5063187612811)');
INSERT INTO spots (host_id, lat, long, address, type, price, photo_url, geom) VALUES (2, 37.76076090904784, -122.50437955942958, '3930 Judah St, San Francisco, CA 94122', 'street', 5, 'https://images.newscientist.com/wp-content/uploads/2013/10/mg22029415.600-1_800.jpg?width=778', 'POINT(37.76076090904784 -122.50437955942958)');
INSERT INTO spots (host_id, lat, long, address, type, price, photo_url, geom) VALUES (2, 37.76154124385957, -122.50194411366749, '1360 43rd Ave, San Francisco, CA 94122', 'street', 11, 'https://images.newscientist.com/wp-content/uploads/2013/10/mg22029415.600-1_800.jpg?width=778', 'POINT(37.76154124385957 -122.50194411366749)');
INSERT INTO spots (host_id, lat, long, address, type, price, photo_url, geom) VALUES (2, 37.75821628178477, -122.50155787553204, '1530 43rd Ave, San Francisco, CA 94122', 'lot', 19, 'https://images.newscientist.com/wp-content/uploads/2013/10/mg22029415.600-1_800.jpg?width=778', 'POINT(37.75821628178477 -122.50155787553204)');
INSERT INTO spots (host_id, lat, long, address, type, price, photo_url, geom) VALUES (2, 37.75686759386426, -122.502298165213, '3655 Lawton St, San Francisco, CA 94122', 'street', 21, 'https://images.newscientist.com/wp-content/uploads/2013/10/mg22029415.600-1_800.jpg?width=778', 'POINT(37.75686759386426 -122.502298165213)');
INSERT INTO spots (host_id, lat, long, address, type, price, photo_url, geom) VALUES (2, 37.75538644246041, -122.50336076285619, '3701 Noriega St, San Francisco, CA 94122', 'garage', 14, 'https://images.newscientist.com/wp-content/uploads/2013/10/mg22029415.600-1_800.jpg?width=778', 'POINT(37.75538644246041 -122.50336076285619)');
INSERT INTO spots (host_id, lat, long, address, type, price, photo_url, geom) VALUES (2, 37.73330556691958, -122.50517183059404, 'Sloat Blvd & Upper Great Hwy, San Francisco, CA 94132', 'lot', 35, 'https://images.newscientist.com/wp-content/uploads/2013/10/mg22029415.600-1_800.jpg?width=778', 'POINT(37.73330556691958 -122.50517183059404)');
>>>>>>> main

-- Normal search query
-- SELECT spot_id, host_id, lat, long, address, type, price, photo_url, ST_AsText(geom) AS geom FROM spots;

-- Actual distance between location1 and location 2 is around 550m. Here we take location1's coordinates as our centre. And we find all locations within 600m of this central location.
-- SELECT spot_id, address
-- FROM spots
-- WHERE ST_DWithin(
--   geom,
--   ST_GeomFromText('POINT(41.3954 2.162)', 4326)::geography,
--   600
-- );