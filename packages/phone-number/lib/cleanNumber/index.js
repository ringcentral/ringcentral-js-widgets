const cleanRegex = /[^\d*+,#]/g;

export default function cleanNumber(input = '') {
  return input.replace(cleanRegex, '');
}
