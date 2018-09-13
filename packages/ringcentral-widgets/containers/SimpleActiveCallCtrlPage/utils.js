/**
 * @file tools
 */
import callDirection from 'ringcentral-integration/enums/callDirections';
import i18n from './i18n';

export const pickEleByProps = (props = {}, list = []) => {
  const keys = Object.keys(props);
  const result = list.filter((item) => {
    const shouldPicked = keys.every(key => props[key] === item[key]);
    return shouldPicked;
  });
  return result;
};

export const pickFallBackName = (call = {}, contactMatchMap = {}, currentLocale) => {
  const { direction } = call;
  const callFrom = call.from;
  const callTo = call.to;
  let fallBackName = i18n.getString('Unknown', currentLocale);

  function getName(target) {
    const { name, extensionNumber, phoneNumber } = target;
    const number = phoneNumber || extensionNumber;
    let matchList = [];
    if (!name) {
      matchList = contactMatchMap[number] || [];
      if (!matchList.length) {
        return i18n.getString('Unknown', currentLocale);
      }
      if (matchList.length === 1) {
        return matchList[0].name;
      }
      return i18n.getString('Multiple', currentLocale);
    }
    return name;
  }

  switch (direction) {
    case callDirection.inbound:
      fallBackName = getName(callFrom);
      break;
    case callDirection.outbound:
      fallBackName = getName(callTo);
      break;
    default:
      break;
  }

  return fallBackName;
};
