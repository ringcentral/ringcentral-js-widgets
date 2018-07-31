import 'core-js/fn/array/find';
import * as R from 'ramda';
import { isValidNumber, isSameLocalNumber } from '@ringcentral-integration/phone-number';

import HashMap from './HashMap';
import callActions from '../enums/callActions';
import callDirections from '../enums/callDirections';
import callResults from '../enums/callResults';
import telephonyStatuses from '../enums/telephonyStatuses';
import terminationTypes from '../enums/terminationTypes';
// import i18n from './i18n';

/* call direction helpers */
export function isInbound(call = {}) {
  return call.direction === callDirections.inbound;
}

export function isOutbound(call = {}) {
  return call.direction === callDirections.outbound;
}

/* status helpers */
export function isRinging(call = {}) {
  return call.telephonyStatus === telephonyStatuses.ringing;
}

const callResultsToMissedMap = HashMap.fromSet({
  set: Object.keys(callResults).map(key => callResults[key]),
  getValue: result => (
    [
      callResults.missed,
      callResults.hangUp,
      callResults.busy,
      callResults.voicemail,
      callResults.rejected,
    ].indexOf(result) > -1
  ),
});
export function isMissed(call = {}) {
  return !!callResultsToMissedMap[call.result];
}

export function hasRingingCalls(calls = []) {
  return !!calls.find(isRinging);
}

export function isEnded(call = {}) {
  return call.telephonyStatus === telephonyStatuses.noCall &&
    call.terminationType === terminationTypes.final;
}

export function hasEndedCalls(calls) {
  return !!calls.find(isEnded);
}

export function isOnHold(call = {}) {
  return call.telephonyStatus === telephonyStatuses.onHold;
}

export function isIntermediateCall(call = {}) {
  return call.terminationType === terminationTypes.intermediate;
}

export function isSelfCall(call = {}) {
  if (call.to && call.from) {
    return call.to.phoneNumber === call.from.phoneNumber;
  }
  return false;
}

/* sort functions */

export function sortBySessionId(a, b) {
  if (a.sessionId === b.sessionId) return 0;
  return a.sessionId > b.sessionId ?
    1 :
    -1;
}
export function sortByStartTime(a, b) {
  if (a.startTime === b.startTime) return 0;
  return a.startTime > b.startTime ?
    -1 :
    1;
}

export function normalizeStartTime(call) {
  const result = {
    ...call,
  };
  if (call.startTime) {
    result.startTime = (new Date(call.startTime)).getTime();
  }
  return result;
}

export function normalizeFromTo(call) {
  return {
    ...call,
    from: typeof call.from === 'object' ?
      call.from :
      { phoneNumber: call.from },
    to: typeof call.to === 'object' ?
      call.to :
      { phoneNumber: call.to },
  };
}

/* ringout leg helpers */
export function areTwoLegs(inbound, outbound) {
  if (isInbound(inbound) && isOutbound(outbound)) {
    switch (Math.abs(inbound.sessionId - outbound.sessionId)) {
      case 1000:
      case 2000:
      case 3000:
      case 4000: {
        // presence
        if (
          inbound.from && inbound.to &&
          outbound.from && outbound.to &&
          isSameLocalNumber(inbound.from.phoneNumber, outbound.to.phoneNumber) &&
          isSameLocalNumber(inbound.to.phoneNumber, outbound.from.phoneNumber)
        ) {
          return true;
        }
        // call-log
        if (
          inbound.from && inbound.to &&
          outbound.from && outbound.to &&
          inbound.action === callActions.phoneCall &&
          (
            outbound.action === callActions.ringOutWeb ||
            outbound.action === callActions.ringOutPC ||
            outbound.action === callActions.ringOutMobile
          ) &&
          (
            inbound.from.phoneNumber === outbound.from.phoneNumber ||
            inbound.from.extensionNumber === outbound.from.extensionNumber
          ) &&
          inbound.to.phoneNumber === outbound.to.phoneNumber
        ) {
          return true;
        }
        break;
      }
      default:
        return false;
    }
  }
  return false;
}

