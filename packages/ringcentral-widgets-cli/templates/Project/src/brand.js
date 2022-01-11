import { createBrandConfig } from '@ringcentral-integration/commons/modules/Brand/createBrandConfig';

export default createBrandConfig({
  id: '1210',
  code: 'rc',
  name: 'RingCentral',
  appName: 'RingCentral',
  application: 'RingCentral Widgets',
  allowRegionSettings: true,
  callWithJupiter: {
    link: 'https://app.ringcentral.com/',
    protocol: 'rcapp://',
    name: 'RingCentral App',
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
});
