import { isValidNumber } from 'libphonenumber-js';
import format, { formatTypes } from './lib/format';
import detect from './lib/detect';
import parse from './lib/parse';
import isSameLocalNumber from './lib/isSameLocalNumber';

export {
  format,
  detect,
  parse,
  formatTypes,
  isValidNumber,
  isSameLocalNumber,
};
