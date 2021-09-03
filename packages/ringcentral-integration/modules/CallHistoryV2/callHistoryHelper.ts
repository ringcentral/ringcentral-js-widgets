import { Call } from '../../interfaces/Call.interface';

const RC_EXTENSION_DELIMITER = '*';

export type PhoneNumberPicker = (
  phoneNumber: string,
  extNumber?: string,
) => string;

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
const pickPhoneNumber: PhoneNumberPicker = (phoneNumber: string) => phoneNumber;

export const pickPhoneOrExtensionNumber: PhoneNumberPicker = (
  phoneNumber: string,
  extension: string,
) => phoneNumber || extension;

const formatExt = (num: string) => `${RC_EXTENSION_DELIMITER}${num}`;

export const pickFullPhoneNumber: PhoneNumberPicker = (
  phoneNumber: string,
  extensionNumber: string,
) => {
  let number = phoneNumber;
  if (phoneNumber && extensionNumber) {
    number = `${phoneNumber}${formatExt(extensionNumber)}`;
  } else if (extensionNumber) {
    number = extensionNumber;
  }
  return number;
};

export const addNumbersFromCall = (
  output: string[],
  numberMap: Record<string, boolean>,
  pickingFullNumber = false,
) => (call: Call) => {
  const pickNumber = pickingFullNumber ? pickFullPhoneNumber : pickPhoneNumber;
  if (call.from && call.from.phoneNumber) {
    const number = pickNumber(call.from.phoneNumber, call.from.extensionNumber);
    addIfNotExist(number, output, numberMap);
  } else if (call.from && call.from.extensionNumber) {
    addIfNotExist(call.from.extensionNumber, output, numberMap);
  }
  if (call.to && call.to.phoneNumber) {
    const number = pickNumber(call.to.phoneNumber, call.to.extensionNumber);
    addIfNotExist(number, output, numberMap);
  } else if (call.to && call.to.extensionNumber) {
    addIfNotExist(call.to.extensionNumber, output, numberMap);
  }
};
