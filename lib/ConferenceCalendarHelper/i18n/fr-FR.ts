/* eslint-disable */
export default {
  inviteMeetingContent:
    '{accountName} vous invite à une réunion {brandName}.\n\nRejoignez sur PC, Mac, iOS ou Android : {joinUri}{passwordTpl}\n\n Ou participez sur iPhone en une seule sélection :\n\t    {mobileDialingNumberTpl}\n\n    Ou via un téléphone :\n\t     Composez le :\n\t    {phoneDialingNumberTpl}\n\t     ID de réunion : {meetingId}\n\t     Numéros internationaux disponibles : {teleconference} ',
  conferenceLocationField:
    'Conférence réunion, numéro d’appel : {dialInNumber}',
  scheduleError: 'Désolé, quelque chose s’est mal passé. Veuillez réessayer.',
  noMeetingPermission:
    'Désolé, vous n’avez pas les autorisations {brandName} Meetings. Contactez l’administrateur de votre entreprise pour continuer.',
  noConferencePermission:
    'Désolé, vous n’avez pas les autorisations {brandName} Conference. Contactez l’administrateur de votre entreprise pour continuer.',
  conferenceTitle: 'Conférence de {displayName}',
  internationalNumber: 'Numéros internationaux à composer :',
  inviteText_att:
    'Veuillez rejoindre la conférence {brandName}.\n\nNuméro d’accès : {formattedDialInNumber} \n{additionalNumbersSection} \nAccès du participant :{participantCode} \n\nVous avez besoin d’un numéro d’accès international ? Veuillez visiter la page {dialInNumbersLink} \n\nCette conférence téléphonique est rendue possible grâce au service de conférences {brandName}.',
  inviteText_bt:
    'Veuillez rejoindre la conférence {brandName}.\n\nNuméro d’accès : {formattedDialInNumber} \n{additionalNumbersSection} \nAccès du participant : {participantCode} \n\nNuméros d’accès supplémentaires {dialInNumbersLink} ',
  inviteText_rc:
    'Veuillez rejoindre la conférence {brandName}.\n\nNuméro d’accès : {formattedDialInNumber} \n{additionalNumbersSection} \nAccès du participant :{participantCode} \n\nVous avez besoin d’un numéro d’accès international ? Veuillez visiter la page {dialInNumbersLink} \n\nCette conférence téléphonique est rendue possible grâce au service de conférences {brandName}.',
  inviteText_telus:
    'Veuillez rejoindre la conférence {brandName}.\n\nNuméro d’accès : {formattedDialInNumber} \n{additionalNumbersSection} \nAccès du participant : {participantCode} \n\nNuméros d’accès supplémentaires {dialInNumbersLink} ',
  conferenceCall: 'Conférence téléphonique {brandName}',
  videoCall: 'Appel vidéo {brandName}',
  addConferencingDetails: 'Ajout des détails de la conférence',
  updateConferencingDetails: 'Mise à jour des détails de la conférence',
  // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
  scheduleError: 'Désolé, quelque chose s’est mal passé. Veuillez réessayer.',
  deleteBtn: 'Supprimer',
  settingsBtn: 'Paramètres',
  saveAsDefaultAndNotShowAgain: 'Enregistrer par défaut et ne plus afficher',
  saveAsDefault: 'Enregistrer par défaut',
  done: 'Terminé',
  update: 'M. à jour',
  conferenceSettingsTitle: 'Paramètres de la conférence {brand}',
  videoSettingsTitle: 'Paramètres de {brand} Meetings',
  password: 'Mot de passe',
  failedToRetrieveMeeting:
    'Perte de la connexion réseau. Supprimez cette réunion et réessayez plus tard.',
  meetingSettingsTitle: '{brand} Meetings - Paramètres',
  recurringMeeting: 'Réunion périodique',
  meetingOptions: 'Options de réunion',
  schedule: 'Planifier',
  // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
  settingsBtn: 'Paramètres',
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
