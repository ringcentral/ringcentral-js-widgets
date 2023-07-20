import { presenceStatus } from '@ringcentral-integration/commons/enums/presenceStatus.enum';
import { dndStatus } from '@ringcentral-integration/commons/modules/Presence';
export default {
  [presenceStatus.available]: "Disponible",
  [presenceStatus.offline]: "Invisible",
  [presenceStatus.busy]: "No disponible",
  [dndStatus.doNotAcceptAnyCalls]: "No molestar"
};

// @key: @#@"[presenceStatus.available]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[presenceStatus.busy]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@
