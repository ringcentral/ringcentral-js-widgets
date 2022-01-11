import authMessages from '@ringcentral-integration/commons/modules/Auth/authMessages';
export default {
  [authMessages.internalError]: "因為內部錯誤導致登入失敗。請稍後再試一次。",
  [authMessages.accessDenied]: "存取遭拒。請聯絡支援部門。",
  [authMessages.sessionExpired]: "執行階段已過期。請登入。"
};

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
