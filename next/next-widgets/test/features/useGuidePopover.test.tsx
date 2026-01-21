import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';

import {
  GuideAnchor,
  GuidePopover,
  GuidePopoverInstance,
  isElementInsideViewport,
  useGuidePopover,
  useGuidePopoverManager,
} from '../../components/useGuidePopover';

type ManagerHandle = {
  manager: ReturnType<typeof useGuidePopoverManager>;
  popovers: GuidePopoverInstance[];
};

type ManagerTestProps = {
  autoStart?: boolean;
  initialStep?: number;
};

const ManagerTest = forwardRef<ManagerHandle, ManagerTestProps>(
  ({ autoStart, initialStep }, ref) => {
    const popover1 = useGuidePopover({});
    const popover2 = useGuidePopover({});
    const popover3 = useGuidePopover({});

    const popovers = useMemo(
      () => [popover1, popover2, popover3],
      [popover1, popover2, popover3],
    );

    const manager = useGuidePopoverManager(popovers, {
      autoStart,
      initialStep,
    });

    useImperativeHandle(ref, () => ({ manager, popovers }), [
      manager,
      popovers,
    ]);

    return (
      <>
        <GuideAnchor
          ref={popover1.anchorRef}
          popoverOpen={popover1.popoverOpen}
          closePopover={popover1.close}
          data-sign="anchor-1"
          showHint={false}
        >
          <button type="button">Anchor 1</button>
        </GuideAnchor>
        <GuidePopover
          anchorRef={popover1.anchorRef}
          popoverOpen={popover1.popoverOpen}
        >
          <div data-sign="popover-1">Step 1</div>
        </GuidePopover>

        <GuideAnchor
          ref={popover2.anchorRef}
          popoverOpen={popover2.popoverOpen}
          closePopover={popover2.close}
          data-sign="anchor-2"
          showHint={false}
        >
          <button type="button">Anchor 2</button>
        </GuideAnchor>
        <GuidePopover
          anchorRef={popover2.anchorRef}
          popoverOpen={popover2.popoverOpen}
        >
          <div data-sign="popover-2">Step 2</div>
        </GuidePopover>

        <GuideAnchor
          ref={popover3.anchorRef}
          popoverOpen={popover3.popoverOpen}
          closePopover={popover3.close}
          data-sign="anchor-3"
          showHint={false}
        >
          <button type="button">Anchor 3</button>
        </GuideAnchor>
        <GuidePopover
          anchorRef={popover3.anchorRef}
          popoverOpen={popover3.popoverOpen}
        >
          <div data-sign="popover-3">Step 3</div>
        </GuidePopover>
      </>
    );
  },
);

const TestPopover = ({ showHint = false }: { showHint?: boolean }) => {
  const { anchorRef, popoverOpen, open, close } = useGuidePopover({});

  return (
    <>
      <GuideAnchor
        ref={anchorRef}
        popoverOpen={popoverOpen}
        closePopover={close}
        data-sign="guide-anchor"
        showHint={showHint}
      >
        <button type="button" data-sign="open-button" onClick={open}>
          Open
        </button>
        <button type="button" data-sign="close-button" onClick={close}>
          Close
        </button>
      </GuideAnchor>
      <GuidePopover anchorRef={anchorRef} popoverOpen={popoverOpen}>
        <div data-sign="popover-content">Popover content</div>
      </GuidePopover>
    </>
  );
};

const TestPopoverNoAnimation = () => {
  const { anchorRef, popoverOpen, close } = useGuidePopover({});

  return (
    <GuideAnchor
      ref={anchorRef}
      popoverOpen={popoverOpen}
      closePopover={close}
      data-sign="guide-anchor"
      showHint
      animateHint={false}
    >
      <span>Anchor</span>
    </GuideAnchor>
  );
};

