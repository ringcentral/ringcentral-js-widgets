import {
  action,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import EventEmitter from 'events';
import formatMessage from 'format-message';
import { Module } from 'ringcentral-integration/lib/di';
import sleep from 'ringcentral-integration/lib/sleep';

import {
  dialoutStatuses,
  EvSoftphoneEvents,
  tabManagerEvents,
} from '../../enums';
import { EvCallbackTypes } from '../../lib/EvClient/enums';
import { HeartBeat } from '../../lib/heartBeat';
import { raceTimeout } from '../../lib/time';
import { audios } from './audios';
import { Deps, IntegratedSoftphone } from './EvIntegratedSoftphone.interface';
import i18n from './i18n';
import { runInActivityWebRTCTab } from './runInActivityWebRTCTab.decorator';

const SECOND = 1000;
const RECONNECT_DEBOUNCE_TIME = SECOND * 5;
const RECONNECT_DEBOUNCE_TIME_WHEN_CONNECTED = SECOND * 15;
const SIP_MAX_CONNECTING_TIME = SECOND * 30;

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
    'Modal',
    'Alert',
    { dep: 'TabManager', optional: true },
    { dep: 'EvIntegratedSoftphoneOptions', optional: true },
  ],
})
class EvIntegratedSoftphone extends RcModuleV2<Deps>
  implements IntegratedSoftphone {
  autoAnswerCheckFn: () => boolean;

  private _audio: HTMLAudioElement;

  private _eventEmitter = new EventEmitter();

  private _answerModalId: string = null;

  /** audio permission alert id */
  private _audioPermissionAlertId: string = null;

  private _checkWebRTCIntervalId: NodeJS.Timeout;

  private _heartBeat: HeartBeat;

  private _heartBeatIntervalTime: number;

  private _isReconnected = false;

  private _beforeunloadHandler = () => this.isWebRTCTab;

  private _isCloseWhenCallConnected = false;

  get tabManagerEnabled() {
    return this._deps.tabManager?._tabbie.enabled;
  }

  get isWebRTCTab() {
    return (
      !this.tabManagerEnabled || this.webRTCTabId === this._deps.tabManager.id
    );
  }

  get isWebRTCTabAlive() {
    return (
      !this.tabManagerEnabled ||
      (this.webRTCTabId &&
        this._deps.tabManager.checkTabAliveById(this.webRTCTabId))
    );
  }

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'EvIntegratedSoftphone',
    });
    const heartBeatInterval =
      this._deps.evIntegratedSoftphoneOptions?.heartBeatInterval ?? 1000;
    if (this.tabManagerEnabled) {
      this._heartBeat = new HeartBeat(
        `${this._deps.tabManager._tabbie.prefix}webRTCConnect`,
        heartBeatInterval,
      );
      this._heartBeatIntervalTime = heartBeatInterval;
    }
  }

  // @state
  // dtmfString: string = '';

  @storage
  @state
  muteActive = false;

  @state
  sipRegisterSuccess = false;

  @state
  sipRegistering = false;

  @storage
  @state
  webRTCTabId: string = null;

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
  resetController() {
    // this.dtmfString = '';
    this.muteActive = false;
  }

  @action
  setMuteActive(state: boolean) {
    this.muteActive = state;
  }

  @action
  setWebRTCTabId(id: string) {
    this.webRTCTabId = id;
  }

  @action
  resetSip() {
    this.sipRegistering = false;
    this.sipRegisterSuccess = false;

    this.webRTCTabId = null;
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

    if (this.tabManagerEnabled) {
      this._bindCheckWebRTCInterval();
    }

    this._deps.evAgentSession.onTriggerConfig.push(async () => {
      if (
        this._deps.evAgentSession.isIntegratedSoftphone &&
        !this.isWebRTCTabAlive
      ) {
        await this.connectWebRTC();
      }
    });

    this._deps.evAuth.beforeAgentLogout(() => {
      this._closeWebRTCConnectingMask();
      this.resetSip();
      this._clearWebRTCInterval();
      this._heartBeat?.destroy();

      this._deps.evClient.sipTerminate();
    });

    this._deps.beforeunload.onAfterUnload(() => {
      this._sendTabManager(tabManagerEvents.CLOSE_WHEN_CALL_CONNECTED);
    });
  }

  private _clearWebRTCInterval() {
    if (this._checkWebRTCIntervalId) {
      clearInterval(this._checkWebRTCIntervalId);
      this._checkWebRTCIntervalId = null;
    }
  }

  private _bindCheckWebRTCInterval() {
    this._deps.evAgentSession.onConfigSuccess.push(() => {
      if (this._deps.evAgentSession.isIntegratedSoftphone) {
        // when config success, if that webRTC tab is alive set sip register success to true
        if (this.isWebRTCTabAlive) {
          this.setSipRegisterSuccess(true);
        }

        if (typeof this._checkWebRTCIntervalId === 'number') return;

        this._checkWebRTCIntervalId = setInterval(async () => {
          // if that is registering or is that connected tab, remove that interval to check
          if (this.sipRegistering || this.isWebRTCTab) {
            this._clearWebRTCInterval();
            return;
          }

          if (
            this._deps.evAuth.connected &&
            this._deps.evAgentSession.configSuccess &&
            !this.isWebRTCTabAlive &&
            !this._heartBeat.isWorkingByLocal &&
            !this._heartBeat.isSuccessByLocal
          ) {
            this._heartBeat.heartBeatOnWorking();

            // when that is connecting
            this._closeWebRTCConnectingMask();

            this.setWebRTCTabId(null);

            try {
              await this._deps.block.next(async () => {
                console.log('!!!configureAgent');
                await this._deps.evAgentSession.configureAgent(false);
              });
            } catch (error) {
              console.error('re config fail', error);

              this._emitRegistrationFailed();

              return;
            }

            this._isReconnected = true;
            this._clearWebRTCInterval();
            await this.connectWebRTC();
          }
        }, this._heartBeatIntervalTime);
      }
    });
  }

  private _emitRegistrationFailed() {
    this._deps.evSubscription.emit(
      EvCallbackTypes.SIP_REGISTRATION_FAILED,
      null,
    );
  }

  async onStateChange() {
    if (this.ready && this.tabManagerEnabled && this._deps.tabManager.ready) {
      this._checkTabManagerEvent();
    }
  }

  private _checkTabManagerEvent() {
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
        case tabManagerEvents.SET_WEB_RTC_TAB_ID:
          // when set tab id, reset the connected state to false
          this._isCloseWhenCallConnected = false;
          this.setWebRTCTabId(data);
          this._closeWebRTCConnectingMask();
          break;
        case tabManagerEvents.SIP_RINGING:
          this._showRingingModal(data);
          break;
        case tabManagerEvents.SIP_RINGING_MODAL:
          // that event call from modal ok or cancel, that auto close modal
          this._deps.modal.close(this._answerModalId);
          if (data) {
            this.answerCall();
          } else {
            this.rejectCall();
          }
          break;
        case tabManagerEvents.MUTE_STATE_CHANGE:
          this.setMuteActive(data);
          break;
        case tabManagerEvents.SIP_REGISTERED:
          this._sipRegistered();
          break;
        case tabManagerEvents.SIP_UNREGISTERED:
          this.setSipRegisterSuccess(false);
          break;
        case tabManagerEvents.SIP_REGISTRATION_FAILED:
          this._handleRegistrationFailed();
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
        default:
          break;
      }
    }
  }

  sipToggleMute(state: boolean) {
    this._deps.evClient.sipToggleMute(state);
  }

  onRinging(callback: () => void) {
    this._eventEmitter.on(EvCallbackTypes.SIP_RINGING, callback);
  }

  async askAudioPermission(showMask: boolean = true) {
    let showMaskTimeout = null;
    try {
      if (showMask) {
        /**
         *  using timeout when navigator.mediaDevices.getUserMedia is already completed,
         *  that will very quick close, so remove that when very quick.
         */
        showMaskTimeout = setTimeout(() => {
          this._sendTabManager(tabManagerEvents.ASK_AUDIO_PERMISSION, true);
          this._showAskAudioPermissionMask();
          showMaskTimeout = null;
        }, 100);
      }

      await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    } catch (error) {
      this._deps.alert.danger({
        message: EvSoftphoneEvents.AUDIO_STREAM_REJECTED,
        backdrop: true,
        ttl: 0,
      });

      throw new Error('Need Audio permission');
    } finally {
      if (showMask) {
        if (showMaskTimeout) {
          clearTimeout(showMaskTimeout);
        }
        if (this._audioPermissionAlertId) {
          this._sendTabManager(tabManagerEvents.ASK_AUDIO_PERMISSION, false);
          this._closeAskAudioPermissionMask();
        }
      }
    }

    if (!this.sipRegisterSuccess) {
      await this._registerSoftphone();
    }
  }

  private async connectWebRTC() {
    const isConfiguringByLocal = this._heartBeat.isWorkingByLocal;

    if (this.tabManagerEnabled && !isConfiguringByLocal) {
      this._heartBeat.heartBeatOnWorking();
    }

    this._bindingIntegratedSoftphone();

    // when init set register to be false
    this.resetSip();

    await this.askAudioPermission();
  }

  private _bindingIntegratedSoftphone() {
    this._deps.evSubscription.subscribe(EvCallbackTypes.SIP_REGISTERED, () => {
      // That will call several times when reconnected.
      console.log('!!!!!!!SIP_REGISTERED');
      if (!this.sipRegisterSuccess) {
        this._setWebRTCTabId();
        this._heartBeat.heartBeatOnSuccess();

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
      () => {
        console.log('!!!!!!!SIP_REGISTRATION_FAILED');
        this.setSipRegistering(false);

        this._sendTabManager(tabManagerEvents.SIP_REGISTRATION_FAILED);
        this._handleRegistrationFailed();
      },
    );

    this._deps.evSubscription.subscribe(
      EvCallbackTypes.SIP_RINGING,
      (ringingCall) => {
        console.log('!!!!!!!SIP_RINGING');
        this._eventEmitter.emit(EvCallbackTypes.SIP_RINGING);

        if (this.autoAnswerCheckFn()) {
          return this._sipAnswer();
        }

        const { displayName } = ringingCall.data.request.from;

        this._sendTabManager(tabManagerEvents.SIP_RINGING, displayName);
        this._showRingingModal(displayName);
      },
    );

    this._deps.evSubscription.subscribe(EvCallbackTypes.SIP_CONNECTED, () => {
      this._deps.beforeunload.add(this._beforeunloadHandler);

      console.info('!!!!!!!SIP_CONNECTED');
      this._sendTabManager(tabManagerEvents.SIP_CONNECTED);
      this._sipConnected();
    });

    this._deps.evSubscription.subscribe(EvCallbackTypes.SIP_ENDED, () => {
      console.info('!!!!!!!SIP_ENDED');
      this._deps.beforeunload.remove(this._beforeunloadHandler);

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
    this._deps.evSettings.setOffhook(false);
  }

  private _sipRegistered() {
    this.setSipRegisterSuccess(true);
    this._eventEmitter.emit(EvSoftphoneEvents.REGISTERED);
  }

  private _handleRegistrationFailed() {
    this._deps.evClient.sipTerminate();
    this._deps.evAuth.newReconnect();

    this.setSipRegisterSuccess(false);
    this._closeWebRTCConnectingMask();
    this._deps.alert.danger({
      message: EvCallbackTypes.SIP_REGISTRATION_FAILED,
      backdrop: true,
      ttl: 0,
      allowDuplicates: false,
    });
    this._deps.routerInteraction.push('/sessionConfig');
  }

  private _sipConnected() {
    this._deps.evSettings.setOffhook(true);
    // When connected reset all controller state
    this.resetController();
  }

  private _showWebRTCConnectingMask() {
    this._closeWebRTCConnectingMask();
    this.setConnectingAlertId(
      this._deps.alert.info({
        message: this._isCloseWhenCallConnected
          ? tabManagerEvents.SIP_RECONNECTING_WHEN_CALL_CONNECTED
          : tabManagerEvents.SIP_CONNECTING,
        loading: true,
      }),
    );
  }

  private _closeWebRTCConnectingMask() {
    if (this.connectingAlertId) {
      this._deps.alert.dismiss(this.connectingAlertId);

      this.setConnectingAlertId(null);
    }
  }

  private _showAskAudioPermissionMask() {
    this._closeAskAudioPermissionMask();
    this._audioPermissionAlertId = this._deps.alert.info({
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

  private _showRingingModal(displayName: string) {
    // prevent open a lot of modal, that sdk event pass a lot of ringing state when re login
    if (this._answerModalId) {
      return;
    }

    this._playAudioLoop('ringtone');

    const { currentLocale } = this._deps.locale;

    this._answerModalId = this._deps.modal.confirm({
      title: i18n.getString('inviteModalTitle', currentLocale),
      content: formatMessage(
        i18n.getString('inviteModalContent', currentLocale),
        {
          displayName,
        },
      ),
      okText: i18n.getString('inviteModalAnswer', currentLocale),
      cancelText: i18n.getString('inviteModalReject', currentLocale),
      onOK: () => {
        this._sendTabManager(tabManagerEvents.SIP_RINGING_MODAL, true);
        this.answerCall();
      },
      onCancel: () => {
        this._sendTabManager(tabManagerEvents.SIP_RINGING_MODAL, false);
        this.rejectCall();
      },
    });
  }

  private answerCall() {
    this._resetRingingModal();
    this._sipAnswer();
  }

  private rejectCall() {
    this._resetRingingModal();
    // when reject not show init fail
    this._deps.presence.showOffHookInitError = false;
    this._deps.evClient.sipReject();
    this._eventEmitter.emit(EvSoftphoneEvents.CALL_REJECTED);
  }

  onceRegistered() {
    return raceTimeout(
      new Promise((resolve) =>
        this._eventEmitter.once(EvSoftphoneEvents.REGISTERED, resolve),
      ),
      { timeout: SIP_MAX_CONNECTING_TIME },
    );
  }

  private _closeRingingModal() {
    // if there is modal there, mean another cancel this call
    if (this._answerModalId) {
      this._deps.alert.info({
        message: EvSoftphoneEvents.CALL_REJECTED,
        ttl: 0,
      });
      this._deps.modal.close(this._answerModalId);
      this._answerModalId = null;
      this._stopAudio();
    }
  }

  private async _registerSoftphone() {
    if (!this.sipRegistering) {
      this.setSipRegistering(true);

      this._sendTabManager(tabManagerEvents.SIP_CONNECTING);
      this._showWebRTCConnectingMask();

      // When that is force login is also need delay to reconnect server
      if (this._isReconnected || this._deps.evAgentSession.isForceLogin) {
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
    this._deps.evClient.sipInit();
    this._deps.evClient.sipRegister();

    try {
      await this.onceRegistered();

      this.setSipRegistering(false);

      this._setWebRTCTabId();
    } catch (error) {
      console.error(error);

      this._emitRegistrationFailed();
    }
  }

  private _setWebRTCTabId() {
    if (this.tabManagerEnabled) {
      const { id } = this._deps.tabManager;

      this._sendTabManager(tabManagerEvents.SET_WEB_RTC_TAB_ID, id);
      this.setWebRTCTabId(id);
    }
    this._closeWebRTCConnectingMask();
  }

  private _resetRingingModal() {
    this._stopAudio();
    this._answerModalId = null;
  }

  private _sipAnswer() {
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
}

export { EvIntegratedSoftphone };
