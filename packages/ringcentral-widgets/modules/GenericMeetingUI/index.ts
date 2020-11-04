import { Module } from 'ringcentral-integration/lib/di';
import { RcVMeetingModel } from 'ringcentral-integration/interfaces/Rcv.model';
import { RcMMeetingModel } from 'ringcentral-integration/modules/Meeting';
import GenericMeeting from 'ringcentral-integration/modules/GenericMeeting';
import Brand from 'ringcentral-integration/modules/Brand';

import RcUIModule from '../../lib/RcUIModule';

@Module({
  name: 'GenericMeetingUI',
  deps: [
    'GenericMeeting',
    'Locale',
    'RateLimiter',
    'ConnectivityMonitor',
    'Brand',
  ],
})
export default class GenericMeetingUI extends RcUIModule {
  _genericMeeting: GenericMeeting;
  _locale: any;
  _rateLimiter: any;
  _connectivityMonitor: any;
  _brand: Brand;

  constructor({
    genericMeeting,
    locale,
    rateLimiter,
    connectivityMonitor,
    brand,
    ...options
  }) {
    super({
      ...options,
    });
    this._genericMeeting = genericMeeting;
    this._locale = locale;
    this._rateLimiter = rateLimiter;
    this._connectivityMonitor = connectivityMonitor;
    this._brand = brand;
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
  }) {
    const invalidPassowrd =
      this._genericMeeting.ready &&
      this._genericMeeting.meeting &&
      (this._genericMeeting.isRCV || this._genericMeeting.isRCM) &&
      !this._genericMeeting.validatePasswordSettings(
        this._genericMeeting.isRCV
          ? this._genericMeeting.meeting.meetingPassword
          : this._genericMeeting.meeting.password,
        this._genericMeeting.isRCV
          ? this._genericMeeting.meeting.isMeetingSecret
          : this._genericMeeting.meeting._requireMeetingPassword,
      );
    const meeting =
      (this._genericMeeting.ready && this._genericMeeting.meeting) || {};
    const delegators =
      (this._genericMeeting.ready && this._genericMeeting.delegators) || [];
    return {
      meeting,
      useRcmV2,
      delegators,
      labelPlacement,
      datePickerSize,
      timePickerSize,
      currentLocale: this._locale.currentLocale,
      disabled: !!(
        disabled ||
        invalidPassowrd ||
        (this._genericMeeting.ready && this._genericMeeting.isScheduling) ||
        (this._connectivityMonitor &&
          !this._connectivityMonitor.connectivity) ||
        (this._rateLimiter && this._rateLimiter.throttling)
      ),
      showTopic,
      showWhen,
      showDuration,
      showScheduleOnBehalf: !!(delegators && delegators.length > 0),
      showRecurringMeeting:
        !meeting.usePersonalMeetingId && showRecurringMeeting,
      openNewWindow,
      showSaveAsDefault:
        this._genericMeeting.ready && this._genericMeeting.showSaveAsDefault,
      // Need to add this back when we back to this ticket
      // https://jira.ringcentral.com/browse/RCINT-15031
      // disableSaveAsDefault:
      //   this._genericMeeting.ready &&
      //   !this._genericMeeting.isPreferencesChanged,
      disableSaveAsDefault: false,
      isRCM: this._genericMeeting.isRCM,
      isRCV: this._genericMeeting.isRCV,
      scheduleButton,
      brandName: this._brand.name,
      showAdminLock:
        this._genericMeeting.ready && this._genericMeeting.showAdminLock,
      enablePersonalMeeting:
        this._genericMeeting.ready &&
        this._genericMeeting.enablePersonalMeeting,
      enableWaitingRoom:
        this._genericMeeting.ready && this._genericMeeting.enableWaitingRoom,
      personalMeetingId:
        this._genericMeeting.ready && this._genericMeeting.personalMeetingId,
      showSpinner: !!(
        !this._locale.ready ||
        !this._genericMeeting.ready ||
        (!this._genericMeeting.isRCM && !this._genericMeeting.isRCV) ||
        !this._genericMeeting.meeting ||
        (this._connectivityMonitor && !this._connectivityMonitor.ready) ||
        (this._rateLimiter && !this._rateLimiter.ready)
      ),
    };
  }

  getUIFunctions(props?: any) {
    const { schedule } = props;
    return {
      switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) =>
        this._genericMeeting.switchUsePersonalMeetingId(usePersonalMeetingId),
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
      schedule: async (
        meetingInfo: RcMMeetingModel | RcVMeetingModel,
        opener: Window,
      ) => {
        if (schedule) {
          await schedule(meetingInfo, opener);
          return;
        }
        await this._genericMeeting.schedule(meetingInfo, {}, opener);
      },
      init: () => this._genericMeeting.init(),
    };
  }
}
