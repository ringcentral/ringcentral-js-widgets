export function formatDuration(duration?: number | string) {
  if (duration === undefined || Number.isNaN(duration)) {
    return '--:--';
  }

  const intDuration =
    typeof duration === 'number'
      ? Math.round(duration)
      : parseInt(duration, 10);

  const seconds = `${intDuration % 60}`.padStart(2, '0');
  const minutes = `${Math.floor(intDuration / 60) % 60}`.padStart(2, '0');
  const hours = Math.floor(intDuration / 3600) % 24;
  const hourString = hours > 0 ? `${`${hours}`.padStart(2, '0')}:` : '';

  return `${hourString}${minutes}:${seconds}`;
}
