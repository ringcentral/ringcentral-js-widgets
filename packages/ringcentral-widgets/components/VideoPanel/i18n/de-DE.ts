/* eslint-disable */
import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/RcVideo';
export default {
  topic: 'Titel der Besprechung',
  date: 'Datum',
  startTime: 'Uhrzeit',
  duration: 'Dauer',
  scheduleFor: 'Ansetzen im Namen von',
  meetingSettings: 'Besprechungseinstellungen',
  meetingSettingsDescription:
    'Das Aktualisieren dieser Einstellungen gilt nur für die aktuelle Besprechung.',
  here: 'hier',
  [ASSISTED_USERS_MYSELF]: 'Ich',
  joinBeforeHost: 'Teilnehmern erlauben, vor dem Gastgeber teilzunehmen',
  enableWaitingRoom: 'Wartezimmer aktivieren',
  waitingRoom: 'Wartebereich aktivieren für',
  waitingRoomTitle: 'Wartebereich',
  waitingRoomDescription:
    'Halten Sie Besprechungen privat, bis Sie Teilnehmer zugelassen haben.',
  waitingRoomNotCoworker: 'Jeder außerhalb meines Unternehmens',
  waitingRoomGuest: 'Jeder, der nicht angemeldet ist',
  waitingRoomAll: 'Jeden',
  enterPassword: 'Kennwort eingeben',
  onlyJoinAfterMe: 'Teilnehmer können erst nach mir teilnehmen',
  onlyJoinAfterHost: 'Teilnehmer können erst nach dem Host beitreten',
  allowJoinBeforeHostDescription:
    'Sorgt für Sicherheit und Ablenkungsfreiheit während der Besprechung, bis Sie beitreten.',
  muteAudio: 'Ton für Teilnehmer stummschalten',
  turnOffCamera: 'Kamera für Teilnehmer ausschalten',
  requirePassword: 'Kennwort anfordern',
  useE2ee: 'End-to-End-Verschlüsselung verwenden',
  e2eeTooltip:
    'Besprechungen mit End-to-End-Verschlüsselung sind am privatesten, jedoch sind Funktionen wie der Beitritt per Telefon und die Aufzeichnung nicht verfügbar.',
  setPassword: 'Kennwort festlegen*',
  setPasswordNotSymbol: 'Kennwort festlegen',
  passwordEmptyError: 'Besprechungskennwort erforderlich',
  passwordInvalidError:
    'Ihr Kennwort muss 1–10 Buchstaben und Ziffern lang sein und darf keine Symbole enthalten',
  passwordHintText:
    'Ihr Kennwort muss 1–10 Buchstaben und Ziffern lang sein und darf keine Symbole enthalten',
  usePersonalMeetingId: 'Persönliche Besprechungs-ID verwenden:',
  usePersonalMeetingIdInstead: 'Stattdessen persönliche Besprechung verwenden',
  usePersonalMeetingName: 'Persönliche Besprechung verwenden:',
  meetingSettingsSecurity: 'Sicherheit',
  onlyAuthUserJoin: 'Nur authentifizierte Benutzer können teilnehmen',
  signedInUsers: 'Angemeldete Benutzer',
  signedInCoWorkers: 'Angemeldete Kollegen',
  limitScreenSharing:
    'Nur Gastgeber & Moderatoren können den Bildschirm freigeben',
  lockTooltip:
    'Diese Einstellung wird von Ihrem Unternehmensadministrator verwaltet.',
  pmiSettingAlert:
    'Diese Einstellungen gelten für alle Meetings, die mit PMI erstellt werden',
  today: 'Heute',
  scheduleForGuidance:
    'Planen Sie einen Termin für jemand anderen?\n1. Stellen Sie sicher, dass Sie in ihrem Outlook-Kalender eingetragen sind.\n2. Wählen Sie in der Dropdown-Liste die Person aus, für die Sie den Termin planen möchten.\n',
  scheduleForGuidanceMore: 'Details erfahren.',
  changePmiSettings: 'Einstellungen für persönliche Besprechung ändern',
  allowToRecording: 'Start/Beenden der Aufzeichnung zulassen',
  allowTranscribe: 'Start/Beenden der Transkription zulassen',
  everyone: 'Alle',
  onlyHostModerators: 'Nur Gastgeber und Moderatoren',
  advancedSettings: 'Erweiterte Einstellungen',
  whoCanJoin: 'Wer kann beitreten?',
  requirePasswordDescription:
    'Teilnehmer, die über den Besprechungslink beitreten, müssen kein Kennwort eingeben.',
  password: 'Kennwort:',
  passwordLabel: 'Kennwort',
  edit: 'Bearbeiten',
  changePassword: 'Kennwort ändern',
  passwordRequired: 'Kennwort ist erforderlich',
  passwordLengthError: 'Das Kennwort muss 1–10 Zeichen lang sein',
  passwordFormatError: 'Das Kennwort darf nur Buchstaben und Zahlen enthalten',
  passwordHint:
    'Ihr Kennwort muss 1–10 Buchstaben und Ziffern lang sein und darf keine Symbole enthalten.',
} as const;

