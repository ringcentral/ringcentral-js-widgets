import type { RcVMeetingModel } from '@ringcentral-integration/commons/interfaces/Rcv.model';
import { Module } from '@ringcentral-integration/commons/lib/di';
import type { RcMMeetingModel } from '@ringcentral-integration/commons/modules/Meeting';
import type {
  DisableE2eeWhenRelatedOptionMatch,
  RcvDelegator,
} from '@ringcentral-integration/commons/modules/RcVideo';
import {
  AUTH_USER_TYPE,
  DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH,
  JBH_LABEL,
  RCV_WAITING_ROOM_MODE,
} from '@ringcentral-integration/commons/modules/RcVideo';
import type { UIProps, UIFunctions } from '@ringcentral-integration/core';
import { RcUIModuleV2, action, state } from '@ringcentral-integration/core';
import { any, find } from 'ramda';

import type { GenericMeetingPanelProps } from '../../components/GenericMeetingPanel';

import type {
  Deps,
  GenericMeetingContainerProps,
} from './GenericMeetingUI.interface';
import i18n from './i18n';

@Module({
  name: 'GenericMeetingUI',
  deps: [
    'GenericMeeting',
    'AppFeatures',
    'Brand',
    'Locale',
    'ModalUI',
    'RateLimiter',
    'ConnectivityMonitor',
  ],
})
export class GenericMeetingUI<T extends Deps = Deps> extends RcUIModuleV2<T> {
  constructor(deps: T & Deps) {
    super({
      deps,
    });
  }

  @state
  isPmiChangeConfirmed = false;

  @action
  setIsPmiChangeConfirmed(status: boolean) {
    this.isPmiChangeConfirmed = status;
  }

