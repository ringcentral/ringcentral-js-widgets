import {
  action,
  RcModuleState,
  RcModuleV2,
  state,
} from '@ringcentral-integration/core';
// eslint-disable-next-line import/no-unresolved
import AgentLibrary from '@SDK';
import EventEmitter from 'events';
import { Module } from 'ringcentral-integration/lib/di';
import sleep from 'ringcentral-integration/lib/sleep';

import { messageTypes } from '../../enums';
import { EvTypeError } from '../EvTypeError';
import { evStatus } from './enums';
import { EvCallbackTypes } from './enums/callbackTypes';
import {
  EvAddSessionNotification,
  EvAgentConfig,
  EvAgentInfo,
  EvAgentOptions,
  EvAuthenticateAgentWithRcAccessTokenRes,
  EvBaseCall,
  EvClientCallMapping,
  EvClientParams,
  EvColdTransferCallResponse,
  EvColdTransferIntlCallResponse,
  EvConfigureAgentOptions,
  EvDirectAgentListResponse,
  EvDispositionCallOptions,
  EvDispositionManualPassOptions,
  EvLogoutAgentResponse,
  EvMessageRes,
  EvOpenSocketResult,
  EvRequeueCallResponse,
  EvRequeueOption,
  EvTokenType,
  EvWarmTransferCallResponse,
  EvWarmTransferIntlCallResponse,
  EvAuthenticateAgentWithEngageAccessTokenRes,
} from './interfaces';
import { raceTimeout } from '../time';

interface State {
  status: string;
}

type ListenerType = typeof EvCallbackTypes['OPEN_SOCKET' | 'CLOSE_SOCKET'];

type Listener<
  T extends keyof EvClientCallMapping,
  U extends EvClientCallMapping = EvClientCallMapping
> = (res: U[T]) => void;

type EvClientState = RcModuleState<EvClient, State>;

@Module({
  name: 'EvClient',
  deps: [{ dep: 'EvClientOptions', optional: true, spread: true }],
})
class EvClient extends RcModuleV2<{}, EvClientState> {
  /** SDK instance */
  private _sdk: any;

  private _onOpen: (response: EvClientCallMapping['openResponse']) => void;

  private _onClose: () => void;

  private _Sdk = AgentLibrary;

  private _options: EvAgentOptions;

  private _encodeSymbol = '$';

  private _eventEmitter = new EventEmitter();

  private _callbacks: Record<string, Function> = {};

  @state
  status: string = evStatus.START;

  constructor({ evClientOptions: { options, callbacks } }: EvClientParams) {
    super();
    this._options = options;
    const { closeResponse, openResponse } = callbacks;
    this._onOpen = (res) => {
      this.setStatus(evStatus.CONNECTED);
      openResponse(res);
      this._eventEmitter.emit(EvCallbackTypes.OPEN_SOCKET, res);
      // ensure for WebSocket keep-alive connection
      this._sdk.terminateStats();
    };
    this._onClose = () => {
      this.setStatus(evStatus.CLOSED);
      closeResponse();
      this._eventEmitter.emit(EvCallbackTypes.CLOSE_SOCKET);
    };
    // Used for toggle auth host about Engage Voice backend.
    if (window.localStorage) {
      const authHost = window.localStorage.getItem('__authHost__');
      if (authHost) {
        options.authHost = authHost;
      }
    }
  }

  addListener<T extends ListenerType>(type: T, listener: Listener<T>) {
    this._eventEmitter.addListener(type, listener);
  }

  addListenerByOnce<T extends ListenerType>(type: T, listener: Listener<T>) {
    this._eventEmitter.once(type, listener);
  }

  removeListener<T extends ListenerType>(
    type: ListenerType,
    listener: Listener<T>,
  ) {
    this._eventEmitter.removeListener(type, listener);
  }

  loadCurrentCall() {
    return new Promise<EvBaseCall | void>((resolve) => {
      this._sdk.loadCurrentCall(resolve);
    });
  }

  get currentCall() {
    return this._sdk.getCurrentCall();
  }

  @action
  setStatus(status: string) {
    this.state.status = status;
  }

  setEnv(authHost: string) {
    if (window.localStorage) {
      window.localStorage.setItem('__authHost__', authHost);
      window.location.reload();
    }
  }

