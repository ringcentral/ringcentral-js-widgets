import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';

export default {
  [presenceStatus.avalible]: 'Disponible',
  [presenceStatus.offline]: 'Invisible',
  [presenceStatus.busy+dndStatus.takeAllCalls]: 'Occupé',
  [presenceStatus.busy+dndStatus.doNotAcceptDepartmentCalls]: 'Occupé',
  [presenceStatus.busy+dndStatus.doNotAcceptAnyCalls]: 'Ne pas déranger',
};

// @key: @#@"[presenceStatus.avalible]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[presenceStatus.busy+dndStatus.takeAllCalls]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[presenceStatus.busy+dndStatus.doNotAcceptDepartmentCalls]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[presenceStatus.busy+dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@
