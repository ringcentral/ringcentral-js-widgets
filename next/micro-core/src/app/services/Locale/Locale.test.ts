import { of } from 'rxjs';

import { Locale } from './Locale';

describe('Locale client locale sync', () => {
  const createLocale = (
    overrides: Partial<Locale> & Record<string, unknown> = {},
  ) => {
    const locale = Object.create(Locale.prototype) as Locale & {
      _clientLocaleReady: Promise<void>;
      _innerSetAndLoadLocale: jest.Mock<Promise<string>, [string]>;
      _portManager: { clientId?: string; isClient: boolean };
      _setClientLocaleSuccess: jest.Mock<void, [string, string]>;
      logger: { error: jest.Mock<void, [string, unknown]> };
      normalizeLocale: jest.Mock<string, [string]>;
      setClientLocaleSuccess: jest.Mock<Promise<void>, [string, string]>;
      setLocale: jest.Mock<Promise<void>, [string, boolean?]>;
    };

    Object.assign(locale, {
      _clientLocaleReady: Promise.resolve(),
      _innerSetAndLoadLocale: jest.fn(async (nextLocale: string) => nextLocale),
      _portManager: {
        clientId: 'client-1',
        isClient: true,
      },
      _setClientLocaleSuccess: jest.fn(),
      logger: {
        error: jest.fn(),
      },
      normalizeLocale: jest.fn((nextLocale: string) =>
        nextLocale.toUpperCase(),
      ),
      setClientLocaleSuccess: jest.fn(async () => {}),
      setLocale: jest.fn(async () => {}),
      ...overrides,
    });

    return locale;
  };

  it('falls back to setLocale outside shared clients', async () => {
    const locale = createLocale({
      _portManager: {
        clientId: undefined,
        isClient: false,
      },
    });

    await locale.setClientLocale('fr-FR', false);

    expect(locale.setLocale).toHaveBeenCalledWith('fr-FR', false);
    expect(locale._innerSetAndLoadLocale).not.toHaveBeenCalled();
    expect(locale.setClientLocaleSuccess).not.toHaveBeenCalled();
  });

  it('waits for client locale readiness before syncing a normalized locale', async () => {
    let resolveReady!: () => void;
    const clientLocaleReady = new Promise<void>((resolve) => {
      resolveReady = resolve;
    });
    const locale = createLocale({
      _clientLocaleReady: clientLocaleReady,
    });

    expect(locale.clientLocaleReady).toBe(clientLocaleReady);

    const syncPromise = locale.setClientLocale('fr-fr');

    expect(locale._innerSetAndLoadLocale).not.toHaveBeenCalled();

    resolveReady();
    await syncPromise;

    expect(locale.normalizeLocale).toHaveBeenCalledWith('fr-fr');
    expect(locale._innerSetAndLoadLocale).toHaveBeenCalledWith('FR-FR');
    expect(locale._setClientLocaleSuccess).toHaveBeenCalledWith(
      'client-1',
      'FR-FR',
    );
    expect(locale.setClientLocaleSuccess).toHaveBeenCalledWith(
      'client-1',
      'FR-FR',
    );
  });

  it('logs and suppresses client locale loading failures', async () => {
    const error = new Error('locale load failed');
    const locale = createLocale({
      _innerSetAndLoadLocale: jest.fn().mockRejectedValue(error),
    });

    await locale.setClientLocale('raw-locale', false);

    expect(locale.normalizeLocale).not.toHaveBeenCalled();
    expect(locale._setClientLocaleSuccess).not.toHaveBeenCalled();
    expect(locale.setClientLocaleSuccess).not.toHaveBeenCalled();
    expect(locale.logger.error).toHaveBeenCalledWith(
      'load client locale fail',
      error,
    );
  });

  it('skips server locale syncing when shared client syncing is disabled', async () => {
    const locale = createLocale({
      _localeOptions: {
        defaultLocale: 'en-US',
        detectBrowser: false,
        syncServerLocaleToClients: false,
      },
      _setClientLocaleSuccess: jest.fn(function (
        this: Locale & { clientLocales: Record<string, string | null> },
        clientId: string,
        nextLocale: string,
      ) {
        this.clientLocales[clientId] = nextLocale;
      }),
      clientLocales: {},
      locale: 'de-DE',
      logger: {
        error: jest.fn(),
        log: jest.fn(),
      },
      ready$: of(undefined),
    });

    await (locale as unknown as { _listenServerToClientLocaleLoad: () => void })
      ._listenServerToClientLocaleLoad();
    await Promise.resolve();

    expect(locale._innerSetAndLoadLocale).toHaveBeenCalledTimes(1);
    expect(locale._innerSetAndLoadLocale).toHaveBeenCalledWith('en-US');
    expect(locale.setClientLocaleSuccess).toHaveBeenCalledWith(
      'client-1',
      'en-US',
    );
  });
});
