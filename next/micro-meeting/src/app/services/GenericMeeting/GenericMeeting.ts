import type {
  RcVideoAPI,
  RcVMeetingModel,
} from '@ringcentral-integration/commons/interfaces/Rcv.model';
import { ExtensionInfo } from '@ringcentral-integration/micro-auth/src/app/services';
import { Brand } from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  delegate,
  injectable,
  optional,
  RcModule,
  state,
} from '@ringcentral-integration/next-core';
import { RcvMainParams } from '@ringcentral-integration/widgets/lib/MeetingCalendarHelper/index.interface';
import { defer, firstValueFrom, share } from 'rxjs';

import type { RcMMeetingModel, ScheduleMeetingResponse } from '../Meeting';
import { Meeting } from '../Meeting';
import type { RcVideoResponse } from '../RcVideo';
import { generateRandomPassword, RcVideo } from '../RcVideo';
import { VideoConfiguration } from '../VideoConfiguration';

import type {
  GenericMeetingOptions,
  ScheduleModel,
} from './GenericMeeting.interface';
import { genericMeetingStatus } from './genericMeetingStatus';

@injectable({
  name: 'GenericMeeting',
})
export class GenericMeeting extends RcModule {
  constructor(
    protected _videoConfiguration: VideoConfiguration,
    protected _extensionInfo: ExtensionInfo,
    protected _brand: Brand,
    protected _meeting: Meeting,
    protected _rcVideo: RcVideo,
    @optional('GenericMeetingOptions')
    protected _genericMeetingOptions?: GenericMeetingOptions,
  ) {
    super();
  }

  @state
  updatingStatus = genericMeetingStatus.idle;

  @action
  setMeetingUpdatingStatus(status: string) {
    this.updatingStatus = status;
  }

  private initMeeting$ = defer(() => this._meetingModule.init()).pipe(
    // during the meeting init, share the flow, not need create new one.
    share(),
  );

  @delegate('server')
  init() {
    return firstValueFrom(this.initMeeting$);
  }

  @delegate('server')
  async reload() {
    return this._meetingModule.reload();
  }

  @delegate('server')
  async switchUsePersonalMeetingId(usePersonalMeetingId: boolean) {
    this._meetingModule.switchUsePersonalMeetingId(usePersonalMeetingId);
  }

  @delegate('server')
  async turnOnE2ee() {
    if (this.isRCM) {
      return;
    }
    await (this._meetingModule as RcVideo).turnOnE2ee();
  }

  @delegate('server')
  async deleteMeeting(meetingId: string) {
    if (this.isRCV) {
      return;
    }
    await (this._meetingModule as Meeting).deleteMeeting(meetingId);
  }

  @delegate('server')
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

  @delegate('server')
  async updateMeetingSettings(meeting: ScheduleModel, patch = true) {
    if (this.isRCM) {
      this._meeting.update(meeting as RcMMeetingModel);
    }
    if (this.isRCV) {
      this._rcVideo.updateMeetingSettings(meeting as RcVMeetingModel, patch);
    }
  }

  @delegate('server')
  async schedule(
    meeting?: ScheduleModel,
    config?: { isAlertSuccess?: boolean },
  ) {
    let result:
      | ScheduleMeetingResponse
      | RcvMainParams
      | RcVideoResponse
      | null
      | undefined;
    if (this.isRCM) {
      result = await this._meeting.schedule(meeting as RcMMeetingModel, config);
    } else if (this.isRCV) {
      const rcvMeetingInfo = meeting as RcVMeetingModel;
      if (rcvMeetingInfo.usePersonalMeetingId) {
        result = await this._rcVideo.updateMeeting(
          this._rcVideo.personalMeeting?.id!,
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

    return result;
  }

  @delegate('server')
  async startMeeting(meeting: ScheduleModel) {
    if (this.isRCM) {
      return this._meeting.schedule(meeting as RcMMeetingModel);
    }
    if (this.isRCV) {
      return this._rcVideo.startMeeting(meeting as RcVMeetingModel);
    }
    return null;
  }

  @delegate('server')
  async getMeeting(meetingId: string) {
    return this._meetingModule.getMeeting(meetingId);
  }

  @delegate('server')
  async getMeetingServiceInfo() {
    if (this.isRCM) {
      return (this._meetingModule as Meeting).getMeetingServiceInfo();
    }
    throw new Error(
      'Unknown meeting provider, please check the module runtime',
    );
  }

  @delegate('server')
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
      result.scheduleOriginalInfo = meeting;
    } else if (opener && opener.close) {
      opener.close();
    }
    return result;
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
      this._brand.ready &&
      this._extensionInfo.ready &&
      this._videoConfiguration.ready &&
      this._videoConfiguration.provider &&
      this._meetingModule &&
      this._meetingModule.ready
    );
  }

  override _shouldReset() {
    return (
      this.ready &&
      (!this._brand.ready ||
        !this._extensionInfo.ready ||
        !this._videoConfiguration.ready ||
        !this._videoConfiguration.provider ||
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
    return this._videoConfiguration.provider;
  }

  get isRCV() {
    return this._videoConfiguration.isRCV;
  }

  get isRCM() {
    return this._videoConfiguration.isRCM;
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

  get preferences() {
    return (this._meetingModule as RcVideo).preferences;
  }

  get brandName() {
    return this._brand.name;
  }

  get enableServiceWebSettings(): boolean {
    return !!(this._meetingModule as Meeting).enableServiceWebSettings;
  }

  get enablePersonalMeeting() {
    return !!this._meetingModule.enablePersonalMeeting;
  }

  get enableWaitingRoom() {
    if (this.isRCV) {
      return this._rcVideo.enableWaitingRoom;
    }
    return false;
  }

  get enableE2EE() {
    if (this.isRCV) {
      return this._rcVideo.enableE2EE;
    }
    return false;
  }

  get personalMeeting() {
    return this._meetingModule.personalMeeting;
  }

  get personalMeetingId(): string {
    return (this.personalMeeting as Partial<RcVideoAPI>)?.shortId!;
  }

  get personalMeetingSettings() {
    if (this.isRCM) {
      return this._meeting.pmiDefaultSettings;
    }
    if (this.isRCV) {
      return this._rcVideo.personalVideoSetting;
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
