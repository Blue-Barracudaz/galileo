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

const parseTime = (timeString) => {
  let hrs = Number(timeString.split(':')[0]);
  if (hrs === 12 && timeString.indexOf('AM') > -1) {
      return 0;
  }
  if (timeString.indexOf('PM') > - 1 && hrs < 12) {
    hrs+=12;
  }
  return hrs;
};

const convertToUNIXTime = (time, date) => {
  const hour = parseTime(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  console.log('human readable reservation time: ', new Date(year, month, day, hour));
  console.log('UNIX time of reservation: ', new Date(year, month, day, hour).getTime() / 1000);
  return new Date(year, month, day, hour).getTime() / 1000; // remove milliseconds
};

export { generateTimes, convertToUNIXTime };