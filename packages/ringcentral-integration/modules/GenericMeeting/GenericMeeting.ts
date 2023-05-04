import { EventEmitter } from 'events';

import { action, RcModuleV2, state } from '@ringcentral-integration/core';

import { RcVideoAPI, RcVMeetingModel } from '../../interfaces/Rcv.model';
import background from '../../lib/background';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { Meeting, RcMMeetingModel, ScheduleMeetingResponse } from '../Meeting';
import { generateRandomPassword, RcVideo, RcVideoResponse } from '../RcVideo';
import {
  Deps,
  MeetingEvents,
  ScheduledCallback,
  ScheduleModel,
} from './GenericMeeting.interface';
import { genericMeetingStatus } from './genericMeetingStatus';

@Module({
  name: 'GenericMeeting',
  deps: [
    'VideoConfiguration',
    'ExtensionInfo',
    'Brand',
    'Meeting',
    'RcVideo',
    { dep: 'GenericMeetingOptions', optional: true },
  ],
})
export class GenericMeeting<T extends Deps = Deps> extends RcModuleV2<T> {
  protected _eventEmitter = new EventEmitter();

  constructor(deps: T) {
    super({
      deps,
      enableCache: deps.genericMeetingOptions?.enableCache ?? false,
      storageKey: 'genericMeeting',
    });
  }

  @state
  updatingStatus = genericMeetingStatus.idle;

  @action
  setMeetingUpdatingStatus(status: string) {
    this.updatingStatus = status;
  }

  @background
  init() {
    return this._meetingModule.init();
  }

  @proxify
  async reload() {
    return this._meetingModule.reload();
  }

  @proxify
  async switchUsePersonalMeetingId(usePersonalMeetingId: boolean) {
    this._meetingModule.switchUsePersonalMeetingId(usePersonalMeetingId);
  }

  @proxify
  async turnOnE2ee() {
    if (this.isRCM) {
      return;
    }
    await (this._meetingModule as RcVideo).turnOnE2ee();
  }

  @proxify
  async deleteMeeting(meetingId: string) {
    if (this.isRCV) {
      return;
    }
    await (this._meetingModule as Meeting).deleteMeeting(meetingId);
  }

  @proxify
  async updateScheduleFor(userExtensionId: string | number) {
    if (!this._meetingModule.updateScheduleFor) {
      return;
    }
    this.setUpdatingStatus();
    if (this.isRCM) {
      await (this._meetingModule as Meeting).updateScheduleFor(userExtensionId);
    } else if (this.isRCV) {
      await (this._meetingModule as RcVideo).updateScheduleFor(userExtensionId);
    } else {
      console.error('Unknown meeting provider, please check module runtime');
      return;
    }
    this.setIdleStatus();
  }

  @proxify
  async updateMeetingSettings(meeting: ScheduleModel, patch: boolean = true) {
    if (this.isRCM) {
      this._deps.meeting.update(meeting as RcMMeetingModel);
    }
    if (this.isRCV) {
      this._deps.rcVideo.updateMeetingSettings(
        meeting as RcVMeetingModel,
        patch,
      );
    }
  }

