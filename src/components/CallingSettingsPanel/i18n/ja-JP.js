import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: '通話',
  save: '保存',
  [callingOptions.softphone]: '{brand} for Desktop',
  [callingOptions.myphone]: '自分の{brand}電話',
  [callingOptions.otherphone]: 'その他の電話',
  [callingOptions.customphone]: 'カスタム電話',
  [callingOptions.browser]: 'ブラウザー',
  makeCallsWith: '通話発信に使用する電話',
  ringoutHint: '最初に自分の場所で自身を呼び出した後\u3001通話相手に接続する',
  myLocationLabel: '自分の場所',
  press1ToStartCallLabel: '通話接続前にユーザーに\u300C1\u300Dをダイヤルするように指示する',
  [`${callingOptions.browser}Tooltip`]: '通話の発着信にコンピューターのマイクロフォンとスピーカーを使用するには\u3001このオプションを使用します\u3002',
  [`${callingOptions.softphone}Tooltip`]: '通話の発着信に{brand} for Desktopアプリを使用するには\u3001このオプションを使用します\u3002',
  [`${callingOptions.myphone}Tooltip`]: '{brand}電話を使用して電話をかけるには\u3001このオプションを使用します\u3002',
  [`${callingOptions.myphone}Tooltip1`]: '電話をかけた場合\u3001最初に自分の{brand}電話が鳴ってから\u3001通話相手の電話が鳴ります\u3002',
  [`${callingOptions.otherphone}Tooltip`]: '{brand}の内線に追加した自宅電話や携帯電話など\u3001他の電話を使用して電話をかけるには\u3001このオプションを使用します\u3002',
  [`${callingOptions.otherphone}Tooltip1`]: '電話をかけた場合\u3001最初にこの電話が鳴ってから\u3001通話相手の電話が鳴ります\u3002',
  [`${callingOptions.customphone}Tooltip`]: '以下のフィールドに有効な電話番号を入力することで任意の電話を使用して電話をかけるには\u3001このオプションを使用します\u3002',
  [`${callingOptions.customphone}Tooltip1`]: '電話をかけた場合\u3001最初にこの電話が鳴ってから\u3001通話相手の電話が鳴ります\u3002',
};
