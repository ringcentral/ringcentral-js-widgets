import type { CountryCode } from 'libphonenumber-js';
import {
  parseIncompletePhoneNumber,
  isValidNumber,
  getCountryCallingCode,
  formatNumber,
  AsYouType,
} from 'libphonenumber-js';

import format, { formatTypes, isUSOrCAOrPR } from './lib/format';
import detect from './lib/detect';
import parse from './lib/parse';
import isE164 from './lib/isE164';
import isSameLocalNumber from './lib/isSameLocalNumber';

export {
  format,
  isUSOrCAOrPR,
  detect,
  parse,
  isE164,
  formatTypes,
  AsYouType,
  // Legacy
  isSameLocalNumber,
  parseIncompletePhoneNumber,
  isValidNumber,
  getCountryCallingCode,
  formatNumber,
};

export type { CountryCode };
