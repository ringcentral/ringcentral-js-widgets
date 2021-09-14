import { any, find } from 'ramda';
import { Module } from '@ringcentral-integration/commons/lib/di';
import {
  RcVMeetingModel,
  RcVSettingLocks,
} from '@ringcentral-integration/commons/interfaces/Rcv.model';
import {
  RcvDelegator,
  AUTH_USER_TYPE,
  RCV_WAITING_ROOM_MODE,
  RCV_E2EE_DEFAULT_SECURITY_OPTIONS,
  DisableE2eeWhenRelatedOptionMatch,
  DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH,
  JBH_LABEL,
} from '@ringcentral-integration/commons/modules/RcVideoV2';
import { RcMMeetingModel } from '@ringcentral-integration/commons/modules/MeetingV2';
import { GenericMeeting } from '@ringcentral-integration/commons/modules/GenericMeetingV2';
import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';

import RcUIModule from '../../lib/RcUIModule';

@Module({
  name: 'GenericMeetingUI',
  deps: [
    'GenericMeeting',
    'AppFeatures',
    'Locale',
    'RateLimiter',
    'ConnectivityMonitor',
  ],
})
export default class GenericMeetingUI extends RcUIModule {
  _genericMeeting: GenericMeeting;
  _appFeatures: AppFeatures;
  _locale: any;
  _rateLimiter: any;
  _connectivityMonitor: any;

  constructor({
    genericMeeting,
    locale,
    rateLimiter,
    connectivityMonitor,
    appFeatures,
    ...options
  }) {
    super({
      ...options,
    });
    this._genericMeeting = genericMeeting;
    this._appFeatures = appFeatures;
    this._locale = locale;
    this._rateLimiter = rateLimiter;
    this._connectivityMonitor = connectivityMonitor;
  }

  getUIProps({
    useRcmV2,
    disabled,
    showTopic,
    showWhen,
    showDuration,
    openNewWindow,
    labelPlacement,
    showRecurringMeeting,
    scheduleButton,
    datePickerSize,
    timePickerSize,
    recurringMeetingPosition,
    showRcvAdminLock = false,
    configDisabled = false,
  }) {
    const isRCM = this._genericMeeting.isRCM;
    const isRCV = this._genericMeeting.isRCV;
    const meeting =
      (this._genericMeeting.ready && this._genericMeeting.meeting) || {};

    const delegators =
      (this._genericMeeting.ready && this._genericMeeting.delegators) || [];

    let isDelegator = false;
    if (isRCV) {
      const user = find(
        (item) => item.extensionId === (meeting as RcVMeetingModel).extensionId,
        delegators as RcvDelegator[],
      );
      isDelegator = user && !user.isLoginUser;
    }
    const enableWaitingRoom =
      this._genericMeeting.ready && this._genericMeeting.enableWaitingRoom;
    const isAllOptionDisabled = !!(
      disabled ||
      !meeting.isMeetingPasswordValid ||
      (this._genericMeeting.ready && this._genericMeeting.isScheduling) ||
      (this._connectivityMonitor && !this._connectivityMonitor.connectivity) ||
      (this._rateLimiter && this._rateLimiter.throttling)
    );

    const showE2EE =
      this._genericMeeting.ready && this._genericMeeting.enableE2EE;

    /** for rcv part * */
    const {
      settingLock,
      e2ee,
      isOnlyCoworkersJoin,
    } = meeting as RcVMeetingModel;

    // when e2ee is on, waiting room&auth can join&require password&jbh will be disabled and turn on.
    const isE2eeRelatedOptionsDisabled = showE2EE && e2ee;

    const isE2EEDisabled =
      showE2EE &&
      ((this._appFeatures.ready && !this._appFeatures.hasVideoE2EE) ||
        (settingLock as RcVSettingLocks).e2ee ||
        any(
          (key: DisableE2eeWhenRelatedOptionMatch) =>
            settingLock[key] &&
            (meeting as RcVMeetingModel)[key] ===
              DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH[key],
        )(
          Object.keys(
            DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH,
          ) as DisableE2eeWhenRelatedOptionMatch[],
        ));

    const authUserTypeValue = isOnlyCoworkersJoin
      ? AUTH_USER_TYPE.SIGNED_IN_CO_WORKERS
      : AUTH_USER_TYPE.SIGNED_IN_USERS;
    /** for rcv part * */
    return {
      isRCV,
      isRCM,
      meeting,
      useRcmV2,
      showWhen,
      showTopic,
      delegators,
      showDuration,
      openNewWindow,
      scheduleButton,
      labelPlacement,
      datePickerSize,
      timePickerSize,
      showRcvAdminLock,
      recurringMeetingPosition,
      showE2EE,
      isE2EEDisabled,
      currentLocale: this._locale.currentLocale,
      disabled: isAllOptionDisabled,
      configDisabled,
      showScheduleOnBehalf: !!(delegators && delegators.length > 0),
      showRecurringMeeting:
        !meeting.usePersonalMeetingId && showRecurringMeeting,
      showSaveAsDefault:
        this._genericMeeting.ready && this._genericMeeting.showSaveAsDefault,
      // Need to add this back when we back to this ticket
      // https://jira.ringcentral.com/browse/RCINT-15031
      // disableSaveAsDefault:
      //   this._genericMeeting.ready &&
      //   !this._genericMeeting.isPreferencesChanged,
      disableSaveAsDefault: false,
      enableServiceWebSettings:
        this._genericMeeting.ready &&
        this._genericMeeting.enableServiceWebSettings,
      enablePersonalMeeting:
        this._genericMeeting.ready &&
        this._genericMeeting.enablePersonalMeeting,
      showWaitingRoom: enableWaitingRoom,
      // RCV AuthCanJoin
      authUserTypeValue,
      personalMeetingId:
        this._genericMeeting.ready && this._genericMeeting.personalMeetingId,
      showSpinner: !!(
        !this._locale.ready ||
        !this._genericMeeting.ready ||
        (!isRCM && !isRCV) ||
        !this._genericMeeting.meeting ||
        (this._connectivityMonitor && !this._connectivityMonitor.ready) ||
        (this._rateLimiter && !this._rateLimiter.ready)
      ),
      showSpinnerInConfigPanel: this._genericMeeting.isUpdating,
      hasSettingsChanged: this._genericMeeting.hasSettingsChanged,
      defaultSetting: this._genericMeeting.defaultSetting,
      defaultTopic: this._genericMeeting.ready
        ? this._genericMeeting.defaultTopic
        : '',
      isPersonalMeetingDisabled: showE2EE && (meeting as RcVMeetingModel).e2ee,
      /* RCV JBH */
      joinBeforeHostLabel: isDelegator
        ? JBH_LABEL.JOIN_AFTER_HOST
        : JBH_LABEL.JOIN_AFTER_ME,
      /* RCV option */
      isRequirePasswordDisabled:
        isE2eeRelatedOptionsDisabled ||
        configDisabled ||
        (showRcvAdminLock &&
          (meeting as RcVMeetingModel).settingLock?.isMeetingSecret),
      isJoinBeforeHostDisabled:
        isE2eeRelatedOptionsDisabled ||
        configDisabled ||
        (showRcvAdminLock && meeting.settingLock?.allowJoinBeforeHost) ||
        (enableWaitingRoom &&
          (meeting as RcVMeetingModel).waitingRoomMode ===
            RCV_WAITING_ROOM_MODE.all),
      isWaitingRoomDisabled:
        isE2eeRelatedOptionsDisabled ||
        configDisabled ||
        (showRcvAdminLock &&
          (meeting as RcVMeetingModel).settingLock?.waitingRoomMode),
      isWaitingRoomNotCoworkerDisabled: (meeting as RcVMeetingModel)
        .isOnlyCoworkersJoin,
      isWaitingRoomGuestDisabled:
        (meeting as RcVMeetingModel).isOnlyAuthUserJoin ||
        (showE2EE && (meeting as RcVMeetingModel).e2ee),
      isWaitingRoomAllDisabled: false,
      isAuthenticatedCanJoinDisabled:
        isE2eeRelatedOptionsDisabled ||
        configDisabled ||
        (showRcvAdminLock &&
          (meeting as RcVMeetingModel).settingLock?.isOnlyAuthUserJoin),
      isAuthUserTypeDisabled:
        disabled ||
        configDisabled ||
        (showRcvAdminLock &&
          (meeting as RcVMeetingModel).settingLock?.isOnlyCoworkersJoin),
      isSignedInUsersDisabled: false,
      isSignedInCoWorkersDisabled: false,
    };
  }

