/* eslint-disable react-hooks/rules-of-hooks */
import {
  AppFeatures,
  Auth,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  Brand,
  Toast,
  ToastManager,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  computed,
  delegate,
  injectable,
  optional,
  portal,
  PortManager,
  RcModule,
  state,
  StoragePlugin,
  subscribe,
  userStorage,
  watch,
} from '@ringcentral-integration/next-core';
import { OmitFunctions } from '@ringcentral-integration/utils/src/typeFunctions/OmitFunctions';
import FormattedMessage from '@ringcentral-integration/widgets/components/FormattedMessage';
import { RcLink } from '@ringcentral/juno';
import isEqual from 'lodash/isEqual';
import { filter, find } from 'ramda';
import React from 'react';

import type {
  AudioSettingsData,
  AudioSettingsOptions,
} from './AudioSettings.interface';
import i18n, { t } from './i18n';

const DEFAULT_DEVICE_ID = 'default';
// windows only
const DEFAULT_COMMUNICATION_DEVICE_ID = 'communications';

export const DEFAULT_VALUE = {
  // TODO: Remember to discuss migration plans if we change these properties. Changes that cause the volume settings to change can upset users.
  ringtoneVolume: 0.5,
  callVolume: 0.5,
  outputDeviceId: DEFAULT_DEVICE_ID,
  outputDeviceLabel: null,
  inputDeviceId: DEFAULT_DEVICE_ID,
  inputDeviceLabel: null,
  ringtoneDeviceId: DEFAULT_DEVICE_ID,
  hasAutoPrompted: false,
  /**
   * automatic gain control (AGC)
   * Automatic gain control is a feature in which a sound source automatically manages
   * changes in the volume of its source media to maintain a steady overall volume level.
   * This feature is typically used on microphones, although it can be provided by other
   * input sources as well.
   */
  isAGCEnabled: false,
} as const;

export function polyfillGetUserMedia() {
  if (navigator.mediaDevices === undefined) {
    Object.assign(navigator, { mediaDevices: {} });
  }
  // @ts-ignore
  navigator.getUserMedia =
    // @ts-ignore
    navigator.getUserMedia ||
    (navigator as any).webkitGetUserMedia ||
    (navigator as any).mozGetUserMedia;
  if (
    navigator.mediaDevices.getUserMedia === undefined &&
    // @ts-ignore
    navigator.getUserMedia
  ) {
    navigator.mediaDevices.getUserMedia = (constraints) =>
      new Promise((resolve, reject) => {
        // @ts-ignore
        navigator.getUserMedia.call(navigator, constraints, resolve, reject);
      });
  }
}
polyfillGetUserMedia();

@injectable({
  name: 'AudioSettings',
})
export class AudioSettings extends RcModule {
  protected uniqueManager = this._toastManager.createUniqueManager();
  protected _getUserMediaPromise: Promise<MediaStream> | null = null;
  // in spring-ui, we always show the check media alert
  protected _showCheckMediaAlert: boolean =
    process.env.THEME_SYSTEM === 'spring-ui';

  constructor(
    protected _auth: Auth,
    protected _toast: Toast,
    protected _brand: Brand,
    protected _storage: StoragePlugin,
    protected _appFeatures: AppFeatures,
    protected _portManager: PortManager,
    protected _toastManager: ToastManager,
    @optional('AudioSettingsOptions')
    protected _audioSettingsOptions?: AudioSettingsOptions,
  ) {
    super();
    this._storage.enable(this, {
      migrations: [['data', 'AudioSettings-data']],
    });
    if (this._portManager.shared) {
      this._portManager.onMainTab(() => this.initialize());
    } else {
      this.initialize();
    }
    if (process.env.THEME_SYSTEM !== 'spring-ui') {
      this._showCheckMediaAlert =
        this._audioSettingsOptions?.showCheckMediaAlert ?? false;
    }
  }

  /**
   * Helper method to check if a device ID is one of the default IDs
   */
  protected _isDefaultDeviceId(deviceId: string): boolean {
    return (
      deviceId === DEFAULT_DEVICE_ID ||
      deviceId === DEFAULT_COMMUNICATION_DEVICE_ID
    );
  }

