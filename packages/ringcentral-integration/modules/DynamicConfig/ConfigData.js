window.__rc_config_data_callback__({
  meetingUriReg: {
    rcm:
      '((((meetings|rcm\\.(rcdev|ops|stage)|rcm-uat)\\.(ringcentral|btcloudphone\\.bt|businessconnect\\.telus))|(meetings-officeathand\\.att))\\.com|((\\w+\\.)*(meetzoom|zoom)\\.us))',
    rcv:
      '(((verizon\\.)?((v|video-atos|video\\.vodafonebusiness)\\.ringcentral)|(meetings\\.officeathand\\.att)|(video\\.(unifyoffice|cloudoffice\\.avaya|rainbowoffice|businessconnect\\.telus|cloudwork\\.bt))|((glpci1xmn|itlcixmn|xmnup)-rxe-1-v(-(vodafone|avaya|atos|rainbow|bt|telus|verizon|att))?\\.lab\\.nordigy)|((vi11|amrupams-shr)-(1|2)-v(-(att|bt|telus))?\\.lab\\.nordigy))\\.(com|ru|biz))',
  },
  callWithJupiter: {
    2020: {
      link: 'https://app.unifyoffice.com/',
      protocol: 'unifyoffice://',
      name: 'Unify Office (Jupiter)',
    },
    2110: {
      link: 'https://app.rainbowoffice.com/',
      protocol: 'com.rainbowoffice.app://',
      name: 'Rainbow Office',
    },
    3420: {
      link: 'https://app.officeathand.att.com/',
      protocol: 'officeathand://',
      name: 'AT&T Office@Hand',
    },
    6010: {
      link: 'https://app.cloudoffice.avaya.com/',
      protocol: 'rcapp://',
      name: 'Avaya Cloud',
    },
    7010: {
      link: 'https://app.vodafonebusiness.ringcentral.com/',
      protocol: 'com.ringcentral.vodafonebusiness.app://',
      name: 'Vodafone with RingCentral',
    },
    7310: {
      link: 'https://app.businessconnect.telus.com/',
      protocol: 'rctelus://',
      name: 'TELUS Business Connect',
    },
    7710: {
      link: 'http://app.cloudwork.bt.com/',
      protocol: 'com.bt.cloudwork.app://',
      name: 'BT Cloud Work',
    },
    default: {
      link: 'https://app.ringcentral.com/',
      protocol: 'rcapp://',
      name: 'RingCentral',
    },
  },
});
