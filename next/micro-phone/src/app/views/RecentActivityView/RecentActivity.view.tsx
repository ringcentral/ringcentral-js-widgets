import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import { track } from '@ringcentral-integration/micro-auth/src/app/services';
import { ContactMatcher } from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  DateTimeFormat,
  Locale,
} from '@ringcentral-integration/micro-core/src/app/services';
import type { RecentMessages } from '@ringcentral-integration/micro-message/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  delegate,
  dynamic,
  injectable,
  optional,
  RcViewModule,
  useConnector,
} from '@ringcentral-integration/next-core';
import RecentActivityPanel from '@ringcentral-integration/widgets/components/RecentActivityPanel';
import React, { useRef } from 'react';

import { RecentCalls } from '../../services';

import type {
  RecentActivityContainerProps,
  RecentActivityViewOptions,
  RecentActivityViewProps,
} from './RecentActivity.view.interface';
import type { getTabs } from './getTabs';
import { t } from './i18n';

export const trackTabsMap = {
  recentCalls: trackEvents.clickRecentActivityCall,
  faxes: trackEvents.clickRecentActivityFaxes,
  recentMessages: trackEvents.clickRecentActivitySms,
  voicemails: trackEvents.clickRecentActivityVoicemails,
};

@injectable({
  name: 'RecentActivityView',
})
export class RecentActivityView extends RcViewModule {
  private getTabs: typeof getTabs = () => [];

  constructor(
    protected _locale: Locale,
    protected _dateTimeFormat: DateTimeFormat,
    protected _recentCalls: RecentCalls,
    protected _contactMatcher: ContactMatcher,
    @optional('RecentActivityViewOptions')
    protected _recentActivityViewOptions?: RecentActivityViewOptions,
  ) {
    super();

    if (global.document) {
      import(/* webpackChunkName: "dynamic" */ './getTabs').then(
        ({ getTabs }) => {
          this.getTabs = getTabs;
        },
      );
    }
  }

  @dynamic('RecentMessages')
  protected readonly _recentMessages?: RecentMessages;

  @track((_: RecentActivityView, entry: string) => [
    trackEvents.clickRecentActivity,
    { Entry: entry },
  ])
  @delegate('server')
  async trackClickToggle(entry: string) {
    //
  }

  @track(
    (
      _: RecentActivityView,
      tabName: keyof typeof trackTabsMap,
      entry: string,
    ) => [trackTabsMap[tabName], { Entry: entry }],
  )
  @delegate('server')
  async trackClickTab(tabName: string, entry: string) {
    //
  }

  getUIProps({
    currentLocale = this._locale.currentLocale,
    navigateTo,
    dateTimeFormatter = (...args) =>
      this._dateTimeFormat.formatDateTime(...args)!,
    getSession,
    useContact = false,
    getContact,
    showRecentCalls = true,
    showRecentMessage = true,
    showFax = true,
    showVoiceMails = true,
  }: Partial<RecentActivityViewProps>): UIProps<RecentActivityContainerProps> {
    let sessionId: string | null = null;
    let currentContact = getContact?.()!;
    let ready =
      this._dateTimeFormat.ready &&
      this._locale.ready &&
      (!this._recentMessages || this._recentMessages.ready) &&
      this._recentCalls.ready;
    if (!useContact) {
      const session = getSession!();
      sessionId = session.id;
      currentContact = session.contactMatch;
      const contactMapping = this._contactMatcher.dataMapping;
      const phoneNumber =
        session.direction === callDirections.outbound
          ? session.to
          : session.from;
      if (!currentContact) {
        const entities = contactMapping?.[phoneNumber];
        if (entities?.length >= 1) {
          currentContact = entities[0];
        }
      }
      ready = ready && this._contactMatcher.ready;
    }

    return {
      currentLocale,
      title: t('recentActivities'),
      showSpinner: !ready,
      currentContact,
      calls: this._recentCalls.calls ?? {},
      tabs: this.getTabs({
        ready,
        currentLocale,
        dateTimeFormatter,
        navigateTo: navigateTo!,
        currentContact,
        recentMessages: this._recentMessages,
        recentCalls: this._recentCalls,
        sessionId: sessionId!,
        showFax,
        showRecentCalls,
        showVoiceMails,
        showRecentMessage,
      }),
      defaultTab: 'recentCalls',
    };
  }

  getUIFunctions({
    entry,
  }: Partial<RecentActivityViewProps>): UIFunctions<RecentActivityContainerProps> {
    return {
      trackClickToggle: (expanded) => {
        if (expanded) {
          this.trackClickToggle(entry!);
        }
      },
      trackClickTab: (tabName) => this.trackClickTab(tabName, entry!),
    };
  }

  component(props: Partial<RecentActivityViewProps>) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });
    const Component =
      this._recentActivityViewOptions?.component || RecentActivityPanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
