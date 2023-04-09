export default function setDateTimeFromString(timestamp) {
  const date = new Date(parseInt(timestamp));
  const dateString = date.toLocaleDateString('en-UK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const timeString = date.toLocaleTimeString('en-UK', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
  });
  return `${dateString} | ${timeString}`;
}
