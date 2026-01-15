/* eslint-disable */
import { callErrors } from '@ringcentral-integration/commons/modules/Call';
export default {
  [callErrors.emergencyNumber]: '緊急通話無法使用。請使用其他電話連絡緊急服務',
  [callErrors.noToNumber]: '請輸入有效的電話號碼。',
  [callErrors.noAreaCode]: '請設定 {areaCodeLink} 以使用 7 位數當地電話號碼。',
  [callErrors.connectFailed]: '連線失敗。請稍後再試。',
  [callErrors.internalError]: '因為內部錯誤導致無法連線。請稍後再試。',
  [callErrors.notAnExtension]: '分機號碼不存在。',
  [callErrors.networkError]: '因網路問題，無法連線。請稍後再試。',
  [callErrors.noInternational]:
    '您沒有進行國際通話的權限。請聯絡您的 {brand} 帳戶管理員進行升級。',
  [callErrors.noRingoutEnable]:
    '您的分機可以使用桌面應用程式進行通話。\n    若您希望切換至其他通話選項，請聯絡您的帳戶管理員進行升級。\n    ',
  [callErrors.numberParseError]: '抱歉，出現問題。請稍後再試。',
  areaCode: '區碼',
  telus911: '不支援緊急撥號。',
  [callErrors.fromAndToNumberIsSame]:
    'RingOut 號碼和目的地號碼不得相同。請更新號碼並再試一次。',
} as const;

// @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"[callErrors.numberParseError]"@#@ @source: @#@"Sorry, there was a problem on our end. Please try again later."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@
// @key: @#@"[callErrors.fromAndToNumberIsSame]"@#@ @source: @#@"The RingOut number and destination number can't be the same. Please update the number and try again."@#@
