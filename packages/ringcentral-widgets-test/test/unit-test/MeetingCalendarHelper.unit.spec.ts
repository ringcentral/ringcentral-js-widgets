import {
  formatMeetingId,
  stripMeetingLinks,
  getMeetingId,
  htmlNewLine,
  htmlIndentation,
  htmlTabIndentation,
  formatTextToHtml,
  getRcvEventTpl,
} from '@ringcentral-integration/widgets/lib/MeetingCalendarHelper';
import { RcvMainParams } from '@ringcentral-integration/widgets/lib/MeetingCalendarHelper/index.interface';
import { getDefaultVideoSettings } from '@ringcentral-integration/commons/modules/RcVideoV2';
import {
  getRcmUriRegExp,
  getRcvUriRegExp,
} from '@ringcentral-integration/commons/modules/DynamicConfig';
import ConfigData from '@ringcentral-integration/commons/modules/DynamicConfig/ConfigData.json';

describe.each`
  meetingId           | expected
  ${'123456'}         | ${'123 456'}
  ${'1234567'}        | ${'123 4567'}
  ${'12345678'}       | ${'1234 5678'}
  ${'123456789'}      | ${'123 456 789'}
  ${'1234567890'}     | ${'123 456 7890'}
  ${'12345678901'}    | ${'123 4567 8901'}
  ${'123456789012'}   | ${'123 456 789 012'}
  ${'1234567890123'}  | ${'123 456 789 0123'}
  ${'12345678901234'} | ${'123 456 7890 1234'}
`(
  '$meetingId should be formated to $expected',
  ({ meetingId, expected }: { meetingId: string; expected: string }) => {
    test(`returns ${expected}`, () => {
      expect(formatMeetingId(meetingId)).toBe(expected);
    });
  },
);

describe('formatTextToHtml', () => {
  test('formalize and replace newlines', () => {
    const message: string = 'aaa\nbbb\r\nccc\rddd';
    expect(formatTextToHtml(message)).toEqual(
      `aaa${htmlNewLine}bbb${htmlNewLine}ccc${htmlNewLine}ddd`,
    );
  });

  test('replace leading whitespaces', () => {
    const message: string = `${' '.repeat(3)}aaa bbb`;
    expect(formatTextToHtml(message)).toEqual(
      `${htmlIndentation.repeat(3)}aaa bbb`,
    );
  });

  test('replace all tabs', () => {
    const message: string = '\taaa\tbbb';
    expect(formatTextToHtml(message)).toEqual(
      `${htmlTabIndentation}aaa${htmlTabIndentation}bbb`,
    );
  });

  test('replace links', () => {
    const link: string = 'https://rcdev.dev.meetzoom.us/j/1492252796';
    const message: string = `meeting link ${link}`;
    expect(
      formatTextToHtml(message, {
        links: [link],
      }),
    ).toEqual(`meeting link <a target="_blank" href="${link}">${link}</a>`);
  });

  test('search two links', () => {
    const link1: string =
      'https://rcdev.dev.meetzoom.us/j/1492252796?pwd=sdfkljkl23423423';
    const link2: string = 'https://v.ringcentral.com/teleconference/';
    const message: string = `meeting link ${link1}<br /> ${link2}`;
    expect(
      formatTextToHtml(message, {
        searchLinks: true,
      }),
    ).toEqual(
      `meeting link <a target="_blank" href="${link1}">${link1}</a><br /> <a target="_blank" href="${link2}">${link2}</a>`,
    );
  });

  test('search one links', () => {
    const link1: string =
      'https://rcdev.dev.meetzoom.us/j/1492252796?pwd=sdfkljkl23423423';
    const message: string = `meeting link ${link1}`;
    expect(
      formatTextToHtml(message, {
        searchLinks: true,
      }),
    ).toEqual(`meeting link <a target="_blank" href="${link1}">${link1}</a>`);
  });

  test('search links followed by <br>', () => {
    const link1: string = 'https://rcdev.dev.meetzoom.us/j/1492252796';
    const message: string = `meeting link ${link1}<br>`;
    expect(
      formatTextToHtml(message, {
        searchLinks: true,
      }),
    ).toEqual(
      `meeting link <a target="_blank" href="${link1}">${link1}</a><br>`,
    );
  });

  test('search links within anchor', () => {
    const link1: string = 'https://rcdev.dev.meetzoom.us/j/1492252796';
    const link2: string = 'https://v.ringcentral.com/teleconference/';
    const message: string = `meeting link <a target="_blank" href="${link1}">${link1}</a> ${link2}<br>`;
    expect(
      formatTextToHtml(message, {
        searchLinks: true,
      }),
    ).toEqual(
      `meeting link <a target="_blank" href="${link1}">${link1}</a> <a target="_blank" href="${link2}">${link2}</a><br>`,
    );
  });

  test('composited', () => {
    const link1: string = 'https://rcdev.dev.meetzoom.us/j/1492252796';
    const link2: string = 'https://v.ringcentral.com/teleconference/';
    const link3: string = 'https://www.ringcentral.com/apps';
    const inputParts: string[] = [
      `meeting link ${link1}`,
      '\n aaa',
      '\n\tbbb',
      `\nccc ${link2}`,
      `\r\nddd ${link3}`,
    ];
    const outputParts: string[] = [
      `meeting link <a target="_blank" href="${link1}">${link1}</a>`,
      `${htmlNewLine}${htmlIndentation}aaa`,
      `${htmlNewLine}${htmlTabIndentation}bbb`,
      `${htmlNewLine}ccc <a target="_blank" href="${link2}">${link2}</a>`,
      `${htmlNewLine}ddd <a target="_blank" href="${link3}">${link3}</a>`,
    ];
    expect(
      formatTextToHtml(inputParts.join(''), {
        links: [link1, link2],
        searchLinks: true,
      }),
    ).toEqual(outputParts.join(''));
  });

  test('all tabs replace with space', () => {
    const defaultMeetingSettings = getDefaultVideoSettings({
      topic: 'rcv meeting topic',
      accountId: '111',
      extensionId: '222',
    });
    const mockMeetingInfo = {
      meeting: {
        ...defaultMeetingSettings,
        startTime: new Date(),
      },
      extensionInfo: {
        name: 'SystemNew',
      },
      dialInNumber: '123456',
    };
    const invitation = getRcvEventTpl(
      mockMeetingInfo,
      {
        id: '1210',
        code: 'rc',
        name: 'RingCentral',
        brandConfig: {
          teleconference: '123',
        },
      },
      'en-US',
      true,
    );
    expect(invitation).not.toContain('\t');
  });
});

