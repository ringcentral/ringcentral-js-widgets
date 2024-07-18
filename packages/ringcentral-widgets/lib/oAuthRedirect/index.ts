(() => {
  const callbackUri = window.location.href;
  try {
    if (window.opener && window.opener.oAuthCallback) {
      window.opener.oAuthCallback(callbackUri);
      window.close();
      return;
    }
  } catch (error) {
    /* ignore error */
  }

  // Use this when redirect page is different domain with app
  // Update window.origin to app's origin
  // try {
  //   if (window.opener && window.opener.postMessage) {
  //     window.opener.postMessage({ callbackUri }, window.origin);
  //     window.close();
  //     return;
  //   }
  // } catch (error) {
  //   /* ignore error */
  // }

  const urlSearchParams = new URLSearchParams(callbackUri);
  const state = urlSearchParams.get('state') || '';
  const hash = state.split('-').slice(1).join('-');
  if (hash && hash !== '') {
    const key = `${hash}-callbackUri`;
    window.addEventListener('storage', (e) => {
      if (e.key === key && (!e.newValue || e.newValue === '')) {
        window.close();
      }
    });
    localStorage.setItem(key, callbackUri);
    setTimeout(() => {
      localStorage.removeItem(key);
    }, 3000);
  }
})();
