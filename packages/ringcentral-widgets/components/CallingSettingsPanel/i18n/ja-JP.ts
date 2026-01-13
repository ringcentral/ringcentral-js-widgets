/* eslint-disable */
import { callingOptions } from '@ringcentral-integration/commons/modules/CallingSettings';
export default {
  title: '発信中',
  [callingOptions.softphone]: '{brand} for Desktop',
  [callingOptions.browser]: 'ブラウザー',
  [callingOptions.jupiter]: '{brand}',
  makeCallsWith: '通話発信に使用する',
  ringoutHint: '最初に自分の場所で自身を呼び出した後、通話相手に接続する',
  myLocationLabel: '自分の場所',
  press1ToStartCallLabel:
    '通話接続前に「1」をダイヤルするように指示するメッセージを受け取る',
  [`${callingOptions.browser}Tooltip`]:
    '通話の発着信にコンピューターのマイクロフォンとスピーカーを使用するには、このオプションを使用します。',
  [`${callingOptions.softphone}Tooltip`]:
    '通話の発着信に{brand}を使用するには、このオプションを使用します。',
  [`${callingOptions.ringout}Tooltip`]:
    'このオプションを使用して、選択または入力した電話番号で発信します。',
  [`${callingOptions.ringout}Tooltip1`]:
    '発信した場合、最初にこの電話が鳴り、次に発信先の電話が鳴ります。',
  [`${callingOptions.jupiter}Tooltip`]:
    '通話の発着信に{brand}を使用するには、このオプションを使用します。',
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
