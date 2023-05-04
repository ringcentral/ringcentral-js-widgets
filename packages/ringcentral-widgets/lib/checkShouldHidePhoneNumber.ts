import { filter, reduce } from 'ramda';

import {
  Entity,
  EntityPhoneNumberItem,
} from '@ringcentral-integration/commons/interfaces/Entity.interface';

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
  if (filteredMatches.length === 0) {
    return true;
  }

  const filteredPhoneNumbers = reduce(
    (acc, x) => {
      const numbers = filter((item) => !item.hidden, x.phoneNumbers || []);
      return acc.concat(numbers);
    },
    [] as EntityPhoneNumberItem[],
    filteredMatches,
  );

  return filteredPhoneNumbers.length === 0;
}
