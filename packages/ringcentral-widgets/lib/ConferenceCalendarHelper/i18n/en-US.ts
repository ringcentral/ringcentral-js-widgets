export default {
  inviteMeetingContent:
    '{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\n Or iPhone one-tap:\n\t    {mobileDialingNumberTpl}\n\n    Or Telephone:\n\t     Dial:\n\t    {phoneDialingNumberTpl}\n\t     Meeting ID: {meetingId}\n\t     International numbers available: {teleconference} ',
  conferenceLocationField: 'Conference Meeting, Dial-in Number: {dialInNumber}',
  scheduleError: 'Unexpected error. Try again later.',
  noMeetingPermission:
    "Sorry, you don't have {brandName} Meetings permissions. Contact your company administrator to continue.",
  noConferencePermission:
    "Sorry, you don't have {brandName} Conference permissions. Contact your company administrator to continue.",
  conferenceTitle: "{displayName}'s Conference Meeting",
  internationalNumber: 'International Dial-in Numbers:',
  inviteText_att:
    'Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLink} \n\nThis conference call is brought to you by {brandName} Conferencing.',
  inviteText_bt:
    'Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nAdditional dial-in numbers {dialInNumbersLink} ',
  inviteText_rc:
    'Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLink} \n\nThis conference call is brought to you by {brandName} Conferencing.',
  inviteText_telus:
    'Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nAdditional dial-in numbers {dialInNumbersLink} ',
  conferenceCall: '{brandName} Conference Call',
  videoCall: '{brandName} Video Call',
  addConferencingDetails: 'Adding conferencing details',
  updateConferencingDetails: 'Updating conferencing details',
  // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
  scheduleError: 'Sorry, something went wrong, please try again.',
  deleteBtn: 'Delete',
  settingsBtn: 'Settings',
  saveAsDefaultAndNotShowAgain: 'Save as default and do not show again',
  saveAsDefault: 'Save as default',
  done: 'Done',
  update: 'Update',
  conferenceSettingsTitle: '{brand} Conference Settings',
  videoSettingsTitle: '{brand} Meetings Settings',
  password: 'Password',
  failedToRetrieveMeeting:
    'The network connection is lost. Delete this meeting and try again later.',
  meetingSettingsTitle: '{brand} Meetings - Settings',
  recurringMeeting: 'Recurring Meeting',
  meetingOptions: 'Meeting Options',
  schedule: 'Schedule',
  // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
  settingsBtn: 'Settings',
} as const;
