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
