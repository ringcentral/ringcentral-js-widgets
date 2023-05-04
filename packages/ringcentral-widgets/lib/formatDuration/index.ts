import padStart from 'lodash/padStart';

export default function formatDuration(duration: any) {
  if (Number.isNaN(duration)) {
    return '--:--';
  }
  const intDuration =
    typeof duration === 'number'
      ? Math.round(duration)
      : parseInt(duration, 10);

  const seconds = padStart(`${intDuration % 60}`, 2, '0');
  const minutes = padStart(`${Math.floor(intDuration / 60) % 60}`, 2, '0');
  const hours = Math.floor(intDuration / 3600) % 24;

  const hourString = hours > 0 ? `${padStart(`${hours}`, 2, '0')}:` : '';

  return `${hourString}${minutes}:${seconds}`;
}
