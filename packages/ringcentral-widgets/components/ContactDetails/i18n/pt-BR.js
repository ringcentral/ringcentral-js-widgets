import { presenceStatus } from 'ringcentral-integration/enums/presenceStatus.enum';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';
import { phoneTypes } from 'ringcentral-integration/enums/phoneTypes';
export default {
  [phoneTypes.extension]: "Ramal",
  [phoneTypes.direct]: "Direto",
  [phoneTypes.mobile]: "Disp. móvel",
  [phoneTypes.home]: "Página principal",
  [phoneTypes.business]: "Negócio",
  [phoneTypes.fax]: "Fax",
  [phoneTypes.company]: "Empresa",
  [phoneTypes.other]: "Outro",
  emailLabel: "Email",
  call: "Chamada",
  text: "Texto",
  [presenceStatus.available]: "Disponível",
  [presenceStatus.offline]: "Invisível",
  [presenceStatus.busy]: "Ocupado",
  [dndStatus.doNotAcceptAnyCalls]: "Não perturbe",
  notActivated: "Inativo",
  company: "Empresa",
  jobTitle: "Título",
  site: "Local"
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
// @key: @#@"site"@#@ @source: @#@"Site"@#@
