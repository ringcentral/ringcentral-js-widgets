/* eslint-disable */
import { phoneTypes } from '@ringcentral-integration/commons/enums/phoneTypes';
import { presenceStatus } from '@ringcentral-integration/commons/enums/presenceStatus.enum';
import { dndStatus } from '@ringcentral-integration/commons/modules/Presence';
export default {
  [phoneTypes.extension]: 'Poste',
  [phoneTypes.direct]: 'Direct',
  [phoneTypes.mobile]: 'Cellulaire',
  [phoneTypes.contact]: 'Numéro de téléphone',
  [phoneTypes.home]: 'Domicile',
  [phoneTypes.business]: 'Travail',
  [phoneTypes.fax]: 'Télécopieur',
  [phoneTypes.company]: 'Entreprise',
  [phoneTypes.other]: 'Autre',
  emailLabel: 'Adresse courriel',
  call: 'Appeler',
  text: 'Texto',
  [presenceStatus.available]: 'Disponible',
  [presenceStatus.offline]: 'Invisible',
  [presenceStatus.busy]: 'Occupé',
  [dndStatus.doNotAcceptAnyCalls]: 'Ne pas déranger',
  notActivated: 'Inactif',
  jobTitle: 'Titre',
  site: 'Site',
} as const;

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
// @key: @#@"jobTitle"@#@ @source: @#@"Title"@#@
// @key: @#@"site"@#@ @source: @#@"Site"@#@
