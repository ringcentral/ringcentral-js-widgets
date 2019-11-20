import { formatMeetingId } from 'ringcentral-widgets/lib/MeetingCalendarHelper';

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
`('$meetingId should be formated to $expected', ({ meetingId, expected }) => {
  test(`returns ${expected}`, () => {
    expect(formatMeetingId(meetingId)).toBe(expected);
  });
});
