import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.connectFailed]: 'Invio eseguito.',
  [webphoneErrors.browserNotSupported]: 'Le chiamate da browser sono supportate solo in Chrome.',
  [webphoneErrors.webphoneCountOverLimit]: 'È possibile registrare fino a 5 telefoni web.',
  [webphoneErrors.notOutboundCallWithoutDL]: 'Con questo interno non è attualmente consentito effettuare chiamate in uscita con il browser. Contatta il rappresentante dell\'account per un aggiornamento',
  [webphoneErrors.getSipProvisionError]: 'Non disponi dell\'autorizzazione per inviare il messaggio.',
};
