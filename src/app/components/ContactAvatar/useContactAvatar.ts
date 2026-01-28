import type {
  ContactAvatarSize,
  IContact,
} from '@ringcentral-integration/commons/interfaces/Contact.model';
import type { Auth } from '@ringcentral-integration/micro-auth/src/app/services';
import { useContainer } from '@ringcentral-integration/next-core';
import { useMemo } from 'react';

import type { Contacts } from '../../services';

/**
 * get source contact avatar by contact id or contact profileImage
 *
 * if the contact is fine in allContactsMap, it use the contact in allContactsMap
 * otherwise, it use the source contact in the parameter, like extensionInfo also include profileImage in the data can be used
 *
 * @default size 'xsmall'
 */
export const useContactAvatar = (
  source: IContact | undefined,
  size: ContactAvatarSize = 'xsmall',
) => {
  const authService = useContainer<Auth>('Auth');
  const contactsService = useContainer<Contacts>('Contacts');
  const contact = source?.id
    ? contactsService.allContactsMap.get(source.id)
    : undefined;

  const targetContact = contact || source;

  const result = useMemo(() => {
    return targetContact
      ? contactsService.getProfileImageSync(targetContact, size)
      : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    contactsService,
    size,
    targetContact,
    // add accessToken to make sure it will re-render when the token changed
    authService.accessToken,
  ]);

  return result;
};
