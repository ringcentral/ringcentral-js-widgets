/* eslint-disable */
import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/RcVideo';
export default {
  topic: 'Titolo della riunione',
  date: 'Data',
  startTime: 'Ora',
  duration: 'Durata',
  scheduleFor: 'Programma per conto di',
  meetingSettings: 'Impostazioni riunione',
  meetingSettingsDescription:
    "L'aggiornamento di queste impostazioni verrà applicato solo alla riunione corrente.",
  here: 'qui',
  [ASSISTED_USERS_MYSELF]: 'Me',
  joinBeforeHost: "Consenti ai partecipanti di accedere prima dell'host",
  enableWaitingRoom: "Abilita sala d'attesa",
  waitingRoom: "Abilita sala d'attesa per",
  waitingRoomTitle: "Sala d'attesa",
  waitingRoomDescription:
    'Mantieni le riunioni private finché non ammetti i partecipanti.',
  waitingRoomNotCoworker: 'Chiunque al di fuori della mia azienda',
  waitingRoomGuest: 'Chi non si è registrato',
  waitingRoomAll: 'Tutti',
  enterPassword: 'Inserisci password',
  onlyJoinAfterMe: 'I partecipanti possono accedere solo dopo di me',
  onlyJoinAfterHost: "I partecipanti possono accedere solo dopo l'host",
  allowJoinBeforeHostDescription:
    'Mantieni la riunione sicura e senza distrazioni finché non accedi.',
  muteAudio: "Disattiva l'audio per i partecipanti",
  turnOffCamera: 'Disattiva la videocamera per i partecipanti',
  requirePassword: 'Richiedi password',
  useE2ee: 'Utilizza la codifica end-to-end',
  e2eeTooltip:
    'Le riunioni con crittografia end-to-end sono le più private, ma non offrono funzionalità come la partecipazione tramite telefono, i sottotitoli e la registrazione.',
  setPassword: 'Imposta password *',
  setPasswordNotSymbol: 'Imposta la password',
  passwordEmptyError: 'La password per la riunione è obbligatoria',
  passwordInvalidError:
    'La password deve avere 1-10 lettere e numeri e non può contenere simboli',
  passwordHintText:
    'La password deve contenere da 1 a 10 lettere e numeri, ma non può contenere simboli',
  usePersonalMeetingId: 'Usa ID riunione personale',
  usePersonalMeetingIdInstead: 'Usa riunione personale',
  usePersonalMeetingName: 'Usa riunione personale:',
  meetingSettingsSecurity: 'Sicurezza',
  onlyAuthUserJoin: 'Solo gli utenti autenticati possono partecipare',
  signedInUsers: 'Utenti registrati',
  signedInCoWorkers: 'Collaboratori connessi',
  limitScreenSharing: 'Solo host e moderatori possono condividere lo schermo',
  lockTooltip: "L'impostazione è gestita dall'amministratore dell'azienda",
  pmiSettingAlert:
    'Queste impostazioni si applicheranno a tutte le riunioni create con il PMI',
  today: 'Oggi',
  scheduleForGuidance:
    "Stai pianificando per qualcun altro?\n1. Assicurati di essere nel loro calendario di Outlook.\n2. Dall'elenco a discesa, seleziona la persona per la quale stai pianificando.\n",
  scheduleForGuidanceMore: 'Scopri i dettagli',
  changePmiSettings: 'Modifica impostazioni riunione personale',
  allowToRecording: 'Consenti di avviare e interrompere la registr.',
  allowTranscribe: 'Consenti di avviare e interrompere la trascr.',
  everyone: 'Tutti',
  onlyHostModerators: 'Solo host e moderatori',
  advancedSettings: 'Impostazioni avanzate',
  whoCanJoin: 'Chi può partecipare?',
  requirePasswordDescription:
    'I partecipanti che accedono tramite il collegamento alla riunione non dovranno inserire la password.',
  password: 'Password:',
  passwordLabel: 'Password',
  edit: 'Modifica',
  changePassword: 'Modifica password',
  passwordRequired: 'La password è obbligatoria',
  passwordLengthError: 'La password deve contenere da 1 a 10 caratteri',
  passwordFormatError: 'La password può contenere solo lettere e numeri',
  passwordHint:
    'La password deve contenere da 1 a 10 lettere e numeri, ma non può contenere simboli.',
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
