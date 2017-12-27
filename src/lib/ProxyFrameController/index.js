import url from 'url';
import popWindow from '../popWindow';

export default class ProxyFrameController {
  constructor({
    prefix,
  } = {}) {
    const {
      query: {
        uuid = '',
      },
    } = url.parse(window.location.href, true);

    window.oAuthCallback = (callbackUri) => {
      window.parent.postMessage({
        callbackUri,
      }, '*');
    };

    window.addEventListener('message', ({ data }) => {
      if (data) {
        const {
          oAuthUri,
        } = data;

        if (oAuthUri != null) {
          const {
            query,
            search,
            ...parsedUri,
          } = url.parse(oAuthUri, true);
          const uri = url.format({
            ...parsedUri,
            query: {
              ...query,
              state: `${query.state}-${uuid}`,
            },
            search: undefined,
          });
          popWindow(uri, `${prefix}-oauth`, 600, 600);
        }
      }
    });

    const key = `${prefix}-${uuid}-redirect-callbackUri`;
    window.addEventListener('storage', (e) => {
      if (e.key === key && e.newValue && e.newValue !== '') {
        const callbackUri = e.newValue;
        window.parent.postMessage({
          callbackUri,
        }, '*');
        localStorage.removeItem(key);
      }
    });
    // loaded
    window.parent.postMessage({
      proxyLoaded: true,
    }, '*');
  }
}
