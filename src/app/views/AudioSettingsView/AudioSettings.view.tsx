import {
  Locale,
  type Theme,
} from '@ringcentral-integration/micro-core/src/app/services';
import { slideOutViewTransition } from '@ringcentral-integration/micro-core/src/app/views';
import {
  AudioInfo,
  TEST_STATE,
  type CallAction,
  type AudioSettings,
  type CallingSettings,
  type CallMonitor,
  type RingtoneConfiguration,
  type VolumeInspector,
  type Webphone,
} from '@ringcentral-integration/micro-phone/src/app/services';
import {
  delegate,
  dynamic,
  injectable,
  optional,
  RcViewModule,
  RouterPlugin,
  UIFunctions,
  UIProps,
  useConnector,
  watch,
} from '@ringcentral-integration/next-core';
import { OmitFunctions } from '@ringcentral-integration/utils/src/typeFunctions/OmitFunctions';
import { AudioSettingsPanel } from '@ringcentral-integration/widgets/components/AudioSettingsPanel';
import { AudioSettingsPanel as AudioSettingsPanelV2 } from '@ringcentral-integration/widgets/components/AudioSettingsPanelV2';
import type { AudioSettingsPanelProps as AudioSettingsPanelV2Props } from '@ringcentral-integration/widgets/components/AudioSettingsPanelV2';
import React, { useRef } from 'react';
import { v4 as uuid } from 'uuid';

import type {
  AudioSettingsPanelProps,
  AudioSettingsViewOptions,
  AudioSettingsViewProps,
} from './AudioSettings.view.interface';
import {
  AudioSettingsPanel as SpringAudioSettingsPanel,
  AudioSettingsPanelProps as SpringAudioSettingsPanelProps,
} from './AudioSettingsPanel';

@injectable({
  name: 'AudioSettingsView',
})
export class AudioSettingsView extends RcViewModule {
  @dynamic('Theme')
  private _theme?: Theme;

  constructor(
    protected _locale: Locale,
    protected _router: RouterPlugin,
    @optional('AudioSettingsViewOptions')
    protected _audioSettingsViewOptions?: AudioSettingsViewOptions,
  ) {
    super();
  }

  @dynamic('RingtoneConfiguration')
  protected readonly _ringtoneConfiguration?: RingtoneConfiguration;

  @dynamic('VolumeInspector')
  protected readonly _volumeInspector?: VolumeInspector;

  @dynamic('AudioSettings')
  protected readonly _audioSettings!: AudioSettings;

  @dynamic('CallingSettings')
  protected readonly _callingSettings!: CallingSettings;

  @dynamic('CallMonitor')
  protected readonly _callMonitor!: CallMonitor;

  @dynamic('Webphone')
  protected readonly _webphone?: Webphone;

  @dynamic('CallAction')
  protected readonly _callAction?: CallAction;

  get showSetting() {
    return !!this._audioSettings;
  }

  checkAllDevicesAreEmpty(devices: OmitFunctions<MediaDeviceInfo>[]) {
    return devices.every(
      (item) =>
        (item.label === '' && item.deviceId === '') ||
        (item.label === '' && item.deviceId === 'off'),
    );
  }

  @delegate('all')
  async listenToMicrophonePermission() {
    // listen to the microphone permission change event
    navigator?.permissions
      ?.query({ name: 'microphone' as PermissionName })
      .then((permissionStatus) => {
        permissionStatus.onchange = async () => {
          if (permissionStatus.state === 'denied') {
            await this._volumeInspector?.stopAudioTest();
          }
          await this._audioSettings.ensureGetUserMediaPermission();
        };
      });
  }

