import { createBrandConfig } from '@ringcentral-integration/commons/modules/Brand/createBrandConfig';

export const brandConfig = createBrandConfig({
  id: '1210',
  code: 'rc',
  name: 'RingCentral',
  appName: 'RingCentral Widgets',
  application: 'RingCentral Widgets',
  allowRegionSettings: true,
  callWithJupiter: {
    link: 'https://app.ringcentral.com/',
    protocol: 'rcapp://',
    name: 'RingCentral app',
  },
  callWithSoftphone: {
    protocol: 'rcmobile://',
    name: 'RingCentral Phone',
  },
  rcvTeleconference: 'https://v.ringcentral.com/teleconference',
  meetingUriReg: {
    rcm: undefined,
    rcv: undefined,
  },
  allowJupiterUniversalLink: true,
  conference: {
    dialInNumbersLink: 'https://ringcentr.al/2L14jqL',
    inviteText:
      'Please join the {brandName} conference.\n\nDial-In Number: {formattedDialInNumber} \n{additionalNumbersSection} \nParticipant Access: {participantCode} \n\nNeed an international dial-in phone number? Please visit {dialInNumbersLink} \n\nThis conference call is brought to you by {brandName} Conferencing.',
  },
  rcvMeetingTopic: "{extensionName}'s {brandName} Video meeting",
  enableEDP: true,
});
