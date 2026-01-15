/* eslint-disable */
import { callingOptions } from '@ringcentral-integration/commons/modules/CallingSettings';
export default {
  title: '通話',
  [callingOptions.softphone]: '{brand} for Desktop',
  [callingOptions.browser]: '瀏覽器',
  [callingOptions.jupiter]: '{brand}',
  makeCallsWith: '我的通話進行時使用',
  ringoutHint: '先對我的位置響鈴，然後接通受話方',
  myLocationLabel: '我的位置',
  press1ToStartCallLabel: '在接通通話前提示我按 1',
  [`${callingOptions.browser}Tooltip`]:
    '請使用這個選項，透過您電腦的麥克風和喇叭撥出與接聽電話。',
  [`${callingOptions.softphone}Tooltip`]:
    '請使用這個選項，透過您的 {brand} 撥出與接聽電話。',
  [`${callingOptions.ringout}Tooltip`]:
    '使用此選項即可使用選擇或輸入的電話號碼撥打電話。',
  [`${callingOptions.ringout}Tooltip1`]:
    '在您撥號通話時，這部電話會先響起鈴聲，接著您致電的對象才會鈴響。',
  [`${callingOptions.jupiter}Tooltip`]:
    '請使用這個選項，透過您的 {brand} 撥出與接聽電話。',
} as const;

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
