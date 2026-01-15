/* eslint-disable */
import { callingSettingsMessages } from '@ringcentral-integration/commons/modules/CallingSettings';
export default {
  [callingSettingsMessages.saveSuccess]: 'Impostazioni salvate.',
  [callingSettingsMessages.saveSuccessWithSoftphone]:
    'Impostazioni salvate. Assicurati che {brand} sia installato nel computer.',
  [callingSettingsMessages.permissionChanged]:
    'Le tue autorizzazioni sono state modificate di recente. Vai a {link} per verificare le opzioni Chiamata.',
  [callingSettingsMessages.phoneNumberChanged]:
    'Le informazioni sul numero di telefono sono state modificate di recente. Vai a {link} per verificare le opzioni Chiamata.',
  link: 'Impostazioni > Chiamata',
  [callingSettingsMessages.webphonePermissionRemoved]:
    "Le tue autorizzazioni sono state modificate e non consentono di effettuare chiamate con il browser. Per maggiori dettagli contatta l'amministratore del tuo account.",
  [callingSettingsMessages.emergencyCallingNotAvailable]:
    'Le chiamate a numeri di servizi di emergenza o servizi speciali non sono supportate. In caso di emergenza, usa la linea fissa convenzionale o un telefono wireless per chiamare un servizio di emergenza.',
  [callingSettingsMessages.saveSuccessWithJupiter]:
    'Impostazioni salvate. Assicurati che {brand} sia installato nel computer.',
  [callingSettingsMessages.disableEmergencyInJapan]:
    'Servizio di emergenza non disponibile in Giappone.',
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
