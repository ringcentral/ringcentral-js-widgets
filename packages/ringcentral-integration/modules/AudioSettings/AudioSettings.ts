import { filter, find } from 'ramda';

import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';

import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import type { AudioSettingsData, Deps } from './AudioSettings.interface';
import { audioSettingsErrors } from './audioSettingsErrors';

function polyfillGetUserMedia() {
  if (navigator.mediaDevices === undefined) {
    Object.assign(navigator, { mediaDevices: {} });
  }
  // @ts-expect-error
  navigator.getUserMedia =
    // @ts-expect-error
    navigator.getUserMedia ||
    (navigator as any).webkitGetUserMedia ||
    (navigator as any).mozGetUserMedia;
  if (
    navigator.mediaDevices.getUserMedia === undefined &&
    // @ts-expect-error
    navigator.getUserMedia
  ) {
    navigator.mediaDevices.getUserMedia = (constraints) =>
      new Promise((resolve, reject) => {
        // @ts-expect-error
        navigator.getUserMedia.call(navigator, constraints, resolve, reject);
      });
  }
}
polyfillGetUserMedia();

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

  constructor(deps: Deps) {
    super({
      deps,
      storageKey: 'AudioSettings',
      enableCache: true,
    });
  }

  @storage
  @state
  data: AudioSettingsData = {
    dialButtonVolume: 1,
    dialButtonMuted: false,
    ringtoneVolume: 0.3,
    ringtoneMuted: false,
    callVolume: 1,
    outputDeviceId: 'default',
    inputDeviceId: 'default',
    hasAutoPrompted: false,
  };

  @state
  availableDevices: MediaDeviceInfo[] = [];

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
  }

  @action
  setUserMediaSuccess() {
    this.hasUserMedia = true;
  }

  @action
  setAvailableDevices(devices: MediaDeviceInfo[]) {
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
      } else {
        this.data.outputDeviceId = 'default';
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
    dialButtonVolume = this.dialButtonVolume,
    dialButtonMuted = this.dialButtonMuted,
    ringtoneVolume = this.ringtoneVolume,
    ringtoneMuted = this.ringtoneMuted,
    callVolume = this.callVolume,
    outputDeviceId = this.outputDeviceId,
    inputDeviceId = this.inputDeviceId,
  }) {
    this.data.outputDeviceId = outputDeviceId;
    this.data.inputDeviceId = inputDeviceId;
    this.data.dialButtonVolume = Math.min(1, Math.max(0, dialButtonVolume));
    this.data.dialButtonMuted = !!dialButtonMuted;
    this.data.ringtoneVolume = Math.min(1, Math.max(0, ringtoneVolume));
    this.data.ringtoneMuted = !!ringtoneMuted;
    this.data.callVolume = Math.min(1, Math.max(0.1, callVolume));
  }

  override initializeProxy() {
    // Check audio permissions everytime app client starts
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
  async _checkDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    this.setAvailableDevices(
      // TODO: formatting for devices info instances and replace JSON APIs.
      devices.map((d) => JSON.parse(JSON.stringify(d))),
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
      (item) => item.message === audioSettingsErrors.userMediaPermission,
      this._deps.alert.messages,
    );
    if (userMediaAlert) {
      this._deps.alert.dismiss(userMediaAlert.id);
    }
    this.setUserMediaSuccess();
    await this._checkDevices();
  }

  @proxify
  async onGetUserMediaError() {
    this.setUserMediaError();
    this._deps.alert.danger({
      message: audioSettingsErrors.userMediaPermission,
      allowDuplicates: false,
    });
  }

  @proxify
  async showAlert() {
    if (!this.userMedia) {
      this._deps.alert.danger({
        message: audioSettingsErrors.userMediaPermission,
        allowDuplicates: false,
        ttl: 30 * 1000,
      });
    }
  }

  @proxify
  async setData({
    dialButtonVolume = this.dialButtonVolume,
    dialButtonMuted = this.dialButtonMuted,
    ringtoneVolume = this.ringtoneVolume,
    ringtoneMuted = this.ringtoneMuted,
    callVolume = this.callVolume,
    outputDeviceId = this.outputDeviceId,
    inputDeviceId = this.inputDeviceId,
  }) {
    this._setData({
      dialButtonVolume,
      dialButtonMuted,
      ringtoneVolume,
      ringtoneMuted,
      callVolume,
      outputDeviceId,
      inputDeviceId,
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

  get inputDevice() {
    return find(
      (device) =>
        device.kind === 'audioinput' && device.deviceId === this.inputDeviceId,
      this.availableDevices,
    );
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
  get availableInputDevices() {
    return filter(
      (device) => device.kind === 'audioinput',
      this.availableDevices,
    );
  }

  get dialButtonVolume() {
    return this.data.dialButtonVolume;
  }

  get dialButtonMuted() {
    return this.data.dialButtonMuted;
  }

  get ringtoneVolume() {
    return this.data.ringtoneVolume;
  }

  get ringtoneMuted() {
    return this.data.ringtoneMuted;
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
}
