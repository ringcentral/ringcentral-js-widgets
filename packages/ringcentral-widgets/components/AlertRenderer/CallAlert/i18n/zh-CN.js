import callErrors from 'ringcentral-integration/modules/Call/callErrors';
export default {
  [callErrors.noToNumber]: "请输入有效的电话号码。",
  [callErrors.noAreaCode]: "请设置{areaCodeLink}以使用 7 位本地电话号码。",
  [callErrors.specialNumber]: "不支持紧急或特殊服务号码拨号。",
  [callErrors.connectFailed]: "连接失败。请稍后再试。",
  [callErrors.internalError]: "由于内部错误，无法连接：请稍后再试。",
  [callErrors.notAnExtension]: "分机号不存在。",
  [callErrors.networkError]: "由于网络问题，无法连接：请稍后再试。",
  [callErrors.noInternational]: "您没有权限拨打国际电话。请联系您的 {brand} 帐户管理员进行升级。",
  [callErrors.noRingoutEnable]: "您的分机可以通过桌面应用拨打电话。\n    如果您要切换至其他呼叫选项，\n    请联系您的帐户管理员进行升级。",
  areaCode: "区号",
  telus911: "不支持紧急拨号。"
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
