import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
  watch,
} from '@ringcentral-integration/core';
import { OmitFunctions } from '@ringcentral-integration/utils/src/typeFunctions/OmitFunctions';
import { filter, find } from 'ramda';

import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';

import type { AudioSettingsData, Deps } from './AudioSettings.interface';
import { audioSettingsErrors } from './audioSettingsErrors';

function polyfillGetUserMedia() {
  if (navigator.mediaDevices === undefined) {
    Object.assign(navigator, { mediaDevices: {} });
  }
  // @ts-expect-error TS(2339): Property 'getUserMedia' does not exist on type 'Na... Remove this comment to see the full error message
  navigator.getUserMedia =
    // @ts-expect-error TS(2339): Property 'getUserMedia' does not exist on type 'Na... Remove this comment to see the full error message
    navigator.getUserMedia ||
    (navigator as any).webkitGetUserMedia ||
    (navigator as any).mozGetUserMedia;
  if (
    navigator.mediaDevices.getUserMedia === undefined &&
    // @ts-expect-error TS(2339): Property 'getUserMedia' does not exist on type 'Na... Remove this comment to see the full error message
    navigator.getUserMedia
  ) {
    navigator.mediaDevices.getUserMedia = (constraints) =>
      new Promise((resolve, reject) => {
        // @ts-expect-error TS(2339): Property 'getUserMedia' does not exist on type 'Na... Remove this comment to see the full error message
        navigator.getUserMedia.call(navigator, constraints, resolve, reject);
      });
  }
}
polyfillGetUserMedia();

const DEFAULT_VALUE = {
  // TODO: Remember to discuss migration plans if we change these properties. Changes that cause the volume settings to change can upset users.
  ringtoneVolume: 0.5,
  callVolume: 0.5,
  outputDeviceId: 'default',
  inputDeviceId: 'default',
  ringtoneDeviceId: 'default',
  hasAutoPrompted: false,
  /**
   * automatic gain control (AGC)
   * Automatic gain control is a feature in which a sound source automatically manages
   * changes in the volume of its source media to maintain a steady overall volume level.
   * This feature is typically used on microphones, although it can be provided by other
   * input sources as well.
   */
  isAGCEnabled: false,
};

@Module({
  name: 'AudioSettings',
  deps: [
    'Auth',
    'Alert',
    'Storage',
    'AppFeatures',
    { dep: 'AudioSettingsOptions', optional: true },
  ],
})
export class AudioSettings extends RcModuleV2<Deps> {
  protected _getUserMediaPromise: Promise<MediaStream> | null = null;
  private _showCheckMediaAlert: boolean;

  constructor(deps: Deps) {
    super({
      deps,
      storageKey: 'AudioSettings',
      enableCache: true,
    });

    this._showCheckMediaAlert =
      this._deps.audioSettingsOptions?.showCheckMediaAlert ?? false;
  }

  override onInitOnce(): void | Promise<void> {
    // We add more properties to the data object
    // need to check is there any key not exist value
    // if so assign the data to default value
    if (
      Object.keys(DEFAULT_VALUE).some(
        (key) => this.data[key as keyof typeof DEFAULT_VALUE] === undefined,
      )
    ) {
      this._setData({
        ringtoneVolume: this.ringtoneVolume ?? DEFAULT_VALUE.ringtoneVolume,
        callVolume: this.callVolume ?? DEFAULT_VALUE.callVolume,
        outputDeviceId: this.outputDeviceId ?? DEFAULT_VALUE.outputDeviceId,
        inputDeviceId: this.inputDeviceId ?? DEFAULT_VALUE.inputDeviceId,
        isAGCEnabled: this.isAGCEnabled ?? DEFAULT_VALUE.isAGCEnabled,
        ringtoneDeviceId:
          this.ringtoneDeviceId ?? DEFAULT_VALUE.ringtoneDeviceId,
      });
    }
    watch(
      this,
      () => [this.isAGCEnabled, this.hasUserMedia],
      () => {
        if (this.hasUserMedia) {
          this.setAutoGainControl(this.isAGCEnabled);
        }
      },
      { multiple: true },
    );
  }

  @storage
  @state
  data: AudioSettingsData = DEFAULT_VALUE;

  @state
  availableDevices: OmitFunctions<MediaDeviceInfo>[] = [];

  @state
  hasUserMedia = false;

  @action
  setHasAutoPrompted() {
    this.data.hasAutoPrompted = true;
  }

  @action
  setUserMediaError() {
    this.hasUserMedia = false;
    this.availableDevices = [];
    this.data.outputDeviceId = 'default';
    this.data.inputDeviceId = 'default';
    this.data.ringtoneDeviceId = 'default';
  }

