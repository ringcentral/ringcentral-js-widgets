/* eslint-disable */
import { connectivityTypes } from '../../../../modules/ConnectivityManager';
export default {
  [connectivityTypes.networkLoss]:
    '抱歉，出了一些問題，請檢查您的網路連接並再試一次。',
  [connectivityTypes.offline]: '無法連線伺服器。請稍後再試一次。',
  [connectivityTypes.serverUnavailable]: '抱歉，系統發生錯誤。請稍後再試一次。',
  [connectivityTypes.voipOnly]:
    '抱歉，系統發生錯誤，但我們正在努力修復。您仍然可以撥打電話，但其他功能目前受到限制。',
  [connectivityTypes.survival]:
    '抱歉，系統發生錯誤，但我們正在努力進行修復。特定功能可能受到限制。應用程式將在可以使用時立即自動復原。',
} as const;

// @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@
