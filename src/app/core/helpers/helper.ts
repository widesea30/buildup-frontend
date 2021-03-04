export function getTimeString(dtStr) {
  let dt = new Date(dtStr);
  let cur = new Date();
  let difference = Math.abs(cur.valueOf()-dt.valueOf()) / 1000;

  if (difference < 60) {
    return 'less than 1 min ago';
  } else if (difference / 3600 < 1) {
    return (difference / 60).toFixed(0) + ' min ago';
  } else if (difference / 3600 / 24 < 1) {
    return (difference / 3600).toFixed(0) + ' hours ago';
  } else if (difference / 3600 / 24 / 7 < 1) {
    return (difference / 3600 / 24).toFixed(0) + ' days ago';
  } else if (difference / 3600 / 24 / 7 / 4 < 1) {
    return (difference / 3600 / 24 / 7).toFixed(0) + ' weeks ago';
  } else {
    let month1 = (dt.getMonth() + 1 < 10) ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
    let day1 = (dt.getDay() < 10) ? '0' + dt.getDay() : dt.getDay();
    return month1 + '/' + day1 + '/' + dt.getFullYear();
  }
}

export function formatTimeString(dtStr) {
  let dt = new Date(dtStr);

  let month1 = (dt.getMonth() + 1 < 10) ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
  let day1 = (dt.getDay() < 10) ? '0' + dt.getDay() : dt.getDay();
  let hr = (dt.getHours() < 10) ? '0' + dt.getHours() : dt.getHours();
  let min = (dt.getMinutes() < 10) ? '0' + dt.getMinutes() : dt.getMinutes();
  return month1 + '/' + day1 + '/' + dt.getFullYear() + ' ' + hr + ':' + min;
}