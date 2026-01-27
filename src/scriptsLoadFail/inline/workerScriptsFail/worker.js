(() => {
  const channel = new BroadcastChannel('worker_channel');
  const errorHandler = (e) => {
    const msg = e.message || (e.reason && e.reason.message) || '';
    if (msg.includes('importScripts')) {
      channel.postMessage({
        type: 'scriptLoadFail',
        pathname: location.pathname,
        message: msg,
      });

      // close the worker directly, make sure if user open new tab can load new worker
      self.close();
    }
  };

  self.addEventListener('unhandledrejection', errorHandler);
  self.addEventListener('error', errorHandler);
})();