  // TODO: we should probably refactor this:
  // - the watch logic likely should be part of webphone module
  // - this microphone permission logic should be moved into AudioSettings, and might not need
  //   to be dependent on whether active call audio control is enabled or not
  override async onInitOnce() {
    if (this.enableActiveCallAudioControl) {
      this.listenToMicrophonePermission();
      watch(
        this,
        () => this._audioSettings.inputDeviceId,
        async (newInputDeviceId) => {
          const webphoneSessionId =
            this._callAction?.displayCallAllInfo?.call?.webphoneSession?.id;
          if (webphoneSessionId && newInputDeviceId) {
            await this.replaceSessionInputStream(webphoneSessionId);
          }
        },
      );
    }
  }

  @delegate('mainClient')
  async replaceSessionInputStream(webphoneSessionId: string) {
    try {
      // TODO: the sip process definitely needs to be in webphone module
      const sipSession = this._webphone?.originalSessions[webphoneSessionId];
      const pc = sipSession?.sessionDescriptionHandler?.peerConnection;
      const constraints = {
        audio: await this._audioSettings.getInputDeviceOptions(),
        video: false,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const audioTrack = stream.getAudioTracks()[0];
      pc?.getSenders().forEach((sender: Readonly<RTCRtpSender>) => {
        if (sender.track && sender.track.kind === audioTrack.kind) {
          this.logger.info(
            `Find audio track in sender, label: ${sender.track.label} enabled:${
              sender.track.enabled
            } muted:${sender.track.muted} readyState:${
              sender.track.readyState
            } sampleRate: ${sender.track.getSettings().sampleRate}`,
          );
          audioTrack.enabled = sender.track.enabled;
          const oldTrack = sender.track;
          sender
            .replaceTrack(audioTrack)
            .then(() => {
              this.logger.info(
                `Replace track succeed, current MediaTrackSettings: ${JSON.stringify(
                  audioTrack.getSettings(),
                )}`,
              );
              oldTrack.stop();
            })
            .catch((e) => {
              this.logger.info('Replace track failed', e);
            });
        }
      });
    } catch (e) {
      this.logger.error('Replace session input stream failed', e);
    }
  }

  getUIProps():
    | UIProps<AudioSettingsPanelProps>
    | UIProps<AudioSettingsPanelV2Props> {
    const isHavingCall = !!(
      (this._webphone && this._webphone.sessions.length > 0) ||
      this._callMonitor.activeRingCalls.length +
        this._callMonitor.activeOnHoldCalls.length +
        this._callMonitor.activeCurrentCalls.length >
        0
    );
    return {
      currentLocale: this._locale.currentLocale,
      hasUserMedia: this._audioSettings.hasUserMedia,
      isAGCEnabled: this._audioSettings.isAGCEnabled,
      showAGCEnabled: this._audioSettings.isSupportAGC,
      ringtoneVolume: this._audioSettings.ringtoneVolume,
      callVolume: this._audioSettings.callVolume,
      availableInputDevices: this._audioSettings.availableInputDevices,
      // use the data.inputDeviceId as we do want to allow users to still pick the default device
      // and the ux should reflect that
      inputDeviceId: this._audioSettings.data.inputDeviceId,
      availableOutputDevices: this._audioSettings.availableOutputDevices,
      availableRingtoneDevices: this._audioSettings.availableRingtoneDevices,
      outputDeviceId: this._audioSettings.data.outputDeviceId,
      ringtoneDeviceId: this._audioSettings.ringtoneDeviceId,
      supportDevices: this._audioSettings.supportDevices,
      userMedia: this._audioSettings.userMedia,
      isWebRTC:
        this._callingSettings.callWith ===
        this._callingSettings.callingOptions.browser,
      outputDeviceDisabled:
        !this._audioSettings.availableOutputDevices.length ||
        this.checkAllDevicesAreEmpty(
          this._audioSettings.availableOutputDevices,
        ),
      inputDeviceDisabled: !!(
        !this._audioSettings.availableInputDevices.length ||
        (this.enableActiveCallAudioControl ? false : isHavingCall) ||
        this.checkAllDevicesAreEmpty(this._audioSettings.availableInputDevices)
      ),
      ringtoneSelectDisabled:
        isHavingCall ||
        !this._audioSettings.availableOutputDevices.length ||
        this.checkAllDevicesAreEmpty(
          this._audioSettings.availableOutputDevices,
        ),
      showCallVolume: this._audioSettingsViewOptions?.showCallVolume,
      showRingToneVolume: this._audioSettingsViewOptions?.showRingToneVolume,
      volumeTestData: this._volumeInspector?.data,
      selectedRingtoneId: this._ringtoneConfiguration?.selectedRingtoneId,
      fullRingtoneList: this._ringtoneConfiguration?.fullRingtoneList || [],
      isUploadRingtoneDisabled:
        this._ringtoneConfiguration?.isUploadRingtoneDisabled,
      enableCustomRingtone: this._ringtoneConfiguration?.enableCustomRingtone,
    };
  }

  getUIFunctions():
    | UIFunctions<AudioSettingsPanelProps>
    | UIFunctions<AudioSettingsPanelV2Props>
    | UIFunctions<SpringAudioSettingsPanelProps> {
    return {
      onBackButtonClick: () =>
        slideOutViewTransition(
          () => this._router.goBack(),
          this._theme?.reducedMotion,
        ),
      onSave: (data) => this._audioSettings.setData(data),
      checkUserMedia: () => this._audioSettings.ensureGetUserMediaPermission(),
      checkAudioAvailable: () =>
        this._audioSettings.checkAudioAvailable({ checkIfNoDevices: false }),
      handleTestMicroClick: (testState: TEST_STATE) => {
        this._volumeInspector?.handleTestMicroClick(testState);
      },
      handleTestSpeakerClick: (testState: TEST_STATE) => {
        this._volumeInspector?.handleTestSpeakerClick(testState);
      },
      updateCurrentRingtone: (id) => {
        if (!this._ringtoneConfiguration) return;
        this._ringtoneConfiguration.setSelectedRingtoneId(id);
        this._ringtoneConfiguration.updateIncomingRingtone();
      },
      removeCustomRingtone: (id) => {
        this._ringtoneConfiguration?.removeCustomRingtone(id);
      },
      uploadCustomRingtone: (audioInfo: AudioInfo) => {
        const id = `custom-${uuid()}`;
        this._ringtoneConfiguration?.uploadCustomRingtone(
          {
            id,
            name: audioInfo.fileName,
            url: audioInfo.dataUrl,
            type: 'custom',
          },
          // only display alert on spring-ui mode
          process.env.THEME_SYSTEM === 'spring-ui',
        );
        this.selectToRingtone(id);
      },
      showDangerAlert: (message) => {
        this._ringtoneConfiguration?.showDangerAlert(message);
      },
      onExit: async () => {
        if (this.enableActiveCallAudioControl) {
          await this._volumeInspector?.stopAudioTest();
        }
      },
    };
  }

  get enableActiveCallAudioControl() {
    return this._audioSettings.enableActiveCallAudioControl;
  }

  selectToRingtone(id: string) {
    this._ringtoneConfiguration?.setSelectedRingtoneId(id);
    this._ringtoneConfiguration?.updateIncomingRingtone();
  }

  component(props: AudioSettingsViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions());

    const _props = useConnector(() => {
      const uiProps = this.getUIProps();

      return {
        ...props,
        ...uiProps,
      };
    });

    if (process.env.THEME_SYSTEM === 'spring-ui') {
      const Component =
        this._audioSettingsViewOptions?.component || SpringAudioSettingsPanel;
      //@ts-expect-error
      return <Component {..._props} {...uiFunctions} />;
    }

    const Component =
      this._audioSettingsViewOptions?.component ||
      (props.useV2 ? AudioSettingsPanelV2 : AudioSettingsPanel);

    //@ts-expect-error
    return <Component {..._props} {...uiFunctions} />;
  }
}
