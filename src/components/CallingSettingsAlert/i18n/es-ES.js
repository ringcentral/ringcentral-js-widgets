import callingSettingsMessages from
  'ringcentral-integration/modules/CallingSettings/callingSettingsMessages';

export default {
  [callingSettingsMessages.saveSuccess]: 'La configuración se guardó correctamente.',
  [callingSettingsMessages.saveSuccessWithSoftphone]: `La configuración se guardó correctamente.
        Asegúrese de que tiene {brand} para escritorio instalado en su equipo.`,
  [callingSettingsMessages.firstLogin]: `Seleccione cómo quiere realizar su llamada en la sección Llamadas.
      Sería conveniente que nos dijera cuál es su ubicación
      a través del código de país y de área (si fuera posible) en la sección Región,
      para poder utilizar una marcación local con la aplicación.`,
  [callingSettingsMessages.firstLoginOther]: 'Seleccione cómo quiere realizar su llamada en la sección Llamadas.',
  [callingSettingsMessages.permissionChanged]: 'Sus permisos han cambiado recientemente. Vaya a {link} para comprobar sus opciones de llamadas.',
  [callingSettingsMessages.phoneNumberChanged]: 'La información de su número de teléfono ha cambiado recientemente. Vaya a {link} para comprobar sus opciones de llamadas.',
  link: 'Configuración > Llamadas',
};
