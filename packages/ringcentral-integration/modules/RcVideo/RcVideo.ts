import Client from 'ringcentral-client';
import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import background from '../../lib/background';
import proxify from '../../lib/proxy/proxify';
import { selector } from '../../lib/selector';
import meetingStatus from '../Meeting/meetingStatus';
import { MeetingErrors } from '../Meeting';
import { getInitializedStartTime } from '../../helpers/meetingHelper';

import actionTypes, { RcVideoActionTypes } from './actionTypes';
import getRcVReducer, {
  getDefaultVideoSettingReducer,
  getLastVideoStorageReducer,
  getPersonalMeetingReducer,
} from './getRcVReducer';

import {
  getDefaultVideoSettings,
  validatePasswordSettings,
  generateRandomPassword,
  getTopic,
  pruneMeetingObject,
  DEFAULT_JBH,
  RcVideoTypes,
} from './videoHelper';
import { RcVMeetingModel } from '../../models/rcv.model';

import createStatus from './createStatus';

function migrateJBH(setting) {
  if (setting && Object.keys(setting).length) {
    setting.allowJoinBeforeHost =
      typeof setting.allowJoinBeforeHostV2 === 'boolean'
        ? setting.allowJoinBeforeHostV2
        : DEFAULT_JBH;
    delete setting.allowJoinBeforeHostV2;
  }
  return setting;
}

@Module({
  deps: [
    'Alert',
    'Client',
    'ExtensionInfo',
    'Brand',
    'Storage',
    { dep: 'Conference', optional: true },
    { dep: 'RcVideoOptions', optional: true },
    { dep: 'AvailabilityMonitor', optional: true },
  ],
})
export class RcVideo extends RcModule<RcVideoActionTypes> {
  private _alert: any;
  private _client: Client;
  private _defaultVideoSettingKey: string;
  private _lastVideoSettingKey: string;
  private _personalMeetingKey: string;
  private _extensionInfo: any;
  private _conference: any;
  private _brand: any;
  private _storage: any;
  private _availabilityMonitor: any;
  private _showSaveAsDefault: boolean;
  private _fetchPersonMeetingTimeout: any;
  private _enablePersonalMeeting: boolean;

  _reducer: any;

