function mockFunctions() {
  const original = jest.requireActual(
    '@ringcentral-integration/commons/modules/RcVideo/videoHelper',
  );
  return {
    ...original,
    getDefaultChars: jest.fn(() => {
      return original.getDefaultChars();
    }),
  };
}

jest.mock('@ringcentral-integration/commons/modules/RcVideo/videoHelper', () =>
  mockFunctions(),
);
const generator = require('@ringcentral-integration/commons/modules/RcVideo');
const v2helper = require('@ringcentral-integration/commons/modules/RcVideo/videoHelper');

describe.each`
  password        | expected
  ${'123456er1W'} | ${true}
  ${'Aaaaaaaaaa'} | ${false}
  ${'1aaaaaaaaa'} | ${false}
  ${'1AAAAAAAAA'} | ${false}
`('$password should be $expected', ({ password, expected }) => {
  test(`returns ${expected}`, () => {
    expect(generator.validateRandomPassword(password)).toBe(expected);
  });
});

describe('generateRandomPassword', () => {
  test('password length should be 10', () => {
    const password = generator.generateRandomPassword();
    expect(password.length).toEqual(10);
  });

  test('defaultChars should not include 0, o, l, I, O', () => {
    // given chars as password sources
    const source = generator.getDefaultChars();
    const expected = /[0oOIl]/;

    // then
    expect(source).toEqual(expect.not.stringMatching(expected));
  });

  test('should use the default chars to generate pwd', () => {
    // when
    generator.generateRandomPassword();

    // then
    expect(generator.getDefaultChars).toHaveBeenCalled();
  });
});

describe('formatRcvInvitationRequestData', () => {
  test('format rcv invitation request with password', () => {
    const result = v2helper.formatRcvInvitationRequestData({
      hostName: 'Something New',
      e2ee: true,
      shortId: '686418630',
      joinUri: 'https://v.ringcentral.com/join/1234',
      isMeetingSecret: true,
      meetingPassword: '3xBp9jEkJm',
      meetingPasswordPSTN: '3927953556',
      meetingPasswordMasked: 'c5750fc8de794ebfe49f7ffedc6f7dce',
      currentLocale: 'en-US',
      brandName: 'RingCentral',
      brandId: '1210',
      isSIPAvailable: true,
      dialInNumbers: [
        {
          phoneNumber: '+13232382296',
          country: { name: 'United States', isoCode: 'US', callingCode: '1' },
          default: true,
          location: 'San Mateo, CA',
          locationCode: 'USSXF',
        },
      ],
    });
    expect(result).toEqual({
      notificationId: 'meetingInvite',
      plainTextPreferred: true,
      isolatedMode: true,
      parameters: [
        {
          parameterName: 'numbers',
          parameterValue: [
            {
              number: '+13232382296',
              unformattedNumber: '+13232382296',
              country: 'United States',
              default: true,
              location: 'San Mateo, CA',
            },
          ],
        },
        { parameterName: 'meetingName', parameterValue: '---' },
        { parameterName: 'hostName', parameterValue: 'Something New' },
        { parameterName: 'meetingId', parameterValue: '686418630' },
        { parameterName: 'isSIPAvailable', parameterValue: true },
        { parameterName: 'participantCode', parameterValue: '686418630' },
        { parameterName: 'brandName', parameterValue: 'RingCentral' },
        {
          parameterName: 'entryPoint',
          parameterValue: 'https://v.ringcentral.com',
        },
        { parameterName: '$Brand_Id', parameterValue: '1210' },
        {
          parameterName: '$Extension_FormattingLocaleCode',
          parameterValue: 'en-US',
        },
        {
          parameterName: '$Extension_LanguageLocaleCode',
          parameterValue: 'en-US',
        },
        { parameterName: 'isE2eeEnabled', parameterValue: true },
        { parameterName: 'password', parameterValue: '3xBp9jEkJm' },
        { parameterName: 'dialInPassword', parameterValue: '3927953556' },
        {
          parameterName: 'maskedPassword',
          parameterValue: 'c5750fc8de794ebfe49f7ffedc6f7dce',
        },
      ],
    });
  });
  test('format rcv invitation request without password', () => {
    const result = v2helper.formatRcvInvitationRequestData({
      hostName: 'Something New',
      e2ee: true,
      shortId: '686418630',
      joinUri: 'https://v.ringcentral.com/join/1234',
      isMeetingSecret: false,
      meetingPassword: '3xBp9jEkJm',
      meetingPasswordPSTN: '3927953556',
      meetingPasswordMasked: 'c5750fc8de794ebfe49f7ffedc6f7dce',
      currentLocale: 'en-US',
      brandName: 'RingCentral',
      brandId: '1210',
      isSIPAvailable: true,
      dialInNumbers: [
        {
          phoneNumber: '+13232382296',
          country: { name: 'United States', isoCode: 'US', callingCode: '1' },
          default: true,
          location: 'San Mateo, CA',
          locationCode: 'USSXF',
        },
      ],
    });
    expect(result).toEqual({
      notificationId: 'meetingInvite',
      plainTextPreferred: true,
      isolatedMode: true,
      parameters: [
        {
          parameterName: 'numbers',
          parameterValue: [
            {
              number: '+13232382296',
              unformattedNumber: '+13232382296',
              country: 'United States',
              default: true,
              location: 'San Mateo, CA',
            },
          ],
        },
        { parameterName: 'meetingName', parameterValue: '---' },
        { parameterName: 'hostName', parameterValue: 'Something New' },
        { parameterName: 'meetingId', parameterValue: '686418630' },
        { parameterName: 'isSIPAvailable', parameterValue: true },
        { parameterName: 'participantCode', parameterValue: '686418630' },
        { parameterName: 'brandName', parameterValue: 'RingCentral' },
        {
          parameterName: 'entryPoint',
          parameterValue: 'https://v.ringcentral.com',
        },
        { parameterName: '$Brand_Id', parameterValue: '1210' },
        {
          parameterName: '$Extension_FormattingLocaleCode',
          parameterValue: 'en-US',
        },
        {
          parameterName: '$Extension_LanguageLocaleCode',
          parameterValue: 'en-US',
        },
        {
          parameterName: 'isE2eeEnabled',
          parameterValue: true,
        },
      ],
    });
  });
});
