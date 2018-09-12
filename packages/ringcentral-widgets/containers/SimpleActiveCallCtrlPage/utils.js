/**
 * @file tools
 */

export const CALL_DIREC_IN = 'Inbound';
export const CALL_DIREC_OUT = 'Outbound';

export const pickEleByProps = (props = {}, list = []) => {
  const keys = Object.keys(props);
  const result = list.filter((item) => {
    const shouldPicked = keys.every(key => props[key] === item[key]);
    return shouldPicked;
  });
  return result;
};

export const pickFallBackName = (call = {}, contactMatchMap = {}) => {
  const { direction } = call;
  const callFrom = call.from;
  const callTo = call.to;
  let fallBackName = 'Unknown';

  function getName(target) {
    const { name, extensionNumber, phoneNumber } = target;
    const number = phoneNumber || extensionNumber;
    let matchList = [];
    if (!name) {
      matchList = contactMatchMap[number] || [];
      if (!matchList.length) {
        return 'Unknown';
      }
      if (matchList.length === 1) {
        return matchList[0].name;
      }
      return 'Multiple';
    }
    return name;
  }

  switch (direction) {
    case CALL_DIREC_IN:
      fallBackName = getName(callFrom);
      break;

    case CALL_DIREC_OUT:
      fallBackName = getName(callTo);
      break;
    default:
      break;
  }

  return fallBackName;
};
