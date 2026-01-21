// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='./bridge.d.ts'/>
import type { CarouselModalMessage } from './constants';
import { TUTORIAL_ACTION_KEY } from './constants';

type Action = {
  type: string;
  value: unknown;
};

/**
 * post message to parent window
 */
const post = (...args: unknown[]): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const last: any = args[args.length - 1];
  if (last instanceof Event || last.preventDefault) {
    last.preventDefault();
    // remove from args
    args.pop();
  }

  const emitValue: CarouselModalMessage = {
    type: TUTORIAL_ACTION_KEY,
    data: args,
  };

  window.parent.postMessage(JSON.stringify(emitValue), '*');
};

window.RC_AEM = { ...window.RC_AEM, post };

if (!window.RC_AEM.disabledGlobalActionListener) {
  const listenGlobalActionEvent = () => {
    function postData(
      actionType: 'desktop' | 'mobile',
      source: string,
      e: Event,
    ) {
      if ((e as KeyboardEvent).key) {
        const beSpace =
          (e as KeyboardEvent).key === ' ' ||
          (e as KeyboardEvent).code === 'Space';
        const beEnter = (e as KeyboardEvent).key === 'Enter';

        // not be space or enter, return
        if (!(beEnter || beSpace)) {
          return;
        }

        const beButton = (e.target as HTMLElement)?.tagName === 'BUTTON';
        // not be button but key code is space, also not trigger
        if (!beButton && beSpace) {
          return;
        }
      }

      try {
        const { type, value }: Action = JSON.parse(source);

        window.RC_AEM.post(actionType, type, value, e);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          `[RC_AEM] data format error, should be string value with JSON object like

        <button data-desktop-action='{"type": "event", "value": "value"}'>click</button>

        or

        <button data-mobile-action='{"type": "event", "value": "value"}'>click</button>
        `,
        );

        throw error;
      }
    }

    const handleListener = (e: Event): void => {
      const element = e.target as HTMLElement;

      const desktop = element.getAttribute('data-desktop-action');
      const mobile = element.getAttribute('data-mobile-action');

      if (desktop) {
        postData('desktop', desktop, e);
      }

      if (mobile) {
        postData('mobile', mobile, e);
      }
    };

    document.addEventListener('click', handleListener);
    document.addEventListener('keydown', handleListener);
  };

  listenGlobalActionEvent();
}
