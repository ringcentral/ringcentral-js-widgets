/* eslint-disable */
import { connectivityTypes } from '../../../../modules/ConnectivityManager';
export default {
  [connectivityTypes.networkLoss]:
    '申し訳ございませんが、問題が発生しました。ネットワーク接続を確認し、もう一度お試しください。',
  [connectivityTypes.offline]:
    'サーバーに接続できません。後でもう一度お試しください。',
  [connectivityTypes.serverUnavailable]:
    '申し訳ございません。こちら側で問題が発生しました。後ほど再試行してください。',
  [connectivityTypes.voipOnly]:
    '申し訳ございません。こちら側で問題が発生しましたが、問題を修正しようとしているところです。通話を行うことはできますが、現在その他の機能は制限されています。',
  [connectivityTypes.survival]:
    '申し訳ございません。こちら側で問題が発生しましたが、問題を修正しようとしているところです。特定の機能へのアクセスが制限されている可能性があります。アプリは、使用できるようになると自動的に復元されます。',
} as const;

// @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@
