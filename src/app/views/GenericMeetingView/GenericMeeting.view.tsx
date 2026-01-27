import type { RcVMeetingModel } from '@ringcentral-integration/commons/interfaces/Rcv.model';
import {
  AppFeatures,
  ConnectivityMonitor,
  RateLimiter,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  Brand,
  Locale,
} from '@ringcentral-integration/micro-core/src/app/services';
import { ModalView } from '@ringcentral-integration/micro-core/src/app/views';
import {
  action,
  autobind,
  injectable,
  optional,
  portal,
  RcViewModule,
  state,
  UIFunctions,
  UIProps,
  useConnector,
} from '@ringcentral-integration/next-core';
import type {
  GenericMeetingPanelProps,
  ScheduleButtonProps,
} from '@ringcentral-integration/widgets/components/GenericMeetingPanel';
import { GenericMeetingPanel } from '@ringcentral-integration/widgets/components/GenericMeetingPanel';
import { GenericMeetingScheduleButton } from '@ringcentral-integration/widgets/components/GenericMeetingScheduleButton';
import { any, find } from 'ramda';
import React, { useRef } from 'react';

import type {
  DisableE2eeWhenRelatedOptionMatch,
  RcMMeetingModel,
  RcvDelegator,
} from '../../services';
import { GenericMeeting } from '../../services';
import {
  AUTH_USER_TYPE,
  DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH,
  JBH_LABEL,
  RCV_WAITING_ROOM_MODE,
} from '../../services/RcVideo/constants';

import type {
  GenericMeetingViewOptions,
  GenericMeetingViewProps,
} from './GenericMeeting.view.interface';
import { t } from './i18n';

@injectable({
  name: 'GenericMeetingView',
})
export class GenericMeetingView extends RcViewModule {
  @portal
  confirmModal = this._modalView.create({
    props: () => ({
      variant: 'confirm',
      maxWidth: 'xs',
      childrenSize: this.isSmallScreen ? 'small' : 'medium',
      title: t('pmiChangeConfirmTitle'),
      content: t('pmiChangeConfirmContext'),
      confirmButtonText: t('pmiChangeConfirmed'),
      cancelButtonText: t('pmiChangeCancel'),
      onConfirm: () => {
        this.setIsPmiChangeConfirmed(true);
      },
    }),
  });

