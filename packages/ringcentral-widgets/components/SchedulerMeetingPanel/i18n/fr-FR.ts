/* eslint-disable */
import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/RcVideo';
export default {
  scheduleFor: 'Planifier au nom de',
  scheduleForAssistedUser:
    'Mettre à jour les paramètres de réunion au nom de {userName}.',
  scheduleForGuidance:
    'Vous planifiez pour quelqu’un d’autre ?\n1. Assurez-vous d’être dans leur calendrier Outlook.\n2. À partir de la liste déroulante, sélectionner la personne pour qui vous planifiez.\n',
  scheduleForGuidanceMore: 'En savoir plus',
  meetingSettings: 'Paramètres de réunion',
  meetingSettingsDescription:
    'Les mises à jour s’appliqueront à cette réunion uniquement.',
  [ASSISTED_USERS_MYSELF]: 'Moi-même',
  waitingRoomTitle: 'Utiliser la salle d’attente',
  waitingRoomDescription:
    'Les participants attendent jusqu’à ce que vous les acceptiez. Idéal pour les entretiens ou les participants extérieurs.',
  waitingRoomNotCoworker:
    'Pour toute personne n’appartenant pas à mon entreprise',
  waitingRoomGuest: 'Pour toute personne non connectée',
  waitingRoomAll: 'Pour tous les participants',
  enterPassword: 'Saisir le mot de passe',
  onlyJoinAfterMe: 'Démarrer une réunion après l’avoir rejointe',
  allowJoinBeforeHostDescription:
    'La réunion commencera une fois que vous l’aurez rejointe pour éviter les conversations précoces.',
  requirePassword: 'Exiger un mot de passe',
  requirePasswordDescription:
    'Sécurisez votre réunion. Toute personne utilisant le lien ne sera pas invitée à saisir un mot de passe.',
  password: 'Mot de passe :',
  passwordEmptyError: 'Mot de passe de la réunion requis',
  passwordInvalidError:
    'Votre mot de passe doit être composé de 1 à 10 lettres et chiffres, et ne peut pas comporter de symboles',
  passwordHintText:
    'Votre mot de passe doit être composé de 1 à 10 lettres et chiffres, mais ne doit pas contenir de symboles.',
  usePersonalMeetingIdInstead: 'Utiliser un lien de réunion personnelle',
  allowMeetingAccess: 'Gérer les participants',
  anyoneWithLink: 'Toute personne disposant du lien',
  signedInUsers: 'Comptes {shortName} uniquement',
  signedInCoWorkers: 'Mes collaborateurs uniquement',
  passwordLabel: 'Mot de passe',
  edit: 'Modifier',
  editSettings: 'Modifier les paramètres',
  lockTooltip: 'Ce paramètre est géré par l’administrateur de votre entreprise',
  cancel: 'Annuler',
  update: 'Mettre à jour',
  pmiSettingsTitle: 'Paramètres de réunion personnelle',
  pmiSettingsDescription:
    'Définissez qui peut participer et comment utiliser votre lien de réunion personnelle.',
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
