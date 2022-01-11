import { EventEmitter } from 'events';
import formatMessage from 'format-message';

import { Module } from '@ringcentral-integration/commons/lib/di';
import { raceTimeout } from '@ringcentral-integration/commons/lib/raceTimeout';
import sleep from '@ringcentral-integration/commons/lib/sleep';
import {
  action,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { CustomRenderer } from '@ringcentral-integration/widgets/modules/ModalUI/ModalUI.interface';

import {
  dialoutStatuses,
  EvSoftphoneEvents,
  tabManagerEvents,
} from '../../enums';
import { EvSipRingingData } from '../../lib/EvClient';
import { EvCallbackTypes } from '../../lib/EvClient/enums';
import { audios } from './audios';
import {
  Deps,
  IntegratedSoftphone,
  ShowRingingModalProps,
} from './EvIntegratedSoftphone.interface';
import i18n from './i18n';
import { getModalText } from './IncomingModalText';
import { runInActivityWebRTCTab } from './runInActivityWebRTCTab.decorator';

const SECOND = 1000;
const RECONNECT_DEBOUNCE_TIME = SECOND * 5;
const RECONNECT_DEBOUNCE_TIME_WHEN_CONNECTED = SECOND * 15;
const SIP_MAX_CONNECTING_TIME = SECOND * 30;

const ModalContentRendererID = 'EvIntegratedSoftphone.ModalContentRenderer';
const ModalContentRenderer: CustomRenderer = ({
  isInbound,
  inboundTextProps,
  outboundText,
}) => getModalText({ isInbound, inboundTextProps, outboundText });

@Module({
  name: 'EvIntegratedSoftphone',
  deps: [
    'Locale',
    'RouterInteraction',
    'EvAgentSession',
    'EvSubscription',
    'Beforeunload',
    'EvSettings',
    'EvClient',
    'Presence',
    'Storage',
    'EvAuth',
    'Block',
    'Auth',
    'ModalUI',
    'Alert',
    { dep: 'TabManager', optional: true },
    { dep: 'EvIntegratedSoftphoneOptions', optional: true },
  ],
})
class EvIntegratedSoftphone
  extends RcModuleV2<Deps>
  implements IntegratedSoftphone
{
  autoAnswerCheckFn: () => boolean;

  private _isFirefox: boolean;

  private _audio: HTMLAudioElement;

  private _eventEmitter = new EventEmitter();

  private _answerModalId: string = null;

  /** audio permission alert id */
  private _audioPermissionAlertId: string = null;

  // private _checkWebRTCIntervalId: NodeJS.Timeout;

  // private _heartBeatIntervalTime: number;

  private _beforeunloadHandler = () => this.isWebRTCTab;

  private _isCloseWhenCallConnected = false;
  private _failedBlockId: string;

  get tabManagerEnabled() {
    return this._deps.tabManager?.enable;
  }

  get isWebRTCTab() {
    return this._deps.tabManager.isMainTab && this.sipRegisterSuccess;
  }

  get isIntegratedSoftphoneWithTabEnable() {
    return (
      this._deps.tabManager.enable &&
      this._deps.evAgentSession.isIntegratedSoftphone
    );
  }

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'EvIntegratedSoftphone',
    });

    this._deps.evAuth.beforeAgentLogout(() => {
      this._resetAllState();
    });

    this._deps.beforeunload.onAfterUnload(() => {
      this._sendTabManager(tabManagerEvents.CLOSE_WHEN_CALL_CONNECTED);
    });

    this._deps.modalUI.registerRenderer(
      ModalContentRendererID,
      ModalContentRenderer,
    );
    this._isFirefox = navigator.userAgent.indexOf('Firefox') !== -1;
  }

  // @state
  // dtmfString: string = '';

  @storage
  @state
  audioPermission = false;

  @storage
  @state
  muteActive = false;

  @state
  sipRegisterSuccess = false;

  @state
  sipRegistering = false;

  /** connecting webRTC alert id, for dialer call button disabled check */
  @state
  connectingAlertId: string = null;

  // this is for dialPad click when on call
  // @action
  // sipSendDTMF(dtmf: string) {
  // this.dtmfString += dtmf;
  // this._deps.evClient.sipSendDTMF(dtmf);
  // }

  @action
  setConnectingAlertId(id: string) {
    this.connectingAlertId = id;
  }

  @action
  setAudioPermission(permission: boolean) {
    this.audioPermission = permission;
  }

  @action
  resetController() {
    // this.dtmfString = '';
    this.muteActive = false;
  }

  @action
  setMuteActive(state: boolean) {
    this.muteActive = state;
  }

  @action
  resetSip() {
    this.audioPermission = false;
    this.sipRegistering = false;
    this.sipRegisterSuccess = false;
  }

  @action
  setSipRegisterSuccess(state: boolean) {
    this.sipRegisterSuccess = state;
  }

  @action
  setSipRegistering(state: boolean) {
    this.sipRegistering = state;
  }

  onInitOnce() {
    this._initAudio();

    this._bindingIntegratedSoftphone();

    this._deps.tabManager.onSetMainTabComplete(async () => {
      console.log(
        'onSetMainTabComplete~~',
        this._deps.evAgentSession.isIntegratedSoftphone,
      );
      if (this._deps.evAgentSession.isIntegratedSoftphone) {
        await this.connectWebRTC();
      }
    });

    this._deps.evAgentSession.onConfigSuccess(() => {
      if (
        this._deps.tabManager.hasMultipleTabs &&
        !this._deps.tabManager.isMainTab &&
        this._deps.evAgentSession.isIntegratedSoftphone &&
        this._deps.evAgentSession.isConfigTabAlive()
      ) {
        console.log('setSipRegisterSuccess in onConfigSuccess~~');
        this.setSipRegisterSuccess(true);
      }
    });

    this._deps.evAgentSession.onReConfigFail(() => {
      if (this._deps.evAgentSession.isIntegratedSoftphone) {
        this._emitRegistrationFailed();
      }
    });
  }

  onReset() {
    try {
      console.log('onReset in EvIntegratedSoftphone~');
      this._resetAllState();
    } catch (error) {
      // ignore error
    }
  }

  private _resetAllState() {
    this._closeWebRTCConnectingMask();
    this.resetSip();

    this._deps.evClient.sipTerminate();
    this._eventEmitter.emit(EvSoftphoneEvents.RESET);
  }

  private _emitRegistrationFailed() {
    this._deps.evSubscription.emit(
      EvCallbackTypes.SIP_REGISTRATION_FAILED,
      null,
    );
  }

  async onStateChange() {
    if (
      this.ready &&
      this._deps.tabManager.enable &&
      this._deps.tabManager.ready
    ) {
      this._checkTabManagerEvent();
    }
  }

  private async _checkTabManagerEvent() {
    const { event } = this._deps.tabManager;
    if (event) {
      const data = event.args[0];
      switch (event.name) {
        case tabManagerEvents.ASK_AUDIO_PERMISSION:
          if (data) {
            this._showAskAudioPermissionMask();
          } else {
            this._closeAskAudioPermissionMask();
          }
          break;
        case tabManagerEvents.SIP_CONNECTING:
          this._showWebRTCConnectingMask();
          break;
        case tabManagerEvents.SIP_RINGING:
          this._showRingingModal(data);
          break;
        case tabManagerEvents.SIP_RINGING_MODAL:
          // that event call from modal ok or cancel, that auto close modal
          this._deps.modalUI.close(this._answerModalId);
          if (data) {
            await this.answerCall();
          } else {
            this.rejectCall();
          }
          break;
        case tabManagerEvents.MUTE_STATE_CHANGE:
          this.setMuteActive(data);
          break;
        case tabManagerEvents.SIP_REGISTERED:
          console.log('_sipRegistered in other tabs~');
          this._sipRegistered();
          break;
        case tabManagerEvents.SIP_UNREGISTERED:
          this.setSipRegisterSuccess(false);
          break;
        case tabManagerEvents.SIP_REGISTRATION_FAILED_RELOAD:
          this._reloadApp();
          break;
        case tabManagerEvents.SIP_REGISTRATION_FAILED:
          this._handleRegistrationFailed();
          await this._deps.evAgentSession.onceLogoutThenLogin();
          this._closeFailReconnectedBlock();
          break;
        case tabManagerEvents.SIP_CONNECTED:
          this._sipConnected();
          break;
        case tabManagerEvents.SIP_ENDED:
          this._sipEnded();
          // When sip end need reset Dialout Status to idle
          this._deps.presence.setDialoutStatus(dialoutStatuses.idle);
          break;
        case tabManagerEvents.MUTE:
          this.sipToggleMute(data);
          break;
        case tabManagerEvents.CLOSE_WHEN_CALL_CONNECTED:
          this._isCloseWhenCallConnected = true;
          break;
        case tabManagerEvents.NOTIFY_ACTIVE_TAB_CALL_ACTIVE:
          if (this._deps.tabManager.active) {
            this._deps.alert.warning({
              message: tabManagerEvents.NOTIFY_ACTIVE_TAB_CALL_ACTIVE,
              backdrop: true,
              ttl: 0,
            });
          }
          break;
        default:
          break;
      }
    }
  }

  private _closeFailReconnectedBlock() {
    this._deps.block.unblock(this._failedBlockId);
    this._failedBlockId = null;
  }

  sipToggleMute(state: boolean) {
    this._deps.evClient.sipToggleMute(state);
  }

  onRinging(callback: (call?: EvSipRingingData) => void) {
    this._eventEmitter.on(EvCallbackTypes.SIP_RINGING, callback);
  }

  async askAudioPermission(showMask: boolean = true) {
    console.log('askAudioPermission~~', showMask);
    try {
      if (showMask) {
        if (!this.audioPermission) {
          this._sendTabManager(tabManagerEvents.ASK_AUDIO_PERMISSION, true);
          this._showAskAudioPermissionMask();
        }

        console.log('connect WEB_RTC');
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
      }
    } catch (error) {
      this._deps.alert.danger({
        message: EvSoftphoneEvents.AUDIO_STREAM_REJECTED,
        backdrop: true,
        ttl: 0,
      });
      console.log(error);
      throw new Error('Need Audio permission');
    } finally {
      if (showMask) {
        if (this._audioPermissionAlertId) {
          this._sendTabManager(tabManagerEvents.ASK_AUDIO_PERMISSION, false);
          this._closeAskAudioPermissionMask();
        }
      }
    }

    this.setAudioPermission(true);
    if (!this.sipRegisterSuccess) {
      await this._registerSoftphone();
    }
  }

  private async connectWebRTC() {
    console.log('connectWebRTC~');

    this.resetSip();
    await this.askAudioPermission();
  }

  private _bindingIntegratedSoftphone() {
    console.log('_bindingIntegratedSoftphone~~');
    this._deps.evSubscription.subscribe(EvCallbackTypes.SIP_REGISTERED, () => {
      // That will call several times when reconnected.
      console.log('!!!!!!!SIP_REGISTERED');
      if (!this.sipRegisterSuccess) {
        this._sendTabManager(tabManagerEvents.SIP_REGISTERED);
        this._sipRegistered();
      }
    });

    this._deps.evSubscription.subscribe(
      EvCallbackTypes.SIP_UNREGISTERED,
      () => {
        console.log('!!!!!!!SIP_UNREGISTERED');
        if (this.sipRegisterSuccess) {
          this._sendTabManager(tabManagerEvents.SIP_UNREGISTERED);
          this.setSipRegisterSuccess(false);
        }
      },
    );

    this._deps.evSubscription.subscribe(
      EvCallbackTypes.SIP_REGISTRATION_FAILED,
      async () => {
        console.log('!!!!!!!SIP_REGISTRATION_FAILED');
        this.setSipRegistering(false);

        this._sendTabManager(tabManagerEvents.SIP_REGISTRATION_FAILED);
        this._handleRegistrationFailed();

        // await this._deps.evAgentSession.reLoginAgent();
        // this._closeFailReconnectedBlock();
      },
    );

    this._deps.evSubscription.subscribe(
      EvCallbackTypes.SIP_RINGING,
      (ringingCall) => {
        this.bindBeforeunload();
        console.log('!!!!!!!SIP_RINGING');
        this._eventEmitter.emit(EvCallbackTypes.SIP_RINGING, ringingCall);

        if (this.autoAnswerCheckFn()) {
          return this._sipAnswer();
        }

        const { displayName } = ringingCall.data.request.from;
        const queueName = this._deps.evClient.currentCall?.queue?.name;
        const { dialoutStatus, isOffhooking, isManualOffhook } =
          this._deps.presence;
        // exclude outbound and offhook
        const isInbound =
          dialoutStatus !== 'dialing' &&
          !(isManualOffhook && isOffhooking) &&
          this._deps.evClient.currentCall?.callType === 'INBOUND';

        this._sendTabManager(tabManagerEvents.SIP_RINGING, {
          displayName,
          queueName,
          isInbound,
        });
        this._showRingingModal({ displayName, queueName, isInbound });
      },
    );

    this._deps.evSubscription.subscribe(EvCallbackTypes.SIP_CONNECTED, () => {
      console.info('!!!!!!!SIP_CONNECTED');
      this._sendTabManager(tabManagerEvents.SIP_CONNECTED);
      this._sipConnected();
    });

    this._deps.evSubscription.subscribe(EvCallbackTypes.SIP_ENDED, () => {
      console.info('!!!!!!!SIP_ENDED');
      this.removeBeforeunload();

      this._sendTabManager(tabManagerEvents.SIP_ENDED);
      this._sipEnded();
    });

    this._deps.evSubscription.subscribe(EvCallbackTypes.SIP_MUTE, () => {
      console.info('!!!!!!!SIP_MUTE');
      this._sendTabManager(tabManagerEvents.MUTE_STATE_CHANGE, true);
      this.setMuteActive(true);
    });

    this._deps.evSubscription.subscribe(EvCallbackTypes.SIP_UNMUTE, () => {
      console.info('!!!!!!!SIP_UNMUTE');
      this._sendTabManager(tabManagerEvents.MUTE_STATE_CHANGE, false);
      this.setMuteActive(false);
    });

    // TODO: that is update session config related feature
    // triggered by agentSDK if dial destination is changed on softphone registration
    // pass in autoStartOH, maintainOH and dial destination, needed for reconnect logic
    // this._deps.evSubscription.subscribe(
    // EvCallbackTypes.SIP_DIAL_DEST_CHANGED,
    // (data) => {
    // console.info('!!!!!!!SIP_DIAL_DEST_CHANGED');
    // // AgentSvc.setDialDest(data.dialDest),
    // // SessionSvc.attemptingSoftphoneReconnect &&
    // // (data.autoStartOH
    // // ? AgentSvc.offhookInit().then(
    // // function(result) {
    // // data.maintainOH && (AgentSvc.systemInitOffhook = !1);
    // // },
    // // function(err) {
    // // SessionSvc.showOffhookError(err.detail, data.maintainOH);
    // // },
    // // )
    // // : ($timeout(function() {
    // // 'RNA-STATE' === AgentSvc.currentAgentState.baseState &&
    // // AgentSvc.setAgentState('AVAILABLE');
    // // }, 1e3),
    // // (SessionSvc.attemptingSoftphoneReconnect = !1),
    // // (SessionSvc.manualSoftphoneReconnect = !1)));
    // },
    // );
  }

  private _sipEnded() {
    this._closeRingingModal();
    this._deps.presence.setOffhook(false);
  }

  private _sipRegistered() {
    console.log('_sipRegistered~');
    this.setSipRegisterSuccess(true);
    this._eventEmitter.emit(EvSoftphoneEvents.REGISTERED);

    this._isCloseWhenCallConnected = false;
    this._closeWebRTCConnectingMask();
  }

  private _handleRegistrationFailed() {
    this._failedBlockId = this._deps.block.block();
    this._deps.evClient.sipTerminate();

    this._resetAllState();
    this._closeWebRTCConnectingMask();
    // this._deps.alert.danger({
    //   message: EvCallbackTypes.SIP_REGISTRATION_FAILED,
    //   backdrop: true,
    //   ttl: 0,
    //   allowDuplicates: false,
    // });

    this._deps.modalUI.alert({
      title: 'Registration failed',
      content: 'Will reload your pages and tabs for you',
      confirmButtonText: 'Ok',
      childrenSize: 'small',
      onConfirm: () => {
        this._sendTabManager(tabManagerEvents.SIP_REGISTRATION_FAILED_RELOAD);
        this._reloadApp();
      },
    });

    this._deps.tabManager.setMainTabId(null);
    // this._deps.routerInteraction.push('/sessionConfig');
  }

  private _reloadApp() {
    window.location.reload();
  }

  private _sipConnected() {
    this._deps.presence.setOffhook(true);
    // When connected reset all controller state
    this.resetController();
  }

  private async _showWebRTCConnectingMask() {
    this._closeWebRTCConnectingMask();
    this.setConnectingAlertId(
      await this._deps.alert.info({
        message: this._isCloseWhenCallConnected
          ? tabManagerEvents.SIP_RECONNECTING_WHEN_CALL_CONNECTED
          : tabManagerEvents.SIP_CONNECTING,
        loading: true,
      }),
    );
  }

  private _closeWebRTCConnectingMask() {
    console.log('_closeWebRTCConnectingMask~~', this.connectingAlertId);
    if (this.connectingAlertId) {
      this._deps.alert.dismiss(this.connectingAlertId);

      this.setConnectingAlertId(null);
    }
  }

  private async _showAskAudioPermissionMask() {
    this._closeAskAudioPermissionMask();
    this._audioPermissionAlertId = await this._deps.alert.info({
      message: tabManagerEvents.ASK_AUDIO_PERMISSION,
      loading: true,
      backdrop: true,
    });
  }

  private _closeAskAudioPermissionMask() {
    if (this._audioPermissionAlertId) {
      this._deps.alert.dismiss(this._audioPermissionAlertId);
      this._audioPermissionAlertId = null;
    }
  }

  private _showRingingModal({
    displayName,
    queueName,
    isInbound,
  }: ShowRingingModalProps) {
    // prevent open a lot of modal, that sdk event pass a lot of ringing state when re login
    if (this._answerModalId) {
      return;
    }

    this._playAudioLoop('ringtone');

    const { currentLocale } = this._deps.locale;

    this._answerModalId = this._deps.modalUI.confirm({
      title: i18n.getString('inviteModalTitle', currentLocale),
      content: ModalContentRendererID,
      contentProps: {
        isInbound,
        inboundTextProps: queueName && {
          incomingText: formatMessage(
            i18n.getString('incomingText', currentLocale),
            {
              displayName,
            },
          ),
          queueNameText: formatMessage(
            i18n.getString('queueNameText', currentLocale),
            {
              queueName,
            },
          ),
        },
        outboundText: formatMessage(
          i18n.getString('outboundText', currentLocale),
          {
            displayName,
          },
        ),
      },
      confirmButtonText: i18n.getString('inviteModalAnswer', currentLocale),
      cancelButtonText: i18n.getString('inviteModalReject', currentLocale),
      onConfirm: async () => {
        this._sendTabManager(tabManagerEvents.SIP_RINGING_MODAL, true);
        await this.answerCall();
      },
      onCancel: () => {
        this._sendTabManager(tabManagerEvents.SIP_RINGING_MODAL, false);
        this.rejectCall();
      },
      childrenSize: 'small',
    });
  }

  private async answerCall() {
    this._resetRingingModal();
    if (
      !this.tabManagerEnabled ||
      (this.tabManagerEnabled && this._deps.tabManager.isMainTab)
    ) {
      await this._sipAnswer();
    }
  }

  private rejectCall() {
    this._resetRingingModal();
    // when reject not show init fail
    this._deps.presence.showOffHookInitError = false;
    this._deps.evClient.sipReject();
    this._eventEmitter.emit(EvSoftphoneEvents.CALL_REJECTED);
    this.removeBeforeunload();
  }

  onceRegistered() {
    let _resolve: (value?: unknown) => void;
    let _reject: (value?: unknown) => void;

    return raceTimeout(
      new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
        this._eventEmitter.once(EvSoftphoneEvents.REGISTERED, _resolve);

        // when reset sip also need reject that
        this._eventEmitter.once(EvSoftphoneEvents.RESET, _reject);
      }),
      {
        timeout: SIP_MAX_CONNECTING_TIME,
        onTimeout: (res, rej) => {
          this._emitRegistrationFailed();
          rej('connected integratedSoftphone fail');
        },
        finalize: () => {
          _resolve();
          this._eventEmitter.off(EvSoftphoneEvents.REGISTERED, _resolve);
          this._eventEmitter.off(EvSoftphoneEvents.RESET, _reject);
        },
      },
    );
  }

  private _closeRingingModal() {
    // if there is modal there, mean another cancel this call
    if (this._answerModalId) {
      this._deps.alert.info({
        message: EvSoftphoneEvents.CALL_REJECTED,
        ttl: 0,
      });
      this._deps.modalUI.close(this._answerModalId);
      this._answerModalId = null;
      this._stopAudio();
    }
  }

  private async _registerSoftphone() {
    if (!this.sipRegistering) {
      this.setSipRegistering(true);

      this._sendTabManager(tabManagerEvents.SIP_CONNECTING);
      this._showWebRTCConnectingMask();

      console.log(
        'isReconnected, isForceLogin, _isCloseWhenCallConnected~',
        this._deps.evAgentSession.isReconnected,
        this._deps.evAgentSession.isForceLogin,
        this._isCloseWhenCallConnected,
      );

      // When that is force login is also need delay to reconnect server
      if (
        this._deps.evAgentSession.isReconnected ||
        this._deps.evAgentSession.isForceLogin
      ) {
        await sleep(
          this._isCloseWhenCallConnected
            ? RECONNECT_DEBOUNCE_TIME_WHEN_CONNECTED
            : RECONNECT_DEBOUNCE_TIME,
        );
        await this._connectedWebRTC();
      } else {
        await this._connectedWebRTC();
      }
      return;
    }

    throw new Error('Sip is registering');
  }

  private async _connectedWebRTC() {
    try {
      this._deps.evClient.sipInit();
      this._deps.evClient.sipRegister();

      await this.onceRegistered();

      this.setSipRegistering(false);
      this._closeWebRTCConnectingMask();
    } catch (error) {
      console.error(error);
    }
  }

  private _resetRingingModal() {
    this._stopAudio();
    this._answerModalId = null;
  }

  private async _sipAnswer() {
    if (this._isFirefox) {
      await raceTimeout(
        navigator.mediaDevices.getUserMedia({
          audio: true,
        }),
        {
          timeout: 2000,
          onTimeout: (resolve, reject) => {
            this._sendTabManager(
              tabManagerEvents.NOTIFY_ACTIVE_TAB_CALL_ACTIVE,
            );
            if (
              // eslint-disable-next-line no-alert
              window.confirm(
                i18n.getString(
                  'activeCallTip',
                  this._deps.locale.currentLocale,
                ),
              )
            ) {
              resolve(null);
            }
          },
        },
      );
    }
    this._deps.evClient.sipAnswer();
  }

  private _initAudio() {
    if (typeof document !== 'undefined' && document.createElement) {
      this._audio = document.createElement('audio');
    }
  }

  private _playAudioLoop(type: keyof typeof audios) {
    this._audio.loop = true;
    this._playAudio(type);
  }

  @runInActivityWebRTCTab()
  private _playAudio(type: keyof typeof audios) {
    this._audio.currentTime = 0;
    this._audio.src = audios[type];
    this._audio.play();
  }

  @runInActivityWebRTCTab()
  private _stopAudio() {
    this._audio.loop = false;
    this._audio.pause();
  }

  private _sendTabManager(event: string, value?: any) {
    this._deps.tabManager?.send(event, value);
  }

  bindBeforeunload() {
    this._deps.beforeunload.add(this._beforeunloadHandler);
  }

  removeBeforeunload() {
    this._deps.beforeunload.remove(this._beforeunloadHandler);
  }
}

export { EvIntegratedSoftphone };
