import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import { isRingingInboundCall } from '@ringcentral-integration/commons/lib/callLogHelpers';
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
  Locale,
} from '@ringcentral-integration/micro-core/src/app/services';
import { ModalView } from '@ringcentral-integration/micro-core/src/app/views';
import { ComposeText } from '@ringcentral-integration/micro-message/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  injectable,
  optional,
  PortManager,
  RcViewModule,
  RouterPlugin,
  useConnector,
} from '@ringcentral-integration/next-core';
import { ActiveCallsPanel } from '@ringcentral-integration/widgets/components/ActiveCallsPanel';
import React, { useRef } from 'react';

import {
  ActiveCallControl,
  ActiveSession,
  callingModes,
  CallingSettings,
  CallLogger,
  CallMonitor,
  isHolding,
  SwitchCallActiveCallParams,
  Webphone,
} from '../../services';
import { isOnHold } from '../../services/Webphone/webphoneHelper';
import { MergeCallConfirmView } from '../MergeCallConfirmView';
import { SwitchCallConfirmView } from '../SwitchCallConfirmView';

import type {
  ActiveCallsPanelProps,
  ActiveCallsViewOptions,
  ActiveCallsViewProps,
} from './ActiveCalls.view.interface';

@injectable({
  name: 'ActiveCallsView',
})
export class ActiveCallsView extends RcViewModule {
  get isWide() {
    return this._activeCallsViewOptions?.isWide ?? true;
  }

  constructor(
    protected _brand: Brand,
    protected _locale: Locale,
    protected _callMonitor: CallMonitor,
    protected _rateLimiter: RateLimiter,
    protected _contactSearch: ContactSearch,
    protected _regionSettings: RegionSettings,
    protected _contactMatcher: ContactMatcher,
    protected _callingSettings: CallingSettings,
    protected _router: RouterPlugin,
    protected _appFeatures: AppFeatures,
    protected _connectivityMonitor: ConnectivityMonitor,
    protected _connectivityManager: ConnectivityManager,
    protected _accountInfo: AccountInfo,
    protected _extensionInfo: ExtensionInfo,
    protected _portManager: PortManager,
    protected _modalView: ModalView,
    @optional() protected _webphone?: Webphone,
    @optional() protected _callLogger?: CallLogger,
    @optional() protected _composeText?: ComposeText,
    @optional() protected _mergeCallConfirmView?: MergeCallConfirmView,
    @optional() protected _switchCallConfirmView?: SwitchCallConfirmView,
    @optional() protected _contactDetailsView?: ContactDetailsView,
    @optional() protected _activeCallControl?: ActiveCallControl,
    @optional('ActiveCallsViewOptions')
    protected _activeCallsViewOptions?: ActiveCallsViewOptions,
  ) {
    super();
  }

  getUIProps({
    showContactDisplayPlaceholder = false,
    showRingoutCallControl = false,
    showSwitchCall = false,
    showTransferCall = true,
    showHoldOnOtherDevice = false,
    useV2,
    useCallControl,
    showMergeCall,
  }: ActiveCallsViewProps): UIProps<ActiveCallsPanelProps> {
    const isWebRTC =
      this._callingSettings.callingMode === callingModes.webphone;
    const controlBusy = this._activeCallControl?.busy || false;
    return {
      currentLocale: this._locale.currentLocale,
      activeRingCalls: this._callMonitor.activeRingCalls,
      activeOnHoldCalls: this._callMonitor.activeOnHoldCalls,
      activeCurrentCalls: this._callMonitor.activeCurrentCalls,
      otherDeviceCalls: this._callMonitor.otherDeviceCalls,
      areaCode: this._regionSettings.areaCode,
      countryCode: this._regionSettings.countryCode,
      outboundSmsPermission: this._appFeatures.hasOutboundSMSPermission,
      internalSmsPermission: this._appFeatures.hasInternalSMSPermission,
      showSpinner: false,
      brand: this._brand.name as string,
      showContactDisplayPlaceholder,
      showRingoutCallControl,
      showTransferCall,
      showMergeCall,
      showHoldOnOtherDevice,
      showSwitchCall: !!(
        showSwitchCall &&
        isWebRTC &&
        !this._connectivityManager.webphoneUnavailable
      ),
      autoLog: !!this._callLogger?.autoLog,
      isWebRTC,
      conferenceCallParties: [],
      useV2: !!useV2,
      disableLinks:
        !this._connectivityMonitor.connectivity ||
        this._rateLimiter.restricted ||
        controlBusy,
      useCallControl: !!useCallControl,
      isWide: this.isWide,
      allCalls: this._callMonitor.allCalls,
    };
  }

