import authMessages from 'ringcentral-integration/modules/Auth/authMessages';

export default {
  [authMessages.internalError]: "内部エラーにより、ログインに失敗しました。後でもう一度やり直してください。",
  [authMessages.accessDenied]: "アクセスが拒否されました。サポートにお問い合わせください。",
  [authMessages.sessionExpired]: "セッションの有効期限が切れました。サインインしてください。"
};

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
