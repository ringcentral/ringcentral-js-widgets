import callDirection from '@ringcentral-integration/commons/enums/callDirections';

import i18n from './i18n';

export const pickEleByProps = (props = {}, list = []) => {
  const keys = Object.keys(props);
  const result = list.filter((item) => {
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const shouldPicked = keys.every((key) => props[key] === item[key]);
    return shouldPicked;
  });
  return result;
};

export const pickFallBackInfo = (
  call: any,
  contactName: any,
  currentLocale: any,
) => {
  const direction = call?.direction;
  let fallBackName = contactName;
  let fallBackNumber = '';

  function getName(target: any) {
    const { activityMatches } = target;
    const SINGLE_OR_NONE_MATCH = 2;
    if (!contactName) {
      if (activityMatches && activityMatches.length < SINGLE_OR_NONE_MATCH) {
        return i18n.getString('Unknown', currentLocale);
      }
      return i18n.getString('Multiple', currentLocale);
    }
    return contactName;
  }

  function getNumber(numberObj: any) {
    const { extensionNumber, phoneNumber } = numberObj;
    return phoneNumber || extensionNumber || numberObj;
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
    fallBackNumber,
  };
};
