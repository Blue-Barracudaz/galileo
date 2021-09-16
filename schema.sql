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

-- Add 2 rows
INSERT INTO spots (host_id, lat, long, address, type, price, photo_url, geom) VALUES (1, 41.3954, 2.162, 'location1', 'driveway', 5, 'photo1', 'POINT(41.3954 2.162)');
INSERT INTO spots (host_id, lat, long, address, type, price, photo_url, geom) VALUES (1, 41.3917, 2.1649, 'location2', 'driveway', 15, 'photo2', 'POINT(41.3917 2.1649)');

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