  onInit() {
    const { _Sdk: Sdk } = this;
    this._sdk = new Sdk({
      callbacks: {
        ...this._callbacks,
        closeResponse: this._onClose,
        openResponse: this._onOpen,
      },
      ...this._options,
    });
  }

  on(eventType: string, callback: (...args: any[]) => void) {
    const _callback = {
      [eventType]: (...args: any[]) => callback(...args),
    };

    this._sdk.setCallbacks(_callback);
    this._callbacks = {
      ...this._callbacks,
      ..._callback,
    };
  }

  getEventCallback(eventType: string) {
    return this._sdk.getCallback(eventType);
  }

  authenticateAgentWithEngageAccessToken(engageAccessToken: string) {
    return new Promise<EvAuthenticateAgentWithEngageAccessTokenRes>(
      (resolve) => {
        this.setStatus(evStatus.LOGIN);
        this._sdk.authenticateAgentWithEngageAccessToken(
          engageAccessToken,
          (response: EvAuthenticateAgentWithEngageAccessTokenRes) => {
            resolve(response);
          },
        );
      },
    );
  }

  configureAgent({
    dialDest,
    queueIds,
    chatIds,
    skillProfileId,
    dialGroupId,
    updateFromAdminUI = false,
    isForce = false,
  }: EvConfigureAgentOptions) {
    return new Promise<EvMessageRes>((resolve) => {
      this._sdk.loginAgent(
        dialDest,
        queueIds,
        chatIds,
        skillProfileId,
        dialGroupId,
        updateFromAdminUI,
        isForce,
        (res: any) => {
          resolve({
            type: messageTypes.CONFIGURE_AGENT,
            data: res,
          });
        },
      );
    });
  }

  dispositionManualPass({
    dispId,
    notes,
    callbackDTS,
    leadId,
    requestId,
    externId,
  }: EvDispositionManualPassOptions) {
    // TODO: Promise type
    return new Promise((resolve) => {
      this._sdk.dispositionManualPass(
        dispId,
        notes,
        (response) => {
          resolve(response);
        },
        callbackDTS,
        leadId,
        requestId,
        externId,
      );
    });
  }

  dispositionCall({
    uii,
    dispId = '',
    notes = '',
    callback,
    callbackDTS,
    contactForwardNumber,
    survey,
    externId,
    leadId,
    requestId = '',
  }: EvDispositionCallOptions) {
    return this._sdk.dispositionCall(
      this.decodeUii(uii),
      dispId,
      notes,
      callback,
      callbackDTS,
      contactForwardNumber,
      survey,
      externId,
      leadId,
      requestId,
    );
  }

  authenticateAgent(rcAccessToken: string, tokenType: EvTokenType) {
    return new Promise<EvAuthenticateAgentWithRcAccessTokenRes>((resolve) => {
      this.setStatus(evStatus.LOGIN);
      this._sdk.authenticateAgentWithRcAccessToken(
        rcAccessToken,
        tokenType,
        async (res: EvAuthenticateAgentWithRcAccessTokenRes) => {
          // here just auth with engage access token, not need handle response data, that handle by Agent SDK.
          await this.authenticateAgentWithEngageAccessToken(res.accessToken);

          this.setStatus(evStatus.LOGINED);
          const _agents = (res || {}).agents || [];
          const agents = _agents.map((agent) => ({
            ...agent,
            agentId: agent && agent.agentId ? `${agent.agentId}` : '',
          }));
          resolve({
            ...res,
            agents,
          });
        },
      );
    });
  }

  openSocket(agentId: string) {
    return new Promise<EvOpenSocketResult>((resolve) => {
      this.addListenerByOnce(EvCallbackTypes.OPEN_SOCKET, (res) => {
        resolve(res);
      });
      this._sdk.openSocket(agentId);
    });
  }

  getAgentConfig() {
    return new Promise<EvAgentConfig>((resolve) => {
      this._sdk.getAgentConfig((res) => {
        resolve(res);
      });
    });
  }