  constructor(
    protected _genericMeeting: GenericMeeting,
    protected _appFeatures: AppFeatures,
    protected _brand: Brand,
    protected _locale: Locale,
    protected _modalView: ModalView,
    protected _rateLimiter: RateLimiter,
    protected _connectivityMonitor: ConnectivityMonitor,
    @optional('GenericMeetingViewOptions')
    protected _genericMeetingViewOptions?: GenericMeetingViewOptions,
  ) {
    super();
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
    isDelegator = !!(user && !user.isLoginUser);

    const enableWaitingRoom =
      this._genericMeeting.ready && this._genericMeeting.enableWaitingRoom;

    const showE2EE =
      this._genericMeeting.ready && this._genericMeeting.enableE2EE;
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
      ((this._appFeatures.ready && !this._appFeatures.hasVideoE2EE) ||
        // TODO: fix type
        // @ts-ignore
        settingLock.e2ee ||
        any(
          (key: DisableE2eeWhenRelatedOptionMatch) =>
            // TODO: fix type
            // @ts-ignore
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

  getRcmConfig({ showRecurringMeeting }: { showRecurringMeeting?: boolean }) {
    return {
      delegators: this.delegators,
      showRecurringMeeting:
        !this.meeting?.usePersonalMeetingId && showRecurringMeeting,
    };
  }

  getUIProps(
    props: GenericMeetingViewProps,
  ): UIProps<GenericMeetingPanelProps> {
    const {
      disabled,
      showTopic,
      showWhen,
      showDuration,
      labelPlacement,
      scheduleButton,
      datePickerSize,
      timePickerSize,
      recurringMeetingPosition,
      openNewWindow = false,
      showRcvAdminLock = false,
      showPmiConfirm = false,
      configDisabled = false,
      showRemoveMeetingWarning = false,
    } = props;
    const isRCM = this._genericMeeting.isRCM;
    const isRCV = this._genericMeeting.isRCV;
    const isAllOptionDisabled = !!(
      disabled ||
      !this.meeting?.isMeetingPasswordValid ||
      (this._genericMeeting.ready && this._genericMeeting.isScheduling) ||
      !this._connectivityMonitor?.connectivity ||
      this._rateLimiter?.restricted
    );

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
      brandConfig: this._brand.brandConfig,
      recurringMeetingPosition,
      meeting: this.meeting,
      currentLocale: this._locale.currentLocale,
      disabled: isAllOptionDisabled,
      configDisabled,
      showScheduleOnBehalf: !!(this.delegators && this.delegators.length > 0),
      showSaveAsDefault:
        this._genericMeeting.ready && this._genericMeeting.showSaveAsDefault,
      // Need to add this back when we back to this ticket
      // https://jira_domain/browse/RCINT-15031
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
      // TODO: fix type
      // @ts-ignore
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
      isPmiChangeConfirmed: this.isPmiChangeConfirmed,
      ...config,
    };
  }

  getUIFunctions(): UIFunctions<GenericMeetingPanelProps> {
    return {
      switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) => {
        this._genericMeeting.switchUsePersonalMeetingId(usePersonalMeetingId);
        // reset pmi change confirm popup
        if (usePersonalMeetingId) {
          this.setIsPmiChangeConfirmed(false);
        }
        this._genericMeeting.updateHasSettingsChanged(true);
      },
      updateScheduleFor: (userExtensionId: string) =>
        this._genericMeeting.updateScheduleFor(userExtensionId),
      // TODO: any is reserved for RcM
      updateMeetingSettings: (value: RcMMeetingModel | RcVMeetingModel) => {
        this._genericMeeting.updateHasSettingsChanged(true);
        this._genericMeeting.updateMeetingSettings(value);
      },
      validatePasswordSettings: (
        password: string,
        isSecret: boolean,
      ): boolean => {
        return this._genericMeeting.validatePasswordSettings(
          password,
          isSecret,
        );
      },
      schedule: async (meetingInfo: RcMMeetingModel | RcVMeetingModel) => {
        const result = await this._genericMeeting.schedule(meetingInfo, {});

        return result;
      },
      // TODO: refactor this without dependency on RcVideo view
      init: () => this._genericMeeting.init(),
      // TODO: Moving to RcVideo updateMeetingSettings would be better
      e2eeInteractFunc: (e2eeValue: boolean) => {
        if (!e2eeValue) {
          this._genericMeeting.updateMeetingSettings({
            e2ee: e2eeValue,
          } as RcVMeetingModel);
          // when user turn on e2ee option in pmi meeting, should switch to non-pmi meeting
        } else if (this._genericMeeting.meeting?.usePersonalMeetingId) {
          this._genericMeeting.switchUsePersonalMeetingId(false);
          this._genericMeeting.turnOnE2ee();
        } else {
          this._genericMeeting.turnOnE2ee();
        }
        this._genericMeeting.updateHasSettingsChanged(true);
      },
      onPmiChangeClick: () => {
        this._modalView.open(this.confirmModal);
      },
    };
  }

  get meeting() {
    return (this._genericMeeting.ready && this._genericMeeting.meeting) || {};
  }

  get delegators() {
    return (
      (this._genericMeeting.ready && this._genericMeeting.delegators) || []
    );
  }

  get isSmallScreen() {
    return document.body.clientWidth < 290;
  }

  @autobind
  private DefaultScheduleButton(props: ScheduleButtonProps) {
    return (
      <GenericMeetingScheduleButton
        {...props}
        isRCV={this._genericMeeting.isRCV}
        isRCM={this._genericMeeting.isRCM}
      />
    );
  }

  component(props: GenericMeetingViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions());

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);
      return {
        ...props,
        ...uiProps,
        scheduleButton: props.scheduleButton || this.DefaultScheduleButton,
      };
    });
    const Component =
      this._genericMeetingViewOptions?.component || GenericMeetingPanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
