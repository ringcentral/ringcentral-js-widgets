import { connectivityTypes } from '../../../../modules/ConnectivityManager';
export default {
  [connectivityTypes.networkLoss]: "Jokin meni vikaan. Tarkista verkkoyhteytesi ja yritä uudelleen.",
  [connectivityTypes.offline]: "Yhteyden muodostaminen palvelimeen epäonnistui. Yritä myöhemmin uudelleen.",
  [connectivityTypes.serverUnavailable]: "Jokin meni vikaan palvelimellamme. Yritä myöhemmin uudelleen.",
  [connectivityTypes.voipOnly]: "Jokin meni vikaan palvelimellamme. Pyrimme korjaamaan vian pikimmiten. Voit edelleen soittaa puheluita, mutta muita toimintoja on rajoitettu.",
  [connectivityTypes.survival]: "Jokin meni vikaan palvelimellamme. Pyrimme korjaamaan vian pikimmiten. Tietyt ominaisuudet voivat olla käytössä vain rajoitetusti. Sovellus palautuu normaalitilaan niin pian kuin mahdollista."
};

// @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@
