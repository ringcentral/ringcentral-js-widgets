import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import { useMemo, useRef } from 'react';
import { useConnector } from 'reactant-share';

import type { CallAction } from '../../CallAction';

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

// function usePreinsertCallInfo(callAction: CallAction) {
//   const curr = useConnector(() => callAction.preInsertCallInfoList[0]);
//   const prev = usePrevious(() => curr);

//   if (curr) return curr;

//   /**
//    * because the preinsert data flow will like below
//    *
//    * make call -> preinsert call -> call connected -> set the call be active call, so there will have a tick time that the preinsert call and active call both not exist at the same time, cause a blank page render, so need to use the latest active call to avoid that
//    */
//   const webphoneSession = prev?.call.webphoneSession;
//   if (
//     webphoneSession &&
//     webphoneSession.callStatus !== sessionStatus.finished
//   ) {
//     return prev;
//   }
// }

export function useActiveCallInfoWithPreinsert(callAction: CallAction) {
  const activeCallInfo = useConnector(() => callAction.activeCallInfo);
  const latestActiveCall = useLatestExistCall(activeCallInfo);
  // const latestPreInsertCallInfo = usePreinsertCallInfo(callAction);

  return useMemo(() => {
    // when have preinsert call that be new call still connecting, always render the preinsert call, when that be connected will be remove from preinsert list
    // TODO: outbound call still not completed
    // if (
    //   // TODO: in test env we not full implement the webphone mock, should try a way to fix that in the future
    //   process.env.NODE_ENV !== 'test' &&
    //   latestPreInsertCallInfo
    // ) {
    //   return latestPreInsertCallInfo;
    // }

    if (activeCallInfo) {
      return !activeCallInfo.call
        ? // when active call be ended, the call will be not exist directly, but the end event still not emit to other service, like callHistory, so need to use latest call to avoid that render a blank page cause the page jump to dialer then to history, keep the call instance to avoid that
          { ...activeCallInfo, call: latestActiveCall }
        : activeCallInfo;
    }
  }, [activeCallInfo, latestActiveCall]);
}
