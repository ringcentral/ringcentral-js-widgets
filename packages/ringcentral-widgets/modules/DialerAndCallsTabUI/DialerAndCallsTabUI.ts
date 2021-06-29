import {
  computed,
  RcUIModuleV2,
  UIProps,
  UIFunctions,
} from '@ringcentral-integration/core';
import { Module } from '@ringcentral-integration/commons/lib/di';
import { TabContentViewProps } from '../../components/TabContentView/TabContentView';
import { hasActiveCalls } from '../../lib/hasActiveCalls';
import {
  Deps,
  DialerAndCallsTabContainerProps,
} from './DialerAndCallsTabUI.interface';
import i18n from './i18n';

@Module({
  name: 'DialerAndCallsTabUI',
  deps: [
    'Locale',
    'RouterInteraction',
    'CallingSettings',
    { dep: 'Webphone', optional: true },
    { dep: 'CallMonitor', optional: true },
    { dep: 'DialerAndCallsTabUIOptions', optional: true },
  ],
})
export class DialerAndCallsTabUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  @computed((that: DialerAndCallsTabUI) => [
    that._deps.locale.currentLocale,
    that._deps.routerInteraction.currentPath,
  ])
  get tabs() {
    return [
      {
        path: '/dialer',
        label: i18n.getString('dialer', this._deps.locale.currentLocale),
        dataSign: 'dialer',
        isActive: () => {
          return this._deps.routerInteraction.currentPath === '/dialer';
        },
      },
      {
        path: '/calls',
        label: i18n.getString('allCalls', this._deps.locale.currentLocale),
        dataSign: 'allCalls',
        isActive: () => {
          return this._deps.routerInteraction.currentPath === '/calls';
        },
      },
    ];
  }

  getUIProps(
    props: DialerAndCallsTabContainerProps,
  ): UIProps<TabContentViewProps> {
    return {
      showTabs: props.hasActiveCalls
        ? props.hasActiveCalls({
            callingSettings: this._deps.callingSettings,
            webphone: this._deps.webphone,
            callMonitor: this._deps.callMonitor,
          })
        : hasActiveCalls({
            callingSettings: this._deps.callingSettings,
            webphone: this._deps.webphone,
            callMonitor: this._deps.callMonitor,
          }),
      showSpinner: !this._deps.locale.ready,
      tabs: this.tabs,
    };
  }

  getUIFunctions(
    props: DialerAndCallsTabContainerProps,
  ): UIFunctions<TabContentViewProps> {
    return {
      goTo: (path) => {
        this._deps.routerInteraction.push(path);
      },
    };
  }
}
