import { phoneSources } from '@ringcentral-integration/commons/enums/phoneSources';
export default {
  [phoneSources.account]: "Tili",
  [phoneSources.contact]: "Yhteystieto",
  [phoneSources.rcContact]: "{brand}",
  [phoneSources.lead]: "Liidi",
  [phoneSources.opportunity]: "Mahdollisuus",
  [phoneSources.systemUser]: "Järjestelmän käyttäjä"
};

// @key: @#@"[phoneSources.account]"@#@ @source: @#@"Account"@#@
// @key: @#@"[phoneSources.contact]"@#@ @source: @#@"Contact"@#@
// @key: @#@"[phoneSources.rcContact]"@#@ @source: @#@"{brand}"@#@
// @key: @#@"[phoneSources.lead]"@#@ @source: @#@"Lead"@#@
// @key: @#@"[phoneSources.opportunity]"@#@ @source: @#@"Opportunity"@#@
// @key: @#@"[phoneSources.systemUser]"@#@ @source: @#@"System User"@#@
