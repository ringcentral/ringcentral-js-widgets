import sleep from './sleep';

export async function waitUntil(fn, interval = 300, waitTime = 10000) {
  let t = 0;
  while (t < waitTime && !fn()) {
    await sleep(interval);
    t += interval;
  }
}
