import url from 'url';

export default class RedirectController {
  constructor({ prefix, appOrigin } = {}) {
    window.addEventListener('load', () => {
      const callbackUri = window.location.href;
      // RCINT-3477 some devices will have reference to opener, but will throw exception
      // when tring to access opener
      try {
        if (window.opener && window.opener.oAuthCallback) {
          window.opener.oAuthCallback(callbackUri);
          window.close();
          return;
        }
      } catch (e) {
        /* ignore error */
      }

      // Use this when redirect page is different domain with app
      // appOrigin: app's origin
      try {
        if (appOrigin && window.opener && window.opener.postMessage) {
          window.opener.postMessage({ callbackUri }, appOrigin);
          window.close();
          return;
        }
      } catch (error) {
        /* ignore error */
      }

      // fall back to use localStorage as a vessel to avoid opener is null bug

      const {
        query: { state },
      } = url.parse(callbackUri, true);
      const uuid = state
        .split('-')
        .slice(1)
        .join('-');
      const key = `${prefix}-${uuid}-callbackUri`;
      localStorage.removeItem(key);
      window.addEventListener('storage', (e) => {
        if (e.key === key && (!e.newValue || e.newValue === '')) {
          window.close();
        }
      });
      localStorage.setItem(key, callbackUri);
    });
  }
}
