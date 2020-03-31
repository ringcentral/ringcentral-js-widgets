import connectivityTypes from 'ringcentral-widgets/modules/ConnectivityManager/connectivityTypes';
export default {
  [connectivityTypes.networkLoss]: "Algo deu errado. Verifique sua conexão de rede e tente novamente.",
  [connectivityTypes.offline]: "Não é possível conectar ao servidor. Tente mais tarde.",
  [connectivityTypes.serverUnavailable]: "Algo deu errado do nosso lado. Tente novamente mais tarde.",
  [connectivityTypes.voipOnly]: "Algo deu errado do nosso lado, mas estamos trabalhando para corrigir o problema. Você ainda pode fazer chamadas, mas outras funções estão limitadas no momento.",
  [connectivityTypes.survival]: "Algo deu errado do nosso lado, mas estamos trabalhando para corrigir o problema. Você pode ter acesso limitado a alguns recursos. O aplicativo será recuperado automaticamente assim que estiver disponível."
};

// @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@
