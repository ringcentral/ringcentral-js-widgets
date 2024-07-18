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
}
