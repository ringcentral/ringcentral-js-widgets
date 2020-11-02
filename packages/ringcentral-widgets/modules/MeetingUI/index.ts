import { Module } from 'ringcentral-integration/lib/di';
import RcUIModule from '../../lib/RcUIModule';

@Module({
  name: 'MeetingUI',
  deps: ['Meeting', 'Locale', 'RateLimiter', 'ConnectivityMonitor'],
})
export default class MeetingUI extends RcUIModule {
  _meeting: any;
  _locale: any;
  _rateLimiter: any;
  _connectivityMonitor: any;
  constructor({
    meeting,
    locale,
    rateLimiter,
    connectivityMonitor,
    ...options
  }) {
    super({
      ...options,
    });
    this._meeting = meeting;
    this._locale = locale;
    this._rateLimiter = rateLimiter;
    this._connectivityMonitor = connectivityMonitor;
  }

  getUIProps({
    disabled,
    showWhen,
    showDuration,
    showRecurringMeeting,
    openNewWindow,
  }) {
    return {
      meeting: this._meeting.meeting || {},
      currentLocale: this._locale.currentLocale,
      disabled:
        this._meeting.isScheduling ||
        disabled ||
        !this._connectivityMonitor.connectivity ||
        (this._rateLimiter && this._rateLimiter.throttling),
      showWhen,
      showDuration,
      showRecurringMeeting,
      openNewWindow,
      showSaveAsDefault: this._meeting.showSaveAsDefault,
      // Need to add this back when we back to this ticket
      // https://jira.ringcentral.com/browse/RCINT-15031
      // disableSaveAsDefault: !this._meeting.isPreferencesChanged,
      disableSaveAsDefault: false,
      enablePersonalMeeting: this._meeting.enablePersonalMeeting,
      personalMeetingId:
        this._meeting.ready && this._meeting.personalMeeting?.shortId,
    };
  }

  getUIFunctions({ schedule }) {
    return {
      update: (meetingState) => this._meeting.update(meetingState),
      invite: async (meetingInfo, opener) => {
        if (schedule) {
          await schedule(meetingInfo, opener);
          return;
        }
        await this._meeting.schedule(meetingInfo, {}, opener);
      },
      init: () => this._meeting.init(),
      switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) =>
        this._meeting.switchUsePersonalMeetingId(usePersonalMeetingId),
    };
  }
}