  constructor({
    alert,
    client,
    showSaveAsDefault,
    extensionInfo,
    brand,
    storage,
    reducers,
    conference,
    availabilityMonitor,
    enablePersonalMeeting = false,
    ...options
  }) {
    super({
      ...options,
      actionTypes: options.actionTypes || actionTypes,
    });
    this._alert = alert;
    this._client = client;
    this._extensionInfo = extensionInfo;
    this._brand = brand;
    this._storage = storage;
    this._conference = conference;
    this._reducer = getRcVReducer(this.actionTypes, reducers);
    this._showSaveAsDefault = showSaveAsDefault;
    this._availabilityMonitor = availabilityMonitor;
    this._defaultVideoSettingKey = 'defaultVideoSetting';
    this._lastVideoSettingKey = 'lastVideoSetting';
    this._personalMeetingKey = 'personalMeeting';
    this._enablePersonalMeeting = enablePersonalMeeting;
    if (this._showSaveAsDefault) {
      this._storage.registerReducer({
        key: this._defaultVideoSettingKey,
        reducer: getDefaultVideoSettingReducer(this.actionTypes),
      });
    } else {
      this._storage.registerReducer({
        key: this._lastVideoSettingKey,
        reducer: getLastVideoStorageReducer(this.actionTypes),
      });
    }
    if (this._enablePersonalMeeting) {
      this._storage.registerReducer({
        key: this._personalMeetingKey,
        reducer: getPersonalMeetingReducer(this.actionTypes),
      });
    }
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  _onStateChange() {
    if (this._shouldInit()) {
      this._init();
    } else if (this._shouldReset()) {
      this._reset();
    }
  }

  _shouldInit() {
    return (
      this.pending &&
      this._extensionInfo.ready &&
      this._storage.ready &&
      (!this._availabilityMonitor || this._availabilityMonitor.ready)
    );
  }

  _shouldReset() {
    return (
      this.ready &&
      !this._extensionInfo.ready &&
      !this._storage.ready &&
      (this._availabilityMonitor || !this._availabilityMonitor.ready)
    );
  }

  _reset() {
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  @proxify
  async _init() {
    this.store.dispatch({
      type: this.actionTypes.init,
    });

    if (this._enablePersonalMeeting) {
      await this._initPersonalMeeting();
    }

    this._initMeeting();

    this.store.dispatch({
      type: this.actionTypes.initSuccess,
    });
  }

  /**
   * Init basic meeting information
   * also load meeting setting from previous one.
   */
  @background
  init() {
    console.log('init meeting');
    this._initMeeting();
  }

  @proxify
  reload() {
    this._initMeeting();
  }

  private _initMeeting() {
    this.updateMeetingSettings({
      ...this.defaultVideoSetting,
      meetingPassword: generateRandomPassword(10),
      // generated random password is valid
      isMeetingPasswordValid: true,
    });
  }

  async _initPersonalMeeting() {
    if (this.personalMeeting.shortId) {
      return;
    }
    if (this._fetchPersonMeetingTimeout) {
      clearTimeout(this._fetchPersonMeetingTimeout);
    }
    try {
      const meeting = await this.fetchPersonalMeeting();
      this.store.dispatch({
        type: this.actionTypes.savePersonalMeeting,
        meeting,
      });
    } catch (e) {
      console.error('fetch default meeting error:', e);
      console.warn('retry after 10s');
      this._fetchPersonMeetingTimeout = setTimeout(() => {
        this._initPersonalMeeting();
      }, 10000);
    }
  }

  saveAsDefaultSetting(meeting) {
    const {
      allowJoinBeforeHost,
      muteAudio,
      muteVideo,
      isMeetingSecret,
      notShowAgain,
    } = meeting;
    const updateInfo: {
      allowJoinBeforeHostV2: boolean;
      muteAudio: boolean;
      muteVideo: boolean;
      isMeetingSecret: boolean;
      _saved?: boolean;
    } = {
      allowJoinBeforeHostV2: allowJoinBeforeHost,
      muteAudio,
      muteVideo,
      isMeetingSecret,
    };
    if (notShowAgain) {
      updateInfo._saved = notShowAgain;
    }
    this.store.dispatch({
      type: this.actionTypes.saveAsDefaultSetting,
      meeting: updateInfo,
    });
  }

  saveLastVideoSetting(meeting) {
    const {
      allowJoinBeforeHost,
      muteAudio,
      muteVideo,
      isMeetingSecret,
    } = meeting;
    const setting: {
      allowJoinBeforeHostV2: boolean;
      muteAudio: boolean;
      muteVideo: boolean;
      isMeetingSecret: boolean;
    } = {
      allowJoinBeforeHostV2: allowJoinBeforeHost,
      muteAudio,
      muteVideo,
      isMeetingSecret,
    };
    this.store.dispatch({
      type: this.actionTypes.saveLastVideoSetting,
      meeting: setting,
    });
  }

  validatePasswordSettings(password: string, isSecret: boolean): boolean {
    return validatePasswordSettings(password, isSecret);
  }

  generateRandomPassword() {
    return generateRandomPassword(10);
  }

  @proxify
  async createMeeting(meeting, { isAlertSuccess = true } = {}) {
    if (this.isScheduling) return (this.createMeeting as any)._promise;
    try {
      this.store.dispatch({
        type: this.actionTypes.initCreating,
      });

      if (this._showSaveAsDefault && meeting.saveAsDefault) {
        this.saveAsDefaultSetting(meeting);
      }

      (this
        .createMeeting as any)._promise = this._client.service
        .platform()
        .post('/rcvideo/v1/bridges', pruneMeetingObject(meeting));
      const meetingResult = await (this.createMeeting as any)._promise;

      this.store.dispatch({
        type: this.actionTypes.created,
        meeting,
      });

      this.saveLastVideoSetting(meeting);
      this.updateMeetingSettings({ ...meeting, saveAsDefault: false });
      this._initMeeting();

      if (isAlertSuccess) {
        setTimeout(() => {
          this._alert.info({
            message: meetingStatus.scheduledSuccess,
          });
        }, 50);
      }

      const meetingResponse = {
        extensionInfo: this._extensionInfo.info,
        dialInNumber: this._conference && this._conference.dialInNumber,
        meeting: { ...meeting, ...meetingResult.json() },
      };

      return {
        ...meetingResponse,
        ...meeting,
      };
    } catch (errors) {
      this.store.dispatch({
        type: this.actionTypes.resetCreating,
      });
      this._errorHandle(errors);
      return null;
    } finally {
      delete (this.createMeeting as any)._promise;
    }
  }

  async instantMeeting(meeting: RcVMeetingModel): Promise<any> {
    return this.createMeeting({
      ...meeting,
      expiresIn: 86400,
      type: RcVideoTypes.call,
    });
  }

  @proxify
  async getMeeting(meetingId: String) {
    const meetingResult = await this._client.service
      .platform()
      .get('/rcvideo/v1/bridges', { shortId: meetingId });
    return meetingResult.json();
  }

  @proxify
  async fetchPersonalMeeting() {
    const meetingResult = await this._client.service
      .platform()
      .get('/rcvideo/v1/bridges', { default: true });
    return meetingResult.json();
  }

  @proxify
  async updateMeeting(meetingId, meeting, { isAlertSuccess = false } = {}) {
    try {
      if (this._showSaveAsDefault && meeting.saveAsDefault) {
        this.saveAsDefaultSetting(meeting);
      }
      const meetingResult = await this._client.service.platform().send({
        method: 'PATCH',
        url: `/rcvideo/v1/bridges/${meeting.id}`,
        body: meeting,
      });

      if (isAlertSuccess) {
        setTimeout(() => {
          this._alert.info({
            message: meetingStatus.updatedSuccess,
          });
        }, 50);
      }
      const newMeeting = meetingResult.json();
      const meetingResponse = {
        extensionInfo: this._extensionInfo.info,
        dialInNumber: this._conference && this._conference.dialInNumber,
        meeting: { ...meeting, ...newMeeting },
      };
      if (this.personalMeeting && newMeeting.id === this.personalMeeting.id) {
        this.store.dispatch({
          type: this.actionTypes.savePersonalMeeting,
          meeting: newMeeting,
        });
      }
      return meetingResponse;
    } catch (errors) {
      this._errorHandle(errors);
      return null;
    }
  }

  @proxify
  updateMeetingSettings(meeting: RcVMeetingModel, patch: boolean = true) {
    this.store.dispatch({
      type: this.actionTypes.updateMeetingSettings,
      meeting,
      patch,
    });
  }

  private _errorHandle(errors: any) {
    if (errors instanceof MeetingErrors) {
      for (const error of errors.all) {
        this._alert.warning(error);
      }
    } else if (errors && errors.apiResponse) {
      const { errorCode, permissionName } = errors.apiResponse.json();
      if (errorCode === 'InsufficientPermissions' && permissionName) {
        this._alert.danger({
          message: meetingStatus.insufficientPermissions,
          payload: {
            permissionName,
          },
        });
      } else if (
        !this._availabilityMonitor ||
        !this._availabilityMonitor.checkIfHAError(errors)
      ) {
        this._alert.danger({
          message: meetingStatus.internalError,
        });
      }
    }
  }

  get meeting() {
    return this.state.meeting;
  }

  get extensionName() {
    return this._extensionInfo.info && this._extensionInfo.info.name;
  }

  get brandName() {
    return this._brand.name;
  }

  get status() {
    return this.state.status;
  }

  @selector
  defaultVideoSetting: any = [
    () => this.initialVideoSetting,
    () => {
      const savedSetting = this._showSaveAsDefault
        ? this.savedDefaultVideoSetting
        : this.lastVideoSetting;
      return savedSetting;
    },
    (initialSetting, savedSetting) => {
      return {
        ...initialSetting,
        ...savedSetting,
      };
    },
  ];

  @selector
  initialVideoSetting: any = [
    () => this.extensionName,
    () => this.brandName,
    () => getInitializedStartTime(),
    (extensionName, brandName, startTime) => {
      const topic = getTopic(extensionName, brandName);
      const setting = getDefaultVideoSettings({
        topic,
        startTime: new Date(startTime),
      });
      return setting;
    },
  ];

  get savedDefaultVideoSetting() {
    const setting = this._storage.getItem(this._defaultVideoSettingKey);
    return migrateJBH(setting);
  }

  get lastVideoSetting() {
    const setting = this._storage.getItem(this._lastVideoSettingKey);
    return migrateJBH(setting);
  }

  get isScheduling() {
    return this.state.creatingStatus === createStatus.creating;
  }

  get showSaveAsDefault() {
    return !!this._showSaveAsDefault;
  }

  get personalMeeting() {
    return this._storage.getItem(this._personalMeetingKey);
  }
}
