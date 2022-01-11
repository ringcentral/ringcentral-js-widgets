import { getRcvDialInInfo } from '../../lib/MeetingCalendarHelper';

const expected = `

One tap to join audio only from a smartphone:
    +16504191505,,977988816#,,3893596796# United States (San Mateo, CA)

Or dial:
    +16504191505 United States (San Mateo, CA)
    Access Code / Meeting ID: 977 988 816 

Dial-in password: 3893596796

International numbers available: https://v.ringcentral.com/teleconference `;

describe('getRcvDialInInfo', () => {
  test('password length should be 10', () => {
    const result = getRcvDialInInfo({
      dialInNumber: [
        {
          phoneNumber: '+16504191505',
          country: {
            name: 'United States',
            isoCode: 'US',
            callingCode: '1',
          },
          default: true,
          location: 'San Mateo, CA',
        },
      ],
      isMeetingSecret: true,
      meetingPasswordPSTN: '3893596796',
      shortId: '977988816',
      currentLocale: 'en-US',
      rcvTeleconference: 'https://v.ringcentral.com/teleconference',
    });
    console.log(result);
    expect(result).toBe(expected);
  });
});
