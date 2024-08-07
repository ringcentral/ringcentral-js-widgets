import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import { filter } from 'ramda';

export function checkShouldHideContactUser(contactMatches: Entity[]) {
  if (
    !contactMatches ||
    !Array.isArray(contactMatches) ||
    contactMatches.length === 0
  ) {
    return true;
  }
  const filteredMatches = filter((contact) => !contact.hidden, contactMatches);
  return !filteredMatches.length;
}
