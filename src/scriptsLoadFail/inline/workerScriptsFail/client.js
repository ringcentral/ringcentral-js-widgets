(() => {
  if (!globalThis.BroadcastChannel) {
    console.warn(
      'BroadcastChannel not exist, skip worker load script fail detect',
    );
    return;
  }
  if (!window.workerScriptsFail || !window.workerScriptsFail.renderLoadFail) {
    // eslint-disable-next-line no-console
    console.error(
      'window.workerScriptsFail.renderLoadFail is not defined, must work with inlineScriptsLoadFailDetect',
    );
    return;
  }
  const channel = new BroadcastChannel('worker_channel');
  const includeErrorPath = '<%= workerUrl %>';

  channel.addEventListener('message', (event) => {
    try {
      const data = event.data;
      if (
        !includeErrorPath ||
        new RegExp(includeErrorPath).test(data.pathname)
      ) {
        if (data.type === 'scriptLoadFail') {
          // eslint-disable-next-line no-console
          console.error('worker load script fail', data);
          window.workerScriptsFail.renderLoadFail();
          return;
        }

        if (data.type === 'reload') {
          location.reload();
        }
      }
    } catch (error) {
      //
    }
  });

  // inject worker load fail method into window, that will be use when user click reload button
  window.workerScriptsFail.workerLoadFail = () => {
    channel.postMessage({
      type: 'reload',
      pathname: includeErrorPath,
    });
  };
})();
