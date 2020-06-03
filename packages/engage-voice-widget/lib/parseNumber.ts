import { parse } from '@ringcentral-integration/phone-number';

import { messageTypes } from '../enums';
import { EvTypeError } from './EvTypeError';

export const parseNumber = (input: string) => {
  const { parsedNumber, isValid, hasInvalidChars } = parse({
    input,
  });
  if (!isValid || hasInvalidChars || !parsedNumber) {
    throw new EvTypeError({
      type: messageTypes.INVALID_NUMBER,
    });
  }
  return parsedNumber;
};
