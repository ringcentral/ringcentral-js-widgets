import { connectivityTypes } from '../../../../modules/ConnectivityManager';
export default {
  [connectivityTypes.networkLoss]:
    'Er is iets fout gegaan, controleer uw netwerkverbinding en probeer het opnieuw.',
  [connectivityTypes.offline]:
    'Kan niet verbinden met de server. Probeer het later opnieuw.',
  [connectivityTypes.serverUnavailable]:
    'Er is bij ons iets fout gegaan. Probeer het later opnieuw.',
  [connectivityTypes.voipOnly]:
    'Er is bij ons iets fout gegaan. We zijn druk bezig om dit op te lossen. U kunt nog steeds bellen, maar andere functies zijn momenteel beperkt.',
  [connectivityTypes.survival]:
    'Er is bij ons iets fout gegaan. We zijn druk bezig om dit op te lossen. U hebt beperkt toegang tot enkele functies. De app zal automatisch herstellen zodra deze beschikbaar is.',
};

// @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@
