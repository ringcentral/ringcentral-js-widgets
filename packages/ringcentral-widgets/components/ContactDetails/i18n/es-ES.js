import { presenceStatus } from 'ringcentral-integration/enums/presenceStatus.enum';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';
import { phoneTypes } from 'ringcentral-integration/enums/phoneTypes';
export default {
  [phoneTypes.extension]: "Ext.",
  [phoneTypes.direct]: "Directo",
  [phoneTypes.mobile]: "Móvil",
  [phoneTypes.home]: "Casa",
  [phoneTypes.business]: "Trabajo",
  [phoneTypes.fax]: "Fax",
  [phoneTypes.company]: "Compañía",
  [phoneTypes.other]: "Otro",
  emailLabel: "Correo",
  call: "Llamada",
  text: "Texto",
  [presenceStatus.available]: "Disponible",
  [presenceStatus.offline]: "Invisible",
  [presenceStatus.busy]: "Ocupado",
  [dndStatus.doNotAcceptAnyCalls]: "No molestar",
  notActivated: "Inactivo",
  company: "Compañía",
  jobTitle: "Título"
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
