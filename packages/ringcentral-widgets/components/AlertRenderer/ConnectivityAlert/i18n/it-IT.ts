import { connectivityTypes } from '../../../../modules/ConnectivityManager';
export default {
  [connectivityTypes.networkLoss]: "Si è verificato un problema, controlla la connessione di rete e riprova.",
  [connectivityTypes.offline]: "Impossibile connettersi al server. Riprova più tardi.",
  [connectivityTypes.serverUnavailable]: "Si è verificato un problema nei nostri sistemi. Riprova più tardi.",
  [connectivityTypes.voipOnly]: "Si è verificato un problema, ma stiamo lavorando per risolverlo. È comunque possibile effettuare chiamate, ma le altre funzioni sono limitate.",
  [connectivityTypes.survival]: "Si è verificato un problema, ma stiamo lavorando per risolverlo. È possibile che l'accesso a determinate funzioni risulti limitato. L'app sarà ripristinata automaticamente non appena disponibile."
};

// @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@
