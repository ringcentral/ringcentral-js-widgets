import { EventEmitter } from 'events';
import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import Meeting from '../Meeting';
import { RcMMeetingModel } from '../MeetingV2';
import { Brand } from '../Brand';
import ExtensionInfo from '../ExtensionInfo';
import { proxify } from '../../lib/proxy/proxify';
import background from '../../lib/background';

import {
  IGenericMeeting,
  MeetingEvents,
  ScheduleModel,
  ScheduledCallback,
} from './interface';

import MeetingProvider from '../MeetingProvider';

import { actionTypes } from './actionTypes';

import { RcVideo } from '../RcVideo';

import getGenericMeetingReducer from './getGenericMeetingReducer';
import { RcVMeetingModel } from '../../interfaces/Rcv.model';
import { genericMeetingStatus } from './genericMeetingStatus';

@Module({
  deps: ['MeetingProvider', 'ExtensionInfo', 'Brand', 'Meeting', 'RcVideo'],
})
export class GenericMeeting extends RcModule implements IGenericMeeting {
  protected _meetingProvider: MeetingProvider;
  protected _meeting: Meeting;
  protected _rcVideo: RcVideo;
  protected _brand: Brand;
  protected _extensionInfo: ExtensionInfo;
  protected _eventEmitter = new EventEmitter();

  constructor({
    meeting,
    meetingProvider,
    rcVideo,
    brand,
    reducers,
    extensionInfo,
    ...options
  }) {
    super({
      ...options,
      actionTypes: options.actionTypes || actionTypes,
    });
    this._reducer = getGenericMeetingReducer(this.actionTypes, reducers);
    this._meeting = meeting;
    this._meetingProvider = meetingProvider;
    this._rcVideo = rcVideo;
    this._brand = brand;
    this._extensionInfo = extensionInfo;
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  @background
  init() {
    return this._meetingModule.init();
  }

  @proxify
  reload() {
    return this._meetingModule.reload();
  }

  @proxify
  switchUsePersonalMeetingId(usePersonalMeetingId: boolean) {
    this._meetingModule.switchUsePersonalMeetingId(usePersonalMeetingId);
  }

  @proxify
  async updateScheduleFor(userExtensionId: string | number) {
    if (!this._meetingModule.updateScheduleFor) {
      return;
    }

    this.store.dispatch({
      type: this.actionTypes.initUpdating,
    });

    await this._meetingModule.updateScheduleFor(userExtensionId);

    this.store.dispatch({
      type: this.actionTypes.updated,
    });
  }

  @proxify
  updateMeetingSettings(meeting: ScheduleModel, patch: boolean = true): void {
    if (this.isRCM) {
      this._meeting.update(meeting as RcMMeetingModel);
    }
    if (this.isRCV) {
      this._rcVideo.updateMeetingSettings(meeting as RcVMeetingModel, patch);
    }
  }

  @proxify
  async schedule(
    meeting: ScheduleModel,
    config?: { isAlertSuccess?: boolean },
    opener?: Window,
  ) {
    let result;
    if (this.isRCM) {
      result = await this._meeting.schedule(meeting as RcMMeetingModel, config);
    } else if (this.isRCV) {
      const rcvMeetingInfo = meeting as RcVMeetingModel;
      if (rcvMeetingInfo.usePersonalMeetingId) {
        result = await this._rcVideo.updateMeeting(
          this._rcVideo.personalMeeting?.id,
          rcvMeetingInfo,
          config,
        );
      } else {
        result = await this._rcVideo.createMeeting(
          meeting as RcVMeetingModel,
          config,
        );
      }
    } else {
      console.error('Unknown meeting provider, please check module runtime');
      return;
    }
    if (result) {
      this._eventEmitter.emit(MeetingEvents.afterSchedule, result, opener);
    } else if (opener && opener.close) {
      opener.close();
    }
    return result;
  }

  @proxify
  async startMeeting(meeting: ScheduleModel) {
    if (this.isRCM) {
      return this._meeting.schedule(meeting as RcMMeetingModel);
    }
    if (this.isRCV) {
      return this._rcVideo.startMeeting(meeting as RcVMeetingModel);
    }
    return null;
  }

  @proxify
  async getMeeting(meetingId: string) {
    return this._meetingModule.getMeeting(meetingId);
  }

  @proxify
  async getMeetingServiceInfo() {
    return (
      this._meetingModule.getMeetingServiceInfo &&
      this._meetingModule.getMeetingServiceInfo()
    );
  }

  @proxify
  async updateMeeting(
    meetingId: string,
    meeting: ScheduleModel,
    config?: { isAlertSuccess?: boolean },
    opener?: Window,
  ) {
    let result;
    if (this.isRCM) {
      result = await this._meeting.updateMeeting(
        meetingId,
        meeting as RcMMeetingModel,
        config,
      );
    } else if (this.isRCV) {
      result = await this._rcVideo.updateMeeting(
        meetingId,
        meeting as RcVMeetingModel,
        config,
      );
    } else {
      console.error('Unknown meeting provider, please check module runtime');
      return;
    }
    if (result) {
      this._eventEmitter.emit(MeetingEvents.afterUpdate, result, opener);
    } else if (opener && opener.close) {
      opener.close();
    }
    return result;
  }

  addScheduledCallBack(cb: ScheduledCallback) {
    this._eventEmitter.on(MeetingEvents.afterSchedule, cb);
  }

  removeScheduledCallBack(cb: ScheduledCallback) {
    this._eventEmitter.removeListener(MeetingEvents.afterSchedule, cb);
  }

  validatePasswordSettings(password: string, isSecret: boolean): boolean {
    return this._meetingModule.validatePasswordSettings(password, isSecret);
  }

  updateHasSettingsChanged(isChanged: boolean) {
    if (this.isRCM) {
      // rcm doedn't support update disabled status yet
      return;
    }
    return (
      this.isRCV &&
      (this._meetingModule as RcVideo).updateHasSettingsChanged(isChanged)
    );
  }

  generateRcvMeetingPassword() {
    return this._rcVideo.generateRandomPassword();
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
      this.pending &&
      this._brand.ready &&
      this._extensionInfo.ready &&
      this._meetingProvider.ready &&
      this._meetingProvider.provider &&
      this._meetingModule &&
      this._meetingModule.ready
    );
  }

