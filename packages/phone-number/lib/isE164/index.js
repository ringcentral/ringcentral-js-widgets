/**
 * @description helper function to judge if the number is E164 format
 * @param {number | string} result
 * @returns {Boolean}
 */
export default function isE164(number) {
  const E164Regex = /^\+[1-9]\d{1,14}$/;
  return E164Regex.test(number.toString());
}
