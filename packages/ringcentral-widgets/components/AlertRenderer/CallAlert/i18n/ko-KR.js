import callErrors from 'ringcentral-integration/modules/Call/callErrors';
export default {
  [callErrors.noToNumber]: "유효한 전화번호를 입력하세요.",
  [callErrors.noAreaCode]: "7자리 지역 전화번호를 사용하도록 {areaCodeLink}을(를) 설정하세요.",
  [callErrors.specialNumber]: "긴급 또는 특별 서비스 번호로 전화 걸기는 지원되지 않습니다.",
  [callErrors.connectFailed]: "연결에 실패했습니다. 나중에 다시 시도하세요.",
  [callErrors.internalError]: "내부 오류로 인해 연결할 수 없습니다. 나중에 다시 시도하세요.",
  [callErrors.notAnExtension]: "내선 번호가 없습니다.",
  [callErrors.networkError]: "네트워크 문제로 인해 연결할 수 없습니다. 나중에 다시 시도하세요.",
  [callErrors.noInternational]: "국제 전화를 걸 수 있는 권한이 없습니다. {brand} 계정 관리자에게 문의하여 업그레이드하세요.",
  [callErrors.noRingoutEnable]: "내선에서 데스크톱 앱을 사용하여 전화를 걸 수 있습니다.\n    다른 통화 옵션으로 전화하려면\n    계정 관리자에게 문의하여 업그레이드하세요.",
  areaCode: "지역 코드",
  telus911: "긴급 전화 걸기는 지원되지 않습니다."
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
