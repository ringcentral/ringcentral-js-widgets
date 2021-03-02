/**
 * Identity function for calls.
 */
export function callIdentityFunction<T extends { sessionId: string }>(call: T) {
  return call.sessionId;
}
