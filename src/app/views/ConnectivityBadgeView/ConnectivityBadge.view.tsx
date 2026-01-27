import { Locale } from '@ringcentral-integration/micro-core/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  injectable,
  optional,
  RcViewModule,
  useConnector,
} from '@ringcentral-integration/next-core';
import type { ConnectivityBadgeProps } from '@ringcentral-integration/widgets/components/ConnectivityBadge';
import ConnectivityBadgePanel from '@ringcentral-integration/widgets/components/ConnectivityBadge';
import React, { useRef } from 'react';

import { ConnectivityManager } from '../../services';

import type {
  ConnectivityBadgeViewOptions,
  ConnectivityBadgeViewProps,
} from './ConnectivityBadge.view.interface';

/**
 * View module for displaying connectivity status as a badge
 * Shows different icons and colors based on connectivity state
 *
 * @class
 */
@injectable({
  name: 'ConnectivityBadgeView',
})
export class ConnectivityBadgeView extends RcViewModule {
  constructor(
    protected _locale: Locale,
    protected _connectivityManager: ConnectivityManager,
    @optional('ConnectivityBadgeViewOptions')
    protected _connectivityBadgeViewOptions?: ConnectivityBadgeViewOptions,
  ) {
    super();
  }

  getUIProps(): UIProps<ConnectivityBadgeProps> {
    const mode =
      (this._connectivityManager.ready && this._connectivityManager.mode) ||
      null;
    return {
      currentLocale: this._locale.currentLocale,
      // @ts-ignore in old version we need to use connectivityTypes-xxx for pass into the old version ConnectivityBadge
      mode: mode ? `connectivityTypes-${mode}` : null,
      webphoneConnecting:
        this._connectivityManager.ready &&
        this._connectivityManager.webphoneConnecting,
      hasLimitedStatusError:
        this._connectivityManager.ready &&
        this._connectivityManager.hasLimitedStatusError,
    };
  }

  getUIFunctions(): UIFunctions<ConnectivityBadgeProps> {
    return {
      onClick: () => {
        if (this._connectivityManager.isWebphoneUnavailableMode) {
          this._connectivityManager.checkWebphoneAndConnect();
        } else if (this._connectivityManager.hasLimitedStatusError) {
          this._connectivityManager.checkStatus();
        } else {
          this._connectivityManager.showConnectivityToast();
        }
      },
      showBadgeAlert: () => {
        this._connectivityManager.showConnectivityToast();
      },
    };
  }

  /**
   * Renders the connectivity badge component with appropriate status indicators
   *
   * @param {object} props - Props for the component
   * @returns {React.ReactNode} Rendered component
   */
  component(props: ConnectivityBadgeViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions());

    const _props = useConnector(() => {
      const uiProps = this.getUIProps();

      return {
        ...props,
        ...uiProps,
      };
    });
    const Component =
      this._connectivityBadgeViewOptions?.component || ConnectivityBadgePanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