  getRcvConfig({
    disabled = false,
    showRcvAdminLock = false,
    configDisabled = false,
    showPmiConfirm = false,
  }) {
    let isDelegator = false;
    const meeting = this.meeting as RcVMeetingModel;
    const delegators = this.delegators as RcvDelegator[];
    const user = find(
      (item) => item.extensionId === meeting.extensionId,
      delegators,
    );
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    isDelegator = user && !user.isLoginUser;

    const enableWaitingRoom =
      this._deps.genericMeeting.ready &&
      this._deps.genericMeeting.enableWaitingRoom;

    const showE2EE =
      this._deps.genericMeeting.ready && this._deps.genericMeeting.enableE2EE;
    const { settingLock = {}, e2ee, isOnlyCoworkersJoin } = meeting;

    const isPmiConfigDisabled =
      configDisabled ||
      (showPmiConfirm &&
        this.meeting.usePersonalMeetingId &&
        !this.isPmiChangeConfirmed);

    // when e2ee is on, waiting room&auth can join&require password&jbh will be disabled and turn on.
    const isE2eeRelatedOptionsDisabled = showE2EE && e2ee;

    const isE2EEDisabled =
      showE2EE &&
      ((this._deps.appFeatures.ready && !this._deps.appFeatures.hasVideoE2EE) ||
        // @ts-expect-error TS(2339): Property 'e2ee' does not exist on type '{}'.
        settingLock.e2ee ||
        any(
          (key: DisableE2eeWhenRelatedOptionMatch) =>
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
      meeting,
      showE2EE,
      delegators,
      isE2EEDisabled,
      authUserTypeValue,
      isE2eeRelatedOptionsDisabled,
      showWaitingRoom: enableWaitingRoom,
      isPersonalMeetingDisabled: showE2EE && meeting.e2ee,
      joinBeforeHostLabel: isDelegator
        ? JBH_LABEL.JOIN_AFTER_HOST
        : JBH_LABEL.JOIN_AFTER_ME,
      isRequirePasswordDisabled:
        isE2eeRelatedOptionsDisabled ||
        isPmiConfigDisabled ||
        configDisabled ||
        (showRcvAdminLock && meeting.settingLock?.isMeetingSecret),
      isJoinBeforeHostDisabled:
        configDisabled ||
        isPmiConfigDisabled ||
        (showRcvAdminLock && meeting.settingLock?.allowJoinBeforeHost) ||
        (enableWaitingRoom &&
          meeting.waitingRoomMode === RCV_WAITING_ROOM_MODE.all),
      isMuteAudioDisabled: configDisabled || isPmiConfigDisabled,
      isTurnOffCameraDisabled: configDisabled || isPmiConfigDisabled,
      isAllowScreenSharingDisabled:
        configDisabled ||
        isPmiConfigDisabled ||
        (showRcvAdminLock && meeting.settingLock?.allowScreenSharing),
      isWaitingRoomDisabled:
        isE2eeRelatedOptionsDisabled ||
        isPmiConfigDisabled ||
        configDisabled ||
        (showRcvAdminLock && meeting.settingLock?.waitingRoomMode),
      isWaitingRoomTypeDisabled:
        disabled ||
        configDisabled ||
        isPmiConfigDisabled ||
        (showRcvAdminLock && meeting.settingLock?.waitingRoomMode),
      isWaitingRoomNotCoworkerDisabled: meeting.isOnlyCoworkersJoin,
      isWaitingRoomGuestDisabled:
        meeting.isOnlyAuthUserJoin || (showE2EE && meeting.e2ee),
      isWaitingRoomAllDisabled: false,
      isAuthenticatedCanJoinDisabled:
        isE2eeRelatedOptionsDisabled ||
        configDisabled ||
        isPmiConfigDisabled ||
        (showRcvAdminLock && meeting.settingLock?.isOnlyAuthUserJoin),
      isAuthUserTypeDisabled:
        disabled ||
        configDisabled ||
        isPmiConfigDisabled ||
        (showRcvAdminLock && meeting.settingLock?.isOnlyCoworkersJoin),
      isSignedInUsersDisabled: false,
      isSignedInCoWorkersDisabled: false,
    };
  }

  getRcmConfig({ showRecurringMeeting }: { showRecurringMeeting: boolean }) {
    return {
      delegators: this.delegators,
      showRecurringMeeting:
        !this.meeting?.usePersonalMeetingId && showRecurringMeeting,
    };
  }

  getUIProps(
    props: GenericMeetingContainerProps,
  ): UIProps<GenericMeetingPanelProps> {
    const {
      disabled,
      showTopic,
      showWhen,
      showDuration,
      openNewWindow,
      labelPlacement,
      scheduleButton,
      datePickerSize,
      timePickerSize,
      recurringMeetingPosition,
      showRcvAdminLock = false,
      showPmiConfirm = false,
      configDisabled = false,
      showRemoveMeetingWarning = false,
    } = props;
    const isRCM = this._deps.genericMeeting.isRCM;
    const isRCV = this._deps.genericMeeting.isRCV;
    const isAllOptionDisabled = !!(
      disabled ||
      !this.meeting?.isMeetingPasswordValid ||
      (this._deps.genericMeeting.ready &&
        this._deps.genericMeeting.isScheduling) ||
      (this._deps.connectivityMonitor &&
        !this._deps.connectivityMonitor.connectivity) ||
      (this._deps.rateLimiter && this._deps.rateLimiter.throttling)
    );

    // @ts-expect-error TS(2345): Argument of type 'GenericMeetingContainerProps' is... Remove this comment to see the full error message
    const config = isRCM ? this.getRcmConfig(props) : this.getRcvConfig(props);

    return {
      isRCV,
      isRCM,
      showWhen,
      showTopic,
      showDuration,
      openNewWindow,
      scheduleButton,
      labelPlacement,
      datePickerSize,
      timePickerSize,
      showRcvAdminLock,
      showPmiConfirm,
      showRemoveMeetingWarning,
      // @ts-expect-error TS(2322): Type '{ id: string; code: string; name: string; sh... Remove this comment to see the full error message
      brandConfig: this._deps.brand.brandConfig,
      recurringMeetingPosition,
      meeting: this.meeting,
      currentLocale: this._deps.locale.currentLocale,
      disabled: isAllOptionDisabled,
      configDisabled,
      showScheduleOnBehalf: !!(this.delegators && this.delegators.length > 0),
      showSaveAsDefault:
        this._deps.genericMeeting.ready &&
        this._deps.genericMeeting.showSaveAsDefault,
      // Need to add this back when we back to this ticket
      // https://jira_domain/browse/RCINT-15031
      // disableSaveAsDefault:
      //   this._deps.genericMeeting.ready &&
      //   !this._deps.genericMeeting.isPreferencesChanged,
      disableSaveAsDefault: false,
      enableServiceWebSettings:
        this._deps.genericMeeting.ready &&
        this._deps.genericMeeting.enableServiceWebSettings,
      enablePersonalMeeting:
        this._deps.genericMeeting.ready &&
        this._deps.genericMeeting.enablePersonalMeeting,
      // @ts-expect-error TS(2322): Type 'string | false' is not assignable to type 's... Remove this comment to see the full error message
      personalMeetingId:
        this._deps.genericMeeting.ready &&
        this._deps.genericMeeting.personalMeetingId,
      showSpinner: !!(
        !this._deps.locale.ready ||
        !this._deps.genericMeeting.ready ||
        (!isRCM && !isRCV) ||
        !this._deps.genericMeeting.meeting ||
        (this._deps.connectivityMonitor &&
          !this._deps.connectivityMonitor.ready) ||
        (this._deps.rateLimiter && !this._deps.rateLimiter.ready)
      ),
      showSpinnerInConfigPanel: this._deps.genericMeeting.isUpdating,
      hasSettingsChanged: this._deps.genericMeeting.hasSettingsChanged,
      defaultSetting: this._deps.genericMeeting.defaultSetting,
      defaultTopic: this._deps.genericMeeting.ready
        ? this._deps.genericMeeting.defaultTopic
        : '',
      isPmiChangeConfirmed: this.isPmiChangeConfirmed,
      ...config,
    };
  }

  getUIFunctions({ schedule }: any): UIFunctions<GenericMeetingPanelProps> {
    return {
      switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) => {
        this._deps.genericMeeting.switchUsePersonalMeetingId(
          usePersonalMeetingId,
        );
        // reset pmi change confirm popup
        if (usePersonalMeetingId) {
          this.setIsPmiChangeConfirmed(false);
        }
        this._deps.genericMeeting.updateHasSettingsChanged(true);
      },
      updateScheduleFor: (userExtensionId: string) =>
        this._deps.genericMeeting.updateScheduleFor(userExtensionId),
      // TODO: any is reserved for RcM
      updateMeetingSettings: (value: RcMMeetingModel | RcVMeetingModel) => {
        this._deps.genericMeeting.updateHasSettingsChanged(true);
        this._deps.genericMeeting.updateMeetingSettings(value);
      },
      validatePasswordSettings: (
        password: string,
        isSecret: boolean,
      ): boolean => {
        return this._deps.genericMeeting.validatePasswordSettings(
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
        return this._deps.genericMeeting.schedule(meetingInfo, {}, opener);
      },
      init: () => this._deps.genericMeeting.init(),
      // TODO: Moving to RcVideo updateMeetingSettings would be better
      e2eeInteractFunc: (e2eeValue: boolean) => {
        if (!e2eeValue) {
          this._deps.genericMeeting.updateMeetingSettings({
            e2ee: e2eeValue,
          } as RcVMeetingModel);
          // when user turn on e2ee option in pmi meeting, should switch to non-pmi meeting
          // @ts-expect-error TS(2531): Object is possibly 'null'.
        } else if (this._deps.genericMeeting.meeting.usePersonalMeetingId) {
          this._deps.genericMeeting.switchUsePersonalMeetingId(false);
          this._deps.genericMeeting.turnOnE2ee();
        } else {
          this._deps.genericMeeting.turnOnE2ee();
        }
        this._deps.genericMeeting.updateHasSettingsChanged(true);
      },
      onPmiChangeClick: async () => {
        const currentLocale = this._deps.locale.currentLocale;
        this._deps.modalUI.confirm({
          maxWidth: 'xs',
          childrenSize: this.isSmallScreen ? 'small' : 'medium',
          title: i18n.getString('pmiChangeConfirmTitle', currentLocale),
          content: i18n.getString('pmiChangeConfirmContext', currentLocale),
          onConfirm: () => {
            this.setIsPmiChangeConfirmed(true);
          },
          confirmButtonText: i18n.getString(
            'pmiChangeConfirmed',
            currentLocale,
          ),
          cancelButtonText: i18n.getString('pmiChangeCancel', currentLocale),
        });
      },
    };
  }

  get meeting() {
    return (
      (this._deps.genericMeeting.ready && this._deps.genericMeeting.meeting) ||
      {}
    );
  }

  get delegators() {
    return (
      (this._deps.genericMeeting.ready &&
        this._deps.genericMeeting.delegators) ||
      []
    );
  }

  get isSmallScreen() {
    return document.body.clientWidth < 290;
  }
}
