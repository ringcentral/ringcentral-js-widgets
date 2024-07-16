import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/RcVideo';
export default {
  topic: "Tapaamisen otsikko",
  date: "Päivämäärä",
  startTime: "Aika",
  duration: "Kesto",
  scheduleFor: "Ajoita seuraavan henkilön puolesta:",
  meetingSettings: "Tapaamisen asetukset",
  [ASSISTED_USERS_MYSELF]: "Minä itse",
  joinBeforeHost: "Salli osallistujien liittyä ennen ylläpitäjää",
  enableWaitingRoom: "Ota odotushuone käyttöön",
  waitingRoom: "Ota odotushuone käyttöön kohteelle",
  waitingRoomNotCoworker: "Kuka tahansa yritykseni ulkopuolinen",
  waitingRoomGuest: "Kuka tahansa, joka ei ole kirjautunut",
  waitingRoomAll: "Kaikki",
  enterPassword: "Anna salasanasi",
  onlyJoinAfterMe: "Osallistujat voivat liittyä vasta minun jälkeeni",
  onlyJoinAfterHost: "Osallistujat voivat liittyä vasta ylläpitäjän jälkeen",
  muteAudio: "Mykistä ääni osallistujilta",
  turnOffCamera: "Poista kamera osallistujien käytöstä",
  requirePassword: "Edellytä salasanaa",
  useE2ee: "Käytä päästä päähän -salausta",
  e2eeTooltip: "Päästä päähän salatut tapaamiset ovat yksityisimpiä, mutta ominaisuudet kuten puhelimella liittyminen, tekstitys ja tallennus eivät ole käytettävissä.",
  setPassword: "Määritä salasana*",
  setPasswordNotSymbol: "Määritä salasana",
  passwordEmptyError: "Tapaamisen salasana vaaditaan",
  passwordInvalidError: "Salasanasi on oltava 1–10 kirjainta ja numeroa pitkä, eikä se saa sisältää symboleita",
  passwordHintText: "Salasanasi on oltava 1–10 kirjainta ja numeroa pitkä, eikä se saa sisältää symboleita",
  usePersonalMeetingId: "Käytä henkilökohtaista tapaamistunnusta",
  meetingSettingsSecurity: "Turvallisuus",
  onlyAuthUserJoin: "Vain valtuutetut käyttäjät voivat liittyä",
  signedInUsers: "Kirjautuneet käyttäjät",
  signedInCoWorkers: "Kirjautuneet työtoverit",
  limitScreenSharing: "Vain ylläpitäjä ja moderaattorit voivat jakaa ruudun",
  lockTooltip: "Tämä asetus on yrityksen järjestelmänvalvojan hallinnassa",
  pmiSettingAlert: "Näitä asetuksia käytetään kaikissa PMI:llä luoduissa tapaamisissa",
  today: "Tänään",
  scheduleForGuidance: "Aikataulutatko jonkun muun puolesta?\n1. Varmista, että olet hänen Outlook-kalenterissaan.\n2. Valitse avattavasta valikosta henkilö, jonka puolesta teet aikataulua.\n",
  scheduleForGuidanceMore: "Katso lisätiedot",
  changePmiSettings: "Muuta henkilökohtaisen tapaamisen asetuksia"
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
