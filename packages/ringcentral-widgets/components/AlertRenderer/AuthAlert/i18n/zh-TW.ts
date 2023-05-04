import { authMessages } from '@ringcentral-integration/commons/modules/Auth';
export default {
  [authMessages.internalError]: "因為內部錯誤導致登入失敗。請稍後再試。",
  [authMessages.accessDenied]: "存取遭拒。請聯絡支援部門。",
  [authMessages.sessionExpired]: "執行階段已過期。請登入。",
  [authMessages.siteAccessForbidden]: "抱歉，請使用其他帳戶登入。請向您的 IT 管理員申請協助。"
};

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
// @key: @#@"[authMessages.siteAccessForbidden]"@#@ @source: @#@"Sorry, use a different account to sign in. Please ask your IT admin for assistance."@#@
