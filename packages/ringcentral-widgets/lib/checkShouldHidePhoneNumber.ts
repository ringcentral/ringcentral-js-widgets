import { filter, find } from 'ramda';
import { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';

export function checkShouldHidePhoneNumber(
  phoneNumber: string,
  contactMatches: Entity[],
) {
  if (
    !phoneNumber ||
    phoneNumber === '' ||
    !contactMatches ||
    !Array.isArray(contactMatches) ||
    contactMatches.length === 0
  ) {
    return false;
  }
  const filteredMatches = filter((item) => !item.hidden, contactMatches);
  if (
    filteredMatches.length &&
    find((m) => {
      return !!find(
        (p) => p.phoneNumber === phoneNumber && !p.hidden,
        m.phoneNumbers ?? [],
      );
    }, filteredMatches)
  ) {
    return false;
  }
  return true;
}
