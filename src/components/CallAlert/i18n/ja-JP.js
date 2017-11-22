import callErrors from 'ringcentral-integration/modules/Call/callErrors';

export default {
  [callErrors.noToNumber]: '有効な電話番号を入力してください\u3002',
  [callErrors.noAreaCode]: '7桁の国内電話番号を使用するには\u3001{areaCodeLink}を設定してください\u3002',
  [callErrors.specialNumber]: '緊急サービスまたは特別なサービスの番号へのダイヤルはサポートされていません\u3002',
  [callErrors.connectFailed]: '接続に失敗しました\u3002後でもう一度やり直してください\u3002',
  [callErrors.internalError]: '内部エラーにより\u3001接続できません\u3002後でもう一度やり直してください\u3002',
  [callErrors.notAnExtension]: 'この内線番号は存在しません\u3002',
  [callErrors.networkError]: 'ネットワークの問題により\u3001接続できません\u3002後でもう一度やり直してください\u3002',
  [callErrors.noRingoutEnable]: 'お使いの内線は\u3001デスクトップアプリを使用した通話発信が許可されています\u3002\n    他の通話オプションに切り替えたい場合は\u3001\n    アップグレードについてアカウント管理者にお問い合わせください\u3002',
  areaCode: '市外局番',
  telus911: '緊急ダイヤルはサポートされていません\u3002',
};
