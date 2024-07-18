import type { CountryCode } from 'libphonenumber-js';
import {
  AsYouType,
  formatNumber,
  getCountryCallingCode,
  isValidNumber,
  parseIncompletePhoneNumber,
} from 'libphonenumber-js';

import { customFormat } from './lib/customFormat/customFormat';
import detect from './lib/detect';
import format, { formatTypes, isUSOrCAOrPR } from './lib/format';
import isE164 from './lib/isE164';
import isSameLocalNumber from './lib/isSameLocalNumber';
import parse from './lib/parse';

export {
  AsYouType,
  customFormat,
  detect,
  format,
  formatNumber,
  formatTypes,
  getCountryCallingCode,
  isE164,
  // Legacy
  isSameLocalNumber,
  isUSOrCAOrPR,
  isValidNumber,
  parse,
  parseIncompletePhoneNumber,
};

export type { CountryCode };