  async loginAgent(
    rcAccessToken: string,
    tokenType: EvTokenType,
  ): Promise<EvAgentInfo> {
    const authenticateResponse = await raceTimeout(
      this.authenticateAgent(rcAccessToken, tokenType),
      {
        timeout: 120 * 1000,
        callback: () => null,
      },
    );
    if (!authenticateResponse) {
      throw new EvTypeError({
        type: messageTypes.CONNECT_TIMEOUT,
      });
    }
    if (
      authenticateResponse.type === 'Authenticate Error' ||
      authenticateResponse.message
    ) {
      throw new EvTypeError({
        type: messageTypes.CONNECT_ERROR,
        data: authenticateResponse.message,
      });
    }
    if (
      !authenticateResponse ||
      !authenticateResponse.agents ||
      !authenticateResponse.agents.length
    ) {
      throw new EvTypeError({
        type: messageTypes.NO_AGENT,
      });
    }
    if (
      !authenticateResponse.agents[0] ||
      !authenticateResponse.agents[0].agentId
    ) {
      throw new EvTypeError({
        type: messageTypes.UNEXPECTED_AGENT,
      });
    }
    const agentId = authenticateResponse.agents[0].agentId;
    const hasSupportWebSocket = 'WebSocket' in window;
    if (!hasSupportWebSocket) {
      throw new EvTypeError({
        type: messageTypes.INVALID_BROWSER,
      });
    }

    // TODO: here need check time when no message come back, that will block app.
    const getAgentConfig = new Promise<EvAgentConfig>((resolve) => {
      this.on(EvCallbackTypes.LOGIN_PHASE_1, (...args) => resolve(...args));
    });
    const openSocketResult = await this.openSocket(agentId);
    // wait for socketOpened
    // Because instance.socket Opened(); was performed after callback.
    await sleep(0);
    if (openSocketResult.error) {
      throw new EvTypeError({
        type: messageTypes.OPEN_SOCKET_ERROR,
      });
    }

    const agentConfig = await getAgentConfig;
    // prevent that the WebSocket instance disconnects by server side.
    return {
      type: messageTypes.AGENT_LOGIN,
      data: {
        ...authenticateResponse,
        inboundSettings: (agentConfig && agentConfig.inboundSettings) || {
          availableQueues: [],
          availableSkillProfiles: [],
          queues: [],
          skillProfile: {},
          availableRequeueQueues: [],
        },
      },
      agentConfig: {
        ...agentConfig,
        agentSettings: {
          ...agentConfig.agentSettings,
          autoAnswerCalls: agentConfig.agentPermissions.defaultAutoAnswerOn,
        },
      },
    };
  }

  closeSocket() {
    this._sdk.closeSocket();
  }

  hangup({
    sessionId,
    resetPendingDisp = false,
  }: {
    sessionId: string;
    resetPendingDisp?: boolean;
  }) {
    return this._sdk.hangup(sessionId, resetPendingDisp);
  }

  logoutAgent(agentId: string) {
    return new Promise<EvLogoutAgentResponse>((resolve) => {
      this._sdk.logoutAgent(agentId, (result) => {
        resolve(result);
      });
    });
  }

  // TODO: type
  manualOutdial({ destination, callerId, ringTime, countryId, queueId }) {
    return this._sdk.manualOutdial(
      destination,
      callerId,
      ringTime,
      countryId,
      queueId,
    );
  }

  offhookInit() {
    // we using EvCallbackTypes.OFFHOOK_INIT to catch data, do not pass callback,
    // that will make the message not come back
    this._sdk.offhookInit();
  }

  offhookTerm() {
    this._sdk.offhookTerm();
  }

  hold(holdState: boolean) {
    this._sdk.hold(holdState);
  }

  // TODO: type
  holdSession({ state, sessionId }) {
    this._sdk.holdSession(state, sessionId);
  }

