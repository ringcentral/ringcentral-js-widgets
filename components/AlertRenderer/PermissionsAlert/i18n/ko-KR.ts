import { permissionsMessages } from '@ringcentral-integration/commons/enums/permissionsMessages';
export default {
  [permissionsMessages.invalidTier]: "사용 중인 버전이 {application} 통합을 지원하지 않습니다. 계정 담당자에게 문의하여 {brand} 버전을 업그레이드하세요.",
  [permissionsMessages.insufficientPrivilege]: "권한이 부족합니다. 계정 관리자에게 문의하여 업그레이드하세요."
};

// @key: @#@"[permissionsMessages.invalidTier]"@#@ @source: @#@"Your edition does not support {application} integration. Please contact your account representative to upgrade your {brand} edition."@#@
// @key: @#@"[permissionsMessages.insufficientPrivilege]"@#@ @source: @#@"Insufficient privilege. Please contact your account representative for an upgrade."@#@
