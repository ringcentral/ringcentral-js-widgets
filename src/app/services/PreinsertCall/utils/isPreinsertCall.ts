import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';

export const PRE_INSERT_ID_PREFIX = 'pre_insert_id';

export function getPreinsertFakeId(id: string) {
  return `${PRE_INSERT_ID_PREFIX}_${id}`;
}

export function isPreinsertCallByTelephoneSessionId(
  telephoneSessionId: string | undefined,
) {
  return telephoneSessionId?.startsWith(PRE_INSERT_ID_PREFIX);
}

export function isPreinsertCall(call: Call) {
  return isPreinsertCallByTelephoneSessionId(
    // preinsert also use telephoneSessionId as sessionId so that is fine
    call.sessionId,
  );
}
