const cleanRegex = /[^\d*+,#]/g;

/**
 * @function
 * @param {String} input
 * @returns {String}
 */
export default function cleanNumber(input) {
  return (input || '').replace(cleanRegex, '');
}
