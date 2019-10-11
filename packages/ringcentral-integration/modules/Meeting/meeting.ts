import moment from 'moment';
import { find } from 'ramda';
import Client from 'ringcentral-client';

import {
  getDefaultMeetingSettings,
  getInitializedStartTime,
  getMobileDialingNumberTpl,
  getPhoneDialingNumberTpl,
  MeetingType,
  UTC_TIMEZONE_ID,
} from '../../helpers/meetingHelper';
import background from '../../lib/background';
import { Module } from '../../lib/di';
import proxify from '../../lib/proxy/proxify';
import RcModule from '../../lib/RcModule';
import actionTypes, { MeetingActionTypes } from './actionTypes';
import getMeetingReducer, {
  getDefaultMeetingSettingReducer,
  getMeetingStorageReducer,
} from './getMeetingReducer';
import { MeetingErrors } from './meetingErrors';
import meetingStatus from './meetingStatus';
import scheduleStatus from './scheduleStatus';

@Module({
  deps: [
    'Alert',
    'Client',
    'ExtensionInfo',
    'Storage',
    { dep: 'AvailabilityMonitor', optional: true },
    { dep: 'MeetingOptions', optional: true },
  ],
})
export class Meeting extends RcModule<MeetingActionTypes> {
  private _alert: any;
  private _client: Client;
  private _extensionInfo: any;
  private _storage: any;
  private _availabilityMonitor: any;
  private _lastMeetingSettingKey: any;
  private _defaultMeetingSettingKey: any;
  private _showSaveAsDefault: any;
  constructor({
    alert,
    client,
    extensionInfo,
    storage,
    availabilityMonitor,
    reducers,
    showSaveAsDefault,
    ...options
  }) {
    super({
      ...options,
      actionTypes: options.actionTypes || actionTypes,
    });
    this._alert = alert;
    this._client = client;
    this._storage = storage;
    this._extensionInfo = extensionInfo;
    this._showSaveAsDefault = showSaveAsDefault;
    this._availabilityMonitor = availabilityMonitor;
    this._lastMeetingSettingKey = 'lastMeetingSetting';
    this._defaultMeetingSettingKey = 'defaultMeetingSetting';
    this._reducer = getMeetingReducer(this.actionTypes, reducers);
    this._storage.registerReducer({
      key: this._lastMeetingSettingKey,
      reducer: getMeetingStorageReducer(this.actionTypes),
    });
    if (this._showSaveAsDefault) {
      this._storage.registerReducer({
        key: this._defaultMeetingSettingKey,
        reducer: getDefaultMeetingSettingReducer(this.actionTypes),
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

  private _shouldInit() {
    return (
      this._alert.ready &&
      this._storage.ready &&
      this._extensionInfo.ready &&
      (!this._availabilityMonitor || this._availabilityMonitor.ready) &&
      this.pending
    );
  }

  private _init() {
    this.store.dispatch({
      type: this.actionTypes.initSuccess,
    });
    if (!Object.keys(this.defaultMeetingSetting).length) {
      const extensionName = this._extensionInfo.info.name || '';
      const startTime = getInitializedStartTime();
      const meeting = getDefaultMeetingSettings(extensionName, startTime);
      this._saveAsDefaultSetting(meeting);
    }
  }

  private _shouldReset() {
    return (
      (!this._alert.ready ||
        !this._storage.ready ||
        !this._extensionInfo.ready ||
        (this._availabilityMonitor && !this._availabilityMonitor.ready)) &&
      this.ready
    );
  }

  private _reset() {
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  /**
   * Init basic meeting information
   * also load meeting settings from previous one.
   */
  @background
  init() {
    this._initMeeting();
  }

  @proxify
  reload() {
    this._initMeeting();
  }

  private _initMeeting() {
    const extensionName = this._extensionInfo.info.name || '';
    const startTime = getInitializedStartTime();
    if (this._showSaveAsDefault) {
      this.store.dispatch({
        type: this.actionTypes.updateMeeting,
        meeting: {
          ...getDefaultMeetingSettings(extensionName, startTime),
          // Load saved default meeting settings
          ...this.defaultMeetingSetting,
        },
      });
    } else {
      this.store.dispatch({
        type: this.actionTypes.updateMeeting,
        meeting: {
          ...getDefaultMeetingSettings(extensionName, startTime),
          // Load last meeting settings
          ...this.lastMeetingSetting,
        },
      });
    }
  }

  @proxify
  update(meeting) {
    this.store.dispatch({
      type: this.actionTypes.updateMeeting,
      meeting,
    });
  }

  @proxify
  async schedule(meeting, { isAlertSuccess = true } = {}, opener) {
    if (this.isScheduling) return (this.schedule as any)._promise;
    meeting = meeting || this.meeting;
    try {
      this.store.dispatch({
        type: this.actionTypes.initScheduling,
      });
      // Validate meeting
      this._validate(meeting);
      const formattedMeeting = this._format(meeting);
      if (this._showSaveAsDefault && meeting.saveAsDefault) {
        this._saveAsDefaultSetting(meeting);
      }

      (this.schedule as any)._promise = Promise.all([
        this._client
          .account()
          .extension()
          .meeting()
          .post(formattedMeeting),
        this._client
          .account()
          .extension()
          .meeting()
          .serviceInfo()
          .get(),
      ]);

      const [resp, serviceInfo] = await (this.schedule as any)._promise;

      this.store.dispatch({
        type: this.actionTypes.scheduled,
        meeting: {
          ...formattedMeeting,
          _saved: meeting._saved,
        },
      });

      const result = await this._createDialingNumberTpl(
        serviceInfo,
        resp,
        opener,
      );

      // Reload meeting info
      this._initMeeting();
      // Notify user the meeting has been scheduled
      if (isAlertSuccess) {
        setTimeout(() => {
          this._alert.info({
            message: meetingStatus.scheduledSuccess,
          });
        }, 50);
      }
      return result;
    } catch (errors) {
      this.store.dispatch({
        type: this.actionTypes.resetScheduling,
      });
      this._errorHandle(errors);
      return null;
    } finally {
      delete (this.schedule as any)._promise;
    }
  }

  @proxify
  async getMeeting(meetingId) {
    return this._client
      .account()
      .extension()
      .meeting(meetingId)
      .get();
  }

  @proxify
  async updateMeeting(
    meetingId: string,
    meeting,
    { isAlertSuccess = false } = {},
    opener,
  ) {
    if (this._isUpdating(meetingId)) {
      return (this.updateMeeting as any)._promise;
    }
    meeting = meeting || this.meeting;
    try {
      this.store.dispatch({
        type: this.actionTypes.initUpdating,
        meetingId,
      });
      // Validate meeting
      this._validate(meeting);
      const formattedMeeting = this._format(meeting);
      if (this._showSaveAsDefault && meeting.saveAsDefault) {
        this._saveAsDefaultSetting(meeting);
      }

      (this.updateMeeting as any)._promise = Promise.all([
        this._client
          .account()
          .extension()
          .meeting(meetingId)
          .put(formattedMeeting),
        this._client
          .account()
          .extension()
          .meeting()
          .serviceInfo()
          .get(),
      ]);

      const [resp, serviceInfo] = await (this.updateMeeting as any)._promise;

      this.store.dispatch({
        type: this.actionTypes.updated,
        meeting: {
          ...formattedMeeting,
          _saved: meeting._saved,
        },
        meetingId,
      });

      const result = await this._createDialingNumberTpl(
        serviceInfo,
        resp,
        opener,
      );

      // Reload meeting info
      this._initMeeting();
      // Notify user the meeting has been updated
      if (isAlertSuccess) {
        setTimeout(() => {
          this._alert.info({
            message: meetingStatus.updatedSuccess,
          });
        }, 50);
      }
      return result;
    } catch (errors) {
      this.store.dispatch({
        type: this.actionTypes.resetUpdating,
        meetingId,
      });
      return this._errorHandle(errors);
    } finally {
      delete (this.updateMeeting as any)._promise;
    }
  }

  private async _createDialingNumberTpl(
    serviceInfo: any,
    resp: any,
    opener: any,
  ) {
    serviceInfo.mobileDialingNumberTpl = getMobileDialingNumberTpl(
      serviceInfo.dialInNumbers,
      resp.id,
    );
    serviceInfo.phoneDialingNumberTpl = getPhoneDialingNumberTpl(
      serviceInfo.dialInNumbers,
    );
    const result = {
      meeting: resp,
      serviceInfo,
      extensionInfo: this.extensionInfo,
    };
    if (typeof this.scheduledHook === 'function') {
      await this.scheduledHook(result, opener);
    }
    return result;
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
        this._alert.danger({ message: meetingStatus.internalError });
      }
    }
    return null;
  }

  /**
   * @param {number} meetingId
   */
  _isUpdating(meetingId) {
    return (
      this.state.updatingStatus &&
      find((obj: any) => obj.meetingId === meetingId, this.state.updatingStatus)
    );
  }

  /**
   * Format meeting information.
   * @param {Object} meeting
   */
  private _format(meeting: ScheduleMeetingModel) {
    const {
      topic,
      meetingType,
      allowJoinBeforeHost,
      startHostVideo,
      startParticipantsVideo,
      audioOptions,
      password,
      schedule,
    } = meeting;
    const formatted: ScheduleMeetingModel = {
      topic,
      meetingType,
      allowJoinBeforeHost,
      startHostVideo,
      startParticipantsVideo,
      audioOptions,
      password,
    };
    // Recurring meetings do not have schedule info
    if (meetingType !== MeetingType.RECURRING) {
      const _schedule: ScheduleModel = {
        durationInMinutes: schedule.durationInMinutes,
        timeZone: { id: UTC_TIMEZONE_ID },
      };
      if (schedule.startTime) {
        // Format selected startTime to utc standard time
        // Timezone information is not included here
        _schedule.startTime = moment.utc(schedule.startTime).format();
      }
      formatted.schedule = _schedule;
    }
    return formatted;
  }

  /**
   * Validate meeting information format.
   * @param {Object} meeting
   * @throws
   */
  _validate(meeting) {
    console.log('meeting', meeting);
    if (!meeting) {
      throw new MeetingErrors(meetingStatus.invalidMeetingInfo);
    }
    const { topic, password, schedule, _requireMeetingPassword } = meeting;
    const errors = new MeetingErrors();
    if (topic.length <= 0) {
      errors.push(meetingStatus.emptyTopic);
    }
    if (_requireMeetingPassword && (!password || password.length <= 0)) {
      errors.push(meetingStatus.noPassword);
    }
    if (schedule) {
      if (schedule.durationInMinutes < 0) {
        errors.push(meetingStatus.durationIncorrect);
      }
    }
    if (errors.length > 0) {
      throw errors;
    }
  }

  _saveAsDefaultSetting(meeting) {
    const formattedMeeting = this._format(meeting);
    this.store.dispatch({
      type: this.actionTypes.saveAsDefaultSetting,
      meeting: {
        ...formattedMeeting,
        _saved: meeting.notShowAgain,
      },
    });
  }

  get extensionInfo() {
    return this._extensionInfo.info;
  }

  get meeting() {
    return this.state.meeting;
  }

  get lastMeetingSetting() {
    const state = this._storage.getItem(this._lastMeetingSettingKey);
    return state;
  }

  get isScheduling() {
    return this.state.schedulingStatus === scheduleStatus.scheduling;
  }

  get isUpdating() {
    return this.meeting && this.meeting.id && this._isUpdating(this.meeting.id);
  }

  get status() {
    return this.state.status;
  }

  get defaultMeetingSetting() {
    return this._storage.getItem(this._defaultMeetingSettingKey) || {};
  }

  get showSaveAsDefault() {
    return this._showSaveAsDefault || false;
  }
}

export interface ScheduleModel {
  durationInMinutes: number;
  timeZone: { id: string };
  startTime?: string;
}

export interface ScheduleMeetingModel {
  topic: string;
  meetingType: any;
  allowJoinBeforeHost: any;
  startHostVideo: any;
  startParticipantsVideo: any;
  audioOptions: any;
  password: any;
  schedule?: ScheduleModel;
}
