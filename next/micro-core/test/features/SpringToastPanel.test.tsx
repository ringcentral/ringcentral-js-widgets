import { renderViewPanel } from '@ringcentral-integration/app-demo-test/test/steps/renderView';
import { fireEvent, screen } from '@ringcentral-integration/test-utils';
import { RcSlide } from '@ringcentral/juno';
import React, { type ContextType } from 'react';
import { noop } from 'rxjs';

import { AppContext } from '../../src/app/components/AppContext/AppContext';
import type { ToastItem } from '../../src/app/services';
import { ToastPanel } from '../../src/app/views/SpringToastView/ToastPanel/ToastPanel';

jest.mock('@ringcentral/juno', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react');
  const actual = jest.requireActual('@ringcentral/juno');
  return {
    ...actual,
    RcSlide: jest.fn((props: { direction?: string; children?: unknown }) =>
      React.createElement(
        'div',
        { 'data-sign': 'rc-slide', 'data-direction': props.direction },
        props.children,
      ),
    ),
  };
});

type AppContextValue = ContextType<typeof AppContext>;

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

function buildToast(overrides: Partial<ToastItem> = {}): ToastItem {
  return {
    id: 'toast-1',
    message: 'Toast message body',
    timestamp: Date.now(),
    level: 'info',
    ttl: 5000,
    ...overrides,
  };
}

describe('SpringToastView ToastPanel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders nothing when there are no messages', async () => {
    const dismiss = jest.fn();
    await renderViewPanel(
      <AppContext.Provider value={buildAppContextValue()}>
        <ToastPanel messages={[]} dismiss={dismiss} />
      </AppContext.Provider>,
    );
    expect(
      document.querySelector('[data-sign="toast-container"]'),
    ).not.toBeInTheDocument();
  });

  test('renders toast text and container', async () => {
    const dismiss = jest.fn();
    await renderViewPanel(
      <AppContext.Provider value={buildAppContextValue()}>
        <ToastPanel messages={[buildToast()]} dismiss={dismiss} />
      </AppContext.Provider>,
    );
    expect(screen.getByText('Toast message body')).toBeInTheDocument();
    expect(
      document.querySelector('[data-sign="toast-container"]'),
    ).toBeInTheDocument();
  });

  test('aligns container to top when position is top', async () => {
    const dismiss = jest.fn();
    await renderViewPanel(
      <AppContext.Provider value={buildAppContextValue()}>
        <ToastPanel
          messages={[buildToast()]}
          dismiss={dismiss}
          position="top"
        />
      </AppContext.Provider>,
    );
    const root = document.querySelector('[data-sign="toast-container"]');
    expect(root).toHaveClass('justify-start');
  });

  test('aligns container to bottom when position is bottom', async () => {
    const dismiss = jest.fn();
    await renderViewPanel(
      <AppContext.Provider value={buildAppContextValue()}>
        <ToastPanel
          messages={[buildToast()]}
          dismiss={dismiss}
          position="bottom"
        />
      </AppContext.Provider>,
    );
    const root = document.querySelector('[data-sign="toast-container"]');
    expect(root).toHaveClass('justify-end');
  });

  test('sets RcSlide direction to down when position is top', async () => {
    const dismiss = jest.fn();
    await renderViewPanel(
      <AppContext.Provider value={buildAppContextValue()}>
        <ToastPanel
          messages={[buildToast()]}
          dismiss={dismiss}
          position="top"
        />
      </AppContext.Provider>,
    );
    expect(RcSlide).toHaveBeenCalled();
    const firstCallProps = jest.mocked(RcSlide).mock.calls[0][0];
    expect(firstCallProps.direction).toBe('down');
    expect(screen.getByTestId('rc-slide')).toHaveAttribute(
      'data-direction',
      'down',
    );
  });

  test('sets RcSlide direction to up when position is bottom', async () => {
    const dismiss = jest.fn();
    await renderViewPanel(
      <AppContext.Provider value={buildAppContextValue()}>
        <ToastPanel
          messages={[buildToast()]}
          dismiss={dismiss}
          position="bottom"
        />
      </AppContext.Provider>,
    );
    const firstCallProps = jest.mocked(RcSlide).mock.calls[0][0];
    expect(firstCallProps.direction).toBe('up');
    expect(screen.getByTestId('rc-slide')).toHaveAttribute(
      'data-direction',
      'up',
    );
  });

  test('calls dismiss with escapeKeyDown when Escape is pressed and escape is enabled', async () => {
    const dismiss = jest.fn();
    await renderViewPanel(
      <AppContext.Provider value={buildAppContextValue()}>
        <ToastPanel
          messages={[buildToast({ disableEscapeKeyDown: false })]}
          dismiss={dismiss}
          disableEscapeKeyDown={false}
        />
      </AppContext.Provider>,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(dismiss).toHaveBeenCalledWith('toast-1', 'escapeKeyDown');
  });

  test('renders footer spacer when footer height is set', async () => {
    const dismiss = jest.fn();
    await renderViewPanel(
      <AppContext.Provider value={buildAppContextValue({ footerHeight: 40 })}>
        <ToastPanel messages={[buildToast()]} dismiss={dismiss} />
      </AppContext.Provider>,
    );
    const spacers = document.querySelectorAll('[style*="height"]');
    const footerSpacer = Array.from(spacers).find(
      (el) => (el as HTMLElement).style.height === '40px',
    );
    expect(footerSpacer).toBeTruthy();
  });
});
