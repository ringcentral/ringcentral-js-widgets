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
export const addNumbersFromCall = (
  output: string[],
  numberMap: Record<string, boolean>,
) => (call) => {
  if (call.from && call.from.phoneNumber) {
    addIfNotExist(call.from.phoneNumber, output, numberMap);
  } else if (call.from && call.from.extensionNumber) {
    addIfNotExist(call.from.extensionNumber, output, numberMap);
  }
  if (call.to && call.to.phoneNumber) {
    addIfNotExist(call.to.phoneNumber, output, numberMap);
  } else if (call.to && call.to.extensionNumber) {
    addIfNotExist(call.to.extensionNumber, output, numberMap);
  }
};
