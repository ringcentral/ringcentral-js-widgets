import countries from 'i18n-iso-countries';

import {
  isE164,
  parse,
  parseIncompletePhoneNumber,
} from '@ringcentral-integration/phone-number';

import { messageTypes } from '../enums';
import { EvTypeError } from './EvTypeError';

export const checkCountryCode = (input: string) => {
  const cleanedNumber: string = parseIncompletePhoneNumber(input.toString());
  const isE164Number = isE164(cleanedNumber);
  if (isE164Number) {
    const { parsedNumber, isValid, hasInvalidChars, parsedCountry } = parse({
      input,
    });
    if (isValid && !hasInvalidChars && parsedNumber) {
      const dialoutCountryCode = countries.alpha2ToAlpha3(parsedCountry);
      if (dialoutCountryCode !== 'USA') {
        throw new EvTypeError({
          type: messageTypes.NO_SUPPORT_COUNTRY,
        });
      }
    }
  }
};
