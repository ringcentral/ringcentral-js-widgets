// From ZenDesk, only support US currently
export function formatPhone(rawPhone) {
  if (typeof rawPhone === 'undefined') return undefined;

  const value = (rawPhone.toString()).valueOf().replace(/[^\d]/g, '');
  const defvalue =
    ((rawPhone.toString()).substring(0, 1) ? '+' : '') +
     (rawPhone.toString()).replace(/[^\d\(\)\s\-]/g, '').replace(/\s{2,}/g, ' ');
  switch (value.length) {
    case 10:
      return value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    case 11:
      return (value.substring(0, 1) === '1') ?
        value.replace(/(\d)(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4') :
        defvalue;
    default:
      return defvalue;
  }
}
