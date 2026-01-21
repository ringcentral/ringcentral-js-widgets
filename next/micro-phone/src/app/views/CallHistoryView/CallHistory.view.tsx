import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import {
  AccountInfo,
  AppFeatures,
  ConnectivityManager,
  ConnectivityMonitor,
  ExtensionInfo,
  RateLimiter,
  RegionSettings,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  ContactMatcher,
  ContactSearch,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import { ContactDetailsView } from '@ringcentral-integration/micro-contacts/src/app/views';
import {
  Brand,
  DateTimeFormat,
  Locale,
} from '@ringcentral-integration/micro-core/src/app/services';
import { SyncTabId } from '@ringcentral-integration/micro-core/src/app/views';
import {
  ComposeText,
  ToNumber,
} from '@ringcentral-integration/micro-message/src/app/services';
import {
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  useConnector,
} from '@ringcentral-integration/next-core';
import { CallHistoryPanel } from '@ringcentral-integration/widgets/components/CallHistoryPanel';
import React, { useRef } from 'react';

import { Call, CallHistory, CallLogger } from '../../services';
import type { OnCreateContactOptions } from '../CallsListView';
import { DialerView } from '../DialerView';

import type {
  CallHistoryViewOptions,
  CallHistoryViewProps,
} from './CallHistory.view.interface';
import { t } from './i18n';

@injectable({
  name: 'CallHistoryView',
})
export class CallHistoryView extends RcViewModule {
  constructor(
    protected _locale: Locale,
    protected _brand: Brand,
    protected _callHistory: CallHistory,
    protected _regionSettings: RegionSettings,
    protected _connectivityMonitor: ConnectivityMonitor,
    protected _rateLimiter: RateLimiter,
    protected _dateTimeFormat: DateTimeFormat,
    protected _appFeatures: AppFeatures,
    protected _accountInfo: AccountInfo,
    protected _contactMatcher: ContactMatcher,
    protected _router: RouterPlugin,
    protected _contactSearch: ContactSearch,
    protected _connectivityManager: ConnectivityManager,
    @optional() protected _callLogger?: CallLogger,
    @optional() protected _call?: Call,
    @optional() protected _dialerView?: DialerView,
    @optional() protected _composeText?: ComposeText,
    @optional() protected _contactDetailsView?: ContactDetailsView,
    @optional() protected _extensionInfo?: ExtensionInfo,
    @optional('CallHistoryViewOptions')
    protected _callHistoryViewOptions?: CallHistoryViewOptions,
  ) {
    super();
  }

  getUIProps({
    enableContactFallback = false,
    useNewList = false,
  }: CallHistoryViewProps) {
    return {
      enableContactFallback,
      brand: this._brand.name,
      title: t('title'),
      currentLocale: this._locale.currentLocale,
      calls: this._callHistory.latestCalls,
      areaCode: this._regionSettings.areaCode,
      countryCode: this._regionSettings.countryCode,
      currentSiteCode: this._extensionInfo?.site?.code ?? '',
      isMultipleSiteEnabled:
        this._extensionInfo?.isMultipleSiteEnabled ?? false,
      disableLinks:
        this._connectivityManager.isOfflineMode ||
        this._connectivityManager.isVoipOnlyMode ||
        this._rateLimiter.restricted,
      disableCallButton:
        this._connectivityManager.isOfflineMode ||
        this._connectivityManager.isWebphoneUnavailableMode ||
        this._connectivityManager.isWebphoneInitializing ||
        this._rateLimiter.restricted,
      disableClickToDial: !(this._call && this._call.isIdle),
      outboundSmsPermission: this._appFeatures.hasOutboundSMSPermission,
      internalSmsPermission: this._appFeatures.hasInternalSMSPermission,
      loggingMap: this._callLogger && this._callLogger.loggingMap,
      showSpinner: !(
        this._callHistory.ready &&
        this._locale.ready &&
        this._regionSettings.ready &&
        this._dateTimeFormat.ready &&
        this._connectivityMonitor.ready &&
        this._appFeatures.ready &&
        (!this._call || this._call.ready) &&
        (!this._composeText || this._composeText.ready) &&
        (!this._callLogger || this._callLogger.ready)
      ),
      autoLog: !!(this._callLogger && this._callLogger.autoLog),
      useNewList,
      enableCDC: this._appFeatures.isCDCEnabled,
      maxExtensionNumberLength: this._accountInfo.maxExtensionNumberLength,
    };
  }

  private _defaultDateTimeFormatter: NonNullable<
    CallHistoryViewProps['dateTimeFormatter']
  > = (...args) => this._dateTimeFormat.formatDateTime(...args)!;

  private _defaultOnLogCall: CallHistoryViewProps['onLogCall'] = async ({
    call,
    contact,
    redirect = true,
  }) => {
    await this._callLogger?.logCall({
      call,
      contact,
      redirect,
    });
  };

  getUIFunctions({
    onCreateContact,
    dateTimeFormatter = this._defaultDateTimeFormatter,
    onLogCall = this._defaultOnLogCall,
    isLoggedContact,
    dialerRoute = '/dialer',
    composeTextRoute = '/composeText',
    onViewContact,
  }: CallHistoryViewProps) {
    return {
      formatPhone: (phoneNumber: string) =>
        formatNumber({
          phoneNumber,
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
          maxExtensionLength: this._accountInfo.maxExtensionNumberLength,
          isMultipleSiteEnabled: this._extensionInfo?.isMultipleSiteEnabled,
          siteCode: this._extensionInfo?.site?.code,
        }),
      dateTimeFormatter,
      onViewContact:
        onViewContact ||
        (({ contact: { type, id } }) => {
          if (this._contactDetailsView) {
            this._contactDetailsView.showContactDetails({
              type,
              id,
              direct: true,
            });
          }
        }),
      onCreateContact: onCreateContact
        ? async ({ phoneNumber, name, entityType }: OnCreateContactOptions) => {
            const hasMatchNumber = await this._contactMatcher.hasMatchNumber({
              phoneNumber,
              ignoreCache: true,
            });

            if (!hasMatchNumber) {
              await onCreateContact({ phoneNumber, name, entityType });
              await this._contactMatcher.forceMatchNumber({ phoneNumber });
            }
          }
        : undefined,
      onClickToDial:
        this._dialerView && this._appFeatures.isCallingEnabled
          ? (recipient: any) => {
              if (this._call?.isIdle) {
                this._router.push(dialerRoute, {
                  [SyncTabId.DIALPAD]: 'keypad',
                });
                this._dialerView?.call({
                  recipient,
                });
                this._callHistory.onClickToCall();
              }
            }
          : undefined,
      onClickToSms: this._composeText
        ? // TODO: find a better way to define contact type
          async (contact: Entity & ToNumber, isDummyContact = false) => {
            if (this._router) {
              this._router.push(composeTextRoute);
            }

            if (this._composeText) {
              // if contact autocomplete, if no match fill the number only
              if (contact.name && contact.phoneNumber && isDummyContact) {
                this._composeText.updateTypingToNumber(contact.name);
                this._contactSearch.search({ searchString: contact.name });
              } else {
                this._composeText.addToNumber(contact);
                if (this._composeText.typingToNumber === contact.phoneNumber) {
                  this._composeText.cleanTypingToNumber();
                }
              }
            }

            this._callHistory.onClickToSMS();
          }
        : undefined,
      isLoggedContact,
      onLogCall,
    };
  }

  component(props: CallHistoryViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    // TODO: fix type
    const _props: any = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });
    const Component =
      this._callHistoryViewOptions?.component || CallHistoryPanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
