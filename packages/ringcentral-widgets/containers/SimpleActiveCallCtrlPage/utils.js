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

export const pickFallBackInfo = (call = {}, contactName, currentLocale) => {
  const { direction } = call;
  let fallBackName = contactName;
  let fallBackNumber = '';

  function getName(target) {
    const { activityMatches } = target;
    const SINGLE_OR_NONE_MATCH = 2;
    if (!contactName) {
      if (activityMatches.length < SINGLE_OR_NONE_MATCH) {
        return i18n.getString('Unknown', currentLocale);
      }
      return i18n.getString('Multiple', currentLocale);
    }
    return contactName;
  }

  function getNumber(numberObj) {
    const { extensionNumber, phoneNumber } = numberObj;
    return (phoneNumber || extensionNumber || numberObj);
  }

  switch (direction) {
    case callDirection.inbound: {
      fallBackName = getName(call);
      fallBackNumber = getNumber(call.from);
      break;
    }
    case callDirection.outbound: {
      fallBackName = getName(call);
      fallBackNumber = getNumber(call.to);
      break;
    }

    default:
      break;
  }
  return {
    fallBackName,
    fallBackNumber
  };
};
