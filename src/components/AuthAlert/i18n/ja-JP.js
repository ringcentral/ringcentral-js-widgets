import authMessages from 'ringcentral-integration/modules/Auth/authMessages';

export default {
  [authMessages.internalError]: '内部エラーにより\u3001ログインに失敗しました\u3002後でもう一度やり直してください\u3002',
  [authMessages.accessDenied]: 'アクセスが拒否されました\u3002サポートにお問い合わせください\u3002',
  [authMessages.sessionExpired]: 'セッションの有効期限が切れました\u3002サインインしてください\u3002',
};

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
