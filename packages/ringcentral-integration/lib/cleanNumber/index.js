const cleanRegex = /[^\d*+#]/g;
const plusRegex = /\+/g;
const extensionDelimiter = /[*#]/g;
/**
 * @function
 * @param {String} phoneNumber
 * @description Remove any characters except numeric, #, *, and leading +. We only consider
 * first occurence of * or #. Things after subsequent * or # will be removed.
 */

export default function cleanNumber(phoneNumber, keepPlus = true) {
  const cleaned = phoneNumber.replace(cleanRegex, '');
  const hasPlus = cleaned[0] === '+';
  const output = cleaned.replace(plusRegex, '')
    .split(extensionDelimiter)
    .slice(0, 2)
    .join('*');
  return hasPlus && keepPlus ?
    `+${output}` :
    output;
}
