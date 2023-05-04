import { format } from '../../src/utils';

describe('string-template', () => {
  test('return format message', () => {
    expect(format('{a}b', { a: 1, c: 2 })).toEqual('1b');
    expect(format('{ a  }b', { a: 1, c: 2 })).toEqual('{ a  }b');
    expect(format('{ a a}b{c}', { 'a a': 1, c: 2 })).toEqual('{ a a}b2');
    expect(
      format(
        '{accountName} is inviting you to a {brandName} meeting.\n\nJoin from PC, Mac, iOS or Android: {joinUri}{passwordTpl}\n\nOr iPhone one-tap:\n\t{mobileDialingNumberTpl}\n\nOr Telephone:\n\tDial: {phoneDialingNumberTpl}\n\tMeeting ID: {meetingId}\n\tInternational numbers available: {teleconference} ',
        {
          accountName: 'XXX',
          brandName: 'RC',
          joinUri: 'https://www.iamfake.com/123456',
          passwordTpl: '?pwd=123',
          mobileDialingNumberTpl: '8885287464',
          phoneDialingNumberTpl: '8885287464,,,121342',
          meetingId: '0987654',
          teleconference: 'https://www.iamfake.com/teleconference',
        },
      ),
    ).toEqual(
      'XXX is inviting you to a RC meeting.\n\nJoin from PC, Mac, iOS or Android: https://www.iamfake.com/123456?pwd=123\n\nOr iPhone one-tap:\n\t8885287464\n\nOr Telephone:\n\tDial: 8885287464,,,121342\n\tMeeting ID: 0987654\n\tInternational numbers available: https://www.iamfake.com/teleconference ',
    );
  });
});
