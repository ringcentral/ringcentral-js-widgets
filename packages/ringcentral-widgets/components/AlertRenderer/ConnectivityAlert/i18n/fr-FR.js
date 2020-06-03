import connectivityTypes from '../../../../modules/ConnectivityManager/connectivityTypes';
export default {
  [connectivityTypes.networkLoss]: "Une erreur s'est produite. Vérifiez votre connexion réseau et réessayez.",
  [connectivityTypes.offline]: "Impossible de se connecter au serveur. Veuillez réessayer plus tard.",
  [connectivityTypes.serverUnavailable]: "Désolé, une erreur s'est produite de notre côté. Réessayez plus tard.",
  [connectivityTypes.voipOnly]: "Désolé, une erreur s'est produite de notre côté mais nous travaillons dur pour la corriger. Vous pouvez toujours effectuer des appels, mais d'autres fonctions sont actuellement limitées.",
  [connectivityTypes.survival]: "Désolé, une erreur s'est produite de notre côté mais nous travaillons dur pour la corriger. Vous aurez peut-être un accès limité à certaines fonctionnalités. L'application sera automatiquement récupérée dès qu'elle sera disponible."
};

// @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@
