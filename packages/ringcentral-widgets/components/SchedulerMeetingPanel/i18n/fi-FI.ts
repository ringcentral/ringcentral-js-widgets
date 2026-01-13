/* eslint-disable */
import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/RcVideo';
export default {
  scheduleFor: 'Ajoita seuraavan henkilön puolesta:',
  scheduleForAssistedUser:
    'Päivitä tapaamisasetukset henkilön {userName}puolesta.',
  scheduleForGuidance:
    'Aikataulutatko jonkun muun puolesta?\n1. Varmista, että olet hänen Outlook-kalenterissaan.\n2. Valitse avattavasta valikosta henkilö, jonka puolesta teet aikataulua.\n',
  scheduleForGuidanceMore: 'Katso lisätiedot',
  meetingSettings: 'Tapaamisasetukset',
  meetingSettingsDescription: 'Päivitykset koskevat vain tätä tapaamista.',
  [ASSISTED_USERS_MYSELF]: 'Minä itse',
  waitingRoomTitle: 'Käytä odotushuonetta',
  waitingRoomDescription:
    'Osallistujat odottavat, kunnes annat heidän liittyä. Sopii erinomaisesti haastatteluihin tai ulkopuolisille osallistujille.',
  waitingRoomNotCoworker: 'Yritykseni ulkopuolisille henkilöille',
  waitingRoomGuest: 'Henkilöille, jotka eivät ole kirjautuneet sisään',
  waitingRoomAll: 'Kaikille osallistujille',
  enterPassword: 'Anna salasana',
  onlyJoinAfterMe: 'Aloita tapaaminen liittymisen jälkeen',
  allowJoinBeforeHostDescription:
    'Ennenaikaisten keskustelujen estämiseksi tapaaminen alkaa, kun olet liittynyt.',
  requirePassword: 'Edellytä salasanaa',
  requirePasswordDescription:
    'Pidä tapaamisesi turvallisena. Linkin käyttäjiltä ei pyydetä salasanaa.',
  password: 'Salasana:',
  passwordEmptyError: 'Tapaamisen salasana vaaditaan',
  passwordInvalidError:
    'Salasanasi on oltava 1–10 kirjainta ja numeroa pitkä, eikä se saa sisältää symboleita',
  passwordHintText:
    'Salasanasi on oltava 1–10 kirjainta ja numeroa pitkä, eikä se saa sisältää symboleita.',
  usePersonalMeetingIdInstead: 'Käytä henkilökohtaista tapaamislinkkiä',
  allowMeetingAccess: 'Hallitse, ketkä voivat liittyä',
  anyoneWithLink: 'Kuka tahansa, jolla on linkki',
  signedInUsers: 'Vain {shortName} -tilit',
  signedInCoWorkers: 'Vain työtoverini',
  passwordLabel: 'Salasana',
  edit: 'Muokkaa',
  editSettings: 'Muokkaa asetuksia',
  lockTooltip: 'Asetus on yrityksen järjestelmänvalvojan hallinnassa',
  cancel: 'Peruuta',
  update: 'Päivitä',
  pmiSettingsTitle: 'Henkilökohtaisen tapaamisen asetukset',
  pmiSettingsDescription:
    'Määritä henkilökohtaiseen tapaamislinkkiisi, ketkä voivat liittyä ja miten.',
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
