import moment from 'moment';
import { find, isEmpty, reduce } from 'ramda';

import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import {
  isSameLocalNumber,
  isValidNumber,
} from '@ringcentral-integration/phone-number';

import callActions from '../enums/callActions';
import callDirections from '../enums/callDirections';
import callResults, { CallResultsKey } from '../enums/callResults';
import telephonyStatuses from '../enums/telephonyStatus';
import terminationTypes from '../enums/terminationTypes';
import { Call } from '../interfaces/Call.interface';
import { ActiveCall } from '../interfaces/Presence.model';

// import i18n from './i18n';

/* call direction helpers */
export function isInbound(call: { direction?: string } = {}) {
  return call.direction === callDirections.inbound;
}

export function isOutbound(call: { direction?: string } = {}) {
  return call.direction === callDirections.outbound;
}

/* status helpers */
export function isRinging(call: Call = {}) {
  return call.telephonyStatus === telephonyStatuses.ringing;
}
export function isRingingInboundCall(call: Call) {
  return isRinging(call) && isInbound(call);
}

const callResultsToMissedMap = ObjectMap.fromObject(
  reduce<string, Record<string, boolean>>(
    (result, key) => {
      const value = callResults[key as CallResultsKey];
      result[value] = !!find(
        (item) => item === value,
        [
          callResults.missed,
          callResults.hangUp,
          // callResults.HangUp,
          callResults.busy,
          callResults.voicemail,
          callResults.rejected,
        ],
      );
      return result;
    },
    {},
    Object.keys(callResults),
  ),
);

export function isMissed(call: ActiveCall = {}) {
  return !!callResultsToMissedMap[call.result];
}

export function hasRingingCalls(calls: Call[] = []) {
  return !!calls.find(isRinging);
}

export function isEnded(call: ActiveCall = {}) {
  return (
    call.telephonyStatus === telephonyStatuses.noCall &&
    call.terminationType === terminationTypes.final
  );
}

export function hasEndedCalls(calls: ActiveCall[]) {
  return !!calls.find(isEnded);
}

export function isOnHold(call: ActiveCall = {}) {
  return call.telephonyStatus === telephonyStatuses.onHold;
}

export function isIntermediateCall(call: ActiveCall = {}) {
  return call.terminationType === terminationTypes.intermediate;
}

export function isSelfCall(call: ActiveCall = {}) {
  if (call.to && call.from) {
    return call.to.phoneNumber === call.from.phoneNumber;
  }
  return false;
}

/* sort functions */

export function sortBySessionId(
  a: { sessionId: string },
  b: { sessionId: string },
) {
  if (a.sessionId === b.sessionId) return 0;
  return a.sessionId > b.sessionId ? 1 : -1;
}

// TODO: fix `ActiveCall` startTime optional type
export function sortByStartTime(
  a: { startTime?: number | string },
  b: { startTime?: number | string },
) {
  if (a.startTime === b.startTime) return 0;
  return a.startTime > b.startTime ? -1 : 1;
}

export function normalizeStartTime<T extends { startTime?: number | string }>(
  item: T,
) {
  const result: T = {
    ...item,
  };
  if (item.startTime) {
    // Fix: Safari doesn't support timezone offset
    // `startTime` might switch between `2019-10-18T08:18:47.972+0000`
    // and `2019-10-18T08:18:47.972Z`
    result.startTime = moment(item.startTime).valueOf();
  }
  return result;
}

export function normalizeFromTo(call: ActiveCall) {
  return {
    ...call,
    from:
      typeof call.from === 'object' ? call.from : { phoneNumber: call.from },
    to: typeof call.to === 'object' ? call.to : { phoneNumber: call.to },
  };
}

/* ringout leg helpers */
export function areTwoLegs(inbound: ActiveCall, outbound: ActiveCall) {
  if (isInbound(inbound) && isOutbound(outbound)) {
    switch (
      Math.abs(
        parseInt(inbound.sessionId, 10) - parseInt(outbound.sessionId, 10),
      )
    ) {
      case 1000:
      case 2000:
      case 3000:
      case 4000: {
        // presence
        if (
          inbound.from &&
          inbound.to &&
          outbound.from &&
          outbound.to &&
          isSameLocalNumber(
            inbound.from.phoneNumber,
            outbound.to.phoneNumber,
          ) &&
          isSameLocalNumber(inbound.to.phoneNumber, outbound.from.phoneNumber)
        ) {
          return true;
        }
        // call-log
        if (
          inbound.from &&
          inbound.to &&
          outbound.from &&
          outbound.to &&
          inbound.action === callActions.phoneCall &&
          (outbound.action === callActions.ringOutWeb ||
            outbound.action === callActions.ringOutPC ||
            outbound.action === callActions.ringOutMobile) &&
          (inbound.from.phoneNumber === outbound.from.phoneNumber ||
            inbound.from.extensionNumber === outbound.from.extensionNumber) &&
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

export function removeInboundRingOutLegs(calls: ActiveCall[]) {
  const output: ActiveCall[] = [];
  const outbounds = calls.filter(isOutbound);
  calls.filter(isInbound).forEach((inbound) => {
    const outboundIndex = outbounds.findIndex((call) =>
      areTwoLegs(inbound, call),
    );
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
          isSameLocalNumber(
            inbound.from.phoneNumber,
            outbound.to && outbound.to.phoneNumber,
          )
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

export function removeDuplicateIntermediateCalls(calls: ActiveCall[]) {
  const resultCalls: ActiveCall[] = [];
  const indexMap: Record<
    string,
    {
      isIntermediate: boolean;
      index: number;
    }
  > = {};
  calls.forEach((call) => {
    const isIntermediate = isIntermediateCall(call);
    if (!indexMap[call.sessionId]) {
      indexMap[call.sessionId] = {
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
export function removeDuplicateSelfCalls(calls: ActiveCall[]) {
  const resultCalls: ActiveCall[] = [];
  const indexMap: Record<
    string,
    {
      index: number;
      isSelf: boolean;
    }
  > = {};
  calls.forEach((call) => {
    const isSelf = isSelfCall(call);
    if (!indexMap[call.sessionId]) {
      indexMap[call.sessionId] = {
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

export function getPhoneNumber(call: Call = {}) {
  if (isEmpty(call)) {
    return null;
  }
  const { to = {}, from = {} } = call;
  if (isOutbound(call)) {
    return to.phoneNumber || to.extensionNumber;
  }
  return from.phoneNumber || from.extensionNumber;
}

// Get phone number and matches.
export function getPhoneNumberMatches(call: Call = {}) {
  const {
    to = {},
    from = {},
    // sessionId,
    toMatches,
    fromMatches,
  } = call;
  if (isEmpty(call)) {
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
    matches,
  };
}
