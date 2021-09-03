import { connectivityTypes } from '../../../../modules/ConnectivityManager';
export default {
  [connectivityTypes.networkLoss]: "Lamentamos, mas ocorreu um erro. Verifique a ligação de rede e tente novamente.",
  [connectivityTypes.offline]: "Não é possível ligar ao servidor. Tente novamente mais tarde.",
  [connectivityTypes.serverUnavailable]: "Lamentamos, mas ocorreu um erro do nosso lado. Tente novamente mais tarde.",
  [connectivityTypes.voipOnly]: "Lamentamos, mas ocorreu um erro do nosso lado que estamos a tentar solucionar. Pode continuar a efetuar chamadas mas, de momento, outras funções estão limitadas.",
  [connectivityTypes.survival]: "Lamentamos, mas ocorreu um erro do nosso lado que estamos a tentar solucionar. Algumas funcionalidades podem ter acesso limitado. A aplicação irá recuperar automaticamente assim que estiver disponível."
};

// @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@
