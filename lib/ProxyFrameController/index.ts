import url from 'url';

import popWindow from '../popWindow';

type ProxyFrameControllerParams = {
  prefix?: string;
};

export default class ProxyFrameController {
  constructor({ prefix }: ProxyFrameControllerParams = {}) {
    const {
      query: { uuid = '' },
    } = url.parse(window.location.href, true);

    // TODO: should find where to call that
    window.oAuthCallback = (callbackUri: string) => {
      window.parent.postMessage(
        {
          callbackUri,
        },
        '*',
      );
    };

    window.addEventListener('message', ({ data }) => {
      if (data) {
        const { oAuthUri } = data;

        if (oAuthUri != null) {
          const { query, ...parsedUri } = url.parse(oAuthUri, true);
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

    const key = `${prefix}-${uuid}-callbackUri`;
    window.addEventListener('storage', (e) => {
      if (e.key === key && e.newValue && e.newValue !== '') {
        const callbackUri = e.newValue;
        window.parent.postMessage(
          {
            callbackUri,
          },
          '*',
        );
        localStorage.removeItem(key);
      }
    });

    // loaded
    window.parent.postMessage(
      {
        proxyLoaded: true,
      },
      '*',
    );
  }
}
