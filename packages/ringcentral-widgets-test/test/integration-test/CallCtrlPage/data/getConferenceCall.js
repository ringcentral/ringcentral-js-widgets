const partyMemberIdPrefix = 'cs1726225542272106109';

const randomSessionId = () => (10 ** 70 * Math.random()).toString(36);
const randomPeerPartyId = index => `cs172622555${Math.round(10 ** 9 * Math.random())}-${index}`;

export default (conferencePartiesCount = 3) => {
  const parties = [];
  for (let index = 1; index <= conferencePartiesCount; index += 1) {
    const partyId = `${partyMemberIdPrefix}-${index}`;
    if (index === 1) {
      parties.push({
        conferenceRole: 'Host',
        direction: 'Outbound',
        from: {
          extensionId: '160751006',
          phoneNumber: '+12812923232'
        },
        id: partyId,
        muted: false,
        owner: {
          accountId: '160746006',
          extensionId: '160751006'
        },
        standAlone: false,
        status: {
          code: 'Answered'
        },
        to: {
          name: 'Conference',
          phoneNumber: 'conference'
        }
      });
    } else {
      parties.push({
        conferenceRole: 'Participant',
        direction: 'Inbound',
        from: {
          extensionId: '160751006',
          phoneNumber: '+12812923232'
        },
        id: partyId,
        muted: false,
        standAlone: false,
        status: {
          code: 'Gone',
          peerId: {
            partyId: randomPeerPartyId(index - 1),
            sessionId: randomSessionId()
          }
        },
        to: {
          name: 'Conference',
          phoneNumber: 'conference'
        }
      });
    }
  }
  return {
    creationTime: '2018-08-02T01:48:29Z',
    id: 'Y3MxNzI2MjI1NTQzODI0MzUzM0AxMC43NC4yLjIxOA',
    origin: { type: 'Conference' },
    voiceCallToken: 'conf_59334d784e7a49324d6a49314e5451794d6a63794d5441324d544135514445774c6a63304c6a49754d6a45344031302e37342e322e3231383a35303730',
    parties,
  };
};
