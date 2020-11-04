import { phoneSources } from 'ringcentral-integration/enums/phoneSources';
export default {
  [phoneSources.account]: "Compte",
  [phoneSources.contact]: "Contact",
  [phoneSources.rcContact]: "{brand}",
  [phoneSources.lead]: "Piste",
  [phoneSources.opportunity]: "Occasion",
  [phoneSources.systemUser]: "Utilisateur système"
};

// @key: @#@"[phoneSources.account]"@#@ @source: @#@"Account"@#@
// @key: @#@"[phoneSources.contact]"@#@ @source: @#@"Contact"@#@
// @key: @#@"[phoneSources.rcContact]"@#@ @source: @#@"{brand}"@#@
// @key: @#@"[phoneSources.lead]"@#@ @source: @#@"Lead"@#@
// @key: @#@"[phoneSources.opportunity]"@#@ @source: @#@"Opportunity"@#@
// @key: @#@"[phoneSources.systemUser]"@#@ @source: @#@"System User"@#@
