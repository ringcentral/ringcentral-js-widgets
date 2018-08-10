import callingSettingsMessages from 'ringcentral-integration/modules/CallingSettings/callingSettingsMessages';

export default {
  [callingSettingsMessages.saveSuccess]: "設定が正常に保存されました。",
  [callingSettingsMessages.saveSuccessWithSoftphone]: "設定が正常に保存されました。お使いのコンピューターに{brand} for Desktopがインストールされていることを確認してください。",
  [callingSettingsMessages.permissionChanged]: "アクセス許可が最近変更されました。{Link}の順に移動して、[通話]のオプションを確認してください。",
  [callingSettingsMessages.phoneNumberChanged]: "電話番号情報が最近変更されました。{Link}の順に移動して、[通話]のオプションを確認してください。",
  link: "[設定] > [通話]",
  [callingSettingsMessages.webphonePermissionRemoved]: "アクセス許可が変更されたため、ブラウザーを使用した通話はできません。詳細については、アカウント管理者にお問い合わせください。",
  [callingSettingsMessages.emergencyCallingNotAvailable]: "緊急サービスまたは特別なサービスの番号へのダイヤルはサポートされていません。緊急時は、従来の有線電話または携帯電話を使用して、緊急電話番号に電話してください。"
};

// @key: @#@"[callingSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithSoftphone]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} for Desktop installed in your computer."@#@
// @key: @#@"[callingSettingsMessages.permissionChanged]"@#@ @source: @#@"Your permissions have been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"[callingSettingsMessages.phoneNumberChanged]"@#@ @source: @#@"Your phone number information has been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"link"@#@ @source: @#@"Settings > Calling"@#@
// @key: @#@"[callingSettingsMessages.webphonePermissionRemoved]"@#@ @source: @#@"Your permissions have been changed and you cannot make calls with Browser. For details please contact your account administrator."@#@
// @key: @#@"[callingSettingsMessages.emergencyCallingNotAvailable]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported. In an emergency, use your traditional wireline or wireless phone to call an emergency number."@#@
