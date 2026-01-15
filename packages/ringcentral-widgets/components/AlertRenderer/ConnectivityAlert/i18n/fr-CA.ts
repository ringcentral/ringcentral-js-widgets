/* eslint-disable */
import { connectivityTypes } from '../../../../modules/ConnectivityManager';
export default {
  [connectivityTypes.networkLoss]:
    'Désolés, une erreur s’est produite, vérifiez votre connexion réseau et réessayez.',
  [connectivityTypes.offline]:
    'Impossible d’accéder au serveur. Veuillez réessayer plus tard.',
  [connectivityTypes.serverUnavailable]:
    'Désolés, une erreur s’est produite de notre côté. Réessayez plus tard.',
  [connectivityTypes.voipOnly]:
    'Désolés, une erreur s’est produite de notre côté, mais nous nous efforçons de la corriger. Vous pouvez toujours passer des appels, mais les autres fonctions sont actuellement limitées.',
  [connectivityTypes.survival]:
    'Désolés, une erreur s’est produite de notre côté, mais nous nous efforçons de la corriger. Vous pouvez avoir un accès limité à certaines fonctionnalités. L’application se rétablira automatiquement dès qu’elle sera disponible.',
} as const;

// @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@
