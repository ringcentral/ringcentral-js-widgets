import type ContactResource from '@rc-ex/core/lib/definitions/ContactResource';
import { phoneTypes } from '@ringcentral-integration/commons/enums/phoneTypes';
import { IContact } from '@ringcentral-integration/commons/interfaces/Contact.model';
import {
  convertUsageTypeToPhoneType,
  isSupportedPhoneNumber,
} from '@ringcentral-integration/commons/lib/phoneTypeHelper';

import type { Presences, ProfileImages } from './AccountContacts.interface';

export const produceContact = ({
  item,
  profileImages,
  presences,
  sourceName,
}: {
  item: ContactResource;
  profileImages: ProfileImages;
  presences: Presences;
  sourceName: string;
}) => {
  const id = `${item.id}`;
  const contact: IContact = Object.assign({}, item, {
    type: sourceName,
    id,
    name: item.name
      ? item.name
      : `${item.firstName || ''} ${item.lastName || ''}`,
    emails: [item.email!],
    extensionNumber: item.extensionNumber,
    // TODO: after spring-ui full migrate should remove this, that be not need, just use `ContactAvatar` component
    hasProfileImage: !!item.profileImage,
    phoneNumbers: [
      {
        phoneNumber: item.extensionNumber,
        phoneType: phoneTypes.extension,
      },
    ],
    // TODO: after spring-ui full migrate should remove this, that be not need, just use `ContactAvatar` component
    profileImageUrl: profileImages[id] && profileImages[id].url,
    presence: presences[id] && presences[id].presence,
    contactStatus: item.status,
    isCallQueueNumber: item.type === 'Department',
  });

  if (item.phoneNumbers && item.phoneNumbers.length > 0) {
    item.phoneNumbers.forEach((phone) => {
      isSupportedPhoneNumber(phone) &&
        contact.phoneNumbers!.push({
          ...phone,
          phoneType: convertUsageTypeToPhoneType(phone?.usageType),
        });
    });
  }
  return contact;
};
