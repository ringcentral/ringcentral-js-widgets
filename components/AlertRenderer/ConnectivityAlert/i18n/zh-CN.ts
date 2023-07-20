import { connectivityTypes } from '../../../../modules/ConnectivityManager';
export default {
  [connectivityTypes.networkLoss]: "抱歉，发生问题，请检查网络连接并重试。",
  [connectivityTypes.offline]: "无法连接到服务器。请稍后重试。",
  [connectivityTypes.serverUnavailable]: "抱歉，我们这边发生了问题。请稍后重试。",
  [connectivityTypes.voipOnly]: "抱歉，我们这边发生了问题，但我们正在努力解决问题。您仍可以拨打电话，但其他功能此时会受到限制。",
  [connectivityTypes.survival]: "抱歉，系统出现问题，我们正在努力解决。您对某些功能的访问可能会受到限制。应用一变为可用状态，就会自动恢复。"
};

// @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@
