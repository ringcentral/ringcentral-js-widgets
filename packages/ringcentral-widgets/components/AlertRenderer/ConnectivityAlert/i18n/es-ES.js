import connectivityTypes from '../../../../modules/ConnectivityManager/connectivityTypes';
export default {
  [connectivityTypes.networkLoss]: "Se produjo un error; compruebe la conexión de red e inténtelo de nuevo.",
  [connectivityTypes.offline]: "No se puede conectar al servidor. Vuelva a intentarlo más tarde.",
  [connectivityTypes.serverUnavailable]: "Se produjo un error por nuestra parte. Vuelva a intentarlo más tarde.",
  [connectivityTypes.voipOnly]: "Se produjo un error por nuestra parte, pero estamos trabajando para solucionarlo. Aún puede realizar llamadas, pero otras funciones actualmente están limitadas.",
  [connectivityTypes.survival]: "Se produjo un error por nuestra parte, pero estamos trabajando para solucionarlo. Es posible que tenga acceso limitado a determinadas funciones. La aplicación se recuperará automáticamente tan pronto como esté disponible."
};

// @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@
