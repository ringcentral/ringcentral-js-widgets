import { callingSettingsMessages } from '@ringcentral-integration/commons/modules/CallingSettingsV2/callingSettingsMessages';
export default {
  [callingSettingsMessages.saveSuccess]: "설정이 성공적으로 저장되었습니다.",
  [callingSettingsMessages.saveSuccessWithSoftphone]: "설정이 성공적으로 저장되었습니다. 컴퓨터에 {brand}이(가) 설치되어 있는지 확인하세요.",
  [callingSettingsMessages.permissionChanged]: "최근 권한이 변경되었습니다. {link}(으)로 이동하여 통화 옵션을 확인하세요.",
  [callingSettingsMessages.phoneNumberChanged]: "최근 전화번호 정보가 변경되었습니다. {link}(으)로 이동하여 통화 옵션을 확인하세요.",
  link: "설정 > 통화",
  [callingSettingsMessages.webphonePermissionRemoved]: "권한이 변경되어 브라우저를 사용하여 전화를 걸 수 없습니다. 자세한 내용은 계정 관리자에게 문의하세요.",
  [callingSettingsMessages.emergencyCallingNotAvailable]: "긴급 또는 특별 서비스 번호로 전화 걸기는 지원되지 않습니다. 비상시에는 기존 유선 전화 또는 무선 전화를 사용하여 긴급 번호로 전화를 거세요.",
  [callingSettingsMessages.saveSuccessWithJupiter]: "설정이 성공적으로 저장되었습니다. 컴퓨터에 {brand}이(가) 설치되어 있는지 확인하세요.",
  [callingSettingsMessages.disableEmergencyInJapan]: "일본에서는 긴급 서비스를 이용할 수 없습니다."
};

// @key: @#@"[callingSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithSoftphone]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@
// @key: @#@"[callingSettingsMessages.permissionChanged]"@#@ @source: @#@"Your permissions have been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"[callingSettingsMessages.phoneNumberChanged]"@#@ @source: @#@"Your phone number information has been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"link"@#@ @source: @#@"Settings > Calling"@#@
// @key: @#@"[callingSettingsMessages.webphonePermissionRemoved]"@#@ @source: @#@"Your permissions have been changed and you cannot make calls with Browser. For details please contact your account administrator."@#@
// @key: @#@"[callingSettingsMessages.emergencyCallingNotAvailable]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported. In an emergency, use your traditional wireline or wireless phone to call an emergency number."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithJupiter]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@
// @key: @#@"[callingSettingsMessages.disableEmergencyInJapan]"@#@ @source: @#@"Emergency service is not available in Japan."@#@
