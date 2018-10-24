import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';
import phoneTypes from '../../../enums/phoneTypes';

export default {
  emailLabel: "E-mail",
  call: "Chiamata",
  text: "SMS",
  [presenceStatus.available]: "Disponibile",
  [presenceStatus.offline]: "Invisibile",
  [presenceStatus.busy]: "Occupato",
  [dndStatus.doNotAcceptAnyCalls]: "Non disturbare",
  notActivated: "Inattivo"
};

// @key: @#@"emailLabel"@#@ @source: @#@"Email"@#@
// @key: @#@"call"@#@ @source: @#@"Call"@#@
// @key: @#@"text"@#@ @source: @#@"Text"@#@
// @key: @#@"[presenceStatus.available]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[presenceStatus.busy]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@
// @key: @#@"notActivated"@#@ @source: @#@"Inactive"@#@
