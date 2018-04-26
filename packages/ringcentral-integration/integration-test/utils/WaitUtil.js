function isTimeOut(startTime, timeoutInSeconds) {
  return Date.now() - startTime > timeoutInSeconds * 1000;
}

export function waitUntilNotNull(source, checkItem, timeoutInSeconds) {
  const startTime = Date.now();
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      if (isTimeOut(startTime, timeoutInSeconds)) {
        clearInterval(timer);
        resolve(false);
        console.error(`Timeout wait for ${checkItem}  to be not null`);
      }
      try {
        const checkValue = source();
        if (checkValue !== null && checkValue !== undefined) {
          clearInterval(timer);
          resolve(true);
        }
      } catch (e) {
        console.error(e);
      }
    }, 500);
  });
}

export function waitUntilEqual(source, checkItem, expect, timeoutInSeconds) {
  const startTime = Date.now();
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      if (isTimeOut(startTime, timeoutInSeconds)) {
        clearInterval(timer);
        resolve(false);
        console.error(`Timeout wait for ${checkItem}  to be ${expect}`);
      }
      try {
        const checkValue = source();
        if (checkValue === expect) {
          clearInterval(timer);
          resolve(true);
        }
      } catch (e) {
        console.error(e);
      }
    }, 500);
  });
}

export function waitUntilObjectSizeGreaterThan(source, checkItem, compareSize, timeoutInSeconds) {
  const startTime = Date.now();
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      if (isTimeOut(startTime, timeoutInSeconds)) {
        clearInterval(timer);
        resolve(false);
        console.log(`Timeout wait for ${checkItem} to be not null`);
      }
      try {
        const checkValue = source();
        if (checkValue !== null && checkValue.length > compareSize) {
          clearInterval(timer);
          resolve(true);
        }
      } catch (e) {
        console.log(e);
      }
    }, 500);
  });
}

export function waitInSeconds(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, seconds * 1000);
  });
}

