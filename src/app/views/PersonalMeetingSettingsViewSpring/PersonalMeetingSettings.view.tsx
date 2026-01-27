import { RcVMeetingModel } from '@ringcentral-integration/commons/interfaces/Rcv.model';
import { Brand } from '@ringcentral-integration/micro-core/src/app/services';
import {
  injectable,
  RcViewModule,
  useConnector,
  optional,
  UIFunctions,
  UIProps,
  RouterPlugin,
} from '@ringcentral-integration/next-core';
import React, { useRef } from 'react';

import { GenericMeeting } from '../../services';
import { constructPersonalMeetingLink } from '../GenericMeetingViewSpring/constants';
import {
  calculateDisabledStates,
  createPasswordChangeHandler,
  createRequirePasswordChangeHandler,
  createStartMeetingAfterJoinChangeHandler,
  createUseWaitingRoomChangeHandler,
  createWaitingRoomParticipantsChangeHandler,
  createWhoCanJoinChangeHandler,
  getWaitingRoomOptions,
  getWaitingRoomValue,
  getWhoCanJoinOptions,
  getWhoCanJoinValue,
} from '../shared';

import {
  type PersonalMeetingSettingsViewSpringOptions,
  PersonalMeetingSettingsPanelSpringProps,
  PersonalMeetingSettingsPanelSpringFunctions,
} from './PersonalMeetingSettings.view.interface';
import { PersonalMeetingSettingsPanelSpring } from './components/PersonalMeetingSettingsPanelSpring';

@injectable({
  name: 'PersonalMeetingSettingsViewSpring',
})
export class PersonalMeetingSettingsViewSpring extends RcViewModule {
  constructor(
    private _genericMeeting: GenericMeeting,
    private _router: RouterPlugin,
    private _brand: Brand,

    @optional('PersonalMeetingSettingsViewSpringOptions')
    private _personalMeetingSettingsViewOptions?: PersonalMeetingSettingsViewSpringOptions,
  ) {
    super();
  }

  getUIProps(): UIProps<PersonalMeetingSettingsPanelSpringProps> {
    // Get personal meeting settings
    const personalMeetingSettings = this._genericMeeting.ready
      ? this._genericMeeting.defaultSetting
      : ({} as RcVMeetingModel);

    // Get personal meeting data
    const personalMeeting = this._genericMeeting.ready
      ? this._genericMeeting.meeting
      : null;

    const mergedMeeting = {
      ...personalMeetingSettings,
      ...personalMeeting,
    } as RcVMeetingModel;

    // Construct personal meeting link from joinUrl
    const personalMeetingLink = constructPersonalMeetingLink(
      (mergedMeeting as any)?.joinUri || (mergedMeeting as any)?.joinUrl,
    );

    // Get password from personal meeting settings using utility function
    const meetingPassword = this.meetingPassword;

    // Calculate disabled states using utility function
    const disabledStates = calculateDisabledStates(
      this._genericMeeting,
      mergedMeeting,
    );

    return {
      // Personal Meeting Settings
      requirePassword: (mergedMeeting as any)?.isMeetingSecret || false,
      meetingPassword: meetingPassword,
      whoCanJoin: getWhoCanJoinValue(mergedMeeting),
      useWaitingRoom: (mergedMeeting as any)?.waitingRoomMode !== 0,
      waitingRoomParticipants: getWaitingRoomValue(mergedMeeting),
      startMeetingAfterJoin: !mergedMeeting?.allowJoinBeforeHost,
      personalMeetingLink: personalMeetingLink,

      // UI State
      isLoading: this.showSpinner,
      isUpdating: this._genericMeeting.isUpdating,
      disabled: !this._genericMeeting.ready || this._genericMeeting.isUpdating,

      brandConfig: this._brand.brandConfig,

      // Options
      whoCanJoinOptions: getWhoCanJoinOptions(this._brand),
      waitingRoomOptions: getWaitingRoomOptions(mergedMeeting),

      // Disabled and locked states
      ...disabledStates,
      // Explicitly set locked states for clarity
      isRequirePasswordLocked: disabledStates.isRequirePasswordLocked,
      isJoinBeforeHostLocked: disabledStates.isJoinBeforeHostLocked,
      isWaitingRoomLocked: disabledStates.isWaitingRoomLocked,
      isAuthUserTypeLocked: disabledStates.isAuthUserTypeLocked,

      // Additional properties
      isRCV: true,
    };
  }

  getUIFunctions(): UIFunctions<PersonalMeetingSettingsPanelSpringFunctions> {
    // Create a getter function that always returns the most current settings
    const getSettings = () => this._genericMeeting.meeting;

    return {
      // Use factory functions for common handlers
      onRequirePasswordChange: createRequirePasswordChangeHandler(
        this._genericMeeting,
        getSettings,
      ),

      onPasswordChange: createPasswordChangeHandler(
        this._genericMeeting,
        getSettings,
      ),

      onWhoCanJoinChange: createWhoCanJoinChangeHandler(
        this._genericMeeting,
        getSettings,
      ),

      onUseWaitingRoomChange: createUseWaitingRoomChangeHandler(
        this._genericMeeting,
        getSettings,
      ),

      onWaitingRoomParticipantsChange:
        createWaitingRoomParticipantsChangeHandler(
          this._genericMeeting,
          getSettings,
        ),

      onStartMeetingAfterJoinChange: createStartMeetingAfterJoinChangeHandler(
        this._genericMeeting,
        getSettings,
      ),

      onBackClick: () => {
        this._router.push('/meeting?from=personalMeetingSettings');
      },
    };
  }

  get meeting() {
    const defaultValue = {};
    if (!this._genericMeeting.ready) return defaultValue;

    return this._genericMeeting.meeting || defaultValue;
  }

  get meetingPassword() {
    return (this.meeting as RcVMeetingModel).meetingPassword || '';
  }

  get showSpinner() {
    return !this._genericMeeting.ready;
  }

  component(props: any) {
    const { current: uiFunctions } = useRef(this.getUIFunctions());
    const _props = useConnector(() => this.getUIProps());

    const Component =
      this._personalMeetingSettingsViewOptions?.component ||
      PersonalMeetingSettingsPanelSpring;

    return <Component {..._props} {...uiFunctions} />;
  }
}
