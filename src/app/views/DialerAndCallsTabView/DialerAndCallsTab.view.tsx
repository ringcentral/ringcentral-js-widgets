import { Locale } from '@ringcentral-integration/micro-core/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  computed,
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  useConnector,
} from '@ringcentral-integration/next-core';
import { TabContentView as DialerAndCallsTabPanel } from '@ringcentral-integration/widgets/components/TabContentView';
import type { TabContentViewProps } from '@ringcentral-integration/widgets/components/TabContentView/TabContentView';
import { hasActiveCalls } from '@ringcentral-integration/widgets/lib/hasActiveCalls';
import React, { useRef } from 'react';

import { CallingSettings, CallMonitor, Webphone } from '../../services';

import type {
  DialerAndCallsTabViewOptions,
  DialerAndCallsTabViewProps,
} from './DialerAndCallsTab.view.interface';
import { t } from './i18n';

@injectable({
  name: 'DialerAndCallsTabView',
})
export class DialerAndCallsTabView extends RcViewModule {
  constructor(
    protected _locale: Locale,
    protected _router: RouterPlugin,
    protected _callingSettings: CallingSettings,
    @optional() protected _webphone?: Webphone,
    @optional() protected _callMonitor?: CallMonitor,
    @optional('DialerAndCallsTabViewOptions')
    protected _dialerAndCallsTabViewOptions?: DialerAndCallsTabViewOptions,
  ) {
    super();
  }

  @computed((that: DialerAndCallsTabView) => [
    that._locale.currentLocale,
    that._router.currentPath,
  ])
  get tabs() {
    return [
      {
        path: '/dialer',
        label: t('dialer'),
        dataSign: 'dialer',
        isActive: () => {
          return this._router.currentPath === '/dialer';
        },
      },
      {
        path: '/calls',
        label: t('allCalls'),
        dataSign: 'allCalls',
        isActive: () => {
          return this._router.currentPath === '/calls';
        },
      },
    ];
  }

  getUIProps(props: DialerAndCallsTabViewProps): UIProps<TabContentViewProps> {
    return {
      showTabs: props.hasActiveCalls
        ? props.hasActiveCalls({
            callingSettings: this._callingSettings,
            webphone: this._webphone,
            callMonitor: this._callMonitor,
          })
        : hasActiveCalls({
            callingSettings: this._callingSettings,
            webphone: this._webphone,
            callMonitor: this._callMonitor,
          } as any), // TODO: fix type
      showSpinner: !this._locale.ready,
      tabs: this.tabs,
    };
  }

  getUIFunctions(
    props: DialerAndCallsTabViewProps,
  ): UIFunctions<TabContentViewProps> {
    return {
      goTo: (path) => {
        this._router.push(path);
      },
    };
  }

  component(props: DialerAndCallsTabViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });
    const Component =
      this._dialerAndCallsTabViewOptions?.component || DialerAndCallsTabPanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
