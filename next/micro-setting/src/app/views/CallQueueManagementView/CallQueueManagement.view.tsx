import { AppHeaderNav } from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { type Theme } from '@ringcentral-integration/micro-core/src/app/services';
import { slideOutViewTransition } from '@ringcentral-integration/micro-core/src/app/views/AppRootView/viewTransition';
import {
  CallQueueManagement,
  CallQueuePresence,
} from '@ringcentral-integration/micro-phone/src/app/services/CallQueueManagement';
import {
  action,
  computed,
  delegate,
  dynamic,
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  state,
  useConnector,
} from '@ringcentral-integration/next-core';
import {
  PageHeader,
  SwitchLine,
} from '@ringcentral-integration/next-widgets/components';
import { sortBy } from 'ramda';
import React, { useEffect, useMemo } from 'react';

import { Section } from '../../components/Section';

import i18n from './i18n';

export interface CallQueueManagementViewOptions {
  enableCallQueueManagement?: boolean;
  showEditableOnly?: boolean;
}

export interface CallQueueManagementViewProps {
  backRoute?: string;
}

@injectable({
  name: 'CallQueueManagementView',
})
export class CallQueueManagementView extends RcViewModule {
  @dynamic('Theme')
  protected _theme?: Theme;

  constructor(
    protected _callQueueManagement: CallQueueManagement,
    protected _router: RouterPlugin,
    @optional('CallQueueManagementViewOptions')
    protected _callQueueManagementViewOptions?: CallQueueManagementViewOptions,
  ) {
    super();
  }

  @state
  isFetching = false;

  @action
  protected _setIsFetching(isFetching: boolean) {
    this.isFetching = isFetching;
  }

  @computed
  get presenceList() {
    const list = this.showEditableOnly
      ? this._callQueueManagement.presenceList.filter(
          (item) => item.callQueue.editableMemberStatus,
        )
      : this._callQueueManagement.presenceList;
    return sortBy<CallQueuePresence>((item) =>
      item.callQueue.name.toLowerCase(),
    )(list);
  }

  get showEditableOnly() {
    return this._callQueueManagementViewOptions?.showEditableOnly ?? true;
  }

  get enableCallQueueManagement() {
    return (
      this._callQueueManagementViewOptions?.enableCallQueueManagement ?? false
    );
  }

  @delegate('server')
  protected async _fetchPresenceList() {
    if (this.isFetching) {
      return;
    }
    this._setIsFetching(true);
    try {
      await this._callQueueManagement.fetchPresenceList();
    } catch (_) {
      // ignore
    }
    this._setIsFetching(false);
  }

  private async goBack(route = '/settings') {
    await this._router.push(route);
  }

  onTogglePresence(callQueueId: string, value: boolean) {
    this._callQueueManagement.updatePresence([
      {
        callQueue: {
          id: callQueueId,
        },
        acceptCalls: value,
      },
    ]);
  }

  component({ backRoute }: CallQueueManagementViewProps) {
    const { t } = useLocale(i18n);
    const { presenceList } = useConnector(() => ({
      presenceList: this.presenceList,
    }));

    const presenceSwitches = useMemo(
      () =>
        presenceList.map((item) => (
          <SwitchLine
            key={item.callQueue.id}
            data-sign="callQueuePresenceControl"
            checked={item.acceptCalls}
            onChange={(value) =>
              this.onTogglePresence(item.callQueue.id, value)
            }
          >
            {item.callQueue.name}
          </SwitchLine>
        )),
      [presenceList],
    );

    useEffect(() => {
      this._fetchPresenceList();
    }, []);
    return (
      <>
        <AppHeaderNav override>
          <PageHeader
            onBackClick={() =>
              slideOutViewTransition(
                () => this.goBack(backRoute),
                this._theme?.reducedMotion,
              )
            }
          >
            {t('callQueueManagement')}
          </PageHeader>
        </AppHeaderNav>
        <main className="overflow-y-auto overflow-x-hidden px-4 relative">
          <Section>{presenceSwitches}</Section>
        </main>
      </>
    );
  }
}
