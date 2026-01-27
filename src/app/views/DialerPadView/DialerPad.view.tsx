import { AppFeatures } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  SyncTabId,
  SyncTabProps,
  SyncTabView,
} from '@ringcentral-integration/micro-core/src/app/views';
import { MessageStore } from '@ringcentral-integration/micro-message/src/app/services';
import { ConversationsViewSpring } from '@ringcentral-integration/micro-message/src/app/views/ConversationsViewSpring';
import {
  computed,
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  type UIFunctions,
  type UIProps,
  useConnector,
  useIsMainClient,
} from '@ringcentral-integration/next-core';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import { CallHistory } from '../../services';
import { CallsListViewSpring } from '../CallsListViewSpring';
import { DialerView } from '../DialerView';

import type {
  DialerPadViewOptions,
  DialerPadViewPanelProps,
  DialerPadViewProps,
} from './DialerPad.view.interface';
import { t } from './i18n';

@injectable({
  name: 'DialerPadView',
})
export class DialerPadView extends RcViewModule {
  @computed
  get tabs() {
    const tabs: SyncTabProps['tabs'] = [];

    if (this._appFeatures.isCallingEnabled) {
      tabs.push({
        id: 'keypad',
        label: t('keypad'),
        component: <this._dialerView.component />,
      });
    }

    if (
      this._appFeatures.isCallingEnabled ||
      this._appFeatures.hasReadExtensionCallLog
    ) {
      tabs.push({
        id: 'calls',
        label: t('calls'),
        BadgeProps: {
          max: 99,
          count: this._callHistory.missedCallsUnreadCounts,
        },
        component: <this._callsListView.component />,
      });
    }

    if (this._appFeatures.hasVoicemailPermission) {
      tabs.push({
        id: 'voicemail',
        label: t('voicemails'),
        BadgeProps: {
          count: this._messageStore.voiceUnreadCounts,
          max: 99,
        },
        component: <this._conversationsView.component typeFilter="VoiceMail" />,
      });
    }
    return tabs;
  }

  constructor(
    protected _router: RouterPlugin,
    protected _appFeatures: AppFeatures,
    protected _messageStore: MessageStore,
    protected _callHistory: CallHistory,
    protected _syncTabView: SyncTabView,
    protected _callsListView: CallsListViewSpring,
    protected _dialerView: DialerView,
    protected _conversationsView: ConversationsViewSpring,
    @optional('DialerPadViewOptions')
    protected _dialerPadViewOptions?: DialerPadViewOptions,
  ) {
    super();
  }

  getUIProps(_props: DialerPadViewProps): UIProps<DialerPadViewPanelProps> {
    return {
      tabs: this.tabs,
    };
  }

  getUIFunctions(
    _props: DialerPadViewProps,
  ): UIFunctions<DialerPadViewPanelProps> {
    return {};
  }

  component(props: DialerPadViewOptions) {
    const isMainClient = useIsMainClient();
    const [routeTabId, setRouteTabId] = useState<string | null>(null);

    const { tabs } = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    // allow user can switch to the tab by url
    this._router.useParams<{ tabId: string | undefined }>((params) => {
      const tabId = params.tabId;

      if (tabId && isMainClient) {
        setRouteTabId(tabId);
      }
    });

    useEffect(() => {
      if (tabs.some((tab) => tab.id === routeTabId)) {
        this._syncTabView.replaceActive(SyncTabId.DIALPAD, routeTabId);
        // reset router to empty to avoid next route change trigger replace again accidentally
        this._router.replace('/dialer');
      }
    }, [routeTabId, tabs]);

    return tabs.length > 0 ? (
      <this._syncTabView.component
        id={SyncTabId.DIALPAD}
        className={clsx('[&_.sui-tab]:max-w-none [&_.sui-tab]:flex-grow')}
        variant="scrollable"
        tabs={tabs}
      />
    ) : null;
  }
}
