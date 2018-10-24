const defaultOptions = {
  times: 3,
  interval: 1000
};
/**
 * @param {*} cb callback function
 * @param {*} params parameters which should passed when calling exec cb function
 */
export async function autoAsyncRetry(cb, params, options = defaultOptions) {
  let cnt = 1;
  let result = -1;
  let promise = null;
  let error = null;
  return new Promise((resolve, reject) => {
    const timerId = setInterval(async () => {
      // Make sure the last await was solved
      if (promise !== null) return;
      // Exceed the max retry
      if (cnt > options.times) {
        clearInterval(timerId);
        if (error) {
          reject(error);
        }
        reject(new Error('Timeout'));
      }
      try {
        promise = cb(params);
        result = await promise;
        promise = null;
      } catch (e) {
        error = e;
        promise = null;
      }
      // debug
      console.log(result);
      if (result === true ||
      Array.isArray(result) && result.length !== 0) {
        clearInterval(timerId);
        resolve(result);
      }
      cnt += 1;
    }, options.interval);
    // throw error;
  });
}
