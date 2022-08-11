import { find, reduce } from 'ramda';
import type GetPresenceInfo from '@rc-ex/core/lib/definitions/GetPresenceInfo';

import { isIntermediateCall } from '../../lib/callLogHelpers';

export const removeIntermediateCall = reduce(
  (result, activeCall: GetPresenceInfo['activeCalls']): any => {
    if (
      // @ts-expect-error
      !isIntermediateCall(activeCall) &&
      !find(
        (item) =>
          // @ts-expect-error
          item.sessionId === activeCall.sessionId &&
          // @ts-expect-error
          item.direction === activeCall.direction,
        // @ts-expect-error
        result,
      )
    ) {
      // @ts-expect-error
      result.push(activeCall);
    }
    return result;
  },
);
