import authMessages from '@ringcentral-integration/commons/modules/Auth/authMessages';
export default {
  [authMessages.internalError]: "由于内部错误，登录失败：请稍后再试。",
  [authMessages.accessDenied]: "访问被拒绝。请联系支持。",
  [authMessages.sessionExpired]: "会话已过期。请登录。"
};

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
