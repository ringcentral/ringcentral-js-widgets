import {
  PartyStatusCode,
  type Session,
} from 'ringcentral-call-control/lib/Session';

import { checkIsCallAnswered } from './helpers';

const party = (direction: string, code: PartyStatusCode) =>
  ({ direction, status: { code } }) as Session['party'];

it('ignores missing sessions and outbound setup with only a local answered party', () => {
  expect(checkIsCallAnswered()).toBe(false);
  expect(
    checkIsCallAnswered({
      party: party('Outbound', PartyStatusCode.answered),
      otherParties: [],
    }),
  ).toBe(false);
});

it('recognizes an answered inbound party', () => {
  expect(
    checkIsCallAnswered({
      party: party('Inbound', PartyStatusCode.answered),
      otherParties: [],
    }),
  ).toBe(true);
});
