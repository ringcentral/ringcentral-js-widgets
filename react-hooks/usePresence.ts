import type {
  ContactPresence,
  IContact,
} from '@ringcentral-integration/commons/interfaces/Contact.model';
import { useSleep } from '@ringcentral/juno';
import { useEffect, useState } from 'react';
import { usePromise } from 'react-use';

export type GetPresenceFn = (
  contact: IContact,
  useCache: boolean,
) => Promise<ContactPresence | null>;

/**
 * get presence state from contact, and that will auto get data from that fetch callback
 * @param contact
 * @param fetch fetch presence
 * @param timeout -1 means not to use timeout
 * @returns
 */
export const usePresence = (
  contact: IContact & { presence?: ContactPresence },
  {
    fetch,
    timeout = -1,
  }: {
    fetch: GetPresenceFn | undefined;
    timeout?: number;
  },
) => {
  const [presence, setPresence] = useState(contact?.presence ?? null);
  const mounted = usePromise();
  const { sleep } = useSleep();
  useEffect(() => {
    async function fetchPresence() {
      if (fetch && contact) {
        const result = await mounted(fetch!(contact, true));
        setPresence(result);
      } else {
        setPresence(null);
      }
    }
    if (timeout >= 0) {
      sleep(timeout).then(() => {
        fetchPresence();
      });
    } else {
      fetchPresence();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact, fetch]);
  return presence;
};
