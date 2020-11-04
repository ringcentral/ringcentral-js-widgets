export const handleToClockTime = (time: number) => {
  // const hour = Math.floor(time / 1000 / 3600);
  const rest = (time / 1000) % 3600;
  const minute = parseInt(`${rest / 60}`, 10);
  const second = parseInt(`${rest % 60}`, 10);
  return [minute, second]
    .map((time) => `${String(time).length < 2 ? '0' : ''}${time}`)
    .join(':');
};
