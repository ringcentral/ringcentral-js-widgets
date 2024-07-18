// https://stackoverflow.com/questions/8635502/how-do-i-clear-all-intervals

function createTimerHandler() {
  let startIndex = 1;

  return {
    start: () => {
      const id = window.setTimeout(function () {}, 0);
      startIndex = id;
    },
    clear: () => {
      const currLastId = window.setTimeout(function () {}, 0);

      // Clear any timeout/interval up to that id
      for (let i = startIndex; i <= currLastId; i++) {
        window.clearTimeout(i);
        window.clearInterval(i);
      }
    },
  };
}

exports.createTimerHandler = createTimerHandler;
