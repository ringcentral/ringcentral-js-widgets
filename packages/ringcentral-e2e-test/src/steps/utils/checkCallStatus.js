export default async function checkCallStatus(context, { callStatus, timeout = 3000 * 10, ttl = 200 }) {
  await $(context.app).waitFor(ttl);
  timeout = timeout - ttl;
  if (timeout < 0) throw new Error(`Check call status ${callStatus} 30s timeout.`);
  const _callStatus = await $(context.app).getText('@callStatus');
  const isStatus = _callStatus === callStatus;
  if (isStatus) return;
  await checkCallStatus(context, { callStatus, timeout, ttl });
}