  @action
  setUserMediaSuccess() {
    this.hasUserMedia = true;
  }

  @action
  setAvailableDevices(devices: OmitFunctions<MediaDeviceInfo>[]) {
    this.availableDevices = devices;

    const isOutputDeviceExist = find(
      (device) =>
        device.deviceId === this.data.outputDeviceId &&
        device.kind === 'audiooutput',
      devices,
    );
    if (!isOutputDeviceExist) {
      // For Firefox, don't have default device id
      const hasDefaultDevice = find(
        (device) =>
          device.deviceId === 'default' && device.kind === 'audiooutput',
        devices,
      );
      const firstDevice = find(
        (device) => device.kind === 'audiooutput',
        devices,
      );
      if (!hasDefaultDevice && firstDevice) {
        this.data.outputDeviceId = firstDevice.deviceId;
        this.data.ringtoneDeviceId = firstDevice.deviceId;
      } else {
        this.data.outputDeviceId = 'default';
        this.data.ringtoneDeviceId = 'default';
      }
    }

    const isInputDeviceExist = find(
      (device) =>
        device.deviceId === this.data.inputDeviceId &&
        device.kind === 'audioinput',
      devices,
    );
    if (!isInputDeviceExist) {
      // For Firefox, don't have default device id
      const hasDefaultDevice = find(
        (device) =>
          device.deviceId === 'default' && device.kind === 'audioinput',
        devices,
      );
      const firstDevice = find(
        (device) => device.kind === 'audioinput',
        devices,
      );
      if (!hasDefaultDevice && firstDevice) {
        this.data.inputDeviceId = firstDevice.deviceId;
      } else {
        this.data.inputDeviceId = 'default';
      }
    }
  }

  @action
  _setData({
    ringtoneVolume = this.ringtoneVolume,
    callVolume = this.callVolume,
    outputDeviceId = this.outputDeviceId,
    inputDeviceId = this.inputDeviceId,
    ringtoneDeviceId = this.ringtoneDeviceId,
    isAGCEnabled = this.isAGCEnabled,
  }) {
    this.data.outputDeviceId = outputDeviceId;
    this.data.inputDeviceId = inputDeviceId;
    this.data.isAGCEnabled = isAGCEnabled;
    this.data.ringtoneDeviceId = ringtoneDeviceId;
    this.data.ringtoneVolume = Math.min(1, Math.max(0, ringtoneVolume));
    this.data.callVolume = Math.min(1, Math.max(0, callVolume));
  }

  override initializeProxy() {
    // Check audio permissions every time app client starts
    if (this.supportDevices) {
      this._checkDevices();
    }
    this.parentModule.store.subscribe(() => {
      if (
        this.ready &&
        this._deps.auth.loggedIn &&
        this._deps.appFeatures.isWebPhoneEnabled &&
        !this.userMedia
      ) {
        // Make sure it only prompts once
        if (this.hasAutoPrompted) return;
        this.markAutoPrompted();
        this.getUserMedia();
      }
    });
  }

  @proxify
  async markAutoPrompted() {
    this.setHasAutoPrompted();
  }

  override async _initModule() {
    super._initModule();
    if (
      navigator &&
      navigator.mediaDevices &&
      navigator.mediaDevices.addEventListener
    ) {
      navigator.mediaDevices.addEventListener('devicechange', () => {
        this._checkDevices();
      });
    }
  }

  override async onInit() {
    if (this.supportDevices) {
      await this._checkDevices();
    }
  }

  @proxify
  async setAutoGainControl(isAGCEnabled: boolean) {
    try {
      await navigator.mediaDevices.getUserMedia({
        audio: {
          autoGainControl: isAGCEnabled,
        },
      });
    } catch (err) {
      console.warn(`setAutoGainControl error:`, err);
    }
  }

