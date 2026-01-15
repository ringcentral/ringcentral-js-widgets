/* eslint-disable */
import { authMessages } from '@ringcentral-integration/commons/modules/Auth';
export default {
  [authMessages.internalError]:
    '内部エラーにより、ログインに失敗しました。後でもう一度お試しください。',
  [authMessages.accessDenied]:
    'アクセスが拒否されました。サポートにお問い合わせください。',
  [authMessages.sessionExpired]:
    'セッションの有効期限が切れました。サインインしてください。',
  [authMessages.siteAccessForbidden]:
    '申し訳ありませんが、別のアカウントでサインインしてください。IT管理者にお問い合わせください。',
} as const;

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
// @key: @#@"[authMessages.siteAccessForbidden]"@#@ @source: @#@"Sorry, use a different account to sign in. Please ask your IT admin for assistance."@#@
