import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import { useRef } from 'react';

/**
 * when info is exist, means the call be connected or connecting, so need to keep the call instance to avoid the blank page render
 */
export function useLatestExistCall(info?: { call?: Call } | null) {
  const latestActiveCallRef = useRef<Call>();

  if (info) {
    if (info.call) {
      latestActiveCallRef.current = info.call;
    }
  } else {
    // when info not exist, means the call be ended and be closed
    latestActiveCallRef.current = undefined;
  }

  return latestActiveCallRef.current;
}
