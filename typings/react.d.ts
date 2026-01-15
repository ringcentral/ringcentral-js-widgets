/* eslint-disable no-var */
import 'react';

declare global {
  namespace JSX {
    interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> {
      // TODO: fix in future when juno migrate to styled-component v5
      /** fix mui styled-component type issue in v4 ref */
      ref?: any;
    }
  }

  var externalClearTimeout: typeof clearTimeout;
  var externalSetTimeout: typeof setTimeout;

  // TODO: the definition of `ViewTransition` still not be implemented in the `lib.dom.d.ts` in TypeScript, wait for the official implementation
  interface Document {
    startViewTransition(callbackOptions?: () => void): ViewTransition;
  }
}

/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ViewTransition) */
interface ViewTransition {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ViewTransition/finished) */
  readonly finished: Promise<undefined>;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ViewTransition/ready) */
  readonly ready: Promise<undefined>;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ViewTransition/updateCallbackDone) */
  readonly updateCallbackDone: Promise<undefined>;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ViewTransition/skipTransition) */
  skipTransition(): void;
}