// @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"startTime"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"meetingSettingsDescription"@#@ @source: @#@"Update these settings will apply to current meeting only."@#@
// @key: @#@"here"@#@ @source: @#@"here"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"enableWaitingRoom"@#@ @source: @#@"Enable waiting room"@#@
// @key: @#@"waitingRoom"@#@ @source: @#@"Enable waiting room for"@#@
// @key: @#@"waitingRoomTitle"@#@ @source: @#@"Waiting room"@#@
// @key: @#@"waitingRoomDescription"@#@ @source: @#@"Keep meetings private until you admit participants."@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"Anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"Anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"Everyone"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Participants can only join after me"@#@
// @key: @#@"onlyJoinAfterHost"@#@ @source: @#@"Participants can only join after host"@#@
// @key: @#@"allowJoinBeforeHostDescription"@#@ @source: @#@"Keeps the meeting secure and distraction-free until you join."@#@
// @key: @#@"muteAudio"@#@ @source: @#@"Mute audio for participants"@#@
// @key: @#@"turnOffCamera"@#@ @source: @#@"Turn off camera for participants"@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"useE2ee"@#@ @source: @#@"Use end-to-end encryption"@#@
// @key: @#@"e2eeTooltip"@#@ @source: @#@"End-to-end encrypted meetings are the most private, but features like joining by phone, closed captions, and recording aren't available."@#@
// @key: @#@"setPassword"@#@ @source: @#@"Set password *"@#@
// @key: @#@"setPasswordNotSymbol"@#@ @source: @#@"Set password"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"passwordInvalidError"@#@ @source: @#@"Your password must be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"passwordHintText"@#@ @source: @#@"Your password should be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"usePersonalMeetingId"@#@ @source: @#@"Use Personal Meeting ID"@#@
// @key: @#@"usePersonalMeetingIdInstead"@#@ @source: @#@"Use personal meeting instead"@#@
// @key: @#@"usePersonalMeetingName"@#@ @source: @#@"Use personal meeting:"@#@
// @key: @#@"meetingSettingsSecurity"@#@ @source: @#@"Security"@#@
// @key: @#@"onlyAuthUserJoin"@#@ @source: @#@"Only authenticated users can join"@#@
// @key: @#@"signedInUsers"@#@ @source: @#@"Signed in users"@#@
// @key: @#@"signedInCoWorkers"@#@ @source: @#@"Signed in co-workers"@#@
// @key: @#@"limitScreenSharing"@#@ @source: @#@"Only host & moderators can share screen"@#@
// @key: @#@"lockTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"pmiSettingAlert"@#@ @source: @#@"These settings will apply to all meetings created with PMI"@#@
// @key: @#@"today"@#@ @source: @#@"Today"@#@
// @key: @#@"scheduleForGuidance"@#@ @source: @#@"Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n"@#@
// @key: @#@"scheduleForGuidanceMore"@#@ @source: @#@"Learn details"@#@
// @key: @#@"changePmiSettings"@#@ @source: @#@"Change Personal Meeting settings"@#@
// @key: @#@"allowToRecording"@#@ @source: @#@"Allow to start and stop recording"@#@
// @key: @#@"allowTranscribe"@#@ @source: @#@"Allow to start and stop transcription"@#@
// @key: @#@"everyone"@#@ @source: @#@"Everyone"@#@
// @key: @#@"onlyHostModerators"@#@ @source: @#@"Only host and moderators"@#@
// @key: @#@"advancedSettings"@#@ @source: @#@"Advanced settings"@#@
// @key: @#@"whoCanJoin"@#@ @source: @#@"Who can join?"@#@
// @key: @#@"requirePasswordDescription"@#@ @source: @#@"Participants who join via the meeting link won’t need to enter the password."@#@
// @key: @#@"password"@#@ @source: @#@"Password:"@#@
// @key: @#@"passwordLabel"@#@ @source: @#@"Password"@#@
// @key: @#@"edit"@#@ @source: @#@"Edit"@#@
// @key: @#@"changePassword"@#@ @source: @#@"Change Password"@#@
// @key: @#@"passwordRequired"@#@ @source: @#@"Password is required"@#@
// @key: @#@"passwordLengthError"@#@ @source: @#@"Password must be 1-10 characters long"@#@
// @key: @#@"passwordFormatError"@#@ @source: @#@"Password can only contain letters and numbers"@#@
// @key: @#@"passwordHint"@#@ @source: @#@"Your password should be 1-10 letters and numbers long, but can not contain symbols."@#@
