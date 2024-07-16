import { waitUntilTo } from '@ringcentral-integration/commons/utils';

import type { StepFunction } from '../../../lib/step';

interface MockAddressBookSyncProps {
  page?: number;
}

export const CheckAddressBookData: StepFunction = async (
  props,
  { phone, payload },
) => {
  await waitUntilTo(() => {
    expect(
      phone.addressBook.rawContacts.map(({ id }: { id: string }) => id),
    ).toEqual(payload.records);
  });
};