export function removeInboundRingOutLegs(calls) {
  const output = [];
  const outbounds = calls.filter(isOutbound);
  calls.filter(isInbound).forEach((inbound) => {
    const outboundIndex = outbounds.findIndex(call => areTwoLegs(inbound, call));
    if (outboundIndex > -1) {
      const outbound = outbounds.splice(outboundIndex, 1)[0];

      if (inbound.action && outbound.action) {
        // from call-log
        const call = {
          ...outbound,
          outboundLeg: outbound,
          inboundLeg: inbound,
          from: {
            ...inbound.from,
          },
          to: {
            ...inbound.to,
          },
          result: inbound.result,
        };
        output.push(call);
      } else {
        const call = {
          ...outbound,
          outboundLeg: outbound,
          inboundLeg: inbound,
        };
        // Handle inboundLeg.from is '+19072028624', but outboundLeg.to is '9072028624'
        // https://jira.ringcentral.com/browse/RCINT-3127
        if (
          isValidNumber(inbound.from && inbound.from.phoneNumber) &&
          isSameLocalNumber(inbound.from.phoneNumber, outbound.to && outbound.to.phoneNumber)
        ) {
          call.to = {
            ...outbound.to,
            phoneNumber: inbound.from.phoneNumber,
          };
          outbound.to.phoneNumber = inbound.from.phoneNumber;
        }
        if (isOnHold(inbound)) {
          call.telephonyStatus = telephonyStatuses.onHold;
        }
        output.push(call);
      }

      // output.push(outbound);
    } else {
      output.push(inbound);
    }
  });
  return output.concat(outbounds);
}


export function removeDuplicateIntermediateCalls(calls) {
  const resultCalls = [];
  const indexMap = {};
  calls.forEach((call) => {
    const isIntermediate = isIntermediateCall(call);
    if (!indexMap[call.sessionId]) {
      indexMap[call.sessionid] = {
        index: resultCalls.length,
        isIntermediate,
      };
      resultCalls.push(call);
    } else if (!isIntermediate) {
      indexMap[call.sessionId].isIntermediate = false;
      resultCalls[indexMap[call.sessionId].index] = call;
    }
  });
  return resultCalls;
}

// there are two active calls with same sessionId when user call self.
export function removeDuplicateSelfCalls(calls) {
  const resultCalls = [];
  const indexMap = {};
  calls.forEach((call) => {
    const isSelf = isSelfCall(call);
    if (!indexMap[call.sessionId]) {
      indexMap[call.sessionid] = {
        index: resultCalls.length,
        isSelf,
      };
      resultCalls.push(call);
    } else if (!isSelf) {
      indexMap[call.sessionId].isSelf = false;
      resultCalls[indexMap[call.sessionId].index] = call;
    }
  });
  return resultCalls;
}
// from zendesk
export function getName({
  nameEntities = [],
  currentLocale,
  normalizeNumber,
  anonymous = false,
} = {}) {
  const selectFieldNames = {
    // anonymous: i18n.getString('anonymous', currentLocale),
    // nameUnknown: i18n.getString('nameUnknown', currentLocale),
    // nameMultiple: i18n.getString('nameMultiple', currentLocale),
    anonymous: 'anonymous',
    nameUnknown: 'nameUnknown',
    nameMultiple: 'nameMultiple',
  };
  if (anonymous) {
    return selectFieldNames.anonymous;
  }
  const unknownDisplayText = typeof normalizeNumber === 'undefined' ?
    selectFieldNames.nameUnknown :
    normalizeNumber;

  if (!nameEntities) {
    return unknownDisplayText;
  }
  const nameValidEntities = nameEntities.filter(entities => entities && entities.id);
  if (nameValidEntities.length === 0) {
    return unknownDisplayText;
  }
  const isMultiple = nameValidEntities.length > 1;
  return (
    isMultiple ? (normalizeNumber || selectFieldNames.nameMultiple) : nameValidEntities[0].name
  );
}
// Get phone number and matches.
export function getPhoneNumberMatches(call = {}) {
  const {
    to = {},
    from = {},
    sessionId,
    toMatches,
    fromMatches
  } = call;
  if (R.isEmpty(call)) {
    return {};
  }
  const isOutboundCall = isOutbound(call);
  const isInboundCall = isInbound(call);
  let phoneNumber = null;
  let matches = null;
  if (isOutboundCall) {
    phoneNumber = to.phoneNumber || to.extensionNumber;
    matches = toMatches;
  } else if (isInboundCall) {
    phoneNumber = from.phoneNumber || from.extensionNumber;
    matches = fromMatches;
  }
  // if (!phoneNumber || !matches) {
  //   console.warn(`Call sessionId: ${sessionId} is abnormal data.`);
  // }
  return {
    phoneNumber,
    matches
  };
}
// Currently for zendesk call-log contact show
export function renderContactName (call, currentLocale) {
  const { phoneNumber, matches } = getPhoneNumberMatches(call);
  return getName({
    nameEntities: matches,
    currentLocale: currentLocale,
    normalizeNumber: phoneNumber,
    anonymous: !phoneNumber
  });
}