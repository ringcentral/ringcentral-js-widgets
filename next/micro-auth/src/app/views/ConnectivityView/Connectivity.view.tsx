import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  injectable,
  optional,
  RcViewModule,
  useConnector,
} from '@ringcentral-integration/next-core';
import { useObservableState } from 'observable-hooks';
import React, { useRef } from 'react';

import { ConnectivityManager } from '../../services';

import type {
  ConnectivityViewOptions,
  ConnectivityViewProps,
} from './Connectivity.view.interface';
import { ConnectivityPanel } from './ConnectivityPanel';

@injectable({
  name: 'ConnectivityView',
})
export class ConnectivityView extends RcViewModule {
  constructor(
    protected _connectivityManager: ConnectivityManager,
    @optional('ConnectivityViewOptions')
    protected _connectivityViewOptions?: ConnectivityViewOptions,
  ) {
    super();
  }

  getUIProps(): UIProps<ConnectivityViewProps> {
    const { mode, webphoneConnecting, hasLimitedStatusError } =
      this._connectivityManager;

    const loading = mode === 'webphoneUnavailable' && webphoneConnecting;
    const retry = mode === 'webphoneUnavailable' || hasLimitedStatusError;

    return {
      mode,
      loading,
      retry,
    };
  }

  getUIFunctions(): UIFunctions<ConnectivityViewProps> {
    return {
      onClick: () => {
        if (this._connectivityManager.isWebphoneUnavailableMode) {
          this._connectivityManager.checkWebphoneAndConnect();
          return;
        }
        if (this._connectivityManager.hasLimitedStatusError) {
          this._connectivityManager.checkStatus();
          return;
        }

        // in spring-ui, we don't show the toast
        if (process.env.THEME_SYSTEM === 'spring-ui') return;

        this._connectivityManager.showConnectivityToast();
      },
    };
  }

  component(props: Pick<ConnectivityViewProps, 'className'>) {
    const { current: uiFunctions } = useRef(this.getUIFunctions());

    const _props = useConnector(() => {
      const uiProps = this.getUIProps();

      return {
        ...props,
        ...uiProps,
      };
    });

    const ready = useObservableState(
      this._connectivityManager.readyState$,
      false,
    );

    if (!ready) return null;

    const Component =
      this._connectivityViewOptions?.component || ConnectivityPanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