  @proxify
  async schedule(
    meeting?: ScheduleModel,
    config?: { isAlertSuccess?: boolean },
    opener?: Window,
  ) {
    let result: ScheduleMeetingResponse | RcVideoResponse;
    if (this.isRCM) {
      result = await this._deps.meeting.schedule(
        meeting as RcMMeetingModel,
        config,
      );
    } else if (this.isRCV) {
      const rcvMeetingInfo = meeting as RcVMeetingModel;
      if (rcvMeetingInfo.usePersonalMeetingId) {
        result = await this._deps.rcVideo.updateMeeting(
          this._deps.rcVideo.personalMeeting?.id,
          rcvMeetingInfo,
          config,
        );
      } else {
        result = await this._deps.rcVideo.createMeeting(
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
      return this._deps.meeting.schedule(meeting as RcMMeetingModel);
    }
    if (this.isRCV) {
      return this._deps.rcVideo.startMeeting(meeting as RcVMeetingModel);
    }
    return null;
  }

  @proxify
  async getMeeting(meetingId: string) {
    return this._meetingModule.getMeeting(meetingId);
  }

  @proxify
  async getMeetingServiceInfo() {
    if (this.isRCM) {
      return (this._meetingModule as Meeting).getMeetingServiceInfo();
    }
    throw new Error(
      'Unknown meeting provider, please check the module runtime',
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
      result = await this._deps.meeting.updateMeeting(
        meetingId,
        meeting as RcMMeetingModel,
        config,
      );
    } else if (this.isRCV) {
      result = await this._deps.rcVideo.updateMeeting(
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
      // rcm doesn't support update disabled status yet
      return;
    }
    return (
      this.isRCV &&
      (this._meetingModule as RcVideo).updateHasSettingsChanged(isChanged)
    );
  }

  generateRcvMeetingPassword() {
    return generateRandomPassword();
  }

  override _shouldInit() {
    return !!(
      this.pending &&
      this._deps.brand.ready &&
      this._deps.extensionInfo.ready &&
      this._deps.videoConfiguration.ready &&
      this._deps.videoConfiguration.provider &&
      this._meetingModule &&
      this._meetingModule.ready
    );
  }

  override _shouldReset() {
    return (
      this.ready &&
      (!this._deps.brand.ready ||
        !this._deps.extensionInfo.ready ||
        !this._deps.videoConfiguration.ready ||
        !this._deps.videoConfiguration.provider ||
        (this._meetingModule && !this._meetingModule.ready))
    );
  }

  setUpdatingStatus() {
    this.setMeetingUpdatingStatus(genericMeetingStatus.updating);
  }

  setIdleStatus() {
    this.setMeetingUpdatingStatus(genericMeetingStatus.idle);
  }

  setUpdatedStatus() {
    this.setMeetingUpdatingStatus(genericMeetingStatus.updated);
  }

  get meetingProviderType() {
    return this._deps.videoConfiguration.provider;
  }

  get isRCV() {
    return this._deps.videoConfiguration.isRCV;
  }

  get isRCM() {
    return this._deps.videoConfiguration.isRCM;
  }

  get extensionInfo() {
    return this._deps.extensionInfo.info;
  }

  protected get _meetingModule() {
    if (this.isRCM) {
      return this._deps.meeting;
    }
    if (this.isRCV) {
      return this._deps.rcVideo;
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
      return this._deps.meeting.defaultMeetingSetting;
    }
    if (this.isRCV) {
      return this._deps.rcVideo.defaultVideoSetting;
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
    return this._deps.brand.name;
  }

  get enableServiceWebSettings(): boolean {
    return !!(this._meetingModule as Meeting).enableServiceWebSettings;
  }

  get enablePersonalMeeting() {
    return !!this._meetingModule.enablePersonalMeeting;
  }

  get enableWaitingRoom() {
    if (this.isRCV) {
      return this._deps.rcVideo.enableWaitingRoom;
    }
    return false;
  }

  get enableE2EE() {
    if (this.isRCV) {
      return this._deps.rcVideo.enableE2EE;
    }
    return false;
  }

  get personalMeeting() {
    return this._meetingModule.personalMeeting;
  }

  get personalMeetingId(): string {
    return (this.personalMeeting as Partial<RcVideoAPI>)?.shortId;
  }

  get personalMeetingSettings() {
    if (this.isRCM) {
      return this._deps.meeting.pmiDefaultSettings;
    }
    if (this.isRCV) {
      return this._deps.rcVideo.personalVideoSetting;
    }
    return null;
  }

  get isUpdating() {
    return this.updatingStatus === genericMeetingStatus.updating;
  }

  get hasSettingsChanged() {
    if (this.isRCM) {
      // rcm doesn't support update button disabled status yet
      return true;
    }
    return this.isRCV && (this._meetingModule as RcVideo).hasSettingsChanged;
  }
}
