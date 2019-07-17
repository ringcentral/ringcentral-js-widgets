import connectivityTypes from 'ringcentral-widgets/modules/ConnectivityManager/connectivityTypes';
export default {
  [connectivityTypes.networkLoss]: "Leider ist ein Fehler aufgetreten. Überprüfen Sie Ihre Netzwerkverbindung und versuchen Sie es erneut.",
  [connectivityTypes.offline]: "Verbindung zum Server nicht möglich. Bitte versuchen Sie es später erneut.",
  [connectivityTypes.serverUnavailable]: "Leider ist auf unserer Seite ein Fehler aufgetreten. Versuchen Sie es später erneut.",
  [connectivityTypes.voipOnly]: "Leider ist auf unserer Seite ein Fehler aufgetreten, aber wir arbeiten hart daran, das Problem zu beheben. Sie können weiterhin Anrufe tätigen, aber andere Funktionen sind derzeit eingeschränkt.",
  [connectivityTypes.survival]: "Leider ist auf unserer Seite ein Fehler aufgetreten, aber wir arbeiten hart daran, das Problem zu beheben. Möglicherweise haben Sie auf bestimmte Funktionen nur eingeschränkten Zugriff. Die App wird automatisch wiederhergestellt, sobald sie verfügbar ist."
};

// @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@
