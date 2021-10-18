const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export function getDateString(time: number) {
  const timeObject = new Date(time * 1000);
  if (timeObject.getMinutes() <= 9) {
    const newDate =
      monthNames[timeObject.getMonth()] +
      ' ' +
      timeObject.getDate() +
      ' at ' +
      timeObject.getHours() +
      ':0' +
      timeObject.getMinutes();

    return newDate;
  }

  const newDate =
    monthNames[timeObject.getMonth()] +
    ' ' +
    timeObject.getDate() +
    ' at ' +
    timeObject.getHours() +
    ':' +
    timeObject.getMinutes();

  return newDate;
}

export function getTime(time: number) {
  if (!time || time === 0) {
    return '';
  }

  const timeObject = new Date(time);
  if (timeObject.getMinutes() <= 9) {
    const newTime = timeObject.getHours() + ':0' + timeObject.getMinutes();
    return newTime;
  }
  const newTime = timeObject.getHours() + ':' + timeObject.getMinutes();
  return newTime;
}
