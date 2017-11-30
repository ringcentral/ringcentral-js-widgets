import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';

export default {
  [presenceStatus.available]: 'Disponível',
  [presenceStatus.offline]: 'Invisível',
  [presenceStatus.busy+dndStatus.takeAllCalls]: 'Ocupado',
  [presenceStatus.busy+dndStatus.doNotAcceptDepartmentCalls]: 'Ocupado',
  [presenceStatus.busy+dndStatus.doNotAcceptAnyCalls]: 'Não perturbe',
};

// @key: @#@"[presenceStatus.available]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[presenceStatus.busy+dndStatus.takeAllCalls]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[presenceStatus.busy+dndStatus.doNotAcceptDepartmentCalls]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[presenceStatus.busy+dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@
