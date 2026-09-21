import { logger } from '@ringcentral-integration/next-core';

import { registerGuideDataListener } from './utils';

const REQUEST_GUIDE_DATA = 'rc-guide-data';
const GUIDE_IFRAME_ID = 'userpilotIframeContainer';

function createGuideIframe() {
  const iframe = document.createElement('iframe');
  iframe.id = GUIDE_IFRAME_ID;
  document.body.appendChild(iframe);

  return iframe;
}

function dispatchGuideMessage({
  source,
  payload = { eventName: 'settings-rating-show' },
  pointerEvent = false,
}: {
  source?: MessageEventSource | null;
  payload?: unknown;
  pointerEvent?: boolean;
}) {
  window.dispatchEvent(
    new MessageEvent('message', {
      data: {
        type: REQUEST_GUIDE_DATA,
        payload,
        pointerEvent,
      },
      origin: 'https://userpilot.test',
      source,
    }),
  );
}

describe('registerGuideDataListener', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.spyOn(logger, 'log').mockImplementation();
    jest.spyOn(logger, 'warn').mockImplementation();
    jest.spyOn(logger, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('emits guide data events from the guide iframe and logs response metadata', () => {
    const iframe = createGuideIframe();
    const postMessageSpy = jest.spyOn(iframe.contentWindow!, 'postMessage');
    const next = jest.fn();
    const subscription = registerGuideDataListener().subscribe(next);

    dispatchGuideMessage({ source: iframe.contentWindow });

    expect(next).toHaveBeenCalledWith({
      send: expect.any(Function),
      payload: { eventName: 'settings-rating-show' },
    });
    expect(logger.log).toHaveBeenCalledWith(
      '[UserpilotService] Guide data request received',
      {
        origin: 'https://userpilot.test',
        payload: { eventName: 'settings-rating-show' },
        pointerEvent: false,
      },
    );

    const { send } = next.mock.calls[0][0];
    send({
      action: 'submit',
      feedback: 'private feedback',
      selectedTags: ['Poor call quality'],
    });

    expect(postMessageSpy).toHaveBeenCalledWith(
      {
        type: REQUEST_GUIDE_DATA,
        response: true,
        payload: {
          action: 'submit',
          feedback: 'private feedback',
          selectedTags: ['Poor call quality'],
        },
      },
      'https://userpilot.test',
    );
    expect(logger.log).toHaveBeenCalledWith(
      '[UserpilotService] Guide data response sent',
      {
        targetOrigin: 'https://userpilot.test',
        responseKeys: ['action', 'feedback', 'selectedTags'],
      },
    );
    expect(logger.log).not.toHaveBeenCalledWith(
      '[UserpilotService] Guide data response sent',
      expect.objectContaining({
        feedback: 'private feedback',
      }),
    );

    subscription.unsubscribe();
  });

  it('logs and ignores guide data requests without a message source', () => {
    const next = jest.fn();
    const subscription = registerGuideDataListener().subscribe(next);

    dispatchGuideMessage({ source: null });

    expect(next).not.toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalledWith(
      '[UserpilotService] Ignore guide data request: no source',
      {
        origin: 'https://userpilot.test',
      },
    );

    subscription.unsubscribe();
  });

  it('logs and ignores messages that are not from the guide iframe', () => {
    createGuideIframe();
    const next = jest.fn();
    const subscription = registerGuideDataListener().subscribe(next);

    dispatchGuideMessage({ source: window });

    expect(next).not.toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalledWith(
      '[UserpilotService] Ignore guide data request: source is not guide iframe',
      {
        origin: 'https://userpilot.test',
        hasContainer: true,
        hasIframe: true,
      },
    );

    subscription.unsubscribe();
  });

  it('emits a null sender and logs when the source window is closed', () => {
    const iframe = createGuideIframe();
    const next = jest.fn();
    const subscription = registerGuideDataListener().subscribe(next);

    dispatchGuideMessage({ source: iframe.contentWindow });

    Object.defineProperty(iframe.contentWindow!, 'closed', {
      configurable: true,
      value: true,
    });

    const { send } = next.mock.calls[0][0];
    send({ action: 'dismiss' });

    expect(next).toHaveBeenCalledWith({ send: null });
    expect(logger.warn).toHaveBeenCalledWith(
      '[UserpilotService] Guide data response skipped: source window is closed',
      {
        targetOrigin: 'https://userpilot.test',
      },
    );

    subscription.unsubscribe();
  });

  it('logs errors thrown while handling a guide data request', () => {
    const iframe = createGuideIframe();
    const error = new Error('style injection failed');
    jest.spyOn(document, 'createElement').mockImplementationOnce(() => {
      throw error;
    });
    const subscription = registerGuideDataListener().subscribe(jest.fn());

    dispatchGuideMessage({ source: iframe.contentWindow });

    expect(logger.error).toHaveBeenCalledWith(
      '[UserpilotService] registerGuideDataListener failed to handle message',
      {
        origin: 'https://userpilot.test',
        type: REQUEST_GUIDE_DATA,
      },
      error,
    );

    subscription.unsubscribe();
  });
});
