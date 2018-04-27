import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';

export default {
  extensionLabel: 'Poste',
  directLabel: 'Direct',
  emailLabel: 'Courriel',
  call: 'Appeler',
  text: 'Texto',
  [presenceStatus.available]: 'Disponible',
  [presenceStatus.busy]: 'Occupé',
  [presenceStatus.offline]: 'Invisible',
  [dndStatus.doNotAcceptAnyCalls]: 'Ne pas déranger',
};

// @key: @#@"extensionLabel"@#@ @source: @#@"Ext."@#@
// @key: @#@"directLabel"@#@ @source: @#@"Direct"@#@
// @key: @#@"emailLabel"@#@ @source: @#@"Email"@#@
// @key: @#@"call"@#@ @source: @#@"Call"@#@
// @key: @#@"text"@#@ @source: @#@"Text"@#@
// @key: @#@"[presenceStatus.available]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[presenceStatus.busy]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@
