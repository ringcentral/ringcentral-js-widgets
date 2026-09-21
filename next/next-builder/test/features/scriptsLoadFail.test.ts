import {
  createMockAction,
  screen,
  userEvent,
} from '@ringcentral-integration/test-utils';
import {
  mockWindowLocation,
  restoreWindowLocation,
} from '@ringcentral-integration/test-utils/mock/locationMock.js';

afterEach(() => {
  restoreWindowLocation();
});

describe('make sure the scriptsLoadFail script work correctly', () => {
  const enUsContent = 'Please confirm your network status and refresh app.';
  const enUsTitle = 'Network unavailable';

  it.each`
    locale     | content                                                                     | title
    ${'en-us'} | ${enUsContent}                                                              | ${enUsTitle}
    ${'es-mx'} | ${'Confirme su estado de red y actualice la aplicación.'}                   | ${'Red no disponible'}
    ${'es-es'} | ${'Confirme el estado de su red y actualice la aplicación'}                 | ${'Red no disponible'}
    ${'fr-ch'} | ${'Veuillez vérifier l’état de votre réseau et actualiser l’application.'}  | ${'Réseau indisponible'}
    ${'fr-ca'} | ${'Veuillez confirmer l’état de votre réseau et actualiser l’application.'} | ${'Réseau non disponible'}
  `('language text should be correct $locale', async ({ locale, content, title }) => {
    const windowListenerSpy = createMockAction();
    jest.resetModules();
    jest.restoreAllMocks();
    const locationMock = mockWindowLocation();

    document.body.innerHTML = '';
    const root = document.createElement('div');
    root.id = 'app';
    document.body.appendChild(root);

    Object.defineProperty(global.navigator, 'languages', {
      value: [locale],
      configurable: true,
    });

    const fn = jest
      .spyOn(global.window, 'addEventListener')
      .mockImplementation(windowListenerSpy.addListener);

    require('../../src/scriptsLoadFail/inline/scriptsFail.js');

    expect(fn).toHaveBeenCalledWith('error', expect.any(Function), true);

    windowListenerSpy.action$.next([
      'error',
      {
        type: 'error',
        target: {
          nodeName: 'SCRIPT',
          src: 'http://localhost/next-internal.js',
        },
      },
    ]);
    expect(windowListenerSpy.addListener).toHaveBeenCalledTimes(1);

    await checkRenderResult(content, title, locationMock);

    windowListenerSpy.destroy();
  });
});

async function checkRenderResult(
  content: string,
  title: string,
  locationMock: ReturnType<typeof mockWindowLocation>,
) {
  screen.getByText(content);
  screen.getByText(title);

  // click refresh button should reload page
  await userEvent.click(screen.getByRole('button'));

  expect(locationMock.reload).toHaveBeenCalled();
}
