import { popWindow } from '../popWindow';
import simpleHash from '../simpleHash';

let loginWindow: any = null;

const urlSearchParams = new URLSearchParams(location.search);
const prefix = urlSearchParams.get('prefix') || 'rc';
const hash = urlSearchParams.get('hash') || simpleHash();

/**
 * @function
 * @global
 * @description oAuthCallback allows redirect to call via window.opener.oAuthCallback if window.opener is not blocked.
 * @param {String} callbackUri
 */
window.oAuthCallback = (callbackUri: string) => {
  window.parent.postMessage(
    {
      callbackUri,
    },
    '*',
  );
};

window.addEventListener('message', ({ data = {} }) => {
  const { oAuthUri } = data;
  if (oAuthUri && oAuthUri.trim() !== '') {
    const parsedUri = new URL(oAuthUri);
    const searchParams = new URLSearchParams(parsedUri.search);
    searchParams.set('state', `${searchParams.get('state')}-${prefix}-${hash}`);
    parsedUri.search = searchParams.toString();
    loginWindow = popWindow(parsedUri.toString(), `${prefix}-oauth`, 700, 700);
  }
});

const key = `${prefix}-${hash}-callbackUri`;
window.addEventListener('storage', (e) => {
  if (e.key === key && e.newValue && e.newValue !== '') {
    const callbackUri = e.newValue;
    localStorage.removeItem(key);
    window.parent.postMessage(
      {
        callbackUri,
      },
      '*',
    );
  }
});

try {
  window.parent.postMessage(
    {
      proxyLoaded: true,
    },
    '*',
  );
} catch (error) {
  /* ignore error */
}

window.addEventListener('beforeunload', () => {
  if (loginWindow) {
    try {
      loginWindow.close();
    } catch (error) {
      /* ignore error */
    }
  }
});
