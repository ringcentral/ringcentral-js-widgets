/* eslint-disable */
import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/Meeting';
export default {
  date: 'Päivämäärä',
  time: 'Aika',
  hours: '{howMany} t',
  minutes: '{howMany} min',
  today: 'Tänään',
  duration: 'Kesto',
  topic: 'Tapaamisen otsikko',
  voIPOnly: 'Vain internet-ääni',
  telephonyOnly: 'Vain puhelin',
  both: 'Puhelin ja internet-ääni',
  thirdParty: '3. osapuolen ääni',
  meetingId: 'Tapaamistunnus',
  password: 'Salasana',
  video: 'Video',
  audio: 'Ääni',
  scheduleFor: 'Ajoita seuraavan henkilön puolesta:',
  [ASSISTED_USERS_MYSELF]: 'Minä itse',
  meetingOptions: 'Tapaamisasetukset',
  meetingSettings: 'Tapaamisasetukset',
  rcMeetingSettings: 'Videotapaamisen asetukset',
  audioOptions: 'Äänivalinnat',
  recurringMeeting: 'Toistuva tapaaminen',
  recurringNote: 'Huomaa: ota tämä käyttöön, kun valitset Toistuvuuden',
  joinBeforeHost: 'Salli osallistujien liittyä ennen ylläpitäjää',
  turnOffCamera: 'Poista kamera osallistujien käytöstä',
  turnOffHostCamera: 'Sammuta ylläpitäjän kamera, kun liitytään tapaamiseen',
  requirePassword: 'Edellytä salasanaa',
  enterPassword: 'Anna salasana',
  setPassword: 'Määritä salasana*',
  passwordEmptyError: 'Tapaamisen salasana vaaditaan',
  rcmPasswordInvalidError:
    'Salasanasi on oltava 1–10 merkkiä ja numeroa pitkä, eikä se saa sisältää muita symboleita kuin @, * tai -',
  rcmPasswordHintText:
    'Salasanasi on oltava 1–10 merkkiä ja numeroa pitkä, eikä se saa sisältää muita symboleita kuin @, * tai -',
  usePersonalMeetingId: 'Käytä henkilökohtaista tapaamistunnusta',
  pmiChangeConfirm:
    'Jos haluat tehdä muutoksia henkilökohtaiseen tapaamiseesi, ',
  changePmiSettings: 'muuta tapaamistunnuksesi asetuksia',
  pmiSettingChangeAlert:
    'Jos muutat asetuksia ja ajoitat tämän tapaamisen, kaikki henkilökohtaista tapaamistunnustasi käyttävät tapaamiset käyttävät samoja uusimpia asetuksia.',
  lockedTooltip: 'Asetus on yrityksen järjestelmänvalvojan hallinnassa',
  when: 'Kun',
  recurringDescribe:
    'Muista tarkistaa osallistujille lähetettävän kalenterikutsun toistuvuus.',
} as const;

// @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"time"@#@ @source: @#@"Time"@#@
// @key: @#@"hours"@#@ @source: @#@"{howMany} hr"@#@
// @key: @#@"minutes"@#@ @source: @#@"{howMany} min"@#@
// @key: @#@"today"@#@ @source: @#@"Today"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"voIPOnly"@#@ @source: @#@"Internet audio only"@#@
// @key: @#@"telephonyOnly"@#@ @source: @#@"Telephone only"@#@
// @key: @#@"both"@#@ @source: @#@"Telephone and Internet audio"@#@
// @key: @#@"thirdParty"@#@ @source: @#@"3rd party audio"@#@
// @key: @#@"meetingId"@#@ @source: @#@"Meeting ID"@#@
// @key: @#@"password"@#@ @source: @#@"Password"@#@
// @key: @#@"video"@#@ @source: @#@"Video"@#@
// @key: @#@"audio"@#@ @source: @#@"Audio"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"meetingOptions"@#@ @source: @#@"Meeting options"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"rcMeetingSettings"@#@ @source: @#@"Video Meeting settings"@#@
// @key: @#@"audioOptions"@#@ @source: @#@"Audio options"@#@
// @key: @#@"recurringMeeting"@#@ @source: @#@"Recurring meeting"@#@
// @key: @#@"recurringNote"@#@ @source: @#@"Note: Enable this one when choosing \"Recurrence\""@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"turnOffCamera"@#@ @source: @#@"Turn off camera for participants"@#@
// @key: @#@"turnOffHostCamera"@#@ @source: @#@"Turn off camera for host when joining meeting"@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"setPassword"@#@ @source: @#@"Set password *"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"rcmPasswordInvalidError"@#@ @source: @#@"Your password must be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"rcmPasswordHintText"@#@ @source: @#@"Your password should be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"usePersonalMeetingId"@#@ @source: @#@"Use Personal Meeting ID"@#@
// @key: @#@"pmiChangeConfirm"@#@ @source: @#@"If you want to make changes for your Personal Meeting, "@#@
// @key: @#@"changePmiSettings"@#@ @source: @#@"change PMI settings"@#@
// @key: @#@"pmiSettingChangeAlert"@#@ @source: @#@"If you change the settings and schedule this meeting, all of meetings with Personal Meeting ID will use the same latest settings."@#@
// @key: @#@"lockedTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"when"@#@ @source: @#@"When"@#@
// @key: @#@"recurringDescribe"@#@ @source: @#@"Please remember to check recurrence or repeat in your calendar invitation to your attendees."@#@
