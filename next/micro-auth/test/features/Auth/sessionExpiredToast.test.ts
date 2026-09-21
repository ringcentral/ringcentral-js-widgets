import { Auth } from '../../../src/app/services/Auth';
import type { AuthOptions } from '../../../src/app/services/Auth/Auth.interface';

class TestAuth extends Auth {
  showSessionExpiredToast() {
    this._showSessionExpiredToast();
  }
}

const createAuth = (options?: AuthOptions) => {
  const danger = jest.fn();
  const auth = new TestAuth(
    {} as never,
    { danger } as never,
    {} as never,
    {} as never,
    {
      setExpanded: jest.fn(),
      takeUntilAppDestroy: <T>(source: T) => source,
    } as never,
    {} as never,
    undefined,
    undefined,
    undefined,
    options,
  );

  return { auth, danger };
};

describe('Auth session-expired Toast', () => {
  it('shows the generic Toast by default', () => {
    const { auth, danger } = createAuth();

    auth.showSessionExpiredToast();

    expect(danger).toHaveBeenCalledWith({
      message: 'Session expired. Please sign in.',
      ttl: 0,
    });
  });

  it('allows a host app to render its own session-expired surface', () => {
    const { auth, danger } = createAuth({
      enableSessionExpiredToast: false,
    });

    auth.showSessionExpiredToast();

    expect(danger).not.toHaveBeenCalled();
  });
});