  getUIFunctions({ schedule }) {
    return {
      switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) =>
        this._genericMeeting.switchUsePersonalMeetingId(usePersonalMeetingId),
      updateHasSettingsChanged: (isChanged: boolean) => {
        this._genericMeeting.updateHasSettingsChanged(isChanged);
      },
      updateScheduleFor: (userExtensionId: string) =>
        this._genericMeeting.updateScheduleFor(userExtensionId),
      // TODO: any is reserved for RcM
      updateMeetingSettings: (value: RcMMeetingModel | RcVMeetingModel) =>
        this._genericMeeting.updateMeetingSettings(value),
      validatePasswordSettings: (
        password: string,
        isSecret: boolean,
      ): boolean => {
        return this._genericMeeting.validatePasswordSettings(
          password,
          isSecret,
        );
      },
      schedule: (
        meetingInfo: RcMMeetingModel | RcVMeetingModel,
        opener: Window,
      ) => {
        if (schedule) {
          return schedule(meetingInfo, opener);
        }
        return this._genericMeeting.schedule(meetingInfo, {}, opener);
      },
      init: () => this._genericMeeting.init(),
      // TODO: Moving to RcVideo updateMeetingSettings would be better
      e2eeInteractFunc: (e2eeValue: boolean) => {
        if (!e2eeValue) {
          this._genericMeeting.updateMeetingSettings({
            e2ee: e2eeValue,
          } as RcVMeetingModel);
          // when user turn on e2ee option in pmi meeting, should switch to non-pmi meeting
        } else if (this._genericMeeting.meeting.usePersonalMeetingId) {
          this._genericMeeting.switchUsePersonalMeetingId(false);
          this._genericMeeting.updateMeetingSettings({
            e2ee: true,
            ...RCV_E2EE_DEFAULT_SECURITY_OPTIONS,
          } as RcVMeetingModel);
        } else {
          this._genericMeeting.updateMeetingSettings({
            e2ee: e2eeValue,
            ...RCV_E2EE_DEFAULT_SECURITY_OPTIONS,
          } as RcVMeetingModel);
        }
        this._genericMeeting.updateHasSettingsChanged(true);
      },
    };
  }
}
