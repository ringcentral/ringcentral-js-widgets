function isTimeOut(startTime: number, timeoutInSeconds: number) {
  return Date.now() - startTime > timeoutInSeconds * 1000;
}

export function waitUntilEqual<T>(
  source: () => T,
  checkItem: string,
  expect: T,
  timeoutInSeconds: number,
  retryTtl = 500,
) {
  const startTime = Date.now();
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      try {
        const checkValue = source();
        if (checkValue === expect) {
          clearInterval(timer);
          resolve(true);
          return;
        }
      } catch (e) {
        console.error(e);
      }
      if (isTimeOut(startTime, timeoutInSeconds)) {
        clearInterval(timer);
        resolve(false);
        console.error(`Timeout wait for ${checkItem}  to be ${expect}`);
      }
    }, retryTtl);
  });
}
