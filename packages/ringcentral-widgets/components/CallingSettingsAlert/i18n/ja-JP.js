import callingSettingsMessages from
  'ringcentral-integration/modules/CallingSettings/callingSettingsMessages';

export default {
  [callingSettingsMessages.saveSuccess]: '設定が正常に保存されました\u3002',
  [callingSettingsMessages.saveSuccessWithSoftphone]: '設定が正常に保存されました\u3002お使いのコンピューターに{brand} for Desktopがインストールされていることを確認してください\u3002',
  [callingSettingsMessages.firstLogin]: '[通話]セクションで\u3001発信方法を選択してください\u3002[地域]セクションで国と市外局番(使用可能な場合)を指定して位置情報をお知らせいただけると\u3001アプリを使用した国内通話が可能になります\u3002',
  [callingSettingsMessages.firstLoginOther]: '[通話]セクションで\u3001発信方法を選択してください\u3002',
  [callingSettingsMessages.permissionChanged]: 'アクセス許可が最近変更されました\u3002{Link}の順に移動して\u3001[通話]のオプションを確認してください\u3002',
  [callingSettingsMessages.phoneNumberChanged]: '電話番号情報が最近変更されました\u3002{Link}の順に移動して\u3001[通話]のオプションを確認してください\u3002',
  link: '[設定] > [通話]',
  [callingSettingsMessages.webphonePermissionRemoved]: 'アクセス許可が変更されたため\u3001ブラウザーを使用した通話はできません\u3002詳細については\u3001アカウント管理者にお問い合わせください\u3002',
  [callingSettingsMessages.emergencyCallingNotAvailable]: '緊急サービスまたは特別なサービスの番号へのダイヤルはサポートされていません\u3002緊急時は\u3001従来の有線電話または携帯電話を使用して\u3001緊急電話番号に電話してください\u3002',
};

// @key: @#@"[callingSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithSoftphone]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} for Desktop installed in your computer."@#@
// @key: @#@"[callingSettingsMessages.permissionChanged]"@#@ @source: @#@"Your permissions have been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"[callingSettingsMessages.phoneNumberChanged]"@#@ @source: @#@"Your phone number information has been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"link"@#@ @source: @#@"Settings > Calling"@#@
// @key: @#@"[callingSettingsMessages.webphonePermissionRemoved]"@#@ @source: @#@"Your permissions have been changed and you cannot make calls with Browser. For details please contact your account administrator."@#@
// @key: @#@"[callingSettingsMessages.emergencyCallingNotAvailable]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported. In an emergency, use your traditional wireline or wireless phone to call an emergency number."@#@
