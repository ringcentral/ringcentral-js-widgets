import type TelephonySessionsEventBody from '@rc-ex/core/lib/definitions/TelephonySessionsEventBody';
import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import type { WebSocketSubscription as Subscription } from '@ringcentral-integration/micro-auth/src/app/services';
import { ContactMatcher } from '@ringcentral-integration/micro-contacts/src/app/services';
import { AppMainContent } from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  action,
  autobind,
  computed,
  delegate,
  fromWatchValue,
  inject,
  injectable,
  optional,
  PortManager,
  RcViewModule,
  RouterPlugin,
  state,
  takeUntilAppDestroy,
  useConnector,
} from '@ringcentral-integration/next-core';
import { CallButton } from '@ringcentral/spring-ui';
import React, { type FunctionComponent, useMemo } from 'react';
import { combineLatest, EMPTY, filter, map, switchMap, tap } from 'rxjs';

import {
  type CallActionType,
  type ICallAction,
  useCallActionButtons,
} from '../../hooks/useCallActionButtons';
import { useContactRenderInfoFromCall } from '../../hooks/useContactRenderInfo';
import contactRenderI18n from '../../hooks/useContactRenderInfo/i18n';
import {
  Call as CallService,
  CallAction,
  CallingSettings,
  isRingingCall,
  PreinsertCall,
  type Recipient,
  CALLING_ROUTE_PATH,
} from '../../services';
import { getPreinsertFakeId } from '../../services/PreinsertCall/utils/isPreinsertCall';
import { CallControlView } from '../CallView/routes/CallControlViewSpring';
import {
  CallControlActionButtons,
  CallControlInformation,
  CallControlLayout,
} from '../CallView/routes/CallControlViewSpring/CallControlPanel';
import callControlPanelI18n from '../CallView/routes/CallControlViewSpring/CallControlPanel/i18n';
import { CallViewState } from '../CallView/services';

const telephonySessionEventRegExp =
  /\/(telephony\/sessions|start-ring|stop-ring)$/;

type PreinsertConnectingDisplayInfo = {
  callerId: string;
  phoneNumber: string;
};

export type PreparePreinsertConnectingParams = {
  callerId: string;
  recipient: Recipient | null;
  toNumberField: string;
};

export type PreinsertConnectingOverlayViewProps = {
  onAction?: (actionType: CallActionType) => void;
};

type PreinsertConnectingOverlayProps = {
  actions: ICallAction[];
  call: Call;
  onAction?: (actionType: CallActionType) => void;
  onHangUp: () => void;
};

const PreinsertConnectingOverlay: FunctionComponent<
  PreinsertConnectingOverlayProps
> = ({ actions, call, onAction, onHangUp }) => {
  const { t } = useLocale(callControlPanelI18n, contactRenderI18n);
  const { DisplayName, displayPhoneNumber, Avatar, myCallerId } =
    useContactRenderInfoFromCall(call, {
      phoneNumberDisplayMode: 'unknown',
      hideBlockedFromInfo: true,
    });
  const callActions = useCallActionButtons(
    actions,
    (actionType) => {
      if (actionType === 'hangUp') {
        onHangUp();
        return;
      }

      onAction?.(actionType);
    },
    { isConferenceCall: false },
  );
  const actionButtons = useMemo(() => callActions.slice(0, -1), [callActions]);
  const hangUpActionProps = useMemo(
    () => callActions[callActions.length - 1],
    [callActions],
  );
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    actionType: hangUpActionType,
    label,
    tooltip,
    ...hangUpButtonProps
  } = hangUpActionProps ?? {};
  const hangUpLabel = tooltip || label || t('Hang up');

  return (
    <AppMainContent>
      <div
        aria-live="polite"
        aria-busy="true"
        className="absolute inset-0 z-drawer flex flex-col bg-neutral-base"
        data-sign="preinsertConnectingOverlay"
      >
        <CallControlLayout
          callInformation={
            <CallControlInformation
              avatar={<Avatar size="large" />}
              dataSign="preinsertConnectingCallInformation"
              startAdornment={<div aria-hidden className="size-8 flex-none" />}
            >
              <h3
                className="typography-title text-neutral-b0 truncate w-full flex flex-col"
                data-sign="preinsertConnectingDisplayName"
              >
                <DisplayName
                  displayControl={{
                    maybe: true,
                    viewable: true,
                    matchCounts: true,
                  }}
                />
              </h3>
              {displayPhoneNumber ? (
                <p
                  className="typography-descriptorMini text-neutral-b0"
                  data-sign="preinsertConnectingPhoneNumber"
                >
                  {displayPhoneNumber}
                </p>
              ) : null}
              {call.from?.phoneNumber && myCallerId ? (
                <p
                  className="typography-descriptorMini text-neutral-b2"
                  data-sign="preinsertConnectingCallerId"
                >
                  {t('myCallerId')}: {myCallerId}
                </p>
              ) : null}
            </CallControlInformation>
          }
          contentDataSign="preinsertConnectingPanel"
          footer={
            <CallButton
              {...hangUpButtonProps}
              aria-label={hangUpLabel}
              data-sign="preinsertConnectingHangUp"
              size="medium"
              TooltipProps={{ title: hangUpLabel }}
              variant="end"
            />
          }
          main={
            <CallControlActionButtons
              actionButtons={actionButtons}
              actionDataSign={(actionType) =>
                `preinsertConnecting_${actionType}`
              }
              dataSign="preinsertConnectingActionButtons"
            />
          }
          status={
            <span className="typography-body1 text-neutral-b2">
              {t('connecting')}
            </span>
          }
        />
      </div>
    </AppMainContent>
  );
};

