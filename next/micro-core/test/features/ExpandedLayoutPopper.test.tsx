import { render, screen, waitFor } from '@ringcentral-integration/test-utils';
import React, { type ContextType } from 'react';
import { noop } from 'rxjs';

import { AppRefsContext, ExpandedLayoutPopper } from '../../src/app/components';

type AppRefsContextValue = ContextType<typeof AppRefsContext>;

const originalResizeObserver = global.ResizeObserver;
const originalWindowResizeObserver = window.ResizeObserver;

function createRect({
  top,
  left,
  width,
  height,
}: {
  top: number;
  left: number;
  width: number;
  height: number;
}): DOMRect {
  return {
    top,
    left,
    width,
    height,
    x: left,
    y: top,
    right: left + width,
    bottom: top + height,
    toJSON: () => ({}),
  } as DOMRect;
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

describe('ExpandedLayoutPopper', () => {
  beforeEach(() => {
    global.ResizeObserver = class ResizeObserverMock {
      observe() {}

      unobserve() {}

      disconnect() {}
    } as unknown as typeof ResizeObserver;
    window.ResizeObserver = global.ResizeObserver;
  });

  afterEach(() => {
    global.ResizeObserver = originalResizeObserver;
    window.ResizeObserver = originalWindowResizeObserver;
    jest.restoreAllMocks();
  });

  test('renders children over main content when collapsed', () => {
    const mainContent = document.createElement('div');
    const expandedContent = document.createElement('div');
    document.body.append(mainContent, expandedContent);
    jest
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function getBoundingClientRect() {
        if (this === mainContent) {
          return createRect({
            top: 12,
            left: 24,
            width: 200,
            height: 100,
          });
        }

        return createRect({
          top: 0,
          left: 0,
          width: 0,
          height: 0,
        });
      });

    render(
      <AppRefsContext.Provider
        value={buildAppRefsContextValue({
          mainContentRef: { current: mainContent },
          expandedContentRef: { current: expandedContent },
        })}
      >
        <ExpandedLayoutPopper expanded={false}>
          <div data-sign="popper-content">content</div>
        </ExpandedLayoutPopper>
      </AppRefsContext.Provider>,
    );

    const overlay = screen.getByTestId('popper-content').parentElement!;
    expect(overlay).toHaveStyle({
      top: '12px',
      left: '24px',
    });
    expect(expandedContent.querySelector('.size-full')).toBeInTheDocument();
  });

  test('renders children over expanded layout placeholder when expanded', async () => {
    const mainContent = document.createElement('div');
    const expandedContent = document.createElement('div');
    document.body.append(mainContent, expandedContent);
    jest
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function getBoundingClientRect() {
        if (this === mainContent) {
          return createRect({
            top: 12,
            left: 24,
            width: 200,
            height: 100,
          });
        }

        if (
          this instanceof HTMLElement &&
          this.classList.contains('size-full')
        ) {
          return createRect({
            top: 72,
            left: 96,
            width: 320,
            height: 160,
          });
        }

        return createRect({
          top: 0,
          left: 0,
          width: 0,
          height: 0,
        });
      });

    const contextValue = buildAppRefsContextValue({
      mainContentRef: { current: mainContent },
      expandedContentRef: { current: expandedContent },
    });
    const renderPopper = (expanded: boolean) => (
      <AppRefsContext.Provider value={contextValue}>
        <ExpandedLayoutPopper expanded={expanded}>
          <div data-sign="popper-content">content</div>
        </ExpandedLayoutPopper>
      </AppRefsContext.Provider>
    );

    const { rerender } = render(renderPopper(true));

    await waitFor(() => {
      expect(screen.getByTestId('popper-content').parentElement).toHaveStyle({
        top: '72px',
        left: '96px',
      });
    });

    rerender(renderPopper(false));

    expect(screen.getByTestId('popper-content').parentElement).toHaveStyle({
      top: '12px',
      left: '24px',
    });
  });
});