  // TODO: type
  coldTransferCall({ dialDest, callerId = '', sipHeaders = [] }) {
    return new Promise<EvColdTransferCallResponse>((resolve, reject) => {
      this._sdk.coldXfer(dialDest, callerId, sipHeaders, (data) => {
        if (data.status === 'OK') {
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  }

  // TODO: type
  warmTransferCall({ dialDest, callerId = '', sipHeaders = [] }) {
    return new Promise<EvWarmTransferCallResponse>((resolve, reject) => {
      this._sdk.warmXfer(dialDest, callerId, sipHeaders, (data) => {
        if (data.status === 'OK') {
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  }

  // TODO: type
  coldTransferIntlCall({
    dialDest,
    callerId = '',
    sipHeaders = [],
    countryId = '',
  }) {
    return new Promise<EvColdTransferIntlCallResponse>((resolve, reject) => {
      this._sdk.internationalColdXfer(
        dialDest,
        callerId,
        sipHeaders,
        countryId,
        (data) => {
          if (data.status === 'OK') {
            resolve(data);
          } else {
            reject(data);
          }
        },
      );
    });
  }

  // TODO: type
  warmTransferIntlCall({
    dialDest,
    callerId = '',
    sipHeaders = [],
    countryId = '',
  }) {
    return new Promise<EvWarmTransferIntlCallResponse>((resolve, reject) => {
      this._sdk.internationalWarmXfer(
        dialDest,
        callerId,
        sipHeaders,
        countryId,
        (data) => {
          if (data.status === 'OK') {
            resolve(data);
          } else {
            reject(data);
          }
        },
      );
    });
  }

  cancelWarmTransferCall(dialDest: string) {
    // TODO callback
    this._sdk.warmXferCancel(dialDest);
  }

  requeueCall({ queueId, skillId = '', maintain = false }: EvRequeueOption) {
    return new Promise<EvRequeueCallResponse>((resolve, reject) => {
      this._sdk.requeueCall(queueId, skillId, maintain, (data) => {
        if (data.status === 'OK') {
          resolve(data);
        } else {
          reject(data);
        }
      });
    });
  }

  fetchDirectAgentList() {
    return new Promise<EvDirectAgentListResponse>((resolve) => {
      this._sdk.directAgentXferList((data) => {
        resolve(data);
      });
    });
  }

  encodeUii({ uii, sessionId }: Partial<EvAddSessionNotification>) {
    return `${uii}${this._encodeSymbol}${sessionId}`;
  }

  decodeUii(uii: string) {
    return uii.split(this._encodeSymbol)[0];
  }

  /**
   * get a main call session in some call session with some uii
   * @param uii call uii
   */
  getMainId(uii: string) {
    return this.encodeUii({
      sessionId: '1',
      uii,
    });
  }

  rejectDirectAgentTransferCall(uii: string) {
    this._sdk.rejectDirectAgentXfer(this.decodeUii(uii));
  }

  coldDirectAgentTransfer(targetAgentId: string) {
    this._sdk.coldDirectAgentXfer(targetAgentId);
  }

  warmDirectAgentTransfer(targetAgentId: string) {
    this._sdk.warmDirectAgentXfer(targetAgentId);
  }

  sendVoicemailDirectAgentTransfer(targetAgentId: string) {
    this._sdk.voicemailDirectAgentXfer(targetAgentId);
  }

  cancelDirectAgentTransfer(targetAgentId: string) {
    this._sdk.cancelDirectAgentXfer(targetAgentId);
  }

  get agentSettings() {
    return this._sdk.getAgentSettings();
  }

  setAgentState(agentState: string, agentAuxState: string) {
    return this._sdk.setAgentState(agentState, agentAuxState);
  }

  private _multiLoginRequest() {
    return new Promise<any>((resolve, reject) => {
      this._sdk.multiLoginRequest();
      this.on(EvCallbackTypes.LOGIN, (data) => {
        if (data.status === 'SUCCESS') {
          resolve(data);
        } else {
          reject(data);
        }
      });
      this.on(EvCallbackTypes.GENERIC_NOTIFICATION, (data) => {
        if (data.messageCode === '-99') {
          reject(data);
        }
      });
    });
  }

  async multiLoginRequest() {
    // temp solution, and wait for ev backend enhancement.
    try {
      await raceTimeout(this._multiLoginRequest());
    } catch (error) {
      throw new Error('30s timeout');
    }
  }

  /**
   * WebRTC related method
   */
  sipInit() {
    this._sdk.sipInit();
  }

  sipAnswer() {
    this._sdk.sipAnswer();
  }

  sipRegister() {
    this._sdk.sipRegister();
  }

  sipHangUp() {
    this._sdk.sipHangUp();
  }

  sipReject() {
    this._sdk.sipReject();
  }

  sipSendDTMF(dtmf: string) {
    this._sdk.sipSendDTMF(dtmf);
  }

  sipToggleMute(state: boolean) {
    this._sdk.sipToggleMute(state);
  }
}

export { EvClient };
