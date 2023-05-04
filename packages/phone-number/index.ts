import format, { formatTypes } from './lib/format';
import detect from './lib/detect';
import parse from './lib/parse';
import isE164 from './lib/isE164';
import isSameLocalNumber from './lib/isSameLocalNumber';

export * from 'libphonenumber-js';

export {
  format,
  detect,
  parse,
  isE164,
  formatTypes,
  // Legacy
  isSameLocalNumber,
};