  private _defaultOnViewContact: NonNullable<
    ActiveCallsViewProps['onViewContact']
  > = (options) => {
    const { id, type } = options.contact;

    this._contactDetailsView?.showContactDetails({
      type,
      id,
      direct: true,
    });
  };

  private _defaultOnLogCall: NonNullable<ActiveCallsViewProps['onLogCall']> =
    async ({ call, contact, redirect = true }) => {
      await this._callLogger?.logCall({
        call,
        contact,
        redirect,
      });
    };

  private _defaultOnCallsEmpty = () => {
    const isWebRTC =
      this._callingSettings.callingMode === callingModes.webphone;

    if (isWebRTC && !this._webphone?.sessions.length) {
      this._router.push('/dialer');
    }
  };

  getUIFunctions({
    composeTextRoute = '/composeText',
    callCtrlRoute = '/calls/active',
    onCreateContact,
    onLogCall = this._defaultOnLogCall,
    isLoggedContact,
    onCallsEmpty = this._defaultOnCallsEmpty,
    onViewContact = this._defaultOnViewContact,
    showViewContact = true,
    getAvatarUrl,
    useV2,
    useCallControl,
  }: ActiveCallsViewProps): UIFunctions<ActiveCallsPanelProps> {
    // Toggle to control if use new call control API, should using the ActiveCallControl module same time,
    // when you set this toggle to true (https://developers.ringcentral.com/api-reference/Call-Control/createCallOutCallSession)
    const useActiveCallControl = !!(useCallControl && this._activeCallControl);
    return {
      onSwitchCall: (call) => {
        this._switchCallConfirmView?.setIsWide(this.isWide);
        this._switchCallConfirmView?.open(call);
      },
      formatPhone: (phoneNumber) =>
        formatNumber({
          phoneNumber,
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
          maxExtensionLength: this._accountInfo.maxExtensionNumberLength,
          siteCode: this._extensionInfo.site?.code,
          isMultipleSiteEnabled: this._extensionInfo.isMultipleSiteEnabled,
        }),
      onMergeCall: async (webphoneSessionId, telephonySessionId) => {
        if (useActiveCallControl) {
          this._activeCallControl?.clickConferenceCallMerge('All calls page');
          const telephonySessionIdToMergeWith =
            this._callMonitor.activeCurrentCalls[0]?.telephonySessionId;
          if (!telephonySessionIdToMergeWith) {
            console.warn('[ActiveCalls.view] No active call to merge.');
            return;
          }
          const confirmed = await this._mergeCallConfirmView?.confirm({
            telephonySessionId,
            // telephonySessionIdToMergeWith
          });
          if (confirmed) {
            this._activeCallControl?.mergeCalls(
              telephonySessionId,
              telephonySessionIdToMergeWith,
            );
          }
        }
      },
      webphoneAnswer: async (
        sessionId,
        telephonySessionId,
        isHoldAndAnswer = false,
      ) => {
        if (useActiveCallControl && this._activeCallControl) {
          isHoldAndAnswer && this._activeCallControl.answerAndHold
            ? this._activeCallControl.answerAndHold(telephonySessionId)
            : this._activeCallControl.answer(telephonySessionId);
        } else {
          if (!this._webphone) {
            return;
          }

          const session = this._webphone.sessions.find(
            (session) => session.id === sessionId,
          );

          this._webphone.answer(sessionId);
        }
      },
      webphoneToVoicemail: (sessionId, telephonySessionId) => {
        if (useActiveCallControl) {
          return this._activeCallControl!.reject(telephonySessionId);
        }
        return this._webphone!.toVoiceMail(sessionId);
      },
      webphoneReject: (sessionId) => this._webphone!.reject(sessionId),
      webphoneHangup: (sessionId, telephonySessionId) => {
        // user action track
        this._callMonitor.allCallsClickHangupTrack();
        if (useActiveCallControl) {
          return this._activeCallControl!.hangUp(telephonySessionId);
        }
        return this._webphone?.hangup(sessionId);
      },
      webphoneResume: async (sessionId, telephonySessionId) => {
        if (useActiveCallControl) {
          return this._activeCallControl!.unhold(telephonySessionId);
        }
        if (!this._webphone) {
          return;
        }
        await this._webphone.resume(sessionId);
        if (this._router.currentPath !== callCtrlRoute && !useV2) {
          this._router.push(callCtrlRoute);
        }
      },
      webphoneHold: (sessionId, telephonySessionId) => {
        // user action track
        this._callMonitor.allCallsClickHoldTrack();
        if (useActiveCallControl) {
          return this._activeCallControl!.hold(telephonySessionId);
        }
        return this._webphone?.hold(sessionId);
      },
      webphoneSwitchCall: async (activeCall) => {
        if (useActiveCallControl) {
          return this._activeCallControl!.switch(
            (activeCall as ActiveSession).telephonySessionId,
          );
        }
        if (!this._webphone) {
          return;
        }
        const session = await this._webphone.switchCall(
          activeCall as SwitchCallActiveCallParams,
          this._regionSettings.homeCountryId,
        );
        return session!;
      },
      webphoneIgnore: (telephonySessionId) =>
        this._activeCallControl?.ignore(telephonySessionId),
      ringoutHangup: async (...args) => {
        // user action track
        this._callMonitor.allCallsClickHangupTrack();
        return this._activeCallControl?.hangUp(...args);
      },
      ringoutTransfer: (sessionId) => {
        this._router.push(`/transfer/${sessionId}/active`);
      },
      ringoutReject: async (sessionId) => {
        // user action track
        this._callMonitor.allCallsClickRejectTrack();
        return this._activeCallControl?.reject(sessionId);
      },
      onViewContact: (options) => {
        if (!showViewContact) return;

        onViewContact(options);
      },
      onClickToSms: this._composeText
        ? async (contact, isDummyContact = false) => {
            if (this._router) {
              this._router.push(composeTextRoute);
            }
            if (!this._composeText) return;

            this._composeText.clean();
            const { name } = contact as {
              name: string;
            };
            if (name && contact.phoneNumber && isDummyContact) {
              this._composeText.updateTypingToNumber(name);
              this._contactSearch.search({ searchString: name });
            } else {
              this._composeText.addToRecipients(contact);
            }
          }
        : undefined,
      onCreateContact: onCreateContact
        ? async ({ phoneNumber, name, entityType }) => {
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
      onCallsEmpty,
      isSessionAConferenceCall: (sessionId) => false,
      onCallItemClick: (call) => {
        if (!call.webphoneSession) {
          // For ringout call
          if (isRingingInboundCall(call)) {
            return;
          }

          const { telephonySessionId } = call;
          // to track the call item be clicked.
          this._callMonitor.callItemClickTrack();
          this._router.push(`/simplifycallctrl/${telephonySessionId}`);
        } else {
          // For webphone call
          // show the ring call modal when click a ringing call.
          if (isRingingInboundCall(call)) {
            this._webphone?.toggleMinimized(call.webphoneSession.id);
            return;
          }
          if (call.webphoneSession && call.webphoneSession.id) {
            // to track the call item be clicked.
            this._callMonitor.callItemClickTrack();
            this._router.push(`${callCtrlRoute}/${call.webphoneSession.id}`);
          }
        }
      },
      getAvatarUrl,
      updateSessionMatchedContact: async (sessionId, contact) => {
        await this._webphone?.updateSessionMatchedContact(sessionId, contact);
      },
      // function to check if a call is on hold status
      isOnHold: (webphoneSession) => {
        if (useActiveCallControl) {
          const call = this._callMonitor.allCalls.find(
            (call) => call.webphoneSession === webphoneSession,
          );
          if (call?.telephonySession) {
            return isHolding({
              status: call.telephonySession.status as any,
            });
          }

          if (process.env.NODE_ENV !== 'production') {
            console.log('🚀 ~ call not found, should confirm what happened.');
          }

          return false;
        }
        return isOnHold(webphoneSession);
      },
      clickSwitchTrack: () => {
        this._activeCallControl?.clickSwitchTrack?.();
      },
    };
  }

  component(props: ActiveCallsViewProps) {
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
      this._activeCallsViewOptions?.component || ActiveCallsPanel;

    return (
      <>
        <Component {..._props} {...uiFunctions} />
      </>
    );
  }
}
