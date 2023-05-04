import {
  Contact,
  Presence,
} from '@ringcentral-integration/commons/modules/AccountContacts';
import { RcPresenceType } from '@ringcentral/juno';

import { IContactSearchItem } from './ContactSearchUI.interface';

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
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    // eslint-disable-next-line no-loop-func
    phoneNumbers.forEach(({ phoneType, phoneNumber }) => {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      if (isNameInclude || phoneNumber.includes(lowCaseString)) {
        result.push({
          id,
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          name,
          type,
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          phoneType,
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          phoneNumber,
          isPrimary,
          profileImageUrl,
          // @ts-expect-error TS(2345): Argument of type 'Pick<PresenceInfoResponse, "dndS... Remove this comment to see the full error message
          presenceStatus: getPresenceStatus(presence),
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
