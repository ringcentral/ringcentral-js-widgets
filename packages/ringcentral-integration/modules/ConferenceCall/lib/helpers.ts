import { filter, find, map, sort } from 'ramda';

import type { Party } from '../ConferenceCall.interface';
import { conferenceRole } from './constants';

export function ascendSortParties(parties: Party[]): Party[] {
  return sort(
    (last: Party, next: Party) =>
      // @ts-expect-error
      +last.id.split('-')[1] - +next.id.split('-')[1],
    filter(
      (party) => party.conferenceRole.toLowerCase() !== conferenceRole.host,
      parties,
    ),
  );
}

export function mergeParty(newParties: Party[], oldParties: Party[]) {
  return map((oldParty) => {
    const newParty = find((newParty) => {
      if (newParty.id === oldParty.id) {
        return true;
      }
      return false;
    }, newParties);
    if (newParty) {
      return newParty;
    }
    return oldParty;
  }, oldParties);
}