describe('useGuidePopover', () => {
  it('opens and closes the popover via exposed handlers', () => {
    render(<TestPopover />);

    expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('open-button'));

    expect(screen.getByTestId('popover-content')).toBeInTheDocument();

    expect(screen.getByTestId('guide-anchor').className).toContain(
      'bg-neutral-base',
    );

    userEvent.click(screen.getByTestId('close-button'));

    expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
    expect(screen.getByTestId('guide-anchor').className).not.toContain(
      'bg-neutral-base',
    );
  });

  it('renders the hint indicator when showHint is true', () => {
    render(<TestPopover showHint />);

    const anchor = screen.getByTestId('guide-anchor');
    expect(anchor.className).toContain('relative');

    const hints = anchor.querySelectorAll('.size-2');
    expect(hints).toHaveLength(2);
    expect(anchor.querySelector('.animate-ping')).not.toBeNull();
  });

  it('skips hint animation when animateHint is false', () => {
    render(<TestPopoverNoAnimation />);

    const anchor = screen.getByTestId('guide-anchor');
    const hints = anchor.querySelectorAll('.size-2');

    expect(hints).toHaveLength(1);
    expect(anchor.querySelector('.animate-ping')).toBeNull();
  });

  it('applies custom className to anchor', () => {
    const TestComponent = () => {
      const { anchorRef, popoverOpen, close } = useGuidePopover({});
      return (
        <GuideAnchor
          ref={anchorRef}
          popoverOpen={popoverOpen}
          closePopover={close}
          data-sign="guide-anchor"
          className="custom-class"
          showHint={false}
        >
          <span>Test</span>
        </GuideAnchor>
      );
    };

    render(<TestComponent />);
    const anchor = screen.getByTestId('guide-anchor');
    expect(anchor.className).toContain('custom-class');
  });

  it('applies custom activeClassName when popover is open', () => {
    const TestComponent = () => {
      const { anchorRef, popoverOpen, close, open } = useGuidePopover({});
      return (
        <>
          <GuideAnchor
            ref={anchorRef}
            popoverOpen={popoverOpen}
            closePopover={close}
            data-sign="guide-anchor"
            activeClassName="custom-active-class"
            showHint={false}
          >
            <button type="button" onClick={open}>
              Open
            </button>
          </GuideAnchor>
          <GuidePopover anchorRef={anchorRef} popoverOpen={popoverOpen}>
            Content
          </GuidePopover>
        </>
      );
    };

    render(<TestComponent />);
    const anchor = screen.getByTestId('guide-anchor');
    expect(anchor.className).not.toContain('custom-active-class');

    userEvent.click(screen.getByText('Open'));

    expect(anchor.className).toContain('custom-active-class');
  });

  it('applies custom hintClassName', () => {
    const TestComponent = () => {
      const { anchorRef, popoverOpen, close } = useGuidePopover({});
      return (
        <GuideAnchor
          ref={anchorRef}
          popoverOpen={popoverOpen}
          closePopover={close}
          data-sign="guide-anchor"
          hintClassName="custom-hint-class"
          showHint
        >
          <span>Test</span>
        </GuideAnchor>
      );
    };

    render(<TestComponent />);
    const anchor = screen.getByTestId('guide-anchor');
    const hints = anchor.querySelectorAll('.custom-hint-class');
    expect(hints.length).toBeGreaterThan(0);
  });

  it('closes popover when anchor unmounts', () => {
    const TestComponent = ({ showAnchor }: { showAnchor: boolean }) => {
      const { anchorRef, popoverOpen, open, close } = useGuidePopover({});

      return (
        <>
          {showAnchor && (
            <GuideAnchor
              ref={anchorRef}
              popoverOpen={popoverOpen}
              closePopover={close}
              data-sign="guide-anchor"
              showHint={false}
            >
              <button type="button" onClick={open}>
                Open
              </button>
            </GuideAnchor>
          )}
          <GuidePopover anchorRef={anchorRef} popoverOpen={popoverOpen}>
            <div data-sign="popover-content">Content</div>
          </GuidePopover>
        </>
      );
    };

    const { rerender } = render(<TestComponent showAnchor />);

    userEvent.click(screen.getByText('Open'));
    expect(screen.getByTestId('popover-content')).toBeInTheDocument();

    rerender(<TestComponent showAnchor={false} />);

    expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
  });

  it('does not render popover when popoverOpen is false', () => {
    const TestComponent = () => {
      const { anchorRef, popoverOpen } = useGuidePopover({});
      return (
        <>
          <div ref={anchorRef} data-sign="anchor" />
          <GuidePopover anchorRef={anchorRef} popoverOpen={popoverOpen}>
            <div data-sign="popover-content">Content</div>
          </GuidePopover>
        </>
      );
    };

    render(<TestComponent />);
    expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
  });

  it('renders popover with Portal and Backdrop when open', () => {
    const TestComponent = () => {
      const { anchorRef, popoverOpen, open } = useGuidePopover({});
      return (
        <>
          <button type="button" onClick={open} data-sign="open-button">
            Open
          </button>
          <GuidePopover anchorRef={anchorRef} popoverOpen={popoverOpen}>
            <div data-sign="popover-content">Content</div>
          </GuidePopover>
        </>
      );
    };

    render(<TestComponent />);
    userEvent.click(screen.getByTestId('open-button'));

    expect(screen.getByTestId('popover-content')).toBeInTheDocument();
    expect(screen.getByTestId('guidePopover')).toBeInTheDocument();
  });

  it('scrolls into view when scrollIntoView is true', () => {
    const scrollIntoViewSpy = jest.fn();
    const TestComponent = () => {
      const { anchorRef, popoverOpen, open, close } = useGuidePopover({
        scrollIntoView: true,
      });

      React.useEffect(() => {
        if (anchorRef.current) {
          anchorRef.current.scrollIntoView = scrollIntoViewSpy;
        }
      }, []);

      return (
        <>
          <GuideAnchor
            ref={anchorRef}
            popoverOpen={popoverOpen}
            closePopover={close}
            data-sign="guide-anchor"
            showHint={false}
          >
            <button type="button" onClick={open} data-sign="open-button">
              Open
            </button>
          </GuideAnchor>
          <GuidePopover anchorRef={anchorRef} popoverOpen={popoverOpen}>
            Content
          </GuidePopover>
        </>
      );
    };

    render(<TestComponent />);
    userEvent.click(screen.getByTestId('open-button'));

    expect(scrollIntoViewSpy).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  });

  it('scrolls into view when scrollIntoView is visible and element is not in viewport', () => {
    const scrollIntoViewSpy = jest.fn();
    const getBoundingClientRectSpy = jest.fn(
      () =>
        ({
          top: -100,
          left: 0,
          bottom: -50,
          right: 100,
          width: 100,
          height: 50,
          x: 0,
          y: -100,
          toJSON: () => ({}),
        } as DOMRect),
    );

    const TestComponent = () => {
      const { anchorRef, popoverOpen, open, close } = useGuidePopover({
        scrollIntoView: 'visible',
      });

      React.useEffect(() => {
        if (anchorRef.current) {
          anchorRef.current.scrollIntoView = scrollIntoViewSpy;
          anchorRef.current.getBoundingClientRect = getBoundingClientRectSpy;
        }
      }, []);

      return (
        <>
          <GuideAnchor
            ref={anchorRef}
            popoverOpen={popoverOpen}
            closePopover={close}
            data-sign="guide-anchor"
            showHint={false}
          >
            <button type="button" onClick={open} data-sign="open-button">
              Open
            </button>
          </GuideAnchor>
          <GuidePopover anchorRef={anchorRef} popoverOpen={popoverOpen}>
            Content
          </GuidePopover>
        </>
      );
    };

    render(<TestComponent />);
    userEvent.click(screen.getByTestId('open-button'));

    expect(getBoundingClientRectSpy).toHaveBeenCalled();
    expect(scrollIntoViewSpy).toHaveBeenCalled();
  });

  it('does not scroll when scrollIntoView is visible and element is in viewport', () => {
    const scrollIntoViewSpy = jest.fn();
    const getBoundingClientRectSpy = jest.fn(
      () =>
        ({
          top: 100,
          left: 100,
          bottom: 150,
          right: 200,
          width: 100,
          height: 50,
          x: 100,
          y: 100,
          toJSON: () => ({}),
        } as DOMRect),
    );

    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 800,
    });
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });

    const TestComponent = () => {
      const { anchorRef, popoverOpen, open, close } = useGuidePopover({
        scrollIntoView: 'visible',
      });

      React.useEffect(() => {
        if (anchorRef.current) {
          anchorRef.current.scrollIntoView = scrollIntoViewSpy;
          anchorRef.current.getBoundingClientRect = getBoundingClientRectSpy;
        }
      }, []);

      return (
        <>
          <GuideAnchor
            ref={anchorRef}
            popoverOpen={popoverOpen}
            closePopover={close}
            data-sign="guide-anchor"
            showHint={false}
          >
            <button type="button" onClick={open} data-sign="open-button">
              Open
            </button>
          </GuideAnchor>
          <GuidePopover anchorRef={anchorRef} popoverOpen={popoverOpen}>
            Content
          </GuidePopover>
        </>
      );
    };

    render(<TestComponent />);
    userEvent.click(screen.getByTestId('open-button'));

    expect(getBoundingClientRectSpy).toHaveBeenCalled();
    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
  });

  it('does not scroll when scrollIntoView is false', () => {
    const scrollIntoViewSpy = jest.fn();
    const TestComponent = () => {
      const { anchorRef, popoverOpen, open, close } = useGuidePopover({
        scrollIntoView: false,
      });

      React.useEffect(() => {
        if (anchorRef.current) {
          anchorRef.current.scrollIntoView = scrollIntoViewSpy;
        }
      }, []);

      return (
        <>
          <GuideAnchor
            ref={anchorRef}
            popoverOpen={popoverOpen}
            closePopover={close}
            data-sign="guide-anchor"
            showHint={false}
          >
            <button type="button" onClick={open} data-sign="open-button">
              Open
            </button>
          </GuideAnchor>
          <GuidePopover anchorRef={anchorRef} popoverOpen={popoverOpen}>
            Content
          </GuidePopover>
        </>
      );
    };

    render(<TestComponent />);
    userEvent.click(screen.getByTestId('open-button'));

    expect(scrollIntoViewSpy).not.toHaveBeenCalled();
  });

  it('uses custom scrollIntoViewOptions', () => {
    const scrollIntoViewSpy = jest.fn();
    const customOptions = {
      behavior: 'auto' as ScrollBehavior,
      block: 'start' as ScrollLogicalPosition,
      inline: 'center' as ScrollLogicalPosition,
    };

    const TestComponent = () => {
      const { anchorRef, popoverOpen, open, close } = useGuidePopover({
        scrollIntoView: true,
        scrollIntoViewOptions: customOptions,
      });

      React.useEffect(() => {
        if (anchorRef.current) {
          anchorRef.current.scrollIntoView = scrollIntoViewSpy;
        }
      }, []);

      return (
        <>
          <GuideAnchor
            ref={anchorRef}
            popoverOpen={popoverOpen}
            closePopover={close}
            data-sign="guide-anchor"
            showHint={false}
          >
            <button type="button" onClick={open} data-sign="open-button">
              Open
            </button>
          </GuideAnchor>
          <GuidePopover anchorRef={anchorRef} popoverOpen={popoverOpen}>
            Content
          </GuidePopover>
        </>
      );
    };

    render(<TestComponent />);
    userEvent.click(screen.getByTestId('open-button'));

    expect(scrollIntoViewSpy).toHaveBeenCalledWith(customOptions);
  });

  it('handles open when anchorRef is null', () => {
    const TestComponent = () => {
      const { anchorRef, popoverOpen, open } = useGuidePopover({
        scrollIntoView: true,
      });

      return (
        <>
          <button type="button" onClick={open} data-sign="open-button">
            Open
          </button>
          <GuidePopover anchorRef={anchorRef} popoverOpen={popoverOpen}>
            <div data-sign="popover-content">Content</div>
          </GuidePopover>
        </>
      );
    };

    render(<TestComponent />);
    expect(() => {
      userEvent.click(screen.getByTestId('open-button'));
    }).not.toThrow();
    expect(screen.getByTestId('popover-content')).toBeInTheDocument();
  });
});

