import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';

import type { HistoryCall } from './CallHistory.interface';

export const addIfNotExist = (
  number: string,
  output: string[],
  numberMap: Record<string, boolean>,
) => {
  if (!numberMap[number]) {
    output.push(number);
    numberMap[number] = true;
  }
};

// NOTE:
// business logic for commons for now
// return phone number only.
const pickPhoneNumber = (
  phoneNumber: string,
  _extensionNumber: string | undefined,
) => phoneNumber;

export const addNumbersFromCall =
  (output: string[], numberMap: Record<string, boolean>) => (call: Call) => {
    const pickNumber = pickPhoneNumber;
    if (call.from && call.from.phoneNumber) {
      const number = pickNumber(
        call.from.phoneNumber,
        call.from.extensionNumber,
      );
      addIfNotExist(number!, output, numberMap);
    } else if (call.from && call.from.extensionNumber) {
      addIfNotExist(call.from.extensionNumber, output, numberMap);
    }
    if (call.to && call.to.phoneNumber) {
      const number = pickNumber(call.to.phoneNumber, call.to.extensionNumber);
      addIfNotExist(number!, output, numberMap);
    } else if (call.to && call.to.extensionNumber) {
      addIfNotExist(call.to.extensionNumber, output, numberMap);
    }
  };

export const isQueueHistoryCall = (history: HistoryCall) => {
  return (history.toMatches || []).some((match) => !!match.isCallQueueNumber);
};
