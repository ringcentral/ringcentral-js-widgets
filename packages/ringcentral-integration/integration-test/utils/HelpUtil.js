import 'core-js/fn/array/find';
import { waitUntilNotNull } from './WaitUtil';

export function containsErrorMessage(errorArray, errorMessageString) {
  return errorArray.find((element) => {
    if (element.message === errorMessageString) {
      return element;
    }
    return null;
  });
}

export async function ensureLogin(auth, account) {
  await auth.login({
    ...account,
  });
  return await waitUntilNotNull(() => auth.ownerId, 'Login Success', 6);
}