  @proxify
  async _checkDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    this.setAvailableDevices(
      devices.map((d) => ({
        deviceId: d.deviceId,
        kind: d.kind,
        label: d.label,
        groupId: d.groupId,
      })),
    );
  }

  async getUserMedia() {
    if (!navigator.mediaDevices.getUserMedia) {
      return;
    }
    try {
      if (!this._getUserMediaPromise) {
        this._getUserMediaPromise = navigator.mediaDevices.getUserMedia({
          audio: true,
        });
      }
      const stream = await this._getUserMediaPromise;
      this._getUserMediaPromise = null;
      await this._onGetUserMediaSuccess();
      if (typeof stream.getTracks === 'function') {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      } else if (typeof (stream as any).stop === 'function') {
        // TODO: check type;
        (stream as any).stop();
      }
    } catch (error: any /** TODO: confirm with instanceof */) {
      this._getUserMediaPromise = null;
      this.onGetUserMediaError();
    }
  }

  @proxify
  async _onGetUserMediaSuccess() {
    const userMediaAlert = find(
      (item) =>
        item.message === audioSettingsErrors.userMediaPermission ||
        item.message === audioSettingsErrors.checkMediaPermission,
      this._deps.alert.messages,
    );
    if (userMediaAlert) {
      this._deps.alert.dismiss(userMediaAlert.id);
    }
    this.setUserMediaSuccess();
    await this._checkDevices();
  }

  @proxify
  async showPermissionAlert(ttl?: number) {
    if (this._showCheckMediaAlert) {
      this._deps.alert.warning({
        message: audioSettingsErrors.checkMediaPermission,
        allowDuplicates: false,
        ttl: 0,
      });
    } else {
      this._deps.alert.danger({
        message: audioSettingsErrors.userMediaPermission,
        allowDuplicates: false,
        ttl,
      });
    }
  }

  @proxify
  async onGetUserMediaError() {
    this.setUserMediaError();
    this.showPermissionAlert();
  }

  @proxify
  async checkAudioAvailable() {
    if (!this.userMedia) {
      this.showPermissionAlert(30 * 1000);
    }
    this.getUserMedia();
  }

  @proxify
  async showAlert() {
    if (!this.userMedia) {
      this.showPermissionAlert(30 * 1000);
    }
  }

  @proxify
  async setData({
    ringtoneVolume = this.ringtoneVolume,
    callVolume = this.callVolume,
    outputDeviceId = this.outputDeviceId,
    inputDeviceId = this.inputDeviceId,
    ringtoneDeviceId = this.ringtoneDeviceId,
    isAGCEnabled = this.isAGCEnabled,
  }: AudioSettingsData) {
    this._setData({
      ringtoneVolume,
      callVolume,
      outputDeviceId,
      inputDeviceId,
      ringtoneDeviceId,
      isAGCEnabled,
    });
  }

  get outputDeviceId() {
    return this.data.outputDeviceId;
  }

  get outputDevice() {
    return find(
      (device) =>
        device.kind === 'audiooutput' &&
        device.deviceId === this.outputDeviceId,
      this.availableDevices,
    );
  }

  get inputDeviceId() {
    return this.data.inputDeviceId;
  }

  get isAGCEnabled() {
    return this.data.isAGCEnabled;
  }

  get inputDevice() {
    return find(
      (device) =>
        device.kind === 'audioinput' && device.deviceId === this.inputDeviceId,
      this.availableDevices,
    );
  }

  get ringtoneDeviceId() {
    return this.data.ringtoneDeviceId;
  }

  get supportDevices() {
    return !!(
      navigator.mediaDevices && navigator.mediaDevices.enumerateDevices
    );
  }

  @computed(({ availableDevices }: AudioSettings) => [availableDevices])
  get availableOutputDevices() {
    return filter(
      (device) => device.kind === 'audiooutput',
      this.availableDevices,
    );
  }

  @computed(({ availableDevices }: AudioSettings) => [availableDevices])
  get availableRingtoneDevices() {
    const ringtoneDevices = filter(
      (device) => device.kind === 'audiooutput',
      this.availableDevices,
    );

    return ringtoneDevices.length > 0
      ? ringtoneDevices.concat({
          deviceId: 'off',
          groupId: '',
          kind: 'audiooutput',
          label: '',
        })
      : [];
  }

  @computed(({ availableDevices }: AudioSettings) => [availableDevices])
  get availableInputDevices() {
    return filter(
      (device) => device.kind === 'audioinput',
      this.availableDevices,
    );
  }

  get ringtoneVolume() {
    return this.data.ringtoneVolume;
  }

  get callVolume() {
    return this.data.callVolume;
  }

  get hasAutoPrompted() {
    return this.data.hasAutoPrompted;
  }

  get userMedia() {
    const isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
    if (isFirefox) {
      return true;
    }
    // this detection method may not work in the future
    // currently there is no good way to detect this
    return !!(
      this.availableDevices.length && this.availableDevices[0].label !== ''
    );
  }

  get isSupportAGC() {
    try {
      const constraints = navigator.mediaDevices.getSupportedConstraints();
      return !!constraints.autoGainControl;
    } catch (err) {
      console.error('failed to get autoGainControl support:', err);
      return false;
    }
  }
}
