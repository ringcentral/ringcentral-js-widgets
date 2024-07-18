import { popWindow } from '../popWindow';

type ProxyFrameControllerParams = {
  prefix?: string;
};

export default class ProxyFrameController {
  constructor({ prefix }: ProxyFrameControllerParams = {}) {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get('uuid') || '';

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
          const toURL = new URL(oAuthUri);

          toURL.searchParams.set(
            'state',
            `${toURL.searchParams.get('state')}-${uuid}`,
          );

          popWindow(toURL.href, `${prefix}-oauth`, 700, 700);
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
