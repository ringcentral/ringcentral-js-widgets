// https://stackoverflow.com/questions/8635502/how-do-i-clear-all-intervals

function createTimerHandler() {
  let startIndex = 1;

  const timerTarget = typeof window === 'undefined' ? null : window;

  return {
    start: () => {
      if (!timerTarget) {
        return;
      }

      const id = timerTarget.setTimeout(function () {}, 0);
      startIndex = id;
    },
    clear: () => {
      if (!timerTarget) {
        return;
      }

      const currLastId = timerTarget.setTimeout(function () {}, 0);

      // Clear any timeout/interval up to that id
      for (let i = startIndex; i <= currLastId; i++) {
        timerTarget.clearTimeout(i);
        timerTarget.clearInterval(i);
      }
    },
  };
}

exports.createTimerHandler = createTimerHandler;
