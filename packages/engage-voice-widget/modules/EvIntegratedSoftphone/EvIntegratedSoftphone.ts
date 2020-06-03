import {
  RcModuleState,
  RcModuleV2,
  state,
  action,
  storage,
} from '@ringcentral-integration/core';
import EventEmitter from 'events';
import formatMessage from 'format-message';
import { Module } from 'ringcentral-integration/lib/di';

import { EvCallbackTypes } from '../../lib/EvClient/enums';
import { audios } from './audios';
import {
  DepsModules,
  State,
  IntegratedSoftphone,
} from './EvIntegratedSoftphone.interface';
import i18n from './i18n';
import { EvSoftphoneEvents } from '../../enums';
import { raceTimeout } from '../../lib/time';

type EvIntegratedSoftphoneState = RcModuleState<EvIntegratedSoftphone, State>;

@Module({
  name: 'EvIntegratedSoftphone',
  deps: [
    'Locale',
    'RouterInteraction',
    'EvSessionConfig',
    'EvSubscription',
    'EvSettings',
    'EvClient',
    'Presence',
    'Storage',
    'Modal',
    'Alert',
    { dep: 'EvIntegratedSoftphoneOptions', optional: true },
  ],
})
class EvIntegratedSoftphone
  extends RcModuleV2<DepsModules, EvIntegratedSoftphoneState>
  implements IntegratedSoftphone {
  autoAnswerCheckFn: () => boolean;

  private _audio: HTMLAudioElement;

  private _eventEmitter = new EventEmitter();

  private _answerModalId: string = null;

  private sipRegistering = false;

  constructor({
    locale,
    routerInteraction,
    evSessionConfig,
    evSubscription,
    evSettings,
    evClient,
    storage,
    presence,
    modal,
    alert,
    enableCache = true,
  }) {
    super({
      modules: {
        locale,
        routerInteraction,
        evSessionConfig,
        evSubscription,
        evSettings,
        evClient,
        storage,
        presence,
        modal,
        alert,
      },
      enableCache,
      storageKey: 'EvIntegratedSoftphone',
    });

    this._initAudio();
  }

  // @state
  // dtmfString: string = '';

  @storage
  @state
  muteActive: boolean = false;

  @storage
  @state
  softphoneRegistered: boolean = false;

  // this is for dialPad click when on call
  // @action
  // sipSendDTMF(dtmf: string) {
  //   this.state.dtmfString += dtmf;
  //   this._modules.evClient.sipSendDTMF(dtmf);
  // }

  @action
  reset() {
    // this.state.dtmfString = '';
    this.state.muteActive = false;
  }

  @action
  setMuteActive(state: boolean) {
    this.state.muteActive = state;
  }

  @action
  setSoftphoneRegistered(state: boolean) {
    this.state.softphoneRegistered = state;
  }

  onInitOnce() {
    this._modules.evSessionConfig.onTriggerConfig.push(async () => {
      if (this._modules.evSessionConfig.isIntegrated) {
        this._bindingIntegratedSoftphone();
        // when init set register to be false
        this.setSoftphoneRegistered(false);
        await this.askAudioPermission();
      }
    });
  }

  sipToggleMute(state: boolean) {
    this._modules.evClient.sipToggleMute(state);
  }

  async askAudioPermission() {
    try {
      await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    } catch (error) {
      this._modules.alert.danger({
        message: EvSoftphoneEvents.AUDIO_STREAM_REJECTED,
        backdrop: true,
      });

      throw new Error('Need Audio permission');
    }

    if (!this.softphoneRegistered) {
      await this._registerSoftphone();
    }
  }

  private _bindingIntegratedSoftphone() {
    this._modules.evSubscription.subscribe(
      EvCallbackTypes.SIP_REGISTERED,
      () => {
        console.log('!!!!!!!SIP_REGISTERED');
        this.setSoftphoneRegistered(true);
        this._eventEmitter.emit(EvSoftphoneEvents.REGISTERED);
      },
    );

    this._modules.evSubscription.subscribe(
      EvCallbackTypes.SIP_UNREGISTERED,
      () => {
        console.log('!!!!!!!SIP_UNREGISTERED');
        this.setSoftphoneRegistered(false);
      },
    );

    this._modules.evSubscription.subscribe(
      EvCallbackTypes.SIP_REGISTRATION_FAILED,
      () => {
        console.log('!!!!!!!SIP_REGISTRATION_FAILED');
        this._modules.alert.danger({
          message: EvCallbackTypes.SIP_REGISTRATION_FAILED,
          backdrop: true,
          ttl: 0,
        });
      },
    );

    this._modules.evSubscription.subscribe(
      EvCallbackTypes.SIP_RINGING,
      (ringingCall) => {
        console.log('!!!!!!!SIP_RINGING');
        if (this.autoAnswerCheckFn()) {
          return this._sipAnswer();
        }
        this._showRingingModal(ringingCall);
      },
    );

    this._modules.evSubscription.subscribe(
      EvCallbackTypes.SIP_CONNECTED,
      () => {
        // console.info('!!!!!!!SIP_CONNECTED');
        this._modules.evSettings.setOffhook(true);
        // When connected reset all state
        this.reset();
      },
    );

    this._modules.evSubscription.subscribe(EvCallbackTypes.SIP_ENDED, () => {
      // console.info('!!!!!!!SIP_ENDED');
      this._closeRingingModal();
      this._modules.evSettings.setOffhook(false);
    });

    this._modules.evSubscription.subscribe(EvCallbackTypes.SIP_MUTE, () => {
      this.setMuteActive(true);
    });

    this._modules.evSubscription.subscribe(EvCallbackTypes.SIP_UNMUTE, () => {
      this.setMuteActive(false);
    });

    // TODO: that is update session config related feature
    // triggered by agentSDK if dial destination is changed on softphone registration
    // pass in autoStartOH, maintainOH and dial destination, needed for reconnect logic
    // this._modules.evSubscription.subscribe(
    //   EvCallbackTypes.SIP_DIAL_DEST_CHANGED,
    //   (data) => {
    //     console.info('!!!!!!!SIP_DIAL_DEST_CHANGED');
    //     // AgentSvc.setDialDest(data.dialDest),
    //     //   SessionSvc.attemptingSoftphoneReconnect &&
    //     //     (data.autoStartOH
    //     //       ? AgentSvc.offhookInit().then(
    //     //           function(result) {
    //     //             data.maintainOH && (AgentSvc.systemInitOffhook = !1);
    //     //           },
    //     //           function(err) {
    //     //             SessionSvc.showOffhookError(err.detail, data.maintainOH);
    //     //           },
    //     //         )
    //     //       : ($timeout(function() {
    //     //           'RNA-STATE' === AgentSvc.currentAgentState.baseState &&
    //     //             AgentSvc.setAgentState('AVAILABLE');
    //     //         }, 1e3),
    //     //         (SessionSvc.attemptingSoftphoneReconnect = !1),
    //     //         (SessionSvc.manualSoftphoneReconnect = !1)));
    //   },
    // );
  }

  private _showRingingModal(ringingCall: any) {
    this._playAudioLoop('ringtone');
    const { displayName } = ringingCall.data.request.from;
    this._answerModalId = this._modules.modal.confirm({
      title: i18n.getString(
        'inviteModalTitle',
        this._modules.locale.currentLocale,
      ),
      content: formatMessage(
        i18n.getString(
          'inviteModalContent',
          this._modules.locale.currentLocale,
        ),
        {
          displayName,
        },
      ),
      okText: i18n.getString(
        'inviteModalAnswer',
        this._modules.locale.currentLocale,
      ),
      cancelText: i18n.getString(
        'inviteModalReject',
        this._modules.locale.currentLocale,
      ),
      onOK: () => {
        this._resetRingingModal();
        this._sipAnswer();
      },
      onCancel: () => {
        // when reject not show init fail
        this._resetRingingModal();
        this._modules.presence.showOffHookInitError = false;
        this._modules.evClient.sipReject();
        this._eventEmitter.emit(EvSoftphoneEvents.CALL_REJECTED);
      },
    });
  }

  private _closeRingingModal() {
    // if there is modal there, mean another cancel this call
    if (this._answerModalId) {
      this._modules.alert.info({
        message: EvSoftphoneEvents.CALL_REJECTED,
        ttl: 0,
      });
      this._modules.modal.close(this._answerModalId);
      this._answerModalId = null;
      this._stopAudio();
    }
  }

  private async _registerSoftphone() {
    if (!this.sipRegistering) {
      this.sipRegistering = true;
      this._modules.evClient.sipInit();
      this._modules.evClient.sipRegister();

      try {
        await raceTimeout(
          new Promise((resolve) =>
            this._eventEmitter.once(EvSoftphoneEvents.REGISTERED, resolve),
          ),
          {
            timeout: 10 * 1000,
          },
        );
      } catch (error) {
        this._modules.evSubscription.emit(
          EvCallbackTypes.SIP_REGISTRATION_FAILED,
          null,
        );
      }

      this.sipRegistering = false;
    }

    throw new Error('Sip is registering');
  }

  private _resetRingingModal() {
    this._stopAudio();
    this._answerModalId = null;
  }

  private _sipAnswer() {
    this._modules.evClient.sipAnswer();
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

  private _playAudio(type: keyof typeof audios) {
    this._audio.currentTime = 0;
    this._audio.src = audios[type];
    this._audio.play();
  }

  private _stopAudio() {
    this._audio.loop = false;
    this._audio.pause();
  }
}

export { EvIntegratedSoftphone };
