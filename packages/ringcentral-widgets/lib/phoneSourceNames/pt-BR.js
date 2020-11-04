import { phoneSources } from 'ringcentral-integration/enums/phoneSources';
export default {
  [phoneSources.account]: "Conta",
  [phoneSources.contact]: "Contato",
  [phoneSources.rcContact]: "{brand}",
  [phoneSources.lead]: "Cliente potencial",
  [phoneSources.opportunity]: "Oportunidade",
  [phoneSources.systemUser]: "Usuário do sistema"
};

// @key: @#@"[phoneSources.account]"@#@ @source: @#@"Account"@#@
// @key: @#@"[phoneSources.contact]"@#@ @source: @#@"Contact"@#@
// @key: @#@"[phoneSources.rcContact]"@#@ @source: @#@"{brand}"@#@
// @key: @#@"[phoneSources.lead]"@#@ @source: @#@"Lead"@#@
// @key: @#@"[phoneSources.opportunity]"@#@ @source: @#@"Opportunity"@#@
// @key: @#@"[phoneSources.systemUser]"@#@ @source: @#@"System User"@#@
