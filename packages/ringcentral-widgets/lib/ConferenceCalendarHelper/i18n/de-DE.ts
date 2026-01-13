/* eslint-disable */
export default {
  inviteMeetingContent:
    '{accountName} lädt Sie zu einer {brandName}-Besprechung ein.\n\nTreten Sie von einem PC, Mac, iOS oder Android aus bei: {joinUri}{passwordTpl}\n\n Oder mit einmaligem Tippen auf dem iPhone: \n\t    {mobileDialingNumberTpl}\n\n    Oder per Telefon: \n\t     Wählen Sie: \n\t    {phoneDialingNumberTpl}\n\t     Besprechungs-ID: {meetingId}\n\t     Verfügbare internationale Nummern: {teleconference} ',
  conferenceLocationField:
    'Konferenzbesprechung, Einwahlnummer: {dialInNumber}',
  scheduleError:
    'Da ist leider etwas schief gelaufen. Versuchen Sie es erneut.',
  noMeetingPermission:
    'Sie haben leider nicht die erforderlichen Berechtigungen für {brandName} Meetings. Wenden Sie sich an den Administrator Ihres Unternehmens, um fortzufahren.',
  noConferencePermission:
    'Sie haben leider nicht die erforderlichen Berechtigungen für {brandName}-Konferenzen. Wenden Sie sich an den Administrator Ihres Unternehmens, um fortzufahren.',
  conferenceTitle: 'Konferenzbesprechung von {displayName}',
  internationalNumber: 'Internationale Einwahlnummern:',
  inviteText_att:
    'Treten Sie bitte der {brandName}-Konferenz bei.\n\nEinwahlnummer: {formattedDialInNumber} \n{additionalNumbersSection} \nTeilnehmerzugang: {participantCode} \n\nBenötigen Sie eine internationale Einwahlnummer? Besuchen Sie bitte {dialInNumbersLink} \n\nDiese Telefonkonferenz wird Ihnen durch {brandName}-Konferenzen bereitgestellt.',
  inviteText_bt:
    'Treten Sie bitte der {brandName}-Konferenz bei.\n\nEinwahlnummer: {formattedDialInNumber} \n{additionalNumbersSection} \nTeilnehmerzugang: {participantCode} \n\nZusätzliche Einwahlnummern {dialInNumbersLink} ',
  inviteText_rc:
    'Treten Sie bitte der {brandName}-Konferenz bei.\n\nEinwahlnummer: {formattedDialInNumber} \n{additionalNumbersSection} \nTeilnehmerzugang: {participantCode} \n\nBenötigen Sie eine internationale Einwahlnummer? Besuchen Sie bitte {dialInNumbersLink} \n\nDiese Telefonkonferenz wird Ihnen durch {brandName}-Konferenzen bereitgestellt.',
  inviteText_telus:
    'Treten Sie bitte der {brandName}-Konferenz bei.\n\nEinwahlnummer: {formattedDialInNumber} \n{additionalNumbersSection} \nTeilnehmerzugang: {participantCode} \n\nZusätzliche Einwahlnummern {dialInNumbersLink} ',
  conferenceCall: '{brandName}-Telefonkonferenz',
  videoCall: '{brandName} Video-Anruf',
  addConferencingDetails: 'Konferenzdetails hinzufügen',
  updateConferencingDetails: 'Konferenzdetails aktualisieren',
  // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
  scheduleError:
    'Da ist leider etwas schief gelaufen. Versuchen Sie es erneut.',
  deleteBtn: 'Löschen',
  settingsBtn: 'Einstellungen',
  saveAsDefaultAndNotShowAgain:
    'Als Standard speichern und nicht erneut anzeigen',
  saveAsDefault: 'Als Standard speichern',
  done: 'Erledigt',
  update: 'Aktualisieren',
  conferenceSettingsTitle: '{brand}-Konferenzeinstellungen',
  videoSettingsTitle: '{brand} Meetings-Einstellungen',
  password: 'Kennwort',
  failedToRetrieveMeeting:
    'Die Netzwerkverbindung wurde unterbrochen. Diese Besprechung löschen und später erneut versuchen.',
  meetingSettingsTitle: 'Einstellungen für {brand} Meetings',
  recurringMeeting: 'Wiederkehrende Besprechung',
  meetingOptions: 'Besprechungsoptionen',
  schedule: 'Planen',
  // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
  settingsBtn: 'Einstellungen',
} as const;

