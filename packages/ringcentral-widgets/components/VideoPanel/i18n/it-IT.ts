import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/RcVideo/constants';
export default {
  topic: "Titolo della riunione",
  date: "Data",
  startTime: "Ora",
  duration: "Durata",
  scheduleFor: "Programma per conto di",
  meetingSettings: "Impostazioni riunione",
  [ASSISTED_USERS_MYSELF]: "Me stesso",
  joinBeforeHost: "Consenti ai partecipanti di accedere prima dell'host",
  enableWaitingRoom: "Abilita sala d'attesa",
  waitingRoom: "Abilita sala d'attesa per",
  waitingRoomNotCoworker: "Chiunque al di fuori della mia azienda",
  waitingRoomGuest: "Chi non si è registrato",
  waitingRoomAll: "Tutti",
  enterPassword: "Inserisci password",
  onlyJoinAfterMe: "I partecipanti possono accedere solo dopo di me",
  onlyJoinAfterHost: "I partecipanti possono accedere solo dopo l'host",
  muteAudio: "Disattiva audio per i partecipanti",
  turnOffCamera: "Disattiva la videocamera per i partecipanti",
  requirePassword: "Richiedi password",
  useE2ee: "Utilizza crittografia end-to-end",
  e2eeTooltip: "Le riunioni crittografate end-to-end sono le più private, ma le funzioni come partecipare tramite telefono, sottotitoli e registrazione non sono disponibili.",
  setPassword: "Imposta la password *",
  setPasswordNotSymbol: "Imposta la password",
  passwordEmptyError: "La password per la riunione è obbligatoria",
  passwordInvalidError: "La password deve avere 1-10 lettere e numeri e non può contenere simboli",
  passwordHintText: "La password deve avere 1-10 lettere e numeri e non può contenere simboli",
  usePersonalMeetingId: "Usa ID riunione personale",
  meetingSettingsSecurity: "Sicurezza",
  onlyAuthUserJoin: "Possono partecipare solo gli utenti autenticati",
  signedInUsers: "Utenti registrati",
  signedInCoWorkers: "Collaboratori connessi",
  limitScreenSharing: "Solo gli host e i moderatori possono condividere lo schermo",
  lockTooltip: "L'impostazione è gestita dall'amministratore dell'azienda",
  pmiSettingAlert: "Queste impostazioni si applicheranno a tutte le riunioni create con il PMI",
  today: "Oggi",
  scheduleForGuidance: "Stai pianificando per qualcun altro?\n1. Assicurati di essere nel loro calendario di Outlook.\n2. Dall'elenco a discesa, seleziona la persona per la quale stai pianificando.\n",
  scheduleForGuidanceMore: "Scopri i dettagli",
  changePmiSettings: "Modifica le impostazioni della riunione personale",
  ieSupportAlert: "Tieni presente che {appName} non funzionerà con Internet Explorer 11 dopo il 16 febbraio 2022. Consigliamo di passare a Microsoft Edge o di aggiornare a Outlook 2016 o versione successiva."
};

// @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"startTime"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"enableWaitingRoom"@#@ @source: @#@"Enable waiting room"@#@
// @key: @#@"waitingRoom"@#@ @source: @#@"Enable waiting room for"@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"Anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"Anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"Everyone"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Participants can only join after me"@#@
// @key: @#@"onlyJoinAfterHost"@#@ @source: @#@"Participants can only join after host"@#@
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
// @key: @#@"changePmiSettings"@#@ @source: @#@"Change Personal meeting settings"@#@
// @key: @#@"ieSupportAlert"@#@ @source: @#@"Please note that {appName} won't work with Internet Explorer 11 after Feb 16, 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above."@#@
