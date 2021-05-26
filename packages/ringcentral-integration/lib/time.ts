import sleep from './sleep';

export const polling = async (
  fn: () => boolean | Promise<boolean>,
  interval: number,
) => {
  if (typeof fn !== 'function') return;
  if (await fn()) return;
  await sleep(interval);
  await polling(fn, interval);
};

export const waitWithCheck = async (
  fn: () => boolean | Promise<boolean>,
  { interval = 100, timeout = 1000 * 5 } = {},
) => {
  if (typeof fn !== 'function') return;
  await Promise.race<void>([
    polling(fn, interval),
    new Promise<void>((_, reject) => setTimeout(reject, timeout)),
  ]);
};

export const waitForSubscribe = async () => {
  await sleep(2.5 * 1000);
};
