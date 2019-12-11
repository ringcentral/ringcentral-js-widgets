import { presenceStatus } from 'ringcentral-integration/enums/presenceStatus.enum';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';
import phoneTypes from '../../../enums/phoneTypes';
export default {
  [phoneTypes.extension]: "Int.",
  [phoneTypes.direct]: "Diretto",
  [phoneTypes.mobile]: "Cellulare",
  [phoneTypes.home]: "Casa",
  [phoneTypes.business]: "Ufficio",
  [phoneTypes.fax]: "Fax",
  [phoneTypes.company]: "Azienda",
  [phoneTypes.other]: "Altro",
  emailLabel: "E-mail",
  call: "Chiamata",
  text: "SMS",
  [presenceStatus.available]: "Disponibile",
  [presenceStatus.offline]: "Invisibile",
  [presenceStatus.busy]: "Occupato",
  [dndStatus.doNotAcceptAnyCalls]: "Non disturbare",
  notActivated: "Inattivo",
  company: "Azienda",
  jobTitle: "Titolo"
};

// @key: @#@"[phoneTypes.extension]"@#@ @source: @#@"Ext."@#@
// @key: @#@"[phoneTypes.direct]"@#@ @source: @#@"Direct"@#@
// @key: @#@"[phoneTypes.mobile]"@#@ @source: @#@"Mobile"@#@
// @key: @#@"[phoneTypes.home]"@#@ @source: @#@"Home"@#@
// @key: @#@"[phoneTypes.business]"@#@ @source: @#@"Business"@#@
// @key: @#@"[phoneTypes.fax]"@#@ @source: @#@"Fax"@#@
// @key: @#@"[phoneTypes.company]"@#@ @source: @#@"Company"@#@
// @key: @#@"[phoneTypes.other]"@#@ @source: @#@"Other"@#@
// @key: @#@"emailLabel"@#@ @source: @#@"Email"@#@
// @key: @#@"call"@#@ @source: @#@"Call"@#@
// @key: @#@"text"@#@ @source: @#@"Text"@#@
// @key: @#@"[presenceStatus.available]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[presenceStatus.busy]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@
// @key: @#@"notActivated"@#@ @source: @#@"Inactive"@#@
// @key: @#@"company"@#@ @source: @#@"Company"@#@
// @key: @#@"jobTitle"@#@ @source: @#@"Title"@#@
