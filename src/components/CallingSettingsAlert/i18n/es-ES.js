import callingSettingsMessages from
  'ringcentral-integration/modules/CallingSettings/callingSettingsMessages';

export default {
  [callingSettingsMessages.saveSuccess]: 'La configuración se guardó correctamente.',
  [callingSettingsMessages.saveSuccessWithSoftphone]: 'La configuración se guardó correctamente. Asegúrese de que tiene {brand} para escritorio instalado en su equipo.',
  [callingSettingsMessages.firstLogin]: 'Seleccione cómo quiere realizar su llamada en la sección Llamadas. Sería conveniente que nos dijera cuál es su ubicación a través del código de país y de área (si fuera posible) en la sección Región, para poder utilizar una marcación local con la aplicación.',
  [callingSettingsMessages.firstLoginOther]: 'Seleccione cómo quiere realizar su llamada en la sección Llamadas.',
  [callingSettingsMessages.permissionChanged]: 'Sus permisos han cambiado recientemente. Vaya a {link} para comprobar sus opciones de llamadas.',
  [callingSettingsMessages.phoneNumberChanged]: 'La información de su número de teléfono ha cambiado recientemente. Vaya a {link} para comprobar sus opciones de llamadas.',
  link: 'Configuración > Llamadas',
  [callingSettingsMessages.webphonePermissionRemoved]: 'Sus permisos han cambiado y ya no puede hacer llamadas con el navegador. Póngase en contacto con el administrador de su cuenta para obtener información detallada.',
  [callingSettingsMessages.emergencyCallingNotAvailable]: 'No es posible llamar a emergencias o a números de servicios especiales. Ante una emergencia, use la línea fija o el teléfono móvil para llamar a un número de emergencias.',
};
