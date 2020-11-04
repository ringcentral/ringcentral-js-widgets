import { phoneSources } from 'ringcentral-integration/enums/phoneSources';
export default {
  [phoneSources.account]: "계정",
  [phoneSources.contact]: "연락처",
  [phoneSources.rcContact]: "{brand}",
  [phoneSources.lead]: "잠재 고객",
  [phoneSources.opportunity]: "기회",
  [phoneSources.systemUser]: "시스템 사용자"
};

// @key: @#@"[phoneSources.account]"@#@ @source: @#@"Account"@#@
// @key: @#@"[phoneSources.contact]"@#@ @source: @#@"Contact"@#@
// @key: @#@"[phoneSources.rcContact]"@#@ @source: @#@"{brand}"@#@
// @key: @#@"[phoneSources.lead]"@#@ @source: @#@"Lead"@#@
// @key: @#@"[phoneSources.opportunity]"@#@ @source: @#@"Opportunity"@#@
// @key: @#@"[phoneSources.systemUser]"@#@ @source: @#@"System User"@#@
