import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.connectFailed]: 'Invio eseguito.',
  [webphoneErrors.browserNotSupported]: 'Le chiamate da browser sono supportate solo in Chrome.',
  [webphoneErrors.webphoneCountOverLimit]: 'È possibile registrare fino a 5 telefoni web.',
  [webphoneErrors.notOutboundCallWithoutDL]: 'Con questo interno non è attualmente consentito effettuare chiamate in uscita con il browser. Contatta il rappresentante dell\'account per un aggiornamento',
  [webphoneErrors.getSipProvisionError]: 'Non disponi dell\'autorizzazione per inviare il messaggio.',
  [webphoneErrors.connected]: 'Telefono web registrato.',
  [webphoneErrors.toVoiceMailError]: 'Impossibile inviare la chiamata alla segreteria telefonica a causa di un errore interno',
  [webphoneErrors.muteError]: 'Impossibile disattivare l\'audio della chiamata in questo momento.',
  [webphoneErrors.holdError]: 'Impossibile mettere in attesa la chiamata in questo momento.',
  [webphoneErrors.flipError]: 'Impossibile commutare la chiamata. Riprova più tardi.',
  [webphoneErrors.recordError]: 'Non è possibile registrare la chiamata in questo momento. Codice errore: {errorCode}',
  [webphoneErrors.recordDisabled]: 'La funzione di registrazione chiamata non è disponibile nel tuo account. Contatta l\'amministratore del tuo account.',
  [webphoneErrors.transferError]: 'Impossibile trasferire la chiamata. Riprova più tardi.',
};
