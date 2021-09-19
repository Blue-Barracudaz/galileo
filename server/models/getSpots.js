const client = require('../../db/index.js').client;

const getFreeSpots = (lat, long, userStartTime, userEndTime) => {
  let location = `POINT(${lat} ${long})`;
  let nearbyValues = [location];
  let nearbyQuery = `SELECT spot_id, host_id, lat, long, address, type, price, photo_url FROM spots WHERE ST_DWithin(geom, ST_GeomFromText($1, 4326)::geography, 1000);`;

  let availableValues = [userStartTime, userEndTime]
  let availableQuery = `
    SELECT spot_id
    FROM bookings
    WHERE (
      ($1 >= start_time AND $1 < end_time)
      OR ($1 < start_time AND $2 > end_time)
      OR ($2 > start_time AND $2 <= end_time)
    );
    `;
  let promises = [];
  promises.push(client.query(nearbyQuery, nearbyValues));
  promises.push(client.query(availableQuery, availableValues));

  return Promise.all(promises)
    .then((resolved) => {
      let nearbySpots = resolved[0].rows;
      let conflictedSpots = resolved[1].rows;
      console.log('NEARBY', nearbySpots, 'CONFLICTED SPACES', conflictedSpots)
      let filteredSpots = nearbySpots.filter((nearbySpot) => {
        for (let i = 0; i < conflictedSpots.length; i++) {
          if (nearbySpot.spot_id === conflictedSpots[i].spot_id) {
            return false;
          }
          continue;
        }
        return true;
      });
      console.log('FILTERED SPOTS', filteredSpots)
      let requiredSpots = filteredSpots.map(({ spot_id, host_id, address, lat, long, type, price, photo_url }) => {
        return {
          spot_id,
          host_id,
          address,
          type,
          price,
          photo_url,
          location: {
            lat: Number(lat),
            lng: Number(long)
          }
        }
      })
      console.log('REQUIRED SPOTS', requiredSpots)
      return requiredSpots;
    })
    .catch((err) => {
      console.log('ERROR GETTING FREE SPOTS FROM DB IN MODELS', err);
      throw err;
    })
}

module.exports.getFreeSpots = getFreeSpots;