// @key: @#@"inviteMeetingContent"@#@ @source: @#@"{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\n Or iPhone one-tap:\n\t    {mobileDialingNumberTpl}\n\n    Or Telephone:\n\t     Dial:\n\t    {phoneDialingNumberTpl}\n\t     Meeting ID: {meetingId}\n\t     International numbers available: {teleconference} "@#@
// @key: @#@"conferenceLocationField"@#@ @source: @#@"Conference Meeting, Dial-in Number: {dialInNumber}"@#@
// @key: @#@"scheduleError"@#@ @source: @#@"Sorry, something went wrong, please try again."@#@
// @key: @#@"noMeetingPermission"@#@ @source: @#@"Sorry, you don't have {brandName} Meetings permissions. Contact your company administrator to continue."@#@
// @key: @#@"noConferencePermission"@#@ @source: @#@"Sorry, you don't have {brandName} Conference permissions. Contact your company administrator to continue."@#@
// @key: @#@"conferenceTitle"@#@ @source: @#@"{displayName}'s Conference Meeting"@#@
// @key: @#@"internationalNumber"@#@ @source: @#@"International Dial-in Numbers:"@#@
// @key: @#@"inviteText_att"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLink} \n\nThis conference call is brought to you by {brandName} Conferencing."@#@
// @key: @#@"inviteText_bt"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nAdditional dial-in numbers {dialInNumbersLink} "@#@
// @key: @#@"inviteText_rc"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLink} \n\nThis conference call is brought to you by {brandName} Conferencing."@#@
// @key: @#@"inviteText_telus"@#@ @source: @#@"Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nAdditional dial-in numbers {dialInNumbersLink} "@#@
// @key: @#@"conferenceCall"@#@ @source: @#@"{brandName} Conference Call"@#@
// @key: @#@"videoCall"@#@ @source: @#@"{brandName} Video Call"@#@
// @key: @#@"addConferencingDetails"@#@ @source: @#@"Adding conferencing details"@#@
// @key: @#@"updateConferencingDetails"@#@ @source: @#@"Updating conferencing details"@#@
// @key: @#@"deleteBtn"@#@ @source: @#@"Delete"@#@
// @key: @#@"settingsBtn"@#@ @source: @#@"Settings"@#@
// @key: @#@"saveAsDefaultAndNotShowAgain"@#@ @source: @#@"Save as default and do not show again"@#@
// @key: @#@"saveAsDefault"@#@ @source: @#@"Save as default"@#@
// @key: @#@"done"@#@ @source: @#@"Done"@#@
// @key: @#@"update"@#@ @source: @#@"Update"@#@
// @key: @#@"conferenceSettingsTitle"@#@ @source: @#@"{brand} Conference Settings"@#@
// @key: @#@"videoSettingsTitle"@#@ @source: @#@"{brand} Meetings Settings"@#@
// @key: @#@"password"@#@ @source: @#@"Password"@#@
// @key: @#@"failedToRetrieveMeeting"@#@ @source: @#@"The network connection is lost. Delete this meeting and try again later."@#@
// @key: @#@"meetingSettingsTitle"@#@ @source: @#@"{brand} Meetings - Settings"@#@
// @key: @#@"recurringMeeting"@#@ @source: @#@"Recurring Meeting"@#@
// @key: @#@"meetingOptions"@#@ @source: @#@"Meeting Options"@#@
// @key: @#@"schedule"@#@ @source: @#@"Schedule"@#@
