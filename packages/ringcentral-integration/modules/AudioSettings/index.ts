import { filter, find } from 'ramda';

import { Module } from '../../lib/di';
import ensureExist from '../../lib/ensureExist';
import proxify from '../../lib/proxy/proxify';
import RcModule from '../../lib/RcModule';
import { selector } from '../../lib/selector';
import { actionTypes } from './actionTypes';
import { audioSettingsErrors } from './audioSettingsErrors';
import getAudioSettingsReducer from './getAudioSettingsReducer';
import getStorageReducer from './getStorageReducer';

function polyfillGetUserMedia() {
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
  if (
    navigator.mediaDevices.getUserMedia === undefined &&
    navigator.getUserMedia
  ) {
    navigator.mediaDevices.getUserMedia = (constraints) =>
      new Promise((resolve, reject) => {
        navigator.getUserMedia.call(navigator, constraints, resolve, reject);
      });
  }
}
polyfillGetUserMedia();

/**
 * @class
 * @description AudioSettings module.
 */
@Module({
  deps: ['Auth', 'Alert', 'Storage', 'AppFeatures'],
})
export default class AudioSettings extends RcModule {
  constructor({ auth, alert, storage, appFeatures, ...options }) {
    super({
      ...options,
      actionTypes,
    });
    this._storage = ensureExist.call(this, storage, 'storage');
    this._auth = ensureExist.call(this, auth, 'auth');
    this._alert = ensureExist.call(this, alert, 'alert');
    this._appFeatures = appFeatures;
    this._storageKey = 'audioSettings';
    this._storage.registerReducer({
      key: this._storageKey,
      reducer: getStorageReducer(this.actionTypes),
    });
    this._reducer = getAudioSettingsReducer(this.actionTypes);
  }

  initializeProxy() {
    // Check audio permissions everytime app client starts
    if (this.supportDevices) {
      this._checkDevices();
    }
    this.store.subscribe(() => {
      if (
        this.ready &&
        this._auth.loggedIn &&
        this._appFeatures.isWebPhoneEnabled &&
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
    this.store.dispatch({
      type: this.actionTypes.autoPrompted,
    });
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
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

  _shouldInit() {
    return !!(
      this.pending &&
      this._storage.ready &&
      this._auth.ready &&
      this._appFeatures.ready
    );
  }

  _shouldReset() {
    return !!(
      this.ready &&
      (!this._auth.ready || !this._storage.ready || !this._appFeatures.ready)
    );
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      if (this.supportDevices) {
        await this._checkDevices();
      }
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this._shouldReset()) {
      this.store.dispatch({
        type: this.actionTypes.reset,
      });
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    }
  }

  @proxify
  async _checkDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    this.store.dispatch({
      type: this.actionTypes.setAvailableDevices,
      // TODO formatting for devices info instances and replace JSON APIs.
      devices: devices.map((d) => JSON.parse(JSON.stringify(d))),
    });
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
      } else if (typeof stream.stop === 'function') {
        stream.stop();
      }
    } catch (error) {
      this._getUserMediaPromise = null;
      this.onGetUserMediaError(error);
    }
  }

  @proxify
  async _onGetUserMediaSuccess() {
    const userMediaAlert = find(
      (item) => item.message === audioSettingsErrors.userMediaPermission,
      this._alert.messages,
    );
    if (userMediaAlert) {
      this._alert.dismiss(userMediaAlert.id);
    }
    this.store.dispatch({
      type: this.actionTypes.getUserMediaSuccess,
    });
    await this._checkDevices();
  }

  @proxify
  async onGetUserMediaError(error) {
    this.store.dispatch({
      type: this.actionTypes.getUserMediaError,
      error,
    });
    this._alert.danger({
      message: audioSettingsErrors.userMediaPermission,
      allowDuplicates: false,
    });
  }

  @proxify
  async showAlert() {
    if (!this.userMedia) {
      this._alert.danger({
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
    this.store.dispatch({
      type: this.actionTypes.setData,
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
    return this._storage.getItem(this._storageKey).outputDeviceId;
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
    return this._storage.getItem(this._storageKey).inputDeviceId;
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

  get availableDevices() {
    return this.state.availableDevices;
  }

  @selector
  availableOutputDevices = [
    () => this.state.availableDevices,
    (devices) => filter((device) => device.kind === 'audiooutput', devices),
  ];

  @selector
  availableInputDevices = [
    () => this.state.availableDevices,
    (devices) => filter((device) => device.kind === 'audioinput', devices),
  ];

  get cacheData() {
    return this._storage.getItem(this._storageKey) || {};
  }

  get dialButtonVolume() {
    return this.cacheData.dialButtonVolume;
  }

  get dialButtonMuted() {
    return this.cacheData.dialButtonMuted;
  }

  get ringtoneVolume() {
    return this.cacheData.ringtoneVolume;
  }

  get ringtoneMuted() {
    return this.cacheData.ringtoneMuted;
  }

  get callVolume() {
    return this.cacheData.callVolume;
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

  get hasAutoPrompted() {
    return this.cacheData.hasAutoPrompted;
  }

  get status() {
    return this.state.status;
  }
}
