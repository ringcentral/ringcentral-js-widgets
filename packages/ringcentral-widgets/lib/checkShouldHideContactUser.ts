import { filter } from 'ramda';
import { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';

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
