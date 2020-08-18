import {
  formatMeetingId,
  getMeetingId,
  htmlNewLine,
  htmlIndentation,
  htmlTabIndentation,
  formatTextToHtml,
} from 'ringcentral-widgets/lib/MeetingCalendarHelper';

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
    expect(formatTextToHtml(message)).toContain(
      `aaa${htmlNewLine}bbb${htmlNewLine}ccc${htmlNewLine}ddd`,
    );
  });

  test('replace leading whitespaces', () => {
    const message: string = `${' '.repeat(3)}aaa bbb`;
    expect(formatTextToHtml(message)).toContain(
      `${htmlIndentation.repeat(3)}aaa bbb`,
    );
  });

  test('replace all tabs', () => {
    const message: string = '\taaa\tbbb';
    expect(formatTextToHtml(message)).toContain(
      `${htmlTabIndentation}aaa${htmlTabIndentation}bbb`,
    );
  });

  test('replace link', () => {
    const link: string = 'https://rcdev.dev.meetzoom.us/j/1492252796';
    const message: string = `meeting link ${link}`;
    expect(
      formatTextToHtml(message, {
        links: [link],
      }),
    ).toContain(`meeting link <a target="_blank" href="${link}">${link}</a>`);
  });

  test('composited', () => {
    const link1: string = 'https://rcdev.dev.meetzoom.us/j/1492252796';
    const link2: string = 'https://v.ringcentral.com/teleconference/';
    const inputParts: string[] = [
      `meeting link ${link1}`,
      '\n aaa',
      '\n\tbbb',
      `\nccc ${link2}`,
    ];
    const outputParts: string[] = [
      `meeting link <a target="_blank" href="${link1}">${link1}</a>`,
      `${htmlNewLine}${htmlIndentation}aaa`,
      `${htmlNewLine}${htmlTabIndentation}bbb`,
      `${htmlNewLine}ccc <a target="_blank" href="${link2}">${link2}</a>`,
    ];
    expect(
      formatTextToHtml(inputParts.join(''), {
        links: [link1, link2],
      }),
    ).toContain(outputParts.join(''));
  });
});

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
        expect(getMeetingId(meetingLink)).toEqual(meetingId);
      });
    },
  );
});
