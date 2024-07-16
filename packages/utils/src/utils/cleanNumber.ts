// copy from ringcentral-js-widgets/ringcentral-integration/lib/cleanNumber/index.ts
// for GA usage
const cleanRegex = /[^\d*+#]/g;
const plusRegex = /\+/g;
const extensionDelimiter = /[*#]/g;
/**
 * Remove any characters except numeric, #, *, and leading +. We only consider
 * first occurrence of * or #. Things after subsequent * or # will be removed.
 */

export function cleanNumber(phoneNumber: string, keepPlus = true) {
  const cleaned = phoneNumber.replace(cleanRegex, '');
  const hasPlus = cleaned[0] === '+';
  const output = cleaned
    .replace(plusRegex, '')
    .split(extensionDelimiter)
    .slice(0, 2)
    .join('*');
  return hasPlus && keepPlus ? `+${output}` : output;
}
