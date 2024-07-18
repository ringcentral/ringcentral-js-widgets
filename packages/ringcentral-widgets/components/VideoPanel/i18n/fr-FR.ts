import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/RcVideo';
export default {
  topic: "Titre de la réunion",
  date: "Date",
  startTime: "Heure",
  duration: "Durée",
  scheduleFor: "Planifier au nom de",
  meetingSettings: "Paramètres de la réunion",
  [ASSISTED_USERS_MYSELF]: "Moi-même",
  joinBeforeHost: "Autoriser les participants à se connecter avant l’hôte",
  enableWaitingRoom: "Activer la salle d’attente",
  waitingRoom: "Mettre en place une salle d’attente pour",
  waitingRoomNotCoworker: "Toute personne hors entreprise",
  waitingRoomGuest: "Toute personne non inscrite",
  waitingRoomAll: "Tout le monde",
  enterPassword: "Saisir le mot de passe",
  onlyJoinAfterMe: "Les participants ne peuvent rejoindre la réunion qu’après moi",
  onlyJoinAfterHost: "Les participants peuvent uniquement rejoindre la réunion après l’hôte",
  muteAudio: "Désactiver l’audio pour les participants",
  turnOffCamera: "Désactiver la caméra pour les participants",
  requirePassword: "Exiger un mot de passe",
  useE2ee: "Utiliser le chiffrement de bout en bout",
  e2eeTooltip: "Les réunions chiffrées de bout en bout sont les plus privées, mais des fonctions telles que rejoindre une réunion par téléphone, les sous-titres et l’enregistrement ne sont pas disponibles.",
  setPassword: "Définir un mot de passe *",
  setPasswordNotSymbol: "Définir un mot de passe",
  passwordEmptyError: "Mot de passe de la réunion requis",
  passwordInvalidError: "Votre mot de passe doit être composé de 1 à 10 lettres et chiffres et ne peut pas comporter de symboles",
  passwordHintText: "Votre mot de passe doit être composé de 1 à 10 lettres et chiffres, mais ne doit pas contenir de symboles.",
  usePersonalMeetingId: "Utiliser l’ID de réunion personnel",
  meetingSettingsSecurity: "Sécurité",
  onlyAuthUserJoin: "Seuls les utilisateurs authentifiés peuvent participer",
  signedInUsers: "Utilisateurs connectés",
  signedInCoWorkers: "Collaborateurs connectés",
  limitScreenSharing: "Seuls l’hôte et les modérateurs peuvent partager l’écran",
  lockTooltip: "Ce paramètre est géré par l’administrateur de votre entreprise",
  pmiSettingAlert: "Ces paramètres s’appliquent à toutes les réunions créées avec les paramètres PMI",
  today: "Aujourd’hui",
  scheduleForGuidance: "Vous planifiez pour quelqu’un d’autre ?\n1. Assurez-vous d’être dans leur calendrier Outlook.\n2. À partir de la liste déroulante, sélectionner la personne pour qui vous planifiez.\n",
  scheduleForGuidanceMore: "En savoir plus",
  changePmiSettings: "Modifier les paramètres de réunion personnelle"
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
// @key: @#@"changePmiSettings"@#@ @source: @#@"Change Personal Meeting settings"@#@
