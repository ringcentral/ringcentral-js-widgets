import type ActiveCallInfoWithoutSIP from '@rc-ex/core/lib/definitions/ActiveCallInfoWithoutSIP';
import { isIntermediateCall } from '@ringcentral-integration/commons/lib/callLogHelpers';
import { find, reduce } from 'ramda';

export const removeIntermediateCall = reduce(
  (
    result: ActiveCallInfoWithoutSIP[],
    activeCall: ActiveCallInfoWithoutSIP,
  ) => {
    if (
      !isIntermediateCall(activeCall) &&
      !find(
        (item) =>
          item.sessionId === activeCall.sessionId &&
          item.direction === activeCall.direction,
        result,
      )
    ) {
      result.push(activeCall);
    }
    return result;
  },
);
