import moment from 'moment';
import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import proxify from '../../lib/proxy/proxify';
import background from '../../lib/background';
import actionTypes from './actionTypes';
import scheduleStatus from './scheduleStatus';
import meetingStatus from './meetingStatus';
import getMeetingReducer, { getMeetingStorageReducer } from './getMeetingReducer';

export const UTC_TIMEZONE_ID = '1';
export const MeetingType = {
  SCHEDULED: 'Scheduled',
  RECURRING: 'Recurring',
  INSTANT: 'Instant',
};

// Basic default meeting type information
export const getDefaultMeetingSettings = extensionName => ({
  topic: `${extensionName}'s Meeting`,
  meetingType: MeetingType.SCHEDULED,
  password: null,
  schedule: {
    startTime: (new Date()).getTime(),
    durationInMinutes: 60,
    timeZone: {
      id: UTC_TIMEZONE_ID
    }
  },
  host: {
    id: null,
  },
  allowJoinBeforeHost: false,
  startHostVideo: false,
  startParticipantsVideo: false,
  audioOptions: ['Phone', 'ComputerAudio'],
  _requireMeetingPassword: false,
  _showDate: false,
  _showTime: false,
  _saved: false,
});

class MeetingErrors {
  constructor(type) {
    this._errors = [];
    if (type) this._errors.push({ message: type });
  }

  push(type) {
    if (type) this._errors.push({ message: type });
  }

  get all() {
    return this._errors;
  }

  get length() {
    return this._errors.length;
  }
}

@Module({
  deps: [
    'Alert',
    'Client',
    'ExtensionInfo',
    'Storage',
    { dep: 'MeetingOptions', optional: true }
  ]
})
export default class Meeting extends RcModule {
  constructor({
    alert,
    client,
    extensionInfo,
    storage,
    ...options
  }) {
    super({ ...options, actionTypes });
    this._alert = alert;
    this._client = client;
    this._extensionInfo = extensionInfo;
    this._storage = storage;
    this._reducer = getMeetingReducer(this.actionTypes);
    this._lastMeetingSettingKey = 'lastMeetingSetting';
    this._storage.registerReducer({
      key: this._lastMeetingSettingKey,
      reducer: getMeetingStorageReducer(this.actionTypes)
    });
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
      this._alert.ready &&
      this._storage.ready &&
      this._extensionInfo.ready &&
      this.pending
    );
  }

  _init() {
    this.store.dispatch({
      type: this.actionTypes.initSuccess
    });
  }

  _shouldReset() {
    return (
      (
        !this._alert.ready ||
        !this._storage.ready ||
        !this._extensionInfo.ready
      ) &&
      this.ready
    );
  }

  _reset() {
    this.store.dispatch({
      type: this.actionTypes.resetSuccess
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

  _initMeeting() {
    const extensionName = this._extensionInfo.info.name || '';
    this.store.dispatch({
      type: this.actionTypes.updateMeeting,
      meeting: {
        ...getDefaultMeetingSettings(extensionName),
        // Load last meeting settings
        ...this.lastMeetingInfo
      }
    });
  }

  @proxify
  update(meeting) {
    this.store.dispatch({
      type: this.actionTypes.updateMeeting,
      meeting
    });
  }

  @proxify
  async schedule(meeting, { isAlertSuccess = true } = {}) {
    if (this.isScheduling) return null;
    meeting = meeting || this.meeting;
    try {
      this.store.dispatch({
        type: this.actionTypes.initScheduling
      });
      // Validate meeting
      this._validate(meeting);
      const formattedMeeting = this._format(meeting);

      const resp = await this._client
        .account()
        .extension()
        .meeting()
        .post(formattedMeeting);
      const serviceInfo = await this._client
        .account()
        .extension()
        .meeting()
        .serviceInfo()
        .get();
      this.store.dispatch({
        type: this.actionTypes.scheduled,
        meeting: {
          ...formattedMeeting,
          _saved: meeting._saved
        }
      });
      // Reload meeting info
      this._initMeeting();
      // Notify user the meeting has been scheduled
      if (isAlertSuccess) {
        setTimeout(() => {
          this._alert.info({
            message: meetingStatus.scheduledSuccess
          });
        }, 50);
      }
      return {
        meeting: resp,
        serviceInfo,
        extensionInfo: this.extensionInfo
      };
    } catch (errors) {
      this.store.dispatch({
        type: this.actionTypes.resetScheduling
      });
      if (errors instanceof MeetingErrors) {
        for (const error of errors.all) {
          this._alert.warning(error);
        }
      }
      return null;
    }
  }

  /**
   * Format meeting information.
   * @param {Object} meeting
   */
  _format(meeting) {
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
    const formatted = {
      topic,
      meetingType,
      allowJoinBeforeHost,
      startHostVideo,
      startParticipantsVideo,
      audioOptions,
    };
    if (password) {
      formatted.password = password;
    }
    // Recurring meetings do not have schedule info
    if (meetingType !== MeetingType.RECURRING) {
      const _schedule = {
        durationInMinutes: schedule.durationInMinutes,
        timeZone: { id: UTC_TIMEZONE_ID }
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
    if (!meeting) {
      throw new MeetingErrors(meetingStatus.invalidMeetingInfo);
    }
    const {
      topic,
      password,
      schedule,
      _requireMeetingPassword,
    } = meeting;
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

  get extensionInfo() {
    return this._extensionInfo.info;
  }

  get meeting() {
    return this.state.meeting;
  }

  get lastMeetingInfo() {
    const state = this._storage.getItem(this._lastMeetingSettingKey);
    return state;
  }

  get isScheduling() {
    return this.state.schedulingStatus === scheduleStatus.scheduling;
  }

  get status() {
    return this.state.status;
  }
}
