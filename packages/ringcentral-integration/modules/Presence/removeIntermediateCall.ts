import type GetPresenceInfo from '@rc-ex/core/lib/definitions/GetPresenceInfo';
import { find, reduce } from 'ramda';

import { isIntermediateCall } from '../../lib/callLogHelpers';

export const removeIntermediateCall = reduce(
  (result, activeCall: GetPresenceInfo['activeCalls']): any => {
    if (
      // @ts-expect-error TS(2345): Argument of type 'ActiveCallInfo[] | undefined' is... Remove this comment to see the full error message
      !isIntermediateCall(activeCall) &&
      !find(
        (item) =>
          // @ts-expect-error TS(2571): Object is of type 'unknown'.
          item.sessionId === activeCall.sessionId &&
          // @ts-expect-error TS(2571): Object is of type 'unknown'.
          item.direction === activeCall.direction,
        // @ts-expect-error TS(2345): Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
        result,
      )
    ) {
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      result.push(activeCall);
    }
    return result;
  },
);