  private _shouldReset() {
    return (
      this.ready &&
      (!this._brand.ready ||
        !this._extensionInfo.ready ||
        !this._meetingProvider.ready ||
        !this._meetingProvider.provider ||
        (this._meetingModule && !this._meetingModule.ready))
    );
  }

  private _init() {
    this.store.dispatch({
      type: this.actionTypes.initSuccess,
    });
  }

  private _reset() {
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  get meetingProviderType() {
    return this._meetingProvider.provider;
  }

  get isRCV() {
    return this._meetingProvider.isRCV;
  }

  get isRCM() {
    return this._meetingProvider.isRCM;
  }

  get extensionInfo() {
    return this._extensionInfo.info;
  }

  protected get _meetingModule() {
    if (this.isRCM) {
      return this._meeting;
    }
    if (this.isRCV) {
      return this._rcVideo;
    }
    throw new Error(
      'Unknown meeting provider, please check the module runtime',
    );
  }

  get meeting() {
    return this._meetingModule.meeting;
  }

  get defaultTopic() {
    return this._meetingModule.defaultTopic;
  }

  get delegators() {
    return this._meetingModule.delegators;
  }

  get defaultSetting() {
    if (this.isRCM) {
      return this._meeting.defaultMeetingSetting;
    }
    if (this.isRCV) {
      return this._rcVideo.defaultVideoSetting;
    }
    return null;
  }

  get isScheduling() {
    return !!this._meetingModule.isScheduling;
  }

  get showSaveAsDefault() {
    return !!this._meetingModule.showSaveAsDefault;
  }

  get isPreferencesChanged() {
    return !!this._meetingModule.isPreferencesChanged;
  }

  get brandName() {
    return this._brand.name;
  }

  get status() {
    return this.state.status;
  }

  get enableServiceWebSettings(): boolean {
    return !!this._meetingModule.enableServiceWebSettings;
  }

  get enablePersonalMeeting(): boolean {
    return !!this._meetingModule.enablePersonalMeeting;
  }

  get enableWaitingRoom(): boolean {
    if (this.isRCV) {
      return this._rcVideo.enableWaitingRoom;
    }
    return false;
  }
  get enableE2EE(): boolean {
    if (this.isRCV) {
      return this._rcVideo.enableE2EE;
    }
    return false;
  }

  get personalMeeting(): any {
    return this._meetingModule.personalMeeting;
  }

  get personalMeetingId(): string {
    return this.personalMeeting?.shortId;
  }

  get personalMeetingSettings(): any {
    if (this.isRCM) {
      return this._meeting.pmiDefaultSettings;
    }
    if (this.isRCV) {
      return this._rcVideo.personalVideoSetting;
    }
    return null;
  }

  get isUpdating() {
    return this.state.updatingStatus === genericMeetingStatus.updating;
  }

  get hasSettingsChanged() {
    if (this.isRCM) {
      // rcm doesn't support update button disabled status yet
      return true;
    }
    return this.isRCV && (this._meetingModule as RcVideo).hasSettingsChanged;
  }
}
