import padLeft from 'ringcentral-integration/lib/padLeft';

export default function formatDuration(duration) {
  if (Number.isNaN(duration)) {
    return '--:--';
  }
  const intDuration = typeof duration === 'number' ?
    Math.round(duration) :
    parseInt(duration, 10);

  const seconds = padLeft(intDuration % 60, '0', 2);
  const minutes = padLeft(Math.floor(intDuration / 60) % 60, '0', 2);
  const hours = Math.floor(intDuration / 3600) % 24;

  return `${hours > 0 ? (`${padLeft(hours, '0', 2)}:`) : ''}${minutes}:${seconds}`;
}
