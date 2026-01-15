type RedirectControllerParams = {
  prefix?: string;
  appOrigin?: string;
};

export default class RedirectController {
  constructor({ prefix, appOrigin }: RedirectControllerParams = {}) {
    window.addEventListener('load', () => {
      const callbackUri = location.href;
      // RCINT-3477 some devices will have reference to opener, but will throw exception
      // when try to access opener
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

      const searchParams = new URLSearchParams(callbackUri);
      const state = searchParams.get('state');

      if (!state) {
        return;
      }
      const uuid = state.split('-').slice(1).join('-');
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
