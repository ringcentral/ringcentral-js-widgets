import { authMessages } from '@ringcentral-integration/commons/modules/Auth';
export default {
  [authMessages.internalError]: "내부 오류로 인해 로그인하지 못했습니다. 나중에 다시 시도하세요.",
  [authMessages.accessDenied]: "액세스가 거부되었습니다. 지원팀에 문의하세요.",
  [authMessages.sessionExpired]: "세션이 만료되었습니다. 로그인해 주세요.",
  [authMessages.siteAccessForbidden]: "죄송합니다. 다른 계정을 사용하여 로그인하세요. IT 관리자에게 지원을 요청하세요."
};

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
// @key: @#@"[authMessages.siteAccessForbidden]"@#@ @source: @#@"Sorry, use a different account to sign in. Please ask your IT admin for assistance."@#@
