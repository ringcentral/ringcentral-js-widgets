import { any, find } from 'ramda';
import { Module } from '@ringcentral-integration/commons/lib/di';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import { RcVideo } from '@ringcentral-integration/commons/modules/RcVideo';
import {
  RcVMeetingModel,
  RcVSettingLocks,
} from '@ringcentral-integration/commons/interfaces/Rcv.model';
import {
  DisableE2eeWhenRelatedOptionMatch,
  DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH,
  RCV_E2EE_DEFAULT_SECURITY_OPTIONS,
  RCV_WAITING_ROOM_MODE,
  AUTH_USER_TYPE,
  RcvDelegator,
  JBH_LABEL,
} from '@ringcentral-integration/commons/modules/RcVideoV2';
import RcUIModule from '../../lib/RcUIModule';

@Module({
  name: 'VideoUI',
  deps: [
    'RcVideo',
    'AppFeatures',
    'Locale',
    'RateLimiter',
    'ConnectivityMonitor',
    'Brand',
  ],
})
export default class VideoUI extends RcUIModule {
  private _locale: any;
  private _appFeatures: any;
  private _rcVideo: RcVideo;
  private _rateLimiter: any;
  private _connectivityMonitor: any;
  private _brand: Brand;
  constructor({
    rcVideo,
    locale,
    rateLimiter,
    connectivityMonitor,
    brand,
    appFeatures,
    ...options
  }) {
    super({
      ...options,
    });
    this._appFeatures = appFeatures;
    this._rcVideo = rcVideo;
    this._locale = locale;
    this._rateLimiter = rateLimiter;
    this._connectivityMonitor = connectivityMonitor;
    this._brand = brand;
  }

  getUIProps({
    disabled,
    labelPlacement,
    datePickerSize,
    timePickerSize,
    showRcvAdminLock = false,
    configDisabled = false,
  }) {
    const showE2EE = this._rcVideo.ready && this._rcVideo.enableE2EE;

    const meeting: RcVMeetingModel =
      this._rcVideo.ready && this._rcVideo.meeting;

    const delegators = (this._rcVideo.ready && this._rcVideo.delegators) || [];
    let isDelegator = false;
    const user = find(
      (item) => item.extensionId === meeting.extensionId,
      delegators as RcvDelegator[],
    );
    isDelegator = user && !user.isLoginUser;

    const enableWaitingRoom =
      this._rcVideo.ready && this._rcVideo.enableWaitingRoom;

    const isAllOptionDisabled = !!(
      disabled ||
      !meeting.isMeetingPasswordValid ||
      (this._rcVideo.ready && this._rcVideo.isScheduling) ||
      (this._connectivityMonitor && !this._connectivityMonitor.connectivity) ||
      (this._rateLimiter && this._rateLimiter.throttling)
    );

    const { settingLock, e2ee, isOnlyCoworkersJoin } = meeting;

    // when e2ee is on, waiting room&auth can join&require password&jbh will be disabled and turn on.
    const isE2eeRelatedOptionsDisabled = showE2EE && e2ee;

    const isE2EEDisabled =
      showE2EE &&
      ((this._appFeatures.ready && !this._appFeatures.hasVideoE2EE) ||
        (settingLock as RcVSettingLocks).e2ee ||
        any(
          (key: DisableE2eeWhenRelatedOptionMatch) =>
            settingLock[key] &&
            meeting[key] === DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH[key],
        )(
          Object.keys(
            DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH,
          ) as DisableE2eeWhenRelatedOptionMatch[],
        ));

    const authUserTypeValue = isOnlyCoworkersJoin
      ? AUTH_USER_TYPE.SIGNED_IN_CO_WORKERS
      : AUTH_USER_TYPE.SIGNED_IN_USERS;

    return {
      datePickerSize,
      timePickerSize,
      labelPlacement,
      isE2EEDisabled,
      delegators,
      authUserTypeValue,
      currentLocale: this._locale.currentLocale,
      meeting: this._rcVideo.meeting,
      enablePersonalMeeting: this._rcVideo.enablePersonalMeeting,
      showWaitingRoom: this._rcVideo.enableWaitingRoom,
      showE2EE: this._rcVideo.enableE2EE,
      personalMeetingId:
        this._rcVideo.ready && this._rcVideo.personalMeeting?.shortId,
      showSaveAsDefault: this._rcVideo.showSaveAsDefault,
      showScheduleOnBehalf: !!(delegators && delegators.length > 0),
      disableSaveAsDefault: !this._rcVideo.isPreferencesChanged,
      showSpinnerInConfigPanel:
        this._rcVideo.isInitializing || this._rcVideo.isScheduling,
      brandName: this._brand.name,
      configDisabled,
      disabled: isAllOptionDisabled,
      hasSettingsChanged: this._rcVideo.hasSettingsChanged,
      joinBeforeHostLabel: isDelegator
        ? JBH_LABEL.JOIN_AFTER_HOST
        : JBH_LABEL.JOIN_AFTER_ME,
      isPersonalMeetingDisabled: showE2EE && meeting.e2ee,
      isRequirePasswordDisabled:
        isE2eeRelatedOptionsDisabled ||
        configDisabled ||
        (showRcvAdminLock && meeting.settingLock?.isMeetingSecret),
      isJoinBeforeHostDisabled:
        isE2eeRelatedOptionsDisabled ||
        configDisabled ||
        (showRcvAdminLock && meeting.settingLock?.allowJoinBeforeHost) ||
        (enableWaitingRoom &&
          meeting.waitingRoomMode === RCV_WAITING_ROOM_MODE.all),
      isWaitingRoomDisabled:
        isE2eeRelatedOptionsDisabled ||
        configDisabled ||
        (showRcvAdminLock && meeting.settingLock?.waitingRoomMode),
      isWaitingRoomNotCoworkerDisabled: meeting.isOnlyCoworkersJoin,
      isWaitingRoomGuestDisabled:
        meeting.isOnlyAuthUserJoin || (showE2EE && meeting.e2ee),
      isWaitingRoomAllDisabled: false,
      isAuthenticatedCanJoinDisabled:
        isE2eeRelatedOptionsDisabled ||
        configDisabled ||
        (showRcvAdminLock && meeting.settingLock?.isOnlyAuthUserJoin),
      isAuthUserTypeDisabled:
        disabled ||
        configDisabled ||
        (showRcvAdminLock && meeting.settingLock?.isOnlyCoworkersJoin),
      isSignedInUsersDisabled: false,
      isSignedInCoWorkersDisabled: false,
    };
  }

