import { reduce } from 'ramda';

const pauseRegex = /,/g;
const controlRegex = /[^0-9*#]/g;

/**
 * @typedef {Object} ExtractedResult
 * @property {String} input - Original input
 * @property {String} phoneNumber - Original input with extended controls removed
 * @property {String[]} extendedControls - Array containing the extended controls
 */

/**
 * @param {String} input
 * @returns {ExtractedResult}
 * @description Extract extended controls from quick dial phone number string.
 *              Currently only support pause (',') characater.
 */
export default function extractExtendedControls(input) {
  const [phoneNumber, ...tokens] = (input || '').split(pauseRegex);
  return {
    input,
    phoneNumber,
    extendedControls: reduce(
      (output, token) => {
        output.push(',');
        const cleanControl = token.replace(controlRegex, '');
        if (cleanControl.length) {
          output.push(cleanControl);
        }
        return output;
      },
      [],
      tokens,
    ),
  };
}
