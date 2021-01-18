export const handleToClockTime = (time: number, { useCeil = false } = {}) => {
  const number = time / 1000;
  const int = useCeil ? Math.ceil(number) : Math.floor(number);
  const hour = parseInt(`${(int / 60 / 60) % 24}`, 10);
  const minute = parseInt(`${(int / 60) % 60}`, 10);
  const second = parseInt(`${int % 60}`, 10);
  return [hour, minute, second]
    .map((time) => `${String(time).length < 2 ? '0' : ''}${time}`)
    .join(':');
};
