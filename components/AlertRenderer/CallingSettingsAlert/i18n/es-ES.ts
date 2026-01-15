/* eslint-disable */
import { callingSettingsMessages } from '@ringcentral-integration/commons/modules/CallingSettings';
export default {
  [callingSettingsMessages.saveSuccess]:
    'La configuración se ha guardado correctamente.',
  [callingSettingsMessages.saveSuccessWithSoftphone]:
    'La configuración se ha guardado correctamente. Asegúrese de que tiene{brand}instalado en su equipo.',
  [callingSettingsMessages.permissionChanged]:
    'Sus permisos han cambiado recientemente. Vaya a{link}para comprobar las opciones de llamada.',
  [callingSettingsMessages.phoneNumberChanged]:
    'La información de su número de teléfono ha cambiado recientemente. Vaya a{link}para comprobar las opciones de llamada.',
  link: 'Configuración > Llamadas',
  [callingSettingsMessages.webphonePermissionRemoved]:
    'Sus permisos han cambiado y ya no puede hacer llamadas con el navegador. Póngase en contacto con el administrador de su cuenta para obtener información detallada.',
  [callingSettingsMessages.emergencyCallingNotAvailable]:
    'No es posible llamar a números de emergencia o de servicios especiales. Ante una emergencia, use la línea fija o el teléfono móvil para llamar a un número de emergencias.',
  [callingSettingsMessages.saveSuccessWithJupiter]:
    'La configuración se ha guardado correctamente. Asegúrese de que tiene{brand}instalado en su equipo.',
  [callingSettingsMessages.disableEmergencyInJapan]:
    'El servicio de emergencias no está disponible en Japón.',
} as const;

// @key: @#@"[callingSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithSoftphone]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@
// @key: @#@"[callingSettingsMessages.permissionChanged]"@#@ @source: @#@"Your permissions have been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"[callingSettingsMessages.phoneNumberChanged]"@#@ @source: @#@"Your phone number information has been changed recently. Please go to {link} to check your Calling options."@#@
// @key: @#@"link"@#@ @source: @#@"Settings > Calling"@#@
// @key: @#@"[callingSettingsMessages.webphonePermissionRemoved]"@#@ @source: @#@"Your permissions have been changed and you cannot make calls with Browser. For details please contact your account administrator."@#@
// @key: @#@"[callingSettingsMessages.emergencyCallingNotAvailable]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported. In an emergency, use your traditional wireline or wireless phone to call an emergency number."@#@
// @key: @#@"[callingSettingsMessages.saveSuccessWithJupiter]"@#@ @source: @#@"Settings saved successfully. Please make sure you have {brand} installed in your computer."@#@
// @key: @#@"[callingSettingsMessages.disableEmergencyInJapan]"@#@ @source: @#@"Emergency service is not available in Japan."@#@
