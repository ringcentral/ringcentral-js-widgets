import {
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';
import callDirections from 'ringcentral-integration/enums/callDirections';
import { Module } from 'ringcentral-integration/lib/di';
import i18n from './i18n';
import { getTabs, GetTabsOptions } from './getTabs';
import {
  Deps,
  RecentActivityContainerProps,
  RecentActivityPanelProps,
} from './RecentActivityUI.interface';

@Module({
  name: 'RecentActivityUI',
  deps: [
    'Locale',
    'DateTimeFormat',
    'RecentMessages',
    'RecentCalls',
    'ContactMatcher',
    { dep: 'RecentActivityUIOptions', optional: true },
  ],
})
export class RecentActivityUI<T extends Deps = Deps> extends RcUIModuleV2<T> {
  constructor(deps: T) {
    super({
      deps,
    });
  }

  getTabs(options: GetTabsOptions) {
    return getTabs(options);
  }

  getUIProps({
    currentLocale = this._deps.locale.currentLocale,
    navigateTo,
    dateTimeFormatter = (...args) =>
      this._deps.dateTimeFormat.formatDateTime(...args),
    getSession,
    useContact = false,
    getContact,
    showRecentCalls = true,
    showRecentMessage = true,
    showFax = true,
    showVoiceMails = true,
  }: RecentActivityContainerProps): UIProps<RecentActivityPanelProps> {
    let sessionId: string = null;
    let currentContact = getContact?.();
    let ready =
      this._deps.dateTimeFormat.ready &&
      this._deps.locale.ready &&
      this._deps.recentMessages.ready &&
      this._deps.recentCalls.ready;
    if (!useContact) {
      const session = getSession();
      sessionId = session.id;
      currentContact = session.contactMatch;
      const contactMapping = this._deps.contactMatcher.dataMapping;
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
      ready = ready && this._deps.contactMatcher.ready;
    }
    return {
      currentLocale,
      title: i18n.getString(
        'recentActivities',
        this._deps.locale.currentLocale,
      ),
      showSpinner: !ready,
      currentContact,
      calls: this._deps.recentCalls.calls ?? {},
      tabs: this.getTabs({
        ready,
        currentLocale,
        dateTimeFormatter,
        navigateTo,
        currentContact,
        recentMessages: this._deps.recentMessages,
        recentCalls: this._deps.recentCalls,
        sessionId,
        showFax,
        showRecentCalls,
        showVoiceMails,
        showRecentMessage,
      }),
      defaultTab: 'recentCalls',
    };
  }

  getUIFunctions(): UIFunctions<RecentActivityPanelProps> {
    return {};
  }
}
