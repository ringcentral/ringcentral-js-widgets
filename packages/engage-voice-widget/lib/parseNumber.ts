import callErrors from '@ringcentral-integration/commons/modules/Call/callErrors';
import { parse } from '@ringcentral-integration/phone-number';

import { messageTypes } from '../enums';
import { EvTypeError } from './EvTypeError';

export const parseNumber = (input: string) => {
  const { parsedNumber, isValid, hasInvalidChars } = parse({
    input,
  });

  if (input === '911' || input === '933' || input === '112') {
    throw new EvTypeError({
      type: callErrors.emergencyNumber,
    });
  }

  if (!isValid || hasInvalidChars || !parsedNumber) {
    throw new EvTypeError({
      type: messageTypes.INVALID_NUMBER,
    });
  }

  return parsedNumber;
};
