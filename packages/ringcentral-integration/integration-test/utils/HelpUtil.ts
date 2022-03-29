import { Auth } from '../../modules/AuthV2';
import { waitUntilEqual } from './WaitUtil';

export function containsErrorMessage(errorArray, errorMessageString) {
  return errorArray.find((element) => {
    if (element.message === errorMessageString) {
      return element;
    }
    return null;
  });
}

export async function ensureLogin(
  auth: Auth,
  account: {
    username: string;
    password: string;
  },
) {
  await waitUntilEqual(() => auth.ready, 'Auth ready', true, 60);
  const waitLoginSuccess = new Promise<void>((resolve) => {
    const cleanFunc = auth.addAfterLoggedInHandler(() => {
      cleanFunc();
      resolve();
    });
  });
  auth.login({
    ...account,
  });
  await waitLoginSuccess;
}
