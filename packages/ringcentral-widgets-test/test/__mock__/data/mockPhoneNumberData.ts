export const mockPhoneNumberData = () => {
  return [
    {
      features: [
        'CallerId',
        'SmsSender',
        'MmsSender',
        'InternationalSmsSender',
      ],
      uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/account/3762349004/phone-number/2286086004',
      id: 2286086004,
      phoneNumber: '+17608791723',
      paymentType: 'Local',
      location: 'El Centro, CA',
      type: 'VoiceFax',
      usageType: 'DirectNumber',
      status: 'Normal',
      country: {
        uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/dictionary/country/1',
        id: '1',
        name: 'United States',
      },
      primary: true,
    },
    {
      features: ['CallerId'],
      uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/account/3762349004/phone-number/2286092004',
      id: 2286092004,
      phoneNumber: '+81330006572',
      paymentType: 'Local',
      location: 'Tokyo , Japan',
      type: 'VoiceFax',
      usageType: 'DirectNumber',
      status: 'Normal',
      country: {
        uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/dictionary/country/112',
        id: '112',
        name: 'Japan',
      },
      primary: false,
    },
    {
      id: 298297004,
      phoneNumber: '+18883495556',
      paymentType: 'TollFree',
      type: 'VoiceFax',
      usageType: 'MainCompanyNumber',
      status: 'Normal',
      country: {
        uri: 'https://platform.ringcentral.com/restapi/v1.0/dictionary/country/1',
        id: '1',
        name: 'United States',
      },
      features: ['SmsSender', 'CallerId', 'MmsSender'],
    },
  ];
};
