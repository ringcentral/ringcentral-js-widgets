import { Module } from 'ringcentral-integration/lib/di';
import Brand from 'ringcentral-integration/modules/Brand';
import { RcVMeetingModel } from 'ringcentral-integration/models/rcv.model';

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
  _genericMeeting: any;
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
    disabled,
    showWhen,
    showDuration,
    openNewWindow,
    showRecurringMeeting,
    scheduleButton,
    datePickerSize,
    timePickerSize,
  }) {
    const invalidPassowrd =
      this._genericMeeting.ready &&
      this._genericMeeting.isRCV &&
      this._genericMeeting.meeting &&
      this._genericMeeting.meeting.isMeetingSecret &&
      !this._genericMeeting.meeting.isMeetingPasswordValid;
    return {
      datePickerSize,
      timePickerSize,
      meeting:
        (this._genericMeeting.ready && this._genericMeeting.meeting) || {},
      currentLocale: this._locale.currentLocale,
      disabled: !!(
        disabled ||
        invalidPassowrd ||
        (this._genericMeeting.ready && this._genericMeeting.isScheduling) ||
        (this._connectivityMonitor &&
          !this._connectivityMonitor.connectivity) ||
        (this._rateLimiter && this._rateLimiter.throttling)
      ),
      showWhen,
      showDuration,
      showRecurringMeeting,
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
      personalMeetingId:
        this._genericMeeting.ready &&
        this._genericMeeting.personalMeeting &&
        this._genericMeeting.personalMeeting.shortId,
      showSpinner: !!(
        !this._locale.ready ||
        !this._genericMeeting.ready ||
        (!this._genericMeeting.isRCM && !this._genericMeeting.isRCV) ||
        (this._connectivityMonitor && !this._connectivityMonitor.ready) ||
        (this._rateLimiter && !this._rateLimiter.ready)
      ),
    };
  }

  getUIFunctions(props?: any) {
    const { schedule } = props;
    return {
      // TODO: any is reserved for RcM
      updateMeetingSettings: (value: RcVMeetingModel | any) =>
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
      schedule: async (meetingInfo, opener) => {
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