describe('useGuidePopoverManager', () => {
  it('controls a multi-step guide flow', () => {
    const ref = React.createRef<ManagerHandle>();
    render(<ManagerTest ref={ref} />);

    expect(ref.current?.manager.currentStep).toBe(-1);
    expect(ref.current?.manager.totalSteps).toBe(3);

    act(() => {
      ref.current?.manager.start();
    });

    expect(screen.getByTestId('popover-1')).toBeInTheDocument();
    expect(screen.queryByTestId('popover-2')).not.toBeInTheDocument();
    expect(ref.current?.manager.currentStep).toBe(0);
    expect(ref.current?.manager.isFirst).toBe(true);

    act(() => {
      ref.current?.manager.next();
    });

    expect(screen.queryByTestId('popover-1')).not.toBeInTheDocument();
    expect(screen.getByTestId('popover-2')).toBeInTheDocument();
    expect(ref.current?.manager.currentStep).toBe(1);
    expect(ref.current?.manager.isFirst).toBe(false);

    act(() => {
      ref.current?.manager.previous();
    });

    expect(screen.getByTestId('popover-1')).toBeInTheDocument();
    expect(screen.queryByTestId('popover-2')).not.toBeInTheDocument();
    expect(ref.current?.manager.currentStep).toBe(0);

    act(() => {
      ref.current?.manager.finish();
    });

    expect(screen.queryByTestId('popover-1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('popover-2')).not.toBeInTheDocument();
    expect(ref.current?.manager.isActive).toBe(false);
    expect(ref.current?.manager.currentStep).toBe(-1);
  });

  it('auto starts from the provided step and reset restarts when enabled', () => {
    const ref = React.createRef<ManagerHandle>();
    render(<ManagerTest ref={ref} autoStart initialStep={1} />);

    expect(screen.getByTestId('popover-2')).toBeInTheDocument();
    expect(ref.current?.manager.currentStep).toBe(1);
    expect(ref.current?.manager.isLast).toBe(false);

    act(() => {
      ref.current?.manager.goToStep(2);
    });

    expect(screen.getByTestId('popover-3')).toBeInTheDocument();
    expect(ref.current?.manager.currentStep).toBe(2);
    expect(ref.current?.manager.isLast).toBe(true);

    act(() => {
      ref.current?.manager.reset();
    });

    expect(screen.getByTestId('popover-2')).toBeInTheDocument();
    expect(ref.current?.manager.currentStep).toBe(1);

    act(() => {
      ref.current?.manager.goToStep(-1);
    });

    // do not change the step if out of bounds
    expect(screen.getByTestId('popover-2')).toBeInTheDocument();

    act(() => {
      ref.current?.manager.goToStep(3);
    });

    // do not change the step if out of bounds
    expect(screen.getByTestId('popover-2')).toBeInTheDocument();
  });

  it('handles empty popovers array', () => {
    const EmptyManagerTest = () => {
      const manager = useGuidePopoverManager([], { autoStart: false });
      return (
        <div>
          <span data-sign="total-steps">{manager.totalSteps}</span>
          <span data-sign="current-step">{manager.currentStep}</span>
          <span data-sign="is-active">{String(manager.isActive)}</span>
        </div>
      );
    };

    render(<EmptyManagerTest />);

    expect(screen.getByTestId('total-steps')).toHaveTextContent('0');
    expect(screen.getByTestId('current-step')).toHaveTextContent('-1');
    expect(screen.getByTestId('is-active')).toHaveTextContent('false');
  });

  it('does not advance when next is called at last step', () => {
    const ref = React.createRef<ManagerHandle>();
    render(<ManagerTest ref={ref} />);

    act(() => {
      ref.current?.manager.start();
    });

    act(() => {
      ref.current?.manager.next();
    });

    act(() => {
      ref.current?.manager.next();
    });

    expect(ref.current?.manager.currentStep).toBe(2);
    expect(ref.current?.manager.isLast).toBe(true);

    act(() => {
      ref.current?.manager.next();
    });

    expect(ref.current?.manager.currentStep).toBe(2);
    expect(screen.getByTestId('popover-3')).toBeInTheDocument();
  });

  it('does not go back when previous is called at first step', () => {
    const ref = React.createRef<ManagerHandle>();
    render(<ManagerTest ref={ref} />);

    act(() => {
      ref.current?.manager.start();
    });

    expect(ref.current?.manager.currentStep).toBe(0);
    expect(ref.current?.manager.isFirst).toBe(true);

    act(() => {
      ref.current?.manager.previous();
    });

    expect(ref.current?.manager.currentStep).toBe(0);
    expect(screen.getByTestId('popover-1')).toBeInTheDocument();
  });

  it('resets without restarting when autoStart is false', () => {
    const ref = React.createRef<ManagerHandle>();
    render(<ManagerTest ref={ref} autoStart={false} />);

    act(() => {
      ref.current?.manager.start();
    });

    expect(screen.getByTestId('popover-1')).toBeInTheDocument();
    expect(ref.current?.manager.currentStep).toBe(0);

    act(() => {
      ref.current?.manager.reset();
    });

    expect(screen.queryByTestId('popover-1')).not.toBeInTheDocument();
    expect(ref.current?.manager.currentStep).toBe(-1);
    expect(ref.current?.manager.isActive).toBe(false);
  });

  it('resets and restarts when autoStart is true', () => {
    const ref = React.createRef<ManagerHandle>();
    render(<ManagerTest ref={ref} autoStart initialStep={1} />);

    expect(screen.getByTestId('popover-2')).toBeInTheDocument();
    expect(ref.current?.manager.currentStep).toBe(1);

    act(() => {
      ref.current?.manager.goToStep(2);
    });

    expect(screen.getByTestId('popover-3')).toBeInTheDocument();
    expect(ref.current?.manager.currentStep).toBe(2);

    act(() => {
      ref.current?.manager.reset();
    });

    expect(screen.getByTestId('popover-2')).toBeInTheDocument();
    expect(ref.current?.manager.currentStep).toBe(1);
  });

  it('auto starts when autoStart is true on mount', () => {
    const ref = React.createRef<ManagerHandle>();
    render(<ManagerTest ref={ref} autoStart />);

    expect(screen.getByTestId('popover-1')).toBeInTheDocument();
    expect(ref.current?.manager.currentStep).toBe(0);
    expect(ref.current?.manager.isActive).toBe(true);
  });

  it('does not auto start when autoStart is false', () => {
    const ref = React.createRef<ManagerHandle>();
    render(<ManagerTest ref={ref} autoStart={false} />);

    expect(screen.queryByTestId('popover-1')).not.toBeInTheDocument();
    expect(ref.current?.manager.currentStep).toBe(-1);
    expect(ref.current?.manager.isActive).toBe(false);
  });

  it('closes all popovers when finish is called', () => {
    const ref = React.createRef<ManagerHandle>();
    render(<ManagerTest ref={ref} />);

    act(() => {
      ref.current?.manager.start();
    });

    act(() => {
      ref.current?.manager.next();
    });

    expect(screen.getByTestId('popover-2')).toBeInTheDocument();

    act(() => {
      ref.current?.manager.finish();
    });

    expect(screen.queryByTestId('popover-1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('popover-2')).not.toBeInTheDocument();
    expect(screen.queryByTestId('popover-3')).not.toBeInTheDocument();
    expect(ref.current?.manager.currentStep).toBe(-1);
    expect(ref.current?.manager.isActive).toBe(false);
  });

  it('goes to step 0 when start is called with initialStep 0', () => {
    const ref = React.createRef<ManagerHandle>();
    render(<ManagerTest ref={ref} initialStep={0} />);

    act(() => {
      ref.current?.manager.start();
    });

    expect(screen.getByTestId('popover-1')).toBeInTheDocument();
    expect(ref.current?.manager.currentStep).toBe(0);
  });
});

describe('isElementInsideViewport', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 800,
    });
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });
  });

  it('returns true when element is fully inside viewport', () => {
    const element = document.createElement('div');
    element.getBoundingClientRect = jest.fn(() => ({
      top: 100,
      left: 100,
      bottom: 200,
      right: 300,
      width: 200,
      height: 100,
    })) as any;

    expect(isElementInsideViewport(element as HTMLDivElement)).toBe(true);
  });

  it('returns false when element is above viewport', () => {
    const element = document.createElement('div');
    element.getBoundingClientRect = jest.fn(() => ({
      top: -50,
      left: 100,
      bottom: 50,
      right: 300,
      width: 200,
      height: 100,
    })) as any;

    expect(isElementInsideViewport(element as HTMLDivElement)).toBe(false);
  });

  it('returns false when element is below viewport', () => {
    const element = document.createElement('div');
    element.getBoundingClientRect = jest.fn(() => ({
      top: 850,
      left: 100,
      bottom: 950,
      right: 300,
      width: 200,
      height: 100,
    })) as any;

    expect(isElementInsideViewport(element as HTMLDivElement)).toBe(false);
  });

  it('returns false when element is to the left of viewport', () => {
    const element = document.createElement('div');
    element.getBoundingClientRect = jest.fn(() => ({
      top: 100,
      left: -50,
      bottom: 200,
      right: 50,
      width: 100,
      height: 100,
    })) as any;

    expect(isElementInsideViewport(element as HTMLDivElement)).toBe(false);
  });

  it('returns false when element is to the right of viewport', () => {
    const element = document.createElement('div');
    element.getBoundingClientRect = jest.fn(() => ({
      top: 100,
      left: 1250,
      bottom: 200,
      right: 1350,
      width: 100,
      height: 100,
    })) as any;

    expect(isElementInsideViewport(element as HTMLDivElement)).toBe(false);
  });

  it('returns false when element is partially visible (top edge)', () => {
    const element = document.createElement('div');
    element.getBoundingClientRect = jest.fn(() => ({
      top: -10,
      left: 100,
      bottom: 90,
      right: 300,
      width: 200,
      height: 100,
    })) as any;

    expect(isElementInsideViewport(element as HTMLDivElement)).toBe(false);
  });

  it('returns false when element is partially visible (left edge)', () => {
    const element = document.createElement('div');
    element.getBoundingClientRect = jest.fn(() => ({
      top: 100,
      left: -10,
      bottom: 200,
      right: 190,
      width: 200,
      height: 100,
    })) as any;

    expect(isElementInsideViewport(element as HTMLDivElement)).toBe(false);
  });

  it('returns true when element is at viewport edges (top-left corner)', () => {
    const element = document.createElement('div');
    element.getBoundingClientRect = jest.fn(() => ({
      top: 0,
      left: 0,
      bottom: 100,
      right: 200,
      width: 200,
      height: 100,
    })) as any;

    expect(isElementInsideViewport(element as HTMLDivElement)).toBe(true);
  });

  it('returns true when element is at viewport edges (bottom-right corner)', () => {
    const element = document.createElement('div');
    element.getBoundingClientRect = jest.fn(() => ({
      top: 700,
      left: 1000,
      bottom: 800,
      right: 1200,
      width: 200,
      height: 100,
    })) as any;

    expect(isElementInsideViewport(element as HTMLDivElement)).toBe(true);
  });
});
