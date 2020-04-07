import connectivityTypes from 'ringcentral-widgets/modules/ConnectivityManager/connectivityTypes';
export default {
  [connectivityTypes.networkLoss]: "Désolé, une erreur s'est produite, vérifiez votre connexion réseau et réessayez.",
  [connectivityTypes.offline]: "Impossible d'accéder au serveur. Veuillez réessayer plus tard.",
  [connectivityTypes.serverUnavailable]: "Désolé, une erreur s'est produite de notre côté. Réessayez plus tard.",
  [connectivityTypes.voipOnly]: "Désolé, une erreur s'est produite de notre côté, mais nous nous efforçons de la corriger. Vous pouvez toujours passer des appels, mais les autres fonctions sont actuellement limitées.",
  [connectivityTypes.survival]: "Désolé, une erreur s'est produite de notre côté, mais nous nous efforçons de la corriger. Vous pouvez avoir un accès limité à certaines fonctionnalités. L'application se rétablira automatiquement dès qu'elle sera disponible."
};

// @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@
