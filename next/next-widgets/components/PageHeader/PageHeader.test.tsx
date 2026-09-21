import { render } from '@testing-library/react';
import React from 'react';

import { PageHeader } from './PageHeader';

const mockUseResizeObserver = jest.fn();

jest.mock('@ringcentral/spring-ui', () => {
  const actual = jest.requireActual('@ringcentral/spring-ui');

  return {
    ...actual,
    useResizeObserver: (...args: unknown[]) => mockUseResizeObserver(...args),
  };
});

const setOffsetWidth = (element: Element, width: number) => {
  Object.defineProperty(element, 'offsetWidth', {
    configurable: true,
    value: width,
  });
};

const renderPageHeader = () => {
  const { container } = render(
    <PageHeader
      startAdornment={<span data-sign="start" />}
      endAdornment={<span data-sign="end" />}
    />,
  );
  const header = container.firstElementChild as HTMLElement;
  const startBox = header.children[0] as HTMLElement;
  const endBox = header.children[1] as HTMLElement;

  return {
    startBox,
    endBox,
    startContent: startBox.firstElementChild as HTMLElement,
    endContent: endBox.firstElementChild as HTMLElement,
    syncAdornmentWidth: mockUseResizeObserver.mock.calls[0][1] as () => void,
  };
};

describe('PageHeader', () => {
  beforeEach(() => {
    mockUseResizeObserver.mockReset();
  });

  it('configures resize observation to run the trailing callback', () => {
    render(<PageHeader />);

    expect(mockUseResizeObserver).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(Function),
      {
        mode: 'throttle',
        options: {
          trailing: true,
        },
      },
    );
  });

  it('observes both unsized content wrappers instead of the sized boxes', () => {
    const { startBox, endBox, startContent, endContent } = renderPageHeader();

    expect(mockUseResizeObserver).toHaveBeenCalledTimes(2);
    const observedTargets = mockUseResizeObserver.mock.calls.map(
      ([target]) => target.current,
    );
    expect(observedTargets).toEqual([startContent, endContent]);
    expect(observedTargets).not.toContain(startBox);
    expect(observedTargets).not.toContain(endBox);
  });

  it('sizes both sides to the widest content', () => {
    const { startBox, endBox, startContent, endContent, syncAdornmentWidth } =
      renderPageHeader();

    setOffsetWidth(startContent, 40);
    setOffsetWidth(endContent, 96);
    syncAdornmentWidth();

    expect(startBox.style.minWidth).toBe('96px');
    expect(endBox.style.minWidth).toBe('96px');
  });

  it('keeps measuring the real content width after a size was applied', () => {
    const { startBox, endBox, startContent, endContent, syncAdornmentWidth } =
      renderPageHeader();

    setOffsetWidth(startContent, 40);
    setOffsetWidth(endContent, 96);
    syncAdornmentWidth();

    // the sized boxes stay at 96px while the observed content shrinks
    setOffsetWidth(endContent, 24);
    syncAdornmentWidth();

    expect(startBox.style.minWidth).toBe('40px');
    expect(endBox.style.minWidth).toBe('40px');
  });
});
