"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* eslint-disable */
var _default = exports["default"] = {
  video: 'Vidéo',
  meetingTitle: 'Titre de la réunion',
  date: 'Date',
  time: 'Heure',
  duration: 'Durée',
  scheduleVideoMeeting: 'Planifier une réunion vidéo',
  requirePassword: 'Exiger un mot de passe',
  requirePasswordDescription: 'Sécurisez votre réunion. Toute personne utilisant le lien ne sera pas invitée à saisir un mot de passe.',
  password: 'Mot de passe',
  edit: 'Modifier',
  noPasswordSet: 'Aucun mot de passe défini',
  manageWhoCanJoin: 'Gérer les participants',
  useWaitingRoom: 'Utiliser la salle d’attente',
  useWaitingRoomDescription: 'Les participants attendent jusqu’à ce que vous les acceptiez. Idéal pour les entretiens ou les participants extérieurs.',
  startMeetingAfterJoin: 'Démarrer une réunion après l’avoir rejointe',
  startMeetingAfterJoinDescription: 'La réunion commencera une fois que vous l’aurez rejointe pour éviter les conversations précoces.',
  usePersonalMeetingLink: 'Utiliser un lien de réunion personnelle',
  personalMeetingLink: 'Lien de réunion personnelle',
  editSettings: 'Modifier les paramètres',
  scheduleMeeting: 'Planifier une réunion',
  cancel: 'Annuler',
  update: 'Mettre à jour',
  updating: 'Mise à jour…',
  passwordFormatError: 'Votre mot de passe doit être composé de 1 à 10 lettres et chiffres, et ne peut pas comporter de symboles',
  passwordRequiredError: 'Le mot de passe est requis',
  updatePassword: 'Mettre à jour le mot de passe',
  passwordRequired: 'Le mot de passe est requis',
  passwordValidationHint: 'Saisissez un mot de passe de 1 à 10 caractères (lettres et chiffres uniquement)',
  anyoneWithLink: 'Toute personne disposant du lien',
  onlyRingCentralAccounts: 'Comptes {shortName} uniquement',
  onlyMyCoworkers: 'Mes collaborateurs uniquement',
  allParticipants: 'Tous les participants',
  forAnyoneOutsideMyCompany: 'Pour toute personne n’appartenant pas à mon entreprise',
  forAnyoneNotSignedIn: 'Pour toute personne non connectée',
  personalMeetingSettings: 'Paramètres de réunion personnelle',
  personalMeetingSettingsDescription: 'Définissez qui peut participer et comment utiliser votre lien de réunion personnelle.',
  hour: 'h',
  minute: 'min',
  adminLockedSetting: 'Ce paramètre est géré par l’administrateur de votre entreprise',
  passwordPlaceholder: 'Saisir le mot de passe'
}; // @key: @#@"video"@#@ @source: @#@"Video"@#@
// @key: @#@"meetingTitle"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"time"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"scheduleVideoMeeting"@#@ @source: @#@"Schedule video meeting"@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"requirePasswordDescription"@#@ @source: @#@"Keep your meeting secure. Anyone using the link won’t be prompted for a password."@#@
// @key: @#@"password"@#@ @source: @#@"Password"@#@
// @key: @#@"edit"@#@ @source: @#@"Edit"@#@
// @key: @#@"noPasswordSet"@#@ @source: @#@"No password set"@#@
// @key: @#@"manageWhoCanJoin"@#@ @source: @#@"Manage who can join"@#@
// @key: @#@"useWaitingRoom"@#@ @source: @#@"Use waiting room"@#@
// @key: @#@"useWaitingRoomDescription"@#@ @source: @#@"Participants wait until you admit them. Great for interviews or outside attendees."@#@
// @key: @#@"startMeetingAfterJoin"@#@ @source: @#@"Start meeting after you join"@#@
// @key: @#@"startMeetingAfterJoinDescription"@#@ @source: @#@"The meeting will start after you join to prevent early conversations."@#@
// @key: @#@"usePersonalMeetingLink"@#@ @source: @#@"Use personal meeting link"@#@
// @key: @#@"personalMeetingLink"@#@ @source: @#@"Personal meeting link"@#@
// @key: @#@"editSettings"@#@ @source: @#@"Edit settings"@#@
// @key: @#@"scheduleMeeting"@#@ @source: @#@"Schedule meeting"@#@
// @key: @#@"cancel"@#@ @source: @#@"Cancel"@#@
// @key: @#@"update"@#@ @source: @#@"Update"@#@
// @key: @#@"updating"@#@ @source: @#@"Updating..."@#@
// @key: @#@"passwordFormatError"@#@ @source: @#@"Your password must be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"passwordRequiredError"@#@ @source: @#@"Password is required"@#@
// @key: @#@"updatePassword"@#@ @source: @#@"Update Password"@#@
// @key: @#@"passwordRequired"@#@ @source: @#@"Password is required"@#@
// @key: @#@"passwordValidationHint"@#@ @source: @#@"Enter a password 1-10 characters long (letters and numbers only)"@#@
// @key: @#@"anyoneWithLink"@#@ @source: @#@"Anyone with link"@#@
// @key: @#@"onlyRingCentralAccounts"@#@ @source: @#@"Only {shortName} accounts"@#@
// @key: @#@"onlyMyCoworkers"@#@ @source: @#@"Only my coworkers"@#@
// @key: @#@"allParticipants"@#@ @source: @#@"All participants"@#@
// @key: @#@"forAnyoneOutsideMyCompany"@#@ @source: @#@"For anyone outside my company"@#@
// @key: @#@"forAnyoneNotSignedIn"@#@ @source: @#@"For anyone not signed in"@#@
// @key: @#@"personalMeetingSettings"@#@ @source: @#@"Personal meeting settings"@#@
// @key: @#@"personalMeetingSettingsDescription"@#@ @source: @#@"Set who can join and how for your personal meeting link."@#@
// @key: @#@"hour"@#@ @source: @#@"hr"@#@
// @key: @#@"minute"@#@ @source: @#@"min"@#@
// @key: @#@"adminLockedSetting"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"passwordPlaceholder"@#@ @source: @#@"Enter Password"@#@
//# sourceMappingURL=fr-FR.js.map
