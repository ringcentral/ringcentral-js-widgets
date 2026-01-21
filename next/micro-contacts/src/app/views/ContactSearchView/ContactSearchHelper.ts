import { PhoneType } from '@ringcentral-integration/commons/enums/phoneTypes';
import type { RcPresenceType } from '@ringcentral/juno';

import type { Contact, Presence } from '../../services';
import type { IContactSearchItem } from '../ContactSearchView/ContactSearch.view.interface';

const MaximizeDisplayLength = 100;

export const getPresenceStatus = (
  presence: Presence['presence'],
): RcPresenceType | undefined => {
  if (!presence) {
    return;
  }
  const { dndStatus, presenceStatus, userStatus } = presence;
  if (dndStatus === 'DoNotAcceptAnyCalls') {
    return 'DND';
  }

  return (presenceStatus || userStatus || '').toLowerCase() as RcPresenceType;
};

export const getRcFilteredContacts = ({
  lowCaseString,
  contacts,
}: {
  lowCaseString: string;
  contacts: Array<Contact>;
}): IContactSearchItem[] => {
  const len = contacts.length;
  const result: IContactSearchItem[] = [];
  let resultCount = 0;
  for (let i = 0; i < len; i++) {
    const { id, name, phoneNumbers, type, profileImageUrl, presence } =
      contacts[i];
    const isNameInclude = name?.toLowerCase().includes(lowCaseString);
    let isPrimary = true;
    // eslint-disable-next-line no-loop-func
    phoneNumbers!.forEach(({ phoneType, phoneNumber }) => {
      if (isNameInclude || phoneNumber!.includes(lowCaseString)) {
        result.push({
          id,
          name: name!,
          type,
          phoneType: phoneType!,
          phoneNumber: phoneNumber!,
          isPrimary,
          profileImageUrl,
          presenceStatus: getPresenceStatus(presence!),
          contact: contacts[i],
        });
        if (isPrimary) {
          isPrimary = false;
          resultCount += 1;
        }
      }
    });
    if (resultCount === MaximizeDisplayLength) break;
  }
  return result;
};

export const excludePhoneTypesFromContacts = (
  contacts: Array<IContactSearchItem>,
  excludePhoneTypes: PhoneType[] = [],
) => {
  const filteredNumbers: { [key: string]: IContactSearchItem[] } = {};

  contacts
    .filter(
      (contact) => !excludePhoneTypes.includes(contact.phoneType as PhoneType),
    )
    .forEach((contact) => {
      if (!filteredNumbers[contact.id]) {
        filteredNumbers[contact.id] = [{ ...contact, isPrimary: true }];
      } else {
        filteredNumbers[contact.id].push(contact);
      }
    });
  return Object.values(filteredNumbers).flat();
};
