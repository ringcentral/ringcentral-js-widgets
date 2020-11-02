import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';
export default {
  title: "통화",
  [callingOptions.softphone]: "데스크톱용 {brand}",
  [callingOptions.browser]: "브라우저",
  [callingOptions.jupiter]: "{brand}",
  makeCallsWith: "다음으로 내 전화 걸기",
  ringoutHint: "먼저 내 위치에서 Ring Me한 다음 호출한 상대방에게 연결",
  myLocationLabel: "내 위치",
  press1ToStartCallLabel: "통화 연결 전에 1번을 누르도록 알림",
  [`${callingOptions.browser}Tooltip`]: "컴퓨터의 마이크와 스피커를 사용하여 전화를 걸고 받으려면 이 옵션을 사용합니다.",
  [`${callingOptions.softphone}Tooltip`]: "{brand}을(를) 사용하여 전화를 걸고 받으려면 이 옵션을 사용합니다.",
  [`${callingOptions.ringout}Tooltip`]: "선택하거나 입력한 전화번호를 사용하여 전화를 걸려면 이 옵션을 사용합니다.",
  [`${callingOptions.ringout}Tooltip1`]: "전화를 걸면 먼저 이 전화벨이 울린 다음 호출한 상대방의 벨이 울립니다.",
  [`${callingOptions.jupiter}Tooltip`]: "{brand}을(를) 사용하여 전화를 걸고 받으려면 이 옵션을 사용합니다."
};

// @key: @#@"title"@#@ @source: @#@"Calling"@#@
// @key: @#@"[callingOptions.softphone]"@#@ @source: @#@"{brand} for Desktop"@#@
// @key: @#@"[callingOptions.browser]"@#@ @source: @#@"Browser"@#@
// @key: @#@"[callingOptions.jupiter]"@#@ @source: @#@"{brand}"@#@
// @key: @#@"makeCallsWith"@#@ @source: @#@"Make my calls with"@#@
// @key: @#@"ringoutHint"@#@ @source: @#@"Ring me at my location first, then connect the called party"@#@
// @key: @#@"myLocationLabel"@#@ @source: @#@"My Location"@#@
// @key: @#@"press1ToStartCallLabel"@#@ @source: @#@"Prompt me to dial 1 before connecting the call"@#@
// @key: @#@"[`${callingOptions.browser}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your computer’s microphone and speaker."@#@
// @key: @#@"[`${callingOptions.softphone}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your {brand}."@#@
// @key: @#@"[`${callingOptions.ringout}Tooltip`]"@#@ @source: @#@"Use this option to make calls using your selected or entered phone number."@#@
// @key: @#@"[`${callingOptions.ringout}Tooltip1`]"@#@ @source: @#@"For the call you make, this phone will ring first then the party you called."@#@
// @key: @#@"[`${callingOptions.jupiter}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your {brand}."@#@
