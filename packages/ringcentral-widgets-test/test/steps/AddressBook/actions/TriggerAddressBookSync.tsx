import type { Context } from '../../../interfaces';
import type { StepFunction } from '../../../lib/step';

/**
 * Trigger syncing data of AddressBook
 */
export const TriggerAddressBookSync: StepFunction = async (
  _: unknown,
  context: Context,
) => {
  await context.phone.dataFetcherV2.fetchData(
    context.phone.addressBook._source,
  );
};
