import Session from './session';

const defaultInboundOption = {
  id: '111',
  direction: 'Inbound'
};

const defaultOutboundOption = {
  _header_callId: true,
  fromNumber: '+15878133670',
  homeCountryId: '1',
  toNumber: '101',
};

export async function getInboundCall(phone, options = defaultInboundOption) {
  const session = new Session(options);
  await phone.webphone._webphone.userAgent.trigger('invite', session);
  return session;
}

export async function makeCall(phone, options = defaultOutboundOption) {
  const session = await phone.webphone.makeCall(options);
  if (options._header_callId) {
    session._header_callId = `call-${session.id}`;
  }
  return session;
}
