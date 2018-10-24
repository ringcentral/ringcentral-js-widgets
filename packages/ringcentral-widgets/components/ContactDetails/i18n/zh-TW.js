import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';
import phoneTypes from '../../../enums/phoneTypes';

export default {
  emailLabel: "電子郵件",
  call: "通話",
  text: "簡訊",
  [presenceStatus.available]: "可用",
  [presenceStatus.offline]: "隱形",
  [presenceStatus.busy]: "忙碌",
  [dndStatus.doNotAcceptAnyCalls]: "勿打擾",
  notActivated: "非使用中"
};

// @key: @#@"emailLabel"@#@ @source: @#@"Email"@#@
// @key: @#@"call"@#@ @source: @#@"Call"@#@
// @key: @#@"text"@#@ @source: @#@"Text"@#@
// @key: @#@"[presenceStatus.available]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[presenceStatus.busy]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@
// @key: @#@"notActivated"@#@ @source: @#@"Inactive"@#@