  /**
   * Helper method to handle default device fallback logic
   */
  protected _getDefaultDeviceFallback({
    devices,
    deviceKind,
    preferredDefaultId,
  }: {
    devices: OmitFunctions<MediaDeviceInfo>[];
    deviceKind: 'audioinput' | 'audiooutput';
    preferredDefaultId: string;
  }): { deviceId: string; label: string | null } {
    // Check if preferred default exists
    const hasPreferredDefault = find(
      (device) =>
        device.deviceId === preferredDefaultId && device.kind === deviceKind,
      devices,
    );
    if (hasPreferredDefault) {
      return {
        deviceId: preferredDefaultId,
        label: hasPreferredDefault.label,
      };
    }

    // Check if regular default exists
    const hasDefaultDevice = find(
      (device) =>
        device.deviceId === DEFAULT_DEVICE_ID && device.kind === deviceKind,
      devices,
    );
    if (hasDefaultDevice) {
      return { deviceId: DEFAULT_DEVICE_ID, label: hasDefaultDevice.label };
    }

    // Fall back to first available device
    const firstDevice = find((device) => device.kind === deviceKind, devices);
    if (firstDevice) {
      return { deviceId: firstDevice.deviceId, label: firstDevice.label };
    }

    // No devices available
    return { deviceId: DEFAULT_DEVICE_ID, label: null };
  }

  /**
   * Helper method to find device by ID or label
   */
  protected _findDevice({
    devices,
    deviceIdOrLabel,
    deviceKind,
    searchByLabel = false,
  }: {
    devices: OmitFunctions<MediaDeviceInfo>[];
    deviceIdOrLabel: string | null;
    deviceKind: 'audioinput' | 'audiooutput';
    searchByLabel?: boolean;
  }): OmitFunctions<MediaDeviceInfo> | undefined {
    if (!deviceIdOrLabel) return undefined;
    if (searchByLabel) {
      return find(
        (device) =>
          device.kind === deviceKind && device.label === deviceIdOrLabel,
        devices,
      );
    }
    return find(
      (device) =>
        device.deviceId === deviceIdOrLabel && device.kind === deviceKind,
      devices,
    );
  }

