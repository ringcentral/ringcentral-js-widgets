export function toBoolean(value: boolean | string | number): boolean {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'number') {
    return value === 1;
  }
  if (typeof value === 'string') {
    const lowerCaseValue = value.toLowerCase();
    return lowerCaseValue === 'true' || lowerCaseValue === '1';
  }
  return false;
}
