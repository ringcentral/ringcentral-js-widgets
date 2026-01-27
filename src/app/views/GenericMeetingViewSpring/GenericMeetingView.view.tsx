import {
  getInitializedStartTime,
  updateFullYear,
  updateFullTime,
} from '@ringcentral-integration/commons/helpers/meetingHelper';
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

import { GenericMeeting, RcVideo } from '../../services';
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

import type {
  GenericMeetingViewSpringOptions,
  GenericMeetingPanelSpringProps,
  GenericMeetingPanelSpringFunctions,
} from './GenericMeetingView.view.interface';
import { GenericMeetingPanelSpring } from './components/GenericMeetingPanelSpring';
import {
  MEETING_CONFIG,
  getDurationOptions,
  constructPersonalMeetingLink,
} from './constants';

@injectable({
  name: 'GenericMeetingViewSpring',
})
export class GenericMeetingViewSpring extends RcViewModule {
  constructor(
    protected _genericMeeting: GenericMeeting,
    protected _router: RouterPlugin,
    protected _brand: Brand,

    @optional('GenericMeetingViewSpringOptions')
    private _genericMeetingViewOptions?: GenericMeetingViewSpringOptions,
  ) {
    super();
  }

  getUIProps(): UIProps<GenericMeetingPanelSpringProps> {
    const meeting = this.meeting as RcVMeetingModel;
    const defaultSettings = this._genericMeeting.ready
      ? (this._genericMeeting.defaultSetting as RcVMeetingModel)
      : {};

    // Merge meeting with default settings to ensure all fields are present
    const mergedMeeting = {
      ...defaultSettings,
      ...meeting,
    } as RcVMeetingModel;

    // Get current meeting data or defaults
    const currentDate = mergedMeeting?.startTime
      ? new Date(mergedMeeting.startTime)
      : new Date(getInitializedStartTime());

    // RCV meetings have duration directly
    const durationInMinutes =
      mergedMeeting?.duration || MEETING_CONFIG.DEFAULT_DURATION_MINUTES;

    const hours = Math.floor(durationInMinutes / 60)
      .toString()
      .padStart(2, '0');
    const minutes = (durationInMinutes % 60).toString().padStart(2, '0');

    // Handle password logic based on personal meeting ID usage
    const isPersonalMeetingEnabled =
      mergedMeeting?.usePersonalMeetingId || false;

    // Use the utility function for password resolution
    const meetingPassword = this.meetingPassword;

    // Construct personal meeting link from joinUrl
    const personalMeeting = this._genericMeeting.ready
      ? this._genericMeeting.personalMeeting
      : null;
    const personalMeetingLink = constructPersonalMeetingLink(
      (personalMeeting as any)?.joinUri || (personalMeeting as any)?.joinUrl,
    );

    // Calculate disabled states using utility function
    const disabledStates = calculateDisabledStates(
      this._genericMeeting,
      mergedMeeting,
    );

    return {
      // Meeting Configuration
      meetingTitle: (() => {
        const currentTitle = meeting?.name;
        if (currentTitle === undefined || currentTitle === null) {
          return this._genericMeeting.ready
            ? this._genericMeeting.defaultTopic
            : MEETING_CONFIG.DEFAULT_MEETING_TITLE;
        }
        return currentTitle;
      })(),
      meetingDate: currentDate,
      meetingTime: currentDate,
      meetingDuration: { hours, minutes },

      // General Settings
      requirePassword: mergedMeeting?.isMeetingSecret || false,
      meetingPassword: meetingPassword,
      whoCanJoin: getWhoCanJoinValue(mergedMeeting),
      useWaitingRoom: mergedMeeting?.waitingRoomMode !== 0,
      waitingRoomParticipants: getWaitingRoomValue(mergedMeeting),
      startMeetingAfterJoin: !mergedMeeting?.allowJoinBeforeHost,

      // Personal Meeting Settings
      isPersonalMeetingEnabled: isPersonalMeetingEnabled,
      personalMeetingLink: personalMeetingLink,

      // UI State
      isLoading: this.showSpinner,
      isUpdating: this._genericMeeting.isUpdating,
      disabled: !this._genericMeeting.ready || this._genericMeeting.isUpdating,

      // Options
      whoCanJoinOptions: getWhoCanJoinOptions(this._brand),
      waitingRoomOptions: getWaitingRoomOptions(mergedMeeting),
      hourOptions: this.getHourOptions(),
      minuteOptions: this.getMinuteOptions(),

      // Disabled States
      ...disabledStates,

      brandConfig: this._brand.brandConfig,
      // Additional properties
      isRCV: true,
    };
  }

