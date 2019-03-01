import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';
import phoneTypes from '../../../enums/phoneTypes';
export default {
  [phoneTypes.extension]: "Poste",
  [phoneTypes.direct]: "Direct",
  [phoneTypes.mobile]: "Appareil mobile",
  [phoneTypes.home]: "Domicile",
  [phoneTypes.business]: "Bureau",
  [phoneTypes.fax]: "Télécopieur",
  [phoneTypes.other]: "Autre",
  emailLabel: "Courriel",
  call: "Appeler",
  text: "Texto",
  [presenceStatus.available]: "Disponible",
  [presenceStatus.offline]: "Invisible",
  [presenceStatus.busy]: "Occupé",
  [dndStatus.doNotAcceptAnyCalls]: "Ne pas déranger",
  notActivated: "Inactif"
};

// @key: @#@"[phoneTypes.extension]"@#@ @source: @#@"Ext."@#@
// @key: @#@"[phoneTypes.direct]"@#@ @source: @#@"Direct"@#@
// @key: @#@"[phoneTypes.mobile]"@#@ @source: @#@"Mobile"@#@
// @key: @#@"[phoneTypes.home]"@#@ @source: @#@"Home"@#@
// @key: @#@"[phoneTypes.business]"@#@ @source: @#@"Business"@#@
// @key: @#@"[phoneTypes.fax]"@#@ @source: @#@"Fax"@#@
// @key: @#@"[phoneTypes.other]"@#@ @source: @#@"Other"@#@
// @key: @#@"emailLabel"@#@ @source: @#@"Email"@#@
// @key: @#@"call"@#@ @source: @#@"Call"@#@
// @key: @#@"text"@#@ @source: @#@"Text"@#@
// @key: @#@"[presenceStatus.available]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[presenceStatus.busy]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@
// @key: @#@"notActivated"@#@ @source: @#@"Inactive"@#@
