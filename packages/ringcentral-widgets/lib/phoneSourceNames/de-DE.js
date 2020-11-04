import { phoneSources } from 'ringcentral-integration/enums/phoneSources';
export default {
  [phoneSources.account]: "Konto",
  [phoneSources.contact]: "Kontakt",
  [phoneSources.rcContact]: "{brand}",
  [phoneSources.lead]: "Lead",
  [phoneSources.opportunity]: "Möglichkeit",
  [phoneSources.systemUser]: "Systembenutzer"
};

// @key: @#@"[phoneSources.account]"@#@ @source: @#@"Account"@#@
// @key: @#@"[phoneSources.contact]"@#@ @source: @#@"Contact"@#@
// @key: @#@"[phoneSources.rcContact]"@#@ @source: @#@"{brand}"@#@
// @key: @#@"[phoneSources.lead]"@#@ @source: @#@"Lead"@#@
// @key: @#@"[phoneSources.opportunity]"@#@ @source: @#@"Opportunity"@#@
// @key: @#@"[phoneSources.systemUser]"@#@ @source: @#@"System User"@#@
