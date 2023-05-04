import { sleep } from '../utils';

/**
 * @deprecated
 *
 * TODO: should find way to wait subscribe event correctly
 */
export const waitForSubscribe = async () => {
  await sleep(2.5 * 1000);
};
