import { phoneTypes } from '@ringcentral-integration/commons/enums/phoneTypes';
import { presenceStatus } from '@ringcentral-integration/commons/enums/presenceStatus.enum';
import { dndStatus } from '@ringcentral-integration/commons/modules/Presence';
export default {
  [phoneTypes.extension]: "Ext.",
  [phoneTypes.direct]: "Direct",
  [phoneTypes.mobile]: "Mobiel",
  [phoneTypes.contact]: "Telefoon contactpersoon",
  [phoneTypes.home]: "Thuis",
  [phoneTypes.business]: "Zakelijk",
  [phoneTypes.fax]: "Fax",
  // @ts-expect-error TS(2718): Duplicate property 'company'.
  [phoneTypes.company]: "Bedrijf",
  [phoneTypes.other]: "Overig",
  emailLabel: "E-mail",
  call: "Bellen",
  text: "Tekstbericht",
  [presenceStatus.available]: "Beschikbaar",
  [presenceStatus.offline]: "Onzichtbaar",
  [presenceStatus.busy]: "Bezet",
  [dndStatus.doNotAcceptAnyCalls]: "Niet storen",
  notActivated: "Inactief",
  // @ts-expect-error TS(2733): Property 'company' was also declared here.
  company: "Bedrijf",
  jobTitle: "Titel",
  site: "Locatie"
};

// @key: @#@"[phoneTypes.extension]"@#@ @source: @#@"Ext."@#@
// @key: @#@"[phoneTypes.direct]"@#@ @source: @#@"Direct"@#@
// @key: @#@"[phoneTypes.mobile]"@#@ @source: @#@"Mobile"@#@
// @key: @#@"[phoneTypes.contact]"@#@ @source: @#@"Contact phone"@#@
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
// @key: @#@"site"@#@ @source: @#@"Site"@#@