@injectable({
  name: 'ConnectingView',
})
export class ConnectingView extends RcViewModule {
  private _preinsertConnectingToken = 0;
  private readonly _cancelledPreinsertConnectingTokens = new Set<number>();

  @state
  private connecting = false;

  @state
  private preinsertConnectingToken = 0;

  @state
  private preinsertConnectingWebphoneSessionId = '';

  @state
  private preinsertConnectingDisplayInfo: PreinsertConnectingDisplayInfo = {
    callerId: '',
    phoneNumber: '',
  };

  constructor(
    private _callControlView: CallControlView,
    private _call: CallService,
    private _callAction: CallAction,
    private _callViewState: CallViewState,
    private _callingSettings: CallingSettings,
    private _preInsertCall: PreinsertCall,
    private _portManager: PortManager,
    private _router: RouterPlugin,
    @inject('Subscription') private _subscription: Subscription,
    @optional() private _contactMatcher?: ContactMatcher,
  ) {
    super();
  }

  get enabled() {
    return this._callingSettings.isWebphoneMode;
  }

  get isConnecting() {
    return this.enabled && this.connecting;
  }

  @action
  private _setPreinsertConnecting(
    value: boolean,
    token = 0,
    displayInfo?: PreinsertConnectingDisplayInfo,
  ) {
    this.connecting = value;
    this.preinsertConnectingToken = token;
    if (displayInfo) {
      this.preinsertConnectingDisplayInfo = displayInfo;
    }
  }

  @action
  private _setPreinsertConnectingWebphoneSessionId(
    token: number,
    webphoneSessionId: string,
  ) {
    if (!this.connecting || this.preinsertConnectingToken !== token) {
      return;
    }

    this.preinsertConnectingWebphoneSessionId = webphoneSessionId;
  }

  @action
  private _clearPreinsertConnectingWebphoneSessionId() {
    this.preinsertConnectingWebphoneSessionId = '';
  }

  preparePreinsertConnecting({
    callerId,
    recipient,
    toNumberField,
  }: PreparePreinsertConnectingParams) {
    if (!this.enabled) {
      return 0;
    }

    const preinsertConnectingToken = this.nextPreinsertConnectingToken();

    const toNumber =
      toNumberField || recipient?.phoneNumber || recipient?.extension || '';
    this._setPreinsertConnecting(true, preinsertConnectingToken, {
      callerId,
      phoneNumber: toNumber,
    });
    this._clearPreinsertConnectingWebphoneSessionId();

    return preinsertConnectingToken;
  }

  resetPreinsertConnecting() {
    this._setPreinsertConnecting(false, 0, {
      callerId: '',
      phoneNumber: '',
    });
    this._clearPreinsertConnectingWebphoneSessionId();
    this._cancelledPreinsertConnectingTokens.clear();
  }

  @delegate('server')
  async setPreinsertConnectingOnServer(value: boolean, token = 0) {
    if (value && !this.enabled) {
      return;
    }

    this._setPreinsertConnecting(value, token);
  }

  @delegate('server')
  async setPreinsertConnectingWebphoneSessionIdOnServer(
    token: number,
    webphoneSessionId?: string | null,
  ) {
    if (!this.enabled || !webphoneSessionId) {
      return;
    }

    this._setPreinsertConnectingWebphoneSessionId(token, webphoneSessionId);
  }

  @delegate('server')
  async hangUpPreinsertConnecting() {
    const token = this.preinsertConnectingToken;
    this._cancelledPreinsertConnectingTokens.add(token);
    this._setPreinsertConnecting(false, token);
    await this._call.connectErrorOnServer();
    await this.cancelPreinsertConnectingCall(
      this.preinsertConnectingWebphoneSessionId,
    );
  }

  cancelPreinsertConnectingCall(webphoneSessionId?: string | null) {
    return this._preInsertCall.cancelPreinsertConnectingCall(webphoneSessionId);
  }

