import phoneSources from '../../enums/phoneSources';

export default {
  [phoneSources.account]: 'Cuenta',
  [phoneSources.contact]: 'Contacto',
  [phoneSources.lead]: 'Posible cliente',
  [phoneSources.opportunity]: 'Candidato a posible cliente',
  [phoneSources.systemUser]: 'Usuario del sistema',
  [phoneSources.rcContact]: '{brand}',
};

// @key: @#@"[phoneSources.account]"@#@ @source: @#@"Account"@#@
// @key: @#@"[phoneSources.contact]"@#@ @source: @#@"Contact"@#@
// @key: @#@"[phoneSources.rcContact]"@#@ @source: @#@"{brand}"@#@
// @key: @#@"[phoneSources.lead]"@#@ @source: @#@"Lead"@#@
// @key: @#@"[phoneSources.opportunity]"@#@ @source: @#@"Opportunity"@#@
// @key: @#@"[phoneSources.systemUser]"@#@ @source: @#@"System User"@#@
