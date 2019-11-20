export function bindDebonce(instance, time = 500) {
  return (cb, time2) => {
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
