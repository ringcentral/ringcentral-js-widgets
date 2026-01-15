import rcvMeetingSettingsBody from '@ringcentral-integration/mock/src/platform/data/rcvMeetingSettingsV2.json';
import videoPersonalSettingsBody from '@ringcentral-integration/mock/src/platform/data/videoPersonalSettingsV2.json';

export const RCV_MEETING_ID = rcvMeetingSettingsBody.pins.pstn.participant;
export const RCV_MEETING_NAME = rcvMeetingSettingsBody.name;
export const RCM_MEETING_ID = '987654321';
export const RCV_PMI_MEETING_ID =
  videoPersonalSettingsBody.pins.pstn.participant;
export const POST_RCV_SHORT_ID = rcvMeetingSettingsBody.pins.pstn.participant;

// office-add-ins
export const RCM_MEETING_INVITATION_BODY = `<div><p id="x_invite-meeting-id-${RCM_MEETING_ID}" title="RingCentral Video meeting">https://rcm.rcdev.ringcentral.com/j/${RCM_MEETING_ID}</p></div>`;