  getUIFunctions({ schedule }) {
    return {
      updateScheduleFor: (userExtensionId: string) =>
        this._rcVideo.updateScheduleFor(userExtensionId),
      updateMeetingSettings: (value: RcVMeetingModel) =>
        this._rcVideo.updateMeetingSettings(value),
      validatePasswordSettings: (
        password: string,
        isSecret: boolean,
      ): boolean => {
        return this._rcVideo.validatePasswordSettings(password, isSecret);
      },
      switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) =>
        this._rcVideo.switchUsePersonalMeetingId(usePersonalMeetingId),
      schedule: async (meetingInfo: RcVMeetingModel, opener: Window) => {
        if (schedule) {
          await schedule(meetingInfo, opener);
          return;
        }
        if (meetingInfo.usePersonalMeetingId) {
          await this._rcVideo.updateMeeting(
            this._rcVideo.personalMeeting.id,
            meetingInfo,
          );
        } else {
          await this._rcVideo.createMeeting(meetingInfo);
        }
      },
      updateHasSettingsChanged: this._rcVideo.updateHasSettingsChanged,
      init: () => {
        this._rcVideo.init();
      },
      e2eeInteractFunc: (e2eeValue: boolean) => {
        if (!e2eeValue) {
          this._rcVideo.updateMeetingSettings({
            e2ee: e2eeValue,
          });
          return;
        }
        // when user turn on e2ee option in pmi meeting, should switch to non-pmi meeting
        if (this._rcVideo.meeting.usePersonalMeetingId) {
          this._rcVideo.switchUsePersonalMeetingId(false);
          this._rcVideo.updateMeetingSettings({
            e2ee: true,
            ...RCV_E2EE_DEFAULT_SECURITY_OPTIONS,
          });
        } else {
          this._rcVideo.updateMeetingSettings({
            e2ee: e2eeValue,
            ...RCV_E2EE_DEFAULT_SECURITY_OPTIONS,
          });
        }
        this._rcVideo.updateHasSettingsChanged(true);
      },
    };
  }
}
