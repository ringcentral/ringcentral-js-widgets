import callErrors from 'ringcentral-integration/modules/Call/callErrors';

export default {
  [callErrors.noToNumber]: '有効な電話番号を入力してください。',
  [callErrors.noAreaCode]: '7桁の国内電話番号を使用するには、{areaCodeLink}を設定してください。',
  [callErrors.specialNumber]: '緊急サービスまたは特別なサービスの番号へのダイヤルはサポートされていません。',
  [callErrors.connectFailed]: '接続に失敗しました。後でもう一度やり直してください。',
  [callErrors.internalError]: '内部エラーにより、接続できません。後でもう一度やり直してください。',
  [callErrors.notAnExtension]: 'この内線番号は存在しません。',
  [callErrors.networkError]: 'ネットワークの問題により、接続できません。後でもう一度やり直してください。',
  [callErrors.noInternational]: '国際電話を発信するためのアクセス許可がありません。アップグレードについて{brand}アカウント管理者にお問い合わせください。',
  [callErrors.noRingoutEnable]: 'お使いの内線は、デスクトップアプリを使用した通話発信が許可されています。\n    他の通話オプションに切り替えたい場合は、\n    アップグレードについてアカウント管理者にお問い合わせください。',
  areaCode: '市外局番',
  telus911: '緊急ダイヤルはサポートされていません。'
};

// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.specialNumber]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@