  override onInitOnce() {
    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        this._bindListeners();
      });
      return;
    }

    this._bindListeners();
  }

  private _bindListeners() {
    fromWatchValue(this, () => this._callingSettings.isWebphoneMode)
      .pipe(
        switchMap((isWebphoneMode) => {
          if (isWebphoneMode) {
            return combineLatest([
              this._subscription.fromMessage$<TelephonySessionsEventBody>(
                telephonySessionEventRegExp,
              ),
              fromWatchValue(
                this,
                () =>
                  [
                    this.preinsertConnectingWebphoneSessionId,
                    this._callViewState.view,
                    this._callAction.activeCallInfo,
                    this._router.currentPath,
                  ] as const,
                {
                  multiple: true,
                },
              ),
            ]).pipe(
              map(([message, [preinsertConnectingWebphoneSessionId]]) => {
                if (
                  // when connecting webphone session change, we also check if we need end the connecting state
                  preinsertConnectingWebphoneSessionId &&
                  this.connecting &&
                  this._isCurrentPreinsertConnectingCallMessage(
                    preinsertConnectingWebphoneSessionId,
                    message,
                  ) &&
                  // must wait the connecting call be ready to display, otherwise will see the previous screen flash before the connecting call be ready to display
                  this._isPreinsertConnectingCallReadyToDisplay(message)
                ) {
                  return true;
                }
                return false;
              }),
              filter(Boolean),
              tap(() => {
                this._setPreinsertConnecting(false);
              }),
            );
          }

          if (this.connecting) {
            this.resetPreinsertConnecting();
          }

          return EMPTY;
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  private _isCurrentPreinsertConnectingCallMessage(
    preinsertConnectingWebphoneSessionId: string,
    message: TelephonySessionsEventBody,
  ) {
    const telephonySessionId = message.telephonySessionId;
    const sessionId = message.sessionId;

    if (sessionId === preinsertConnectingWebphoneSessionId) {
      return true;
    }

    if (!telephonySessionId) {
      return false;
    }

    return this._preInsertCall.isCurrentDeviceWebphoneSession(
      telephonySessionId,
      preinsertConnectingWebphoneSessionId,
    );
  }

  private _isPreinsertConnectingCallReadyToDisplay(
    message: TelephonySessionsEventBody,
  ) {
    const activeCallInfo = this._callAction.activeCallInfo;
    const activeCall = activeCallInfo?.call;

    if (
      this._callViewState.view !== 'activeCall' ||
      this._router.currentPath !== CALLING_ROUTE_PATH ||
      !activeCallInfo?.meta?.open ||
      !activeCall ||
      isRingingCall(activeCall)
    ) {
      return false;
    }

    const telephonySessionId = message.telephonySessionId;
    const sessionId = message.sessionId;

    return Boolean(
      (telephonySessionId &&
        activeCall.telephonySessionId === telephonySessionId) ||
      (sessionId && activeCall.webphoneSession?.id === sessionId),
    );
  }

  nextPreinsertConnectingToken() {
    this._preinsertConnectingToken += 1;
    return this._preinsertConnectingToken;
  }

  isPreinsertConnectingCancelled(token: number) {
    return this._cancelledPreinsertConnectingTokens.has(token);
  }

  clearPreinsertConnectingCancel(token: number) {
    this._cancelledPreinsertConnectingTokens.delete(token);
  }

  @computed
  private get toMatches() {
    const { phoneNumber } = this.preinsertConnectingDisplayInfo;
    return this._contactMatcher?.findMatchesFromNumber(phoneNumber, undefined);
  }

  @computed
  private get call() {
    const { callerId, phoneNumber } = this.preinsertConnectingDisplayInfo;

    const toMatches = this.toMatches;

    const sessionId = getPreinsertFakeId(`${this.preinsertConnectingToken}`);

    return {
      direction: 'Outbound',
      from: {
        phoneNumber: callerId === 'anonymous' ? '' : callerId,
      },
      fromMatches: [],
      sessionId,
      startTime: Date.now(),
      telephonySessionId: sessionId,
      to: {
        phoneNumber,
        // when have have matches and the extension number be same as current phone number, we assume that be extension number
        extensionNumber: toMatches?.find((match) =>
          match.phoneNumbers?.find(
            (pn) =>
              pn.phoneNumber === phoneNumber && pn.phoneType === 'extension',
          ),
        )?.extensionNumber,
      },
      toMatches,
    } as Call;
  }

  @autobind
  private Connecting(props: PreinsertConnectingOverlayViewProps) {
    const call = useConnector(() => this.call);

    const actions = this._callControlView.useCallActions({
      call,
      actionsDisabled: true,
    });

    return (
      <PreinsertConnectingOverlay
        {...props}
        actions={actions}
        call={call}
        onHangUp={() => {
          void this.hangUpPreinsertConnecting();
        }}
      />
    );
  }

  component(props: PreinsertConnectingOverlayViewProps) {
    const isConnecting = useConnector(() => this.isConnecting);

    return isConnecting ? <this.Connecting {...props} /> : null;
  }
}
