const regNonDigits = /[^\d]/g;

export function extractDigits(str: string) {
  return str.replace(regNonDigits, '');
}
