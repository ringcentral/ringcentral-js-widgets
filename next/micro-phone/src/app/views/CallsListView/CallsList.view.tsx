import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import {
  AccountInfo,
  AppFeatures,
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
import {
  ComposeText,
  ToNumber,
} from '@ringcentral-integration/micro-message/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  useConnector,
} from '@ringcentral-integration/next-core';
import CallsListPanel from '@ringcentral-integration/widgets/components/CallsListPanel';
import React, { useRef } from 'react';

import {
  Call,
  CallHistory,
  CallLogger,
  CallMonitor,
  Webphone,
} from '../../services';
import { DialerView } from '../DialerView';

import type {
  CallsListPanelProps,
  CallsListViewOptions,
  OnCreateContactOptions,
} from './CallsList.view.interface';

@injectable({
  name: 'CallsListView',
})
export class CallsListView extends RcViewModule {
  constructor(
    protected _brand: Brand,
    protected _callMonitor: CallMonitor,
    protected _locale: Locale,
    protected _regionSettings: RegionSettings,
    protected _callHistory: CallHistory,
    protected _connectivityMonitor: ConnectivityMonitor,
    protected _rateLimiter: RateLimiter,
    protected _dateTimeFormat: DateTimeFormat,
    protected _call: Call,
    protected _extensionInfo: ExtensionInfo,
    protected _contactMatcher: ContactMatcher,
    protected _contactSearch: ContactSearch,
    protected _router: RouterPlugin,
    protected _appFeatures: AppFeatures,
    protected _accountInfo: AccountInfo,
    @optional() protected _dialerView?: DialerView,
    @optional() protected _callLogger?: CallLogger,
    @optional() protected _webphone?: Webphone,
    @optional() protected _composeText?: ComposeText,
    @optional() protected _contactDetailsView?: ContactDetailsView,
    @optional('CallsListViewOptions')
    protected _callsListViewOptions?: CallsListViewOptions,
  ) {
    super();
  }

  getUIProps({
    showContactDisplayPlaceholder = false,
    enableContactFallback = false,
  }: CallsListPanelProps): UIProps<CallsListPanelProps> {
    return {
      adaptive: true,
      useNewList: true,
      currentSiteCode: this._extensionInfo?.site?.code ?? '',
      isMultipleSiteEnabled:
        this._extensionInfo?.isMultipleSiteEnabled ?? false,
      maxExtensionLength: this._accountInfo?.maxExtensionNumberLength,
      currentLocale: this._locale.currentLocale,
      activeRingCalls: this._callMonitor.activeRingCalls,
      activeOnHoldCalls: this._callMonitor.activeOnHoldCalls,
      activeCurrentCalls: this._callMonitor.activeCurrentCalls,
      otherDeviceCalls: this._callMonitor.otherDeviceCalls,
      areaCode: this._regionSettings.areaCode,
      countryCode: this._regionSettings.countryCode,
      outboundSmsPermission: this._appFeatures.hasOutboundSMSPermission,
      internalSmsPermission: this._appFeatures.hasInternalSMSPermission,
      brand: this._brand.name,
      showContactDisplayPlaceholder,
      autoLog: !!(this._callLogger && this._callLogger.autoLog),
      enableContactFallback,
      calls: this._callHistory.latestCalls,
      disableLinks:
        !this._connectivityMonitor.connectivity || this._rateLimiter.restricted,
      disableClickToDial: !(this._call && this._call.isIdle),
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
      readTextPermission: this._appFeatures.hasReadTextPermission,
      enableCDC: this._appFeatures.isCDCEnabled,
    };
  }

  private _defaultDateTimeFormatter: NonNullable<
    CallsListPanelProps['dateTimeFormatter']
  > = (...args) => this._dateTimeFormat.formatDateTime(...args)!;

  private _defaultOnLogCall: CallsListPanelProps['onLogCall'] = async ({
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

  private _defaultOnViewContact: CallsListPanelProps['onViewContact'] = (
    options,
  ) => {
    const { id, type } = options.contact;

    this._contactDetailsView?.showContactDetails({
      type,
      id,
      direct: true,
    });
  };

  getUIFunctions({
    composeTextRoute = '/composeText',
    callCtrlRoute = '/calls/active',
    onCreateContact,
    onLogCall = this._defaultOnLogCall,
    isLoggedContact,
    onViewContact = this._defaultOnViewContact,
    dateTimeFormatter = this._defaultDateTimeFormatter,
    dialerRoute = '/dialer',
  }: CallsListPanelProps): UIFunctions<CallsListPanelProps> {
    return {
      formatPhone: (phoneNumber: string) =>
        formatNumber({
          phoneNumber,
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
          maxExtensionLength: this._accountInfo.maxExtensionNumberLength,
          isMultipleSiteEnabled: this._extensionInfo.isMultipleSiteEnabled,
          siteCode: this._extensionInfo.site?.code,
        })!,
      webphoneAnswer: (sessionId: string) => this._webphone!.answer(sessionId),
      webphoneToVoicemail: (sessionId: string) =>
        this._webphone!.toVoiceMail(sessionId),
      webphoneReject: (sessionId: string) => this._webphone!.reject(sessionId),
      webphoneHangup: (sessionId: string) => this._webphone!.hangup(sessionId),
      webphoneResume: async (sessionId: string) => {
        if (!this._webphone) {
          return;
        }
        await this._webphone.resume(sessionId);
        if (this._router.currentPath !== callCtrlRoute) {
          this._router.push(callCtrlRoute);
        }
      },
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
      isLoggedContact,
      onLogCall,
      dateTimeFormatter,
      onViewContact,
      onClickToDial: this._dialerView
        ? // TODO: fix type in dialerView
          (recipient: any) => {
            if (this._call.isIdle) {
              this._router.push(dialerRoute);
              this._dialerView?.call({
                recipient,
              });
              this._callHistory.onClickToCall();
            }
          }
        : undefined,
      onClickToSms: this._composeText
        ? async (
            contact: ToNumber & { name?: string },
            isDummyContact = false,
          ) => {
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
    };
  }

  component(props: CallsListPanelProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });
    const Component = this._callsListViewOptions?.component || CallsListPanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
