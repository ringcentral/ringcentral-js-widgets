/* eslint-disable */
import { connectivityTypes } from '../../../../modules/ConnectivityManager';
export default {
  [connectivityTypes.networkLoss]:
    'Lo sentimos, se produjo un error; verifique su conexión de red y vuelva a intentarlo.',
  [connectivityTypes.offline]:
    'No se puede conectar al servidor. Inténtelo de nuevo más tarde.',
  [connectivityTypes.serverUnavailable]:
    'Se produjo un error en nuestro sistema. Inténtelo de nuevo más tarde.',
  [connectivityTypes.voipOnly]:
    'Se produjo un error en nuestro sistema, pero estamos trabajando arduamente para solucionarlo. Aún puede hacer llamadas, pero otras funciones están actualmente limitadas.',
  [connectivityTypes.survival]:
    'Se produjo un error en nuestro sistema, pero estamos trabajando arduamente para solucionarlo. Es posible que tenga acceso limitado a ciertas funciones. La aplicación se recuperará automáticamente tan pronto como esté disponible.',
} as const;

// @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@
