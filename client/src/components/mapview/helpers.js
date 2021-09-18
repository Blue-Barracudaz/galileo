const generateTimes = () => {
  const times = ['12:00 AM'];

  let hour = 1;
  let pm = false;

  while (hour <= 12) {
    if (hour === 12 && pm) {
      return times;
    }

    if (hour === 12){
      pm = true;
      times.push(`${hour}:00 PM`);
      hour = 1;
    }

    times.push(`${hour}:00 ${pm ? 'PM' : 'AM'}`);
    hour++;
  }
};

const parseTime = (timeString) => { // convert the input time string to an hour number on a 24-hour scale
  let hrs = Number(timeString.split(':')[0]); // get hours (reservations are made on the hour only)
  if (hrs === 12 && timeString.indexOf('AM') > -1) { // edge case: it's 12:00AM --> return 0
      return 0;
  }
  if (timeString.indexOf('PM') > - 1 && hrs < 12) { // if it's PM and after 12, add 12 to the hour to convert to 24 hr timescale
    hrs+=12;
  }
  return hrs;
};

const convertToUNIXTime = (time, date) => {
  const hour = parseTime(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  // date.setHours(hour); // use these lines if you don't want to create a new time object for some reason
  // date.setMinutes(0);
  // date.setSeconds(0);
  // date.setMilliseconds(0);
  // console.log('result after update to the existing date object: ', date.getTime());
  console.log('human readable reservation time: ', new Date(year, month, day, hour));
  console.log('UNIX time of reservation: ', new Date(year, month, day, hour).getTime() / 1000);
  return new Date(year, month, day, hour).getTime() / 1000; // remove milliseconds
};

export { generateTimes, convertToUNIXTime };