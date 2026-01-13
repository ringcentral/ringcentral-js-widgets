/* eslint-disable */
import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/RcVideo';
export default {
  scheduleFor: 'Planifier au nom de',
  scheduleForAssistedUser:
    'Mettre à jour les paramètres des réunions au nom de {userName}.',
  scheduleForGuidance:
    'Vous planifiez une réunion pour quelqu’un d’autre?\n1. Assurez-vous d’être dans son calendrier Outlook.\n2. Dans le menu déroulant, sélectionnez la personne pour laquelle vous planifiez une réunion.\n',
  scheduleForGuidanceMore: 'En savoir plus',
  meetingSettings: 'Paramètres de la réunion',
  meetingSettingsDescription:
    'Les mises à jour s’appliqueront à cette réunion seulement.',
  [ASSISTED_USERS_MYSELF]: 'Moi-même',
  waitingRoomTitle: 'Utiliser la salle d’attente',
  waitingRoomDescription:
    'Les participants attendent jusqu’à ce vous les admettiez. Idéal pour les entrevues ou pour les participants externes.',
  waitingRoomNotCoworker: 'Pour toute personne en dehors de mon entreprise',
  waitingRoomGuest: 'Pour toute personne non connectée',
  waitingRoomAll: 'Pour tous les participants',
  enterPassword: 'Saisir le mot de passe',
  onlyJoinAfterMe: 'Commencer la réunion après vous être joint',
  allowJoinBeforeHostDescription:
    'La réunion commencera après que vous vous joigniez pour éviter les conversations prématurées.',
  requirePassword: 'Exiger un mot de passe',
  requirePasswordDescription:
    'Protégez votre réunion. Les personnes utilisant le lien ne seront pas invitées à saisir un mot de passe.',
  password: 'Mot de passe :',
  passwordEmptyError: 'Mot de passe de la réunion obligatoire',
  passwordInvalidError:
    'Votre mot de passe doit contenir de 1 à 10 lettres et chiffres, mais ne pas contenir de symboles.',
  passwordHintText:
    'Votre mot de passe doit contenir de 1 à 10 lettres et chiffres, mais ne pas contenir de symboles.',
  usePersonalMeetingIdInstead: 'Utiliser le lien de la réunion personnelle',
  allowMeetingAccess: 'Gérer qui peut s’y joindre',
  anyoneWithLink: 'Toute personne avec le lien',
  signedInUsers: 'Seulement les comptes {shortName}',
  signedInCoWorkers: 'Seulement mes collègues',
  passwordLabel: 'Mot de passe',
  edit: 'Modifier',
  editSettings: 'Modifier les paramètres',
  lockTooltip: 'Ce paramètre est géré par l’administrateur de votre entreprise',
  cancel: 'Annuler',
  update: 'Mettre à jour',
  pmiSettingsTitle: 'Paramètres de la réunion personnelle',
  pmiSettingsDescription:
    'Définissez qui peut se joindre à la réunion et comment le faire pour le lien de votre réunion personnelle.',
} as const;

// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"scheduleForAssistedUser"@#@ @source: @#@"Update meetings settings on behalf of {userName}."@#@
// @key: @#@"scheduleForGuidance"@#@ @source: @#@"Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n"@#@
// @key: @#@"scheduleForGuidanceMore"@#@ @source: @#@"Learn details"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"meetingSettingsDescription"@#@ @source: @#@"Updates will apply to this meeting only."@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"waitingRoomTitle"@#@ @source: @#@"Use waiting room"@#@
// @key: @#@"waitingRoomDescription"@#@ @source: @#@"Participants wait until you admit them. Great for interviews or outside attendees."@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"For anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"For anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"For all participants"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Start meeting after you join"@#@
// @key: @#@"allowJoinBeforeHostDescription"@#@ @source: @#@"The meeting will start after you join to prevent early conversations."@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"requirePasswordDescription"@#@ @source: @#@"Keep your meeting secure. Anyone using the link won't be prompted for a password."@#@
// @key: @#@"password"@#@ @source: @#@"Password:"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"passwordInvalidError"@#@ @source: @#@"Your password must be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"passwordHintText"@#@ @source: @#@"Your password should be 1-10 letters and numbers long, but can not contain symbols."@#@
// @key: @#@"usePersonalMeetingIdInstead"@#@ @source: @#@"Use personal meeting link"@#@
// @key: @#@"allowMeetingAccess"@#@ @source: @#@"Manage who can join"@#@
// @key: @#@"anyoneWithLink"@#@ @source: @#@"Anyone with link"@#@
// @key: @#@"signedInUsers"@#@ @source: @#@"Only {shortName} accounts"@#@
// @key: @#@"signedInCoWorkers"@#@ @source: @#@"Only my coworkers"@#@
// @key: @#@"passwordLabel"@#@ @source: @#@"Password"@#@
// @key: @#@"edit"@#@ @source: @#@"Edit"@#@
// @key: @#@"editSettings"@#@ @source: @#@"Edit settings"@#@
// @key: @#@"lockTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"cancel"@#@ @source: @#@"Cancel"@#@
// @key: @#@"update"@#@ @source: @#@"Update"@#@
// @key: @#@"pmiSettingsTitle"@#@ @source: @#@"Personal meeting settings"@#@
// @key: @#@"pmiSettingsDescription"@#@ @source: @#@"Set who can join and how for your personal meeting link."@#@
