import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatuses';

export default function mockActiveCalls(sessions, mockOtherDeivce) {
  const commons = {
    sipData: {
      toTag: 'pgrneavq66',
      fromTag: '10.74.2.218-5070-2a0553bd67c3401',
      remoteUri: 'sip:104@ringcentral.com',
      localUri: 'sip:105@ringcentral.com'
    },
    startTime: '2018-08-07T09:20:09.405Z',
  };
  const initalCalls = mockOtherDeivce ? [{
    id: 'call-4444',
    sessionId: '4444',
    fromName: 'FirstName 104 LastName',
    from: '104',
    toName: 'FirstName 105 LastName',
    to: '105',
    direction: 'Inbound',
    telephonyStatus: 'CallConnected',
    sipData: {
      toTag: '5s02sj8rhl',
      fromTag: '10.74.2.218-5070-576d0c13caa3431',
      remoteUri: 'sip:104@ringcentral.com',
      localUri: 'sip:105@ringcentral.com'
    },
    startTime: '2018-08-07T09:20:31.124Z'
  }] : [];
  return sessions.reduce((calls, session) => {
    if (session.direction === 'Inbound') {
      return calls.concat({
        id: session._header_callId,
        sessionId: session.id,
        direction: session.direction,
        telephonyStatus: session.telephonyStatus || telephonyStatuses.onHold,
        fromName: 'FirstName 104 LastName',
        from: '104',
        toName: 'FirstName 105 LastName',
        to: '105',
        ...commons
      });
    }
    if (session.direction === 'Outbound') {
      return calls.concat({
        id: `call-${session.id}`,
        sessionId: session.id,
        direction: session.direction,
        telephonyStatus: session.telephonyStatus || telephonyStatuses.onHold,
        fromName: 'FirstName 105 LastName',
        from: session.fromNumber,
        toName: 'Something1 New1',
        to: session.to,
        ...commons
      });
    }
    return calls;
  }, initalCalls);
}
