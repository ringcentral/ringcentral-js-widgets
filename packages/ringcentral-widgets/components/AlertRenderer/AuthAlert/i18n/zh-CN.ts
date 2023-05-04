import { authMessages } from '@ringcentral-integration/commons/modules/Auth';
export default {
  [authMessages.internalError]: "由于内部错误，登录失败。请稍后重试。",
  [authMessages.accessDenied]: "访问被拒绝。请联系支持。",
  [authMessages.sessionExpired]: "会话已过期。请登录。",
  [authMessages.siteAccessForbidden]: "抱歉，请使用其他帐户登录。请联系 IT 管理员寻求帮助。"
};

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
// @key: @#@"[authMessages.siteAccessForbidden]"@#@ @source: @#@"Sorry, use a different account to sign in. Please ask your IT admin for assistance."@#@
