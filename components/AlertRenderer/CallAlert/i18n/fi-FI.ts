import { callErrors } from '@ringcentral-integration/commons/modules/Call';

export default {
  [callErrors.emergencyNumber]:
    'Hätänumeroon soittaminen ei ole käytettävissä. Soita hätäkeskukseen toisella puhelimella',
  [callErrors.noToNumber]: 'Anna kelvollinen puhelinnumero.',
  [callErrors.noAreaCode]:
    'Määritä {areaCodeLink} käyttämään 7-numeroisia paikallispuhelinnumeroita.',
  [callErrors.connectFailed]: 'Yhteys epäonnistui. Yritä myöhemmin uudelleen.',
  [callErrors.internalError]:
    'Ei voida yhdistää sisäisten virheiden takia. Yritä myöhemmin uudelleen.',
  [callErrors.notAnExtension]: 'Alanumeroa ei ole olemassa.',
  [callErrors.networkError]:
    'Ei voida yhdistää verkko-ongelmien takia. Yritä myöhemmin uudelleen.',
  [callErrors.noInternational]:
    'Sinulla ei ole lupaa soittaa kansainvälisiä puheluita. Pyydä päivitystä palvelun {brand} tilin järjestelmänvalvojalta.',
  [callErrors.noRingoutEnable]:
    'Alanumerostasi voi soittaa puheluita työpöytäsovelluksen kautta.\n    Jos haluat vaihtaa toiseen puheluvaihtoehtoon,\n     pyydä päivitystä tilisi järjestelmänvalvojalta.',
  [callErrors.numberParseError]:
    'Järjestelmässämme ilmeni ongelma. Yritä myöhemmin uudelleen.',
  areaCode: 'suuntanumero',
  telus911: 'Hätäpuheluita ei tueta.',
  [callErrors.fromAndToNumberIsSame]:
    'RingOut-numero ja kohdenumero eivät voi olla sama numero. Päivitä numero ja yritä uudelleen.',
};

// @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"[callErrors.numberParseError]"@#@ @source: @#@"Sorry, there was a problem on our end. Please try again later."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@
// @key: @#@"[callErrors.fromAndToNumberIsSame]"@#@ @source: @#@"The RingOut number and destination number can't be the same. Please update the number and try again."@#@
