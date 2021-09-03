import { createBrandConfig } from '@ringcentral-integration/commons/modules/Brand/createBrandConfig';

export const brandConfig = createBrandConfig({
  id: '1210',
  code: 'rc',
  name: 'RingCentral',
  appName: 'RingCentral Widgets',
  fullName: 'RingCentral',
  application: 'RingCentral Widgets',
  allowRegionSetting: true,
  callWithJupiter: {
    default: {
      link: 'https://app.ringcentral.com/',
      protocol: 'rcapp://',
      name: 'RingCentral',
    },
  },
  rcvTeleconference: 'https://v.ringcentral.com/teleconference/',
  spartanProtocol: 'rcmobile://',
  allowJupiterUniversalLink: true,
  meetingUriReg: {
    rcm: undefined,
    rcv: undefined,
  },
});
