import { extractDigits } from '../extractDigits';

import { CustomFormatOptions } from './customFormat.interface';

/**
 * @param localPhoneNumber phone number in local number format
 * @param template template to format the phone number
 * @param templateChar character to replace with phone number digits
 * @param strict if true, will throw an error if the number of digits in the phone number doesn't match the number of template characters
 * @returns formatted phone number
 *
 * @example
 * ```ts
 * customFormat({ localPhoneNumber: '6505551234', template: 'XXX-XXX-XXXX' }); // '650-555-1234'
 *
 * customFormat({ localPhoneNumber: '6505551234', template: '(YYY) YYY-YYYY', templateChar: 'Y' }); // '(650) 555-1234'
 *
 * customFormat({ localPhoneNumber: '6505551234', template: 'XXX-XXX-XXX', strict: true }); // Error: Invalid custom format: 6505551234 => XXX-XXX-XXX, number of digits don't match: 10 !== 9
 *
 * customFormat({ localPhoneNumber: '6505551234', template: 'XXX-XXX-XXX'}); // '650-555-123' // ignore extra digits in non strict mode
 *
 * customFormat({ localPhoneNumber: '6505551234', template: 'XXX-XXX-XXXXX'); // '650-555-1234' // extra X will be ignored in non strict mode
 * ```
 */
export function customFormat({
  localPhoneNumber,
  template,
  templateChar = 'X',
  strict = false,
}: CustomFormatOptions) {
  const localDigits = extractDigits(localPhoneNumber).split('');
  const numOfDigits = localDigits.length;
  let templateCharCount = 0;

  const result = template
    .split('')
    .reduce<string[]>((acc, char) => {
      if (char === templateChar) {
        templateCharCount += 1;
        if (localDigits.length > 0) {
          acc.push(localDigits.shift()!);
        }
      } else {
        acc.push(char);
      }
      return acc;
    }, [])
    .join('');

  if (strict && templateCharCount !== numOfDigits) {
    throw new Error(
      `Invalid custom format: ${localPhoneNumber} => ${template}, number of digits don't match: ${numOfDigits} !== ${templateCharCount}`,
    );
  }
  return result;
}
