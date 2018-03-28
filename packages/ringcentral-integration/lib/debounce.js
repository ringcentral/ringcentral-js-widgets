/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @param {Function} func - target function
 * @param {Number} threshold - execution threshold
 * @param {Boolean} immediate - trigger on leading edge
 * @return {Function}
 */
export default function debounce(func, threshold = 500, immediate = false) {
  if (typeof func !== 'function') {
    throw new Error('First argument of debounce function should be a function');
  }
  let timer = null;
  return function debounced(...args) {
    const context = this;
    const callNow = immediate && !timer;
    const later = () => {
      timer = null;
      if (!callNow) func.apply(context, args);
    };
    clearTimeout(timer);
    timer = setTimeout(later, threshold);
    if (callNow) func.apply(context, args);
  };
}