describe.each`
  brand      | rcvTeleconference                                           | expected
  ${'rc'}    | ${'https://v.ringcentral.com/teleconference/'}              | ${'https://v.ringcentral.com/teleconference/'}
  ${'bt'}    | ${'https://video.cloudwork.bt.com/teleconference'}          | ${'https://video.cloudwork.bt.com/teleconference'}
  ${'telus'} | ${'https://video.businessconnect.telus.com/teleconference'} | ${'https://video.businessconnect.telus.com/teleconference'}
  ${'att'}   | ${'https://meetings.officeathand.att.com/teleconference'}   | ${'https://meetings.officeathand.att.com/teleconference'}
`(
  '$brand rcv International numbers should be rcvTeleconference:',
  ({
    brand,
    rcvTeleconference,
    expected,
  }: {
    brand: string;
    rcvTeleconference: string;
    expected: string;
  }) => {
    test(`returns ${expected}`, () => {
      const defaultMeetingSettings = getDefaultVideoSettings({
        topic: 'rcv meeting topic',
        accountId: '111',
        extensionId: '222',
      });
      const mockMeetingInfo = {
        meeting: {
          ...defaultMeetingSettings,
          startTime: new Date(),
        },
        extensionInfo: {
          name: 'SystemNew',
        },
        dialInNumber: '123456',
      };
      const invitation = getRcvEventTpl(
        mockMeetingInfo,
        {
          id: '1210',
          code: brand,
          name: 'RingCentral',
          brandConfig: {
            teleconference: '123',
          },
          rcvTeleconference,
        },
        'en-US',
      );
      expect(invitation).toMatch(new RegExp(expected, 'g'));
    });
  },
);

describe('getMeetingId', () => {
  describe.each`
    meetingLink                                                  | meetingId
    ${'http://meetings-officeathand.att.com/j/1481234567'}       | ${'1481234567'}
    ${'https://meetings.btcloudphone.bt.com/j/1481234567'}       | ${'1481234567'}
    ${'https://meetings.businessconnect.telus.com/j/1481234567'} | ${'1481234567'}
    ${'https://v.ringcentral.com/join/1481234567'}               | ${'1481234567'}
  `(
    '$meetingId should be retrieved from $meetingLink',
    ({
      meetingLink,
      meetingId,
    }: {
      meetingLink: string;
      meetingId: string;
    }) => {
      test(meetingLink, () => {
        const rcvUriRegExp = getRcvUriRegExp(ConfigData.meetingUriReg.rcv);
        const rcmUriRegExp = getRcmUriRegExp(ConfigData.meetingUriReg.rcm);
        expect(getMeetingId(meetingLink, rcvUriRegExp, rcmUriRegExp)).toEqual(
          meetingId,
        );
      });
    },
  );
});

describe('stripMeetingLinks', () => {
  describe.each`
    text                                                                                                | result
    ${'https://meetings.ringcentral.com/j/1491234567,http://meetings.btcloudphone.bt.com/j/1481234567'} | ${','}
    ${'Please join https://v.ringcentral.com/join/148123456'}                                           | ${'Please join '}
    ${'Please join https://amrupams-shr-1-v.lab.nordigy.ru/join/823808420 post'}                        | ${'Please join  post'}
  `(
    'Links of $text should be stripped -> $result',
    ({ text, result }: { text: string; result: string }) => {
      test(text, () => {
        const rcvUriRegExp = getRcvUriRegExp(ConfigData.meetingUriReg.rcv);
        const rcmUriRegExp = getRcmUriRegExp(ConfigData.meetingUriReg.rcm);
        expect(stripMeetingLinks(text, rcvUriRegExp, rcmUriRegExp)).toEqual(
          result,
        );
      });
    },
  );
});