  getUIFunctions(): UIFunctions<GenericMeetingPanelSpringFunctions> {
    // Create a getter function for settings that accounts for personal meeting toggling
    const getSettings = () => {
      // The meeting state already contains the correct settings (personal or regular)
      // based on the usePersonalMeetingId toggle, so we just return the current meeting
      return this._genericMeeting.meeting;
    };

    return {
      onMeetingTitleChange: (title: string) => {
        const meeting = this.meeting as RcVMeetingModel;
        this._genericMeeting.updateMeetingSettings({
          ...meeting,
          name: title,
        });
        this._genericMeeting.updateHasSettingsChanged(true);
      },

      onMeetingDateChange: (date: Date) => {
        const currentMeeting = this.meeting as RcVMeetingModel;
        const currentStartTime =
          currentMeeting?.startTime || getInitializedStartTime();
        const startTimeDate = new Date(currentStartTime);

        // Use the helper function to update only the date part
        const newStartTime = updateFullYear(startTimeDate, date);

        // Make a copy of the meeting object to avoid mutating directly
        const meeting = { ...currentMeeting };
        meeting.startTime = newStartTime as any; // Use `as any` because TS might expect a specific Date format

        this._genericMeeting.updateMeetingSettings(meeting);
        this._genericMeeting.updateHasSettingsChanged(true);
      },

      onMeetingTimeChange: (time: Date) => {
        const currentMeeting = this.meeting as RcVMeetingModel;
        const currentStartTime =
          currentMeeting?.startTime || getInitializedStartTime();
        const startTimeDate = new Date(currentStartTime);

        // Use the helper function to update only the time part
        const newStartTime = updateFullTime(startTimeDate, time);

        // Make a copy of the meeting object to avoid mutating directly
        const meeting = { ...currentMeeting };
        meeting.startTime = newStartTime.getTime() as any; // Use `as any` because TS might expect a specific Date format

        this._genericMeeting.updateMeetingSettings(meeting);
        this._genericMeeting.updateHasSettingsChanged(true);
      },

      onMeetingDurationChange: (duration: {
        hours: string;
        minutes: string;
      }) => {
        const durationInMinutes =
          parseInt(duration.hours) * 60 + parseInt(duration.minutes);

        const currentMeeting = this.meeting as RcVMeetingModel;
        this._genericMeeting.updateMeetingSettings({
          ...currentMeeting,
          duration: durationInMinutes,
        });
        this._genericMeeting.updateHasSettingsChanged(true);
      },

      // Use utility functions for common handlers
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

      onPersonalMeetingToggle: (enabled: boolean) => {
        this._genericMeeting.switchUsePersonalMeetingId(enabled);
        this._genericMeeting.updateHasSettingsChanged(true);
      },

      onScheduleMeeting: async () => {
        try {
          const result = await this._genericMeeting.schedule(
            this.meeting as RcVMeetingModel,
          );
          return result;
        } catch (error) {
          console.error('Failed to schedule meeting:', error);
        }
      },

      init: () => this._genericMeeting.init(),

      viewPersonalMeetingSettings: async () => {
        await this._router.push('/meeting/personalMeetingSettings');
      },
    };
  }

  private getHourOptions() {
    return getDurationOptions().HOURS;
  }

  private getMinuteOptions() {
    return getDurationOptions().MINUTES;
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
    const navigationState = props.location!.search!;

    const { current: uiFunctions } = useRef(this.getUIFunctions());
    const _props = useConnector(() => {
      return {
        ...this.getUIProps(),
        navigationState,
      };
    });

    const Component =
      this._genericMeetingViewOptions?.component || GenericMeetingPanelSpring;
    return <Component {..._props} {...uiFunctions} />;
  }
}
