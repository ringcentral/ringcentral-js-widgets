import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';

export default {
  [presenceStatus.avalible]: 'Disponibile',
  [presenceStatus.offline]: 'Invisibile',
  [presenceStatus.busy+dndStatus.takeAllCalls]: 'Occupato',
  [presenceStatus.busy+dndStatus.doNotAcceptDepartmentCalls]: 'Occupato',
  [presenceStatus.busy+dndStatus.doNotAcceptAnyCalls]: 'Non disturbare',
};

// @key: @#@"[presenceStatus.avalible]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[presenceStatus.busy+dndStatus.takeAllCalls]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[presenceStatus.busy+dndStatus.doNotAcceptDepartmentCalls]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[presenceStatus.busy+dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@
