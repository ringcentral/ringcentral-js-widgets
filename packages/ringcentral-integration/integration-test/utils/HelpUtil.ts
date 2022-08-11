import { Auth } from '../../modules/Auth';
import { waitUntilTo } from '../../utils';

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
  await waitUntilTo(() => {
    expect(auth.ready).toBeTruthy();
  });
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
