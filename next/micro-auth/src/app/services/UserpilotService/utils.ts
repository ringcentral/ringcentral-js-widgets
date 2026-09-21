import { logger } from '@ringcentral-integration/next-core';
import { Observable } from 'rxjs';

const REQUEST_GUIDE_DATA = 'rc-guide-data';

const GUIDE_IFRAME_ID = 'userpilotIframeContainer';

export type GuideDataResponsePayload = Record<string, string | string[]>;

export type GuideDataPayload = string | Record<string, unknown>;

export type SendGuideData = (payload: GuideDataResponsePayload) => void;

export interface GuideDataEvent {
  send: SendGuideData | null;
  payload?: GuideDataPayload;
}

export const registerGuideDataListener = () => {
  return new Observable<GuideDataEvent>((subscriber) => {
    const listener = (event: MessageEvent) => {
      try {
        if (event.data?.type !== REQUEST_GUIDE_DATA) return;

        if (!event.source) {
          logger.warn(
            '[UserpilotService] Ignore guide data request: no source',
            {
              origin: event.origin,
            },
          );
          return;
        }

        logger.log('[UserpilotService] Guide data request received', {
          origin: event.origin,
          payload: event.data?.payload,
          pointerEvent: event.data?.pointerEvent,
        });

        const eventPayload = event.data?.payload;
        const container = document.getElementById(GUIDE_IFRAME_ID);
        const iframe =
          container?.tagName === 'IFRAME'
            ? (container as HTMLIFrameElement)
            : container?.querySelector<HTMLIFrameElement>('iframe');
        const isFromGuideIframe =
          iframe && iframe.contentWindow === event.source;

        if (!isFromGuideIframe) {
          logger.warn(
            '[UserpilotService] Ignore guide data request: source is not guide iframe',
            {
              origin: event.origin,
              hasContainer: !!container,
              hasIframe: !!iframe,
            },
          );
          return;
        }

        // Keep the blank guide iframe transparent and prevent it from blocking app interactions.
        const style = document.createElement('style');
        style.textContent = `#${GUIDE_IFRAME_ID} {
background: transparent !important;
background-color: transparent !important;
border: none !important;
box-shadow: none !important;
outline: none !important;
height: 100% !important;
width: 100% !important;
${event.data?.pointerEvent === false ? 'pointer-events: none !important;' : ''}
}`;
        iframe.appendChild(style);

        const targetOrigin =
          typeof event.origin === 'string' ? event.origin : '*';

        const source = event.source;

        const send = (responsePayload: GuideDataResponsePayload) => {
          if (source.closed) {
            logger.warn(
              '[UserpilotService] Guide data response skipped: source window is closed',
              {
                targetOrigin,
              },
            );
            subscriber.next({ send: null });

            return;
          }

          logger.log('[UserpilotService] Guide data response sent', {
            targetOrigin,
            responseKeys: Object.keys(responsePayload),
          });
          source.postMessage(
            {
              type: REQUEST_GUIDE_DATA,
              response: true,
              payload: responsePayload,
            },
            targetOrigin,
          );
        };
        subscriber.next({ send, payload: eventPayload });
      } catch (error) {
        logger.error(
          '[UserpilotService] registerGuideDataListener failed to handle message',
          {
            origin: event.origin,
            type: event.data?.type,
          },
          error,
        );
      }
    };

    window.addEventListener('message', listener);

    return () => {
      window.removeEventListener('message', listener);
    };
  });
};
