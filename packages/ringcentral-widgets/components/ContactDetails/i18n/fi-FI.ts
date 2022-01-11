import { presenceStatus } from '@ringcentral-integration/commons/enums/presenceStatus.enum';
import dndStatus from '@ringcentral-integration/commons/modules/Presence/dndStatus';
import { phoneTypes } from '@ringcentral-integration/commons/enums/phoneTypes';
export default {
  [phoneTypes.extension]: "Alanro",
  [phoneTypes.direct]: "Suora",
  [phoneTypes.mobile]: "Mobiili",
  [phoneTypes.contact]: "Yhteystiedon puhelin",
  [phoneTypes.home]: "Koti",
  [phoneTypes.business]: "Yritys",
  [phoneTypes.fax]: "Faksi",
  [phoneTypes.company]: "Yritys",
  [phoneTypes.other]: "Muu",
  emailLabel: "Sähköposti",
  call: "Puhelu",
  text: "Teksti",
  [presenceStatus.available]: "Käytettävissä",
  [presenceStatus.offline]: "Näkymätön",
  [presenceStatus.busy]: "Varattu",
  [dndStatus.doNotAcceptAnyCalls]: "Älä häiritse",
  notActivated: "Ei aktiivinen",
  company: "Yritys",
  jobTitle: "Työnimike",
  site: "Toimipaikka"
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
