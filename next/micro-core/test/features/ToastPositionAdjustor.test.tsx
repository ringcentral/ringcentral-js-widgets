import { renderViewPanel } from '@ringcentral-integration/app-demo-test/test/steps/renderView';
import { screen } from '@ringcentral-integration/test-utils';
import React, { type ContextType } from 'react';
import { noop } from 'rxjs';

import {
  AppContext,
  AppRefsContext,
} from '../../src/app/components/AppContext/AppContext';
import { ToastPositionAdjustor } from '../../src/app/components/AppContext/ToastPositionAdjustor';

type AppContextValue = ContextType<typeof AppContext>;
type AppRefsContextValue = ContextType<typeof AppRefsContext>;

const mockUseResizeObserver = jest.fn();

jest.mock('@ringcentral/spring-ui', () => {
  const actual = jest.requireActual('@ringcentral/spring-ui');
  return {
    ...actual,
    useResizeObserver: (...args: unknown[]) => mockUseResizeObserver(...args),
  };
});

function buildAppContextValue(
  overrides: Partial<AppContextValue> = {},
): AppContextValue {
  return {
    nav: null,
    setNav: noop,
    title: null,
    setTitle: noop,
    navOverrideMode: false,
    setNavOverrideMode: noop,
    footer: null,
    setFooter: noop,
    footerHeight: 0,
    setFooterHeight: jest.fn(),
    additionalFooterHeightRef: { current: 0 },
    reset: noop,
    cancelReset: noop,
    announcementBottomAnchorRef: { current: null },
    announcementRef: { current: null },
    mainContentRef: { current: null },
    expandedContentRef: { current: null },
    ...overrides,
  };
}

function buildAppRefsContextValue(
  overrides: Partial<AppRefsContextValue> = {},
): AppRefsContextValue {
  return {
    additionalFooterHeightRef: { current: 0 },
    announcementRef: { current: null },
    announcementBottomAnchorRef: { current: null },
    mainContentRef: { current: null },
    expandedContentRef: { current: null },
    ...overrides,
  };
}

describe('ToastPositionAdjustor', () => {
  let resizeCallback: () => void;

  beforeEach(() => {
    resizeCallback = () => undefined;
    mockUseResizeObserver.mockImplementation((_ref, callback: () => void) => {
      resizeCallback = callback;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('registers useResizeObserver with ref and update callback', async () => {
    const appContextValue = buildAppContextValue();
    const appRefsContextValue = buildAppRefsContextValue();
    await renderViewPanel(
      <AppContext.Provider value={appContextValue}>
        <AppRefsContext.Provider value={appRefsContextValue}>
          <ToastPositionAdjustor>
            <div data-sign="footer-target" />
          </ToastPositionAdjustor>
        </AppRefsContext.Provider>
      </AppContext.Provider>,
    );
    expect(mockUseResizeObserver).toHaveBeenCalledTimes(1);
    expect(mockUseResizeObserver.mock.calls[0][1]).toBe(resizeCallback);
  });

  test('calls setFooterHeight with measured clientHeight plus ref and prop extras', async () => {
    const setFooterHeight = jest.fn();
    const additionalFooterHeightRef = { current: 12 };
    const appContextValue = buildAppContextValue({
      setFooterHeight,
      footerHeight: 99,
    });
    const appRefsContextValue = buildAppRefsContextValue({
      additionalFooterHeightRef,
    });
    await renderViewPanel(
      <AppContext.Provider value={appContextValue}>
        <AppRefsContext.Provider value={appRefsContextValue}>
          <ToastPositionAdjustor additionalFooterHeight={8}>
            <div data-sign="footer-target" />
          </ToastPositionAdjustor>
        </AppRefsContext.Provider>
      </AppContext.Provider>,
    );
    const el = screen.getByTestId('footer-target');
    Object.defineProperty(el, 'clientHeight', {
      configurable: true,
      value: 40,
    });
    resizeCallback();
    expect(setFooterHeight).toHaveBeenCalledWith(40 + 12 + 8);
  });

  test('calls setFooterHeight with 0 when clientHeight and optional offsets are 0', async () => {
    const setFooterHeight = jest.fn();
    const appContextValue = buildAppContextValue({ setFooterHeight });
    const appRefsContextValue = buildAppRefsContextValue();
    await renderViewPanel(
      <AppContext.Provider value={appContextValue}>
        <AppRefsContext.Provider value={appRefsContextValue}>
          <ToastPositionAdjustor>
            <div data-sign="footer-target" />
          </ToastPositionAdjustor>
        </AppRefsContext.Provider>
      </AppContext.Provider>,
    );
    const el = screen.getByTestId('footer-target');
    Object.defineProperty(el, 'clientHeight', {
      configurable: true,
      value: 0,
    });
    resizeCallback();
    expect(setFooterHeight).toHaveBeenCalledWith(0);
  });

  test('does not call setFooterHeight when footer element is not mounted(use a empty component as a non pass ref component to make not got element)', async () => {
    const setFooterHeight = jest.fn();
    const appContextValue = buildAppContextValue({
      setFooterHeight,
      footerHeight: 99,
    });
    const appRefsContextValue = buildAppRefsContextValue();

    const A = () => {
      return <div></div>;
    };

    await renderViewPanel(
      <AppContext.Provider value={appContextValue}>
        <AppRefsContext.Provider value={appRefsContextValue}>
          <ToastPositionAdjustor>
            <A />
          </ToastPositionAdjustor>
        </AppRefsContext.Provider>
      </AppContext.Provider>,
    );

    expect(setFooterHeight).not.toHaveBeenCalled();
  });
});
