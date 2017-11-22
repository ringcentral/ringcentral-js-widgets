import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: 'Chiamata',
  [callingOptions.softphone]: '{brand} per il desktop',
  [callingOptions.myphone]: 'Il mio telefono {brand}',
  [callingOptions.otherphone]: 'Altro telefono',
  [callingOptions.customphone]: 'Telefono personalizzato',
  makeCallsWith: 'Effettua chiamate con',
  ringoutHint: 'Chiamami prima alla mia postazione, poi connetti il gruppo chiamato',
  myLocationLabel: 'La mia postazione',
  press1ToStartCallLabel: 'Chiedimi di comporre 1 prima di connettere la chiamata',
  [callingOptions.browser]: 'Browser',
  save: 'Salva',
  [`${callingOptions.browser}Tooltip`]: 'Usa questa opzione per effettuare e ricevere chiamate usando il microfono e l\'altoparlante del computer.',
  [`${callingOptions.softphone}Tooltip`]: 'Usa questa opzione per effettuare e ricevere chiamate usando l\'app {brand} per desktop.',
  [`${callingOptions.myphone}Tooltip`]: 'Usa questa opzione per effettuare chiamate usando il tuo telefono {brand}.',
  [`${callingOptions.myphone}Tooltip1`]: 'Per la chiamata effettuata, squillerà prima il tuo telefono {brand} e poi quello della persona chiamata.',
  [`${callingOptions.otherphone}Tooltip`]: 'Usa questa opzione per effettuare chiamate con i tuoi altri telefoni, ad esempio quello di casa o un cellulare che hai aggiunto al tuo interno {brand}.',
  [`${callingOptions.otherphone}Tooltip1`]: 'Per la chiamata effettuata, squillerà prima questo telefono e poi quello della persona chiamata.',
  [`${callingOptions.customphone}Tooltip`]: 'Usa questa opzione per effettuare chiamate con qualsiasi telefono inserendo un numero di telefono valido nel campo qui sotto.',
  [`${callingOptions.customphone}Tooltip1`]: 'Per la chiamata effettuata, squillerà prima questo telefono e poi quello della persona chiamata.',
};
