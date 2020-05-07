export function bindDebounce(instance, time = 500) {
  return (cb: Function, time2?: number) => {
    clearTimeout(instance.changeTimeout);

    const toTime = typeof time2 === 'number' ? time2 : time;

    if (toTime === 0) {
      cb();
    } else {
      instance.changeTimeout = setTimeout(() => {
        cb();
      }, toTime);
    }
  };
}