  @userStorage
  @state
  data: AudioSettingsData = {
    ...DEFAULT_VALUE,
  };

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
    this.data.ringtoneDeviceId = '';
    this.data.outputDeviceId = '';
    this.data.inputDeviceId = '';
  }

  @action
  _setUserMediaSuccess() {
    this.hasUserMedia = true;
  }

  @delegate('server')
  async setUserMediaSuccess() {
    this._setUserMediaSuccess();
  }

  /**
   * Helper function to handle device label update
   */
  protected _handleDeviceLabelUpdate({
    type,
    currentDevice,
    currentDeviceLabel,
    deviceLabelKey,
  }: {
    type: 'inputDevice' | 'outputDevice';
    currentDevice: OmitFunctions<MediaDeviceInfo>;
    currentDeviceLabel: string | null;
    deviceLabelKey: 'outputDeviceLabel' | 'inputDeviceLabel';
  }): Partial<AudioSettingsData> {
    const result: Partial<AudioSettingsData> = {};

    if (currentDevice.label !== currentDeviceLabel) {
      this.logger.info(`${type} label updated`, {
        previousLabel: currentDeviceLabel,
        newLabel: currentDevice.label,
        deviceId: currentDevice.deviceId,
      });
      result[deviceLabelKey] = currentDevice.label;
    }

    return result;
  }

  /**
   * Helper function to handle device found by label
   */
  protected _handleDeviceFoundByLabel({
    type,
    foundDevice,
    currentDeviceId,
    isOutput,
    deviceIdKey,
    deviceLabelKey,
  }: {
    type: 'inputDevice' | 'outputDevice';
    foundDevice: OmitFunctions<MediaDeviceInfo>;
    currentDeviceId: string;
    isOutput: boolean;
    deviceIdKey: 'outputDeviceId' | 'inputDeviceId';
    deviceLabelKey: 'outputDeviceLabel' | 'inputDeviceLabel';
  }): Partial<AudioSettingsData> {
    const result: Partial<AudioSettingsData> = {};

    this.logger.info(`${type} ID updated due to device change`, {
      previousDeviceId: currentDeviceId,
      newDeviceId: foundDevice.deviceId,
      deviceLabel: foundDevice.label,
    });

    result[deviceIdKey] = foundDevice.deviceId;
    result[deviceLabelKey] = foundDevice.label;

    if (isOutput) {
      result.ringtoneDeviceId = foundDevice.deviceId;
    }

    return result;
  }

  /**
   * Helper function to handle fallback to default device
   */
  protected _handleFallbackToDefault({
    type,
    devices,
    deviceKind,
    currentDeviceId,
    currentDeviceLabel,
    isOutput,
    deviceIdKey,
    deviceLabelKey,
  }: {
    type: 'inputDevice' | 'outputDevice';
    devices: OmitFunctions<MediaDeviceInfo>[];
    deviceKind: 'audioinput' | 'audiooutput';
    currentDeviceId: string;
    currentDeviceLabel: string | null;
    isOutput: boolean;
    deviceIdKey: 'outputDeviceId' | 'inputDeviceId';
    deviceLabelKey: 'outputDeviceLabel' | 'inputDeviceLabel';
  }): Partial<AudioSettingsData> {
    const result: Partial<AudioSettingsData> = {};

    const fallback = this._getDefaultDeviceFallback({
      devices,
      deviceKind,
      preferredDefaultId: DEFAULT_DEVICE_ID,
    });

    this.logger.info(`${type} reset to default due to device unavailability`, {
      previousDeviceId: currentDeviceId,
      previousLabel: currentDeviceLabel,
      fallbackDeviceId: fallback.deviceId,
      fallbackLabel: fallback.label,
    });

    result[deviceIdKey] = fallback.deviceId;
    result[deviceLabelKey] = fallback.label;

    if (isOutput) {
      result.ringtoneDeviceId = fallback.deviceId;
    }

    return result;
  }

  /**
   * Helper function to find fallback settings for a specific device type
   * @param devices - Available devices list
   * @param type - Device type ('inputDevice' or 'outputDevice')
   * @returns Partial settings object with updated device properties
   */
  protected _findFallBackSettings(
    devices: OmitFunctions<MediaDeviceInfo>[],
    type: 'inputDevice' | 'outputDevice',
  ): Partial<AudioSettingsData> {
    const isOutput = type === 'outputDevice';
    const deviceKind = isOutput ? 'audiooutput' : 'audioinput';
    const currentDeviceId = isOutput
      ? this.data.outputDeviceId
      : this.data.inputDeviceId;
    const currentDeviceLabel = isOutput
      ? this.data.outputDeviceLabel
      : this.data.inputDeviceLabel;

    const deviceIdKey = isOutput ? 'outputDeviceId' : 'inputDeviceId';
    const deviceLabelKey = isOutput ? 'outputDeviceLabel' : 'inputDeviceLabel';

    // Check if current device exists in new device list
    const currentDevice = this._findDevice({
      devices,
      deviceIdOrLabel: currentDeviceId,
      deviceKind,
    });

    if (currentDevice) {
      // Device exists, update label if different
      return this._handleDeviceLabelUpdate({
        type,
        currentDevice,
        currentDeviceLabel,
        deviceLabelKey,
      });
    }

    // Device doesn't exist, try to find by label first
    const foundDevice = this._findDevice({
      devices,
      deviceIdOrLabel: currentDeviceLabel,
      deviceKind,
      searchByLabel: true,
    });

    if (foundDevice) {
      // Found device with same label, update device ID
      return this._handleDeviceFoundByLabel({
        type,
        foundDevice,
        currentDeviceId,
        isOutput,
        deviceIdKey,
        deviceLabelKey,
      });
    }

    // No device found by label, fall back to default
    return this._handleFallbackToDefault({
      type,
      devices,
      deviceKind,
      currentDeviceId,
      currentDeviceLabel,
      isOutput,
      deviceIdKey,
      deviceLabelKey,
    });
  }

  @action
  _setAvailableDevices(devices: OmitFunctions<MediaDeviceInfo>[]) {
    this.availableDevices.splice(0, this.availableDevices.length, ...devices);

    // Get fallback settings for both input and output devices
    const outputSettings = this._findFallBackSettings(devices, 'outputDevice');
    const inputSettings = this._findFallBackSettings(devices, 'inputDevice');

    // Merge settings and update state only if there are changes
    const combinedSettings: Partial<AudioSettingsData> = {
      ...outputSettings,
      ...inputSettings,
    };

    // Update state with the combined settings (only properties that have changed)
    (Object.keys(combinedSettings) as (keyof AudioSettingsData)[]).forEach(
      // https://github.com/microsoft/TypeScript/issues/32693
      // deliberately type the key to avoid type error
      <K extends keyof AudioSettingsData>(key: K) => {
        const value = combinedSettings[key];
        if (value !== undefined && this.data[key] !== value) {
          this.data[key] = value;
        }
      },
    );
  }

  @delegate('server')
  async setAvailableDevices(devices: OmitFunctions<MediaDeviceInfo>[]) {
    this._setAvailableDevices(devices);
  }

  @action
  _setData(data: AudioSettingsData) {
    Object.assign(this.data, data);
  }

  @delegate('server')
  async markAutoPrompted() {
    this.setHasAutoPrompted();
  }

  protected initialize(): () => void {
    if (
      navigator &&
      navigator.mediaDevices &&
      navigator.mediaDevices.addEventListener
    ) {
      navigator.mediaDevices.addEventListener('devicechange', () => {
        this.checkDevices();
      });
    }
    if (this.supportDevices) {
      this.checkDevices();
    }
    return subscribe(this, () => {
      if (
        this.ready &&
        this._auth.loggedIn &&
        this._appFeatures.isWebPhoneEnabled &&
        !this.userMedia
      ) {
        // Make sure it only prompts once
        if (this.hasAutoPrompted) return;
        this.markAutoPrompted();
        this.ensureGetUserMediaPermission();
      }
    });
  }

  @delegate('mainClient')
  override async onInit() {
    if (this.supportDevices) {
      await this.checkDevices();
    }
  }

  override async onInitOnce() {
    // We add more properties to the data object
    // need to check is there any key not exist value
    // if so assign the data to default value
    if (
      Object.keys(DEFAULT_VALUE).some(
        (key) => this.data[key as keyof typeof DEFAULT_VALUE] === undefined,
      )
    ) {
      this.setData({
        ringtoneVolume: this.ringtoneVolume ?? DEFAULT_VALUE.ringtoneVolume,
        callVolume: this.callVolume ?? DEFAULT_VALUE.callVolume,
        outputDeviceId:
          this.data.outputDeviceId ?? DEFAULT_VALUE.outputDeviceId,
        outputDeviceLabel:
          this.data.outputDeviceLabel ?? DEFAULT_VALUE.outputDeviceLabel,
        // make sure to use data.inputDeviceId here instead of inputDeviceId getter
        inputDeviceId: this.data.inputDeviceId ?? DEFAULT_VALUE.inputDeviceId,
        inputDeviceLabel:
          this.data.inputDeviceLabel ?? DEFAULT_VALUE.inputDeviceLabel,
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

  @delegate('mainClient')
  async setAutoGainControl(isAGCEnabled: boolean) {
    try {
      const constraints = isAGCEnabled
        ? { autoGainControl: true }
        : {
            autoGainControl: false,
            /**
             * https://stackoverflow.com/questions/44307432/how-to-disable-system-audio-enhancements-using-webrtc
             * disable system audio enhancements using webRTC
             */
            googAutoGainControl: false,
            googAutoGainControl2: false,
          };
      await navigator.mediaDevices.getUserMedia({
        audio: constraints,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(`setAutoGainControl error:`, err);
    }
  }

  /**
   * @description Force the module to re-enumerate the devices to get the latest devices data
   */
  async checkDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const devicesData = devices.map((x) => ({
      deviceId: x.deviceId,
      groupId: x.groupId,
      kind: x.kind,
      label: x.label,
    }));
    if (!isEqual(devicesData, this.availableDevices)) {
      // avoid unnecessary updates
      this.setAvailableDevices(devicesData);
    }
  }

  async _getUserMedia(
    audioConstraints: boolean | MediaTrackConstraints = true,
    autoStop = true,
  ) {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: audioConstraints,
    });
    // autoStop is used when we only get the user media for permission check
    // we don't need to hold on the device audio stream
    // so we will just stop the stream
    if (autoStop) {
      if (typeof stream.getTracks === 'function') {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      } else if (typeof (stream as any).stop === 'function') {
        // TODO: check type;
        (stream as any).stop();
      }
    }
    return stream;
  }

  /**
   * Get user media permission
   * !!! Don't use `@delegate('client')` or `@delegate('mainClient')`  here,
   * !!! because in shared tab, server tab should be executed and in safari each tab has its own permission
   */
  @delegate('all')
  async ensureGetUserMediaPermission() {
    if (!global.document) {
      return;
    }
    if (!navigator.mediaDevices.getUserMedia) {
      return;
    }
    try {
      if (!this._getUserMediaPromise) {
        this._getUserMediaPromise = this._getUserMedia();
      }
      await this._getUserMediaPromise;
      this._getUserMediaPromise = null;
      await this._onGetUserMediaSuccess();
      await this.checkDevices();
    } catch (error) {
      this._getUserMediaPromise = null;
      this.onGetUserMediaError();
    }
  }

  @delegate('server')
  async _onGetUserMediaSuccess() {
    await this._toast.dismissByGroup([this.identifier]);
    this.setUserMediaSuccess();
  }

  @portal
  protected noPermissionToast = this._toast.create({
    view: () => {
      const { t } = useLocale(i18n);

      const checkPermissionAction =
        process.env.THEME_SYSTEM === 'spring-ui' ? (
          <button
            type="button"
            className="underline"
            onClick={async () => {
              await this.ensureGetUserMediaPermission();
            }}
            data-sign="checkPermissionAction"
          >
            {t('checkPermission')}
          </button>
        ) : (
          <RcLink
            color="inherit"
            underline
            style={{
              fontStyle: 'inherit',
            }}
            onClick={async () => {
              await this.ensureGetUserMediaPermission();
            }}
            data-sign="checkPermissionAction"
          >
            {t('checkPermission')}
          </RcLink>
        );

      return (
        <FormattedMessage
          message={t('checkMediaPermission')}
          values={{ checkPermissionAction, brandName: this._brand.name }}
        />
      );
    },
    props: () => ({
      level: 'warning',
      ttl: 0,
      group: this.identifier,
    }),
  });

  @delegate('server')
  async showPermissionAlert(ttl?: number) {
    if (this._showCheckMediaAlert) {
      return this.uniqueManager.unique(
        () => this._toast.open(this.noPermissionToast),
        'keep',
      );
    } else {
      this._toast.danger({
        message: this._getUserMediaPermissionMessage(),
        allowDuplicates: false,
        group: this.identifier,
        ttl,
      });
    }
  }

  @delegate('server')
  async onGetUserMediaError() {
    this.setUserMediaError();
    this.showPermissionAlert();
  }

  protected _getUserMediaPermissionMessage() {
    return t('userMediaPermission', {
      application: this._brand.appName as string,
    });
  }

  @delegate('server')
  async checkAudioAvailable(options: { checkIfNoDevices: boolean }) {
    if (!this.userMedia) {
      this.showPermissionAlert(30 * 1000);
      if (!options.checkIfNoDevices) {
        return;
      }
    }
    this.ensureGetUserMediaPermission();
  }

  @delegate('server')
  async setData({
    ringtoneVolume = this.ringtoneVolume,
    callVolume = this.callVolume,
    ringtoneDeviceId = this.ringtoneDeviceId,
    outputDeviceId = this.data.outputDeviceId,
    outputDeviceLabel = this.data.outputDeviceLabel,
    // make sure to use data.inputDeviceId here instead of inputDeviceId getter
    inputDeviceId = this.data.inputDeviceId,
    inputDeviceLabel = this.data.inputDeviceLabel,
    isAGCEnabled = this.isAGCEnabled,
    hasAutoPrompted = this.data.hasAutoPrompted,
  }) {
    this._setData({
      ringtoneVolume: Math.min(1, Math.max(0, ringtoneVolume)),
      callVolume: Math.min(1, Math.max(0, callVolume)),
      ringtoneDeviceId,
      outputDeviceId,
      outputDeviceLabel,
      inputDeviceId,
      inputDeviceLabel,
      isAGCEnabled,
      hasAutoPrompted,
    });
  }

  get ringtoneDeviceId() {
    return this.data.ringtoneDeviceId;
  }

  @computed
  get outputDeviceId() {
    const outputDeviceId = this.data.outputDeviceId;
    // https://issues.chromium.org/issues/40199570
    // there seems to be an issue where using the 'default' device id may be ambiguous
    // so here we do a best effort approach to use the actual device id if possible
    if (this._isDefaultDeviceId(outputDeviceId)) {
      const groupId = this.availableOutputDevices.find(
        (device) => device.deviceId === outputDeviceId,
      )?.groupId;
      const outputDevice = this.availableOutputDevices.find(
        (device) =>
          device.groupId === groupId && device.deviceId !== outputDeviceId,
      );
      return outputDevice?.deviceId ?? outputDeviceId;
    }
    return outputDeviceId;
  }

  get outputDevice() {
    return find(
      (device) =>
        device.kind === 'audiooutput' &&
        device.deviceId === this.outputDeviceId,
      this.availableDevices,
    );
  }

  get outputDeviceLabel() {
    return this.data.outputDeviceLabel;
  }

  @delegate('server')
  async setOutputDevice(deviceId: string) {
    const device = find(
      (device) => device.deviceId === deviceId,
      this.availableOutputDevices,
    );

    this.setData({
      outputDeviceId: deviceId,
      outputDeviceLabel: device?.label ?? null,
    });
  }

  @computed
  get inputDeviceId() {
    const inputDeviceId = this.data.inputDeviceId;
    // https://issues.chromium.org/issues/40199570
    // there seems to be an issue where using the 'default' device id may be ambiguous
    // so here we do a best effort approach to use the actual device id if possible
    if (this._isDefaultDeviceId(inputDeviceId)) {
      const groupId = this.availableInputDevices.find(
        (device) => device.deviceId === inputDeviceId,
      )?.groupId;
      const inputDevice = this.availableInputDevices.find(
        (device) =>
          device.groupId === groupId && device.deviceId !== inputDeviceId,
      );
      return inputDevice?.deviceId ?? inputDeviceId;
    }
    return inputDeviceId;
  }

  async getInputDeviceOptions(): Promise<boolean | MediaTrackConstraints> {
    // make sure to get the latest available devices
    // this is important because sometimes the browser changes the deviceId completely
    await this.checkDevices();
    this.logger.info(
      `getInputDeviceOptions: inputDeviceId: ${this.inputDeviceId}`,
    );
    if (this.inputDeviceId) {
      try {
        // try to see if the browser accept the exact deviceId
        await this._getUserMedia({
          deviceId: {
            exact: this.inputDeviceId,
          },
        });
        return {
          deviceId: {
            exact: this.inputDeviceId,
          },
        };
      } catch (err) {
        this.logger.info(
          `getInputDeviceOptions: browser doesn't accept the exact deviceId, err: `,
          err,
        );
      }
    }
    this.logger.info(
      'getInputDeviceOptions: default to true for audio constraints',
    );
    return true;
  }

  get inputDevice() {
    return find(
      (device) =>
        device.kind === 'audioinput' && device.deviceId === this.inputDeviceId,
      this.availableDevices,
    );
  }

  get inputDeviceLabel() {
    return this.data.inputDeviceLabel;
  }

  @delegate('server')
  async setInputDevice(deviceId: string) {
    const device = find(
      (device) => device.deviceId === deviceId,
      this.availableInputDevices,
    );

    this.setData({
      inputDeviceId: deviceId,
      inputDeviceLabel: device?.label ?? null,
    });
  }

  get supportDevices() {
    return !!(
      navigator.mediaDevices && navigator.mediaDevices.enumerateDevices
    );
  }

  @computed
  get availableOutputDevices() {
    return filter(
      (device) => device.kind === 'audiooutput',
      this.availableDevices,
    );
  }

  @computed
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

  @computed
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

  get enableActiveCallAudioControl() {
    return process.env.THEME_SYSTEM === 'spring-ui';
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

  get isAGCEnabled() {
    return this.data.isAGCEnabled;
  }

  get isSupportAGC() {
    try {
      const constraints = navigator.mediaDevices.getSupportedConstraints();
      return !!constraints.autoGainControl;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('failed to get autoGainControl support:', err);
      return false;
    }
  }
}
