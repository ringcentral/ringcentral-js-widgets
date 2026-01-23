import { Backdrop, Popper, PopperPaper, Portal } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, {
  forwardRef,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export interface UseGuidePopoverOptions {
  /**
   * Whether to scroll the anchor element into view if it's not inside the viewport.
   * @default 'visible'
   *
   * - 'visible': Scroll the anchor element into view if it's not inside the viewport.
   * - 'auto': Scroll the anchor element into view.
   * - 'false': Do not scroll the anchor element into view.
   */
  scrollIntoView?: 'visible' | boolean;
  /**
   * Options for the scrollIntoView method.
   */
  scrollIntoViewOptions?: ScrollIntoViewOptions;
}

export type GuidePopoverInstance = ReturnType<typeof useGuidePopover>;

const defaultActiveClasses =
  'h-full rounded bg-neutral-base z-tooltip pointer-events-none';

const rightTopHintClasses =
  'absolute right-1.5 top-1.5 size-2 rounded-full bg-primary-f pointer-events-none';

type GuidePopoverProps = React.PropsWithChildren<{
  anchorRef: React.RefObject<HTMLDivElement>;
  popoverOpen: boolean;
}>;

/**
 * Component that renders the popover content.
 * Only renders when popover is open.
 */
export const GuidePopover: FunctionComponent<GuidePopoverProps> = ({
  children,
  anchorRef,
  popoverOpen,
}) => {
  if (!popoverOpen) return null;

  return (
    <>
      <Portal>
        <Backdrop className="z-0" />
      </Portal>
      <Popper
        anchorEl={() => anchorRef.current}
        data-sign="guidePopover"
        className="z-modal max-w-[calc(100%-32px)]"
        arrowHeight={8}
        padding={16}
        offset={8}
      >
        {({ arrowRef, arrowStyle }) => (
          <PopperPaper
            arrowRef={arrowRef}
            arrowStyle={arrowStyle}
            className="rounded-md bg-neutral-base p-3 max-w-[280px]"
          >
            {children}
          </PopperPaper>
        )}
      </Popper>
    </>
  );
};

type GuideAnchorProps = React.PropsWithChildren<{
  popoverOpen: boolean;
  /**
   * Whether to show the hint indicator (ringing animation) on the anchor element.
   * Set to `true` when the user hasn't seen the popover yet to guide them.
   * @default false
   */
  showHint?: boolean;
  /**
   * Whether to animate the hint indicator (ringing animation).
   * @default true
   */
  animateHint?: boolean;
  className?: string;
  activeClassName?: string;
  hintClassName?: string;
  closePopover: () => void;
}>;

/**
 * Component that wraps the anchor element.
 * Shows a ringing animation indicator in the top-right corner when `showHint` is true.
 * Applies active styles when popover is open.
 */
export const GuideAnchor = forwardRef<HTMLDivElement, GuideAnchorProps>(
  (
    {
      children,
      showHint,
      popoverOpen,
      className,
      activeClassName = defaultActiveClasses,
      hintClassName = rightTopHintClasses,
      animateHint = true,
      closePopover,
      ...rest
    },
    ref,
  ) => {
    useEffect(() => {
      return () => {
        closePopover();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div
        ref={ref}
        {...rest}
        className={clsx(
          className,
          clsx(showHint && 'relative', popoverOpen && activeClassName),
        )}
      >
        {children}
        {showHint && (
          <>
            <div className={hintClassName} />
            {animateHint && (
              <div className={clsx(hintClassName, 'animate-ping')} />
            )}
          </>
        )}
      </div>
    );
  },
);

/**
 * Hook for creating a guide popover with ringing animation indicator.
 *
 * This hook is designed to guide users through new features or actions.
 * It provides:
 * - A popover component that displays instructional content
 * - An anchor wrapper component that shows a ringing animation hint when the user hasn't seen the popover
 * - State management for opening/closing the popover
 *
 * @param options - Configuration options for the guide popover
 *
 * @returns An object containing:
 * - `anchorRef`: Ref for the anchor element (used internally)
 * - `popoverOpen`: Boolean indicating if popover is open
 * - `open`: Function to open the popover
 * - `close`: Function to close the popover
 *
 * @example
 * ```tsx
 * import { GuideAnchor, GuidePopover, useGuidePopover } from '@ringcentral-integration/next-widgets/components';
 *
 * const { anchorRef, popoverOpen, open, close } = useGuidePopover({});
 *
 * const handleClick = () => {
 *   if (!hasSeenPopover) {
 *     open();
 *     markAsSeen();
 *   } else {
 *     // Perform actual action
 *   }
 * };
 *
 * return (
 *   <>
 *     <GuideAnchor
 *       ref={anchorRef}
 *       popoverOpen={popoverOpen}
 *       closePopover={close}
 *       showHint={!hasSeenPopover}
 *     >
 *       <IconButton onClick={handleClick} />
 *     </GuideAnchor>
 *     <GuidePopover anchorRef={anchorRef} popoverOpen={popoverOpen}>
 *       <div>
 *         <h3>Guide Title</h3>
 *         <p>Guide description</p>
 *       </div>
 *       <Button onClick={close}>Got it</Button>
 *     </GuidePopover>
 *   </>
 * );
 * ```
 */
export const useGuidePopover = (options: UseGuidePopoverOptions) => {
  const {
    scrollIntoView = 'visible',
    scrollIntoViewOptions = {
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    },
  } = options;
  const anchorRef = useRef<HTMLDivElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const openPopover = useCallback(() => {
    const elm = anchorRef.current;

    if (scrollIntoView && elm) {
      if (scrollIntoView === true) {
        elm.scrollIntoView(scrollIntoViewOptions);
      } else {
        const isInsideViewport = isElementInsideViewport(elm);

        if (!isInsideViewport) {
          elm.scrollIntoView(scrollIntoViewOptions);
        }
      }
    }

    setPopoverOpen(true);
  }, [scrollIntoView, scrollIntoViewOptions]);

  const closePopover = useCallback(() => {
    setPopoverOpen(false);
  }, []);

  return {
    anchorRef,
    popoverOpen,
    open: openPopover,
    close: closePopover,
  };
};

export interface UseGuidePopoverManagerOptions {
  /**
   * Whether to automatically start the guide sequence.
   * @default false
   */
  autoStart?: boolean;
  /**
   * Initial step index to start from.
   * @default 0
   */
  initialStep?: number;
}

/**
 * Hook for managing multiple guide popovers in a step-by-step sequence.
 *
 * This hook coordinates multiple guide popovers to create a multi-step guide experience.
 * It manages which popover should be open at any given time and provides navigation
 * methods to move between steps.
 *
 * @param popovers - Array of guide popover instances returned from `useGuidePopover`
 * @param options - Configuration options for the manager
 * @param options.autoStart - Whether to automatically start the guide sequence
 * @param options.initialStep - Initial step index to start from
 *
 * @returns An object containing:
 * - `currentStep`: Current step index (0-based, -1 if not started)
 * - `totalSteps`: Total number of steps
 * - `isFirst`: Whether current step is the first step
 * - `isLast`: Whether current step is the last step
 * - `isActive`: Whether the guide sequence is active (any step is open)
 * - `next`: Function to go to the next step
 * - `previous`: Function to go to the previous step
 * - `goToStep`: Function to go to a specific step index
 * - `start`: Function to start the guide sequence from the first step
 * - `finish`: Function to finish the guide sequence and close all popovers
 * - `reset`: Function to reset the guide sequence to initial state
 *
 * @example
 * ```tsx
 * import { GuideAnchor, GuidePopover, useGuidePopover, useGuidePopoverManager } from '@ringcentral-integration/next-widgets/components';
 *
 * const guidePopover1 = useGuidePopover({});
 * const guidePopover2 = useGuidePopover({});
 * const guidePopover3 = useGuidePopover({});
 *
 * const guidePopoverManager = useGuidePopoverManager([
 *   guidePopover1,
 *   guidePopover2,
 *   guidePopover3,
 * ]);
 *
 * const handleNext = () => {
 *   if (guidePopoverManager.isLast) {
 *     guidePopoverManager.finish();
 *   } else {
 *     guidePopoverManager.next();
 *   }
 * };
 *
 * return (
 *   <>
 *     <GuideAnchor
 *       ref={guidePopover1.anchorRef}
 *       popoverOpen={guidePopover1.popoverOpen}
 *       closePopover={guidePopover1.close}
 *       showHint={true}
 *     >
 *       <IconButton onClick={() => guidePopoverManager.start()} />
 *     </GuideAnchor>
 *     <GuidePopover
 *       anchorRef={guidePopover1.anchorRef}
 *       popoverOpen={guidePopover1.popoverOpen}
 *     >
 *       <div>Step 1 content</div>
 *       <Button onClick={handleNext}>Next</Button>
 *     </GuidePopover>
 *
 *     <GuideAnchor
 *       ref={guidePopover2.anchorRef}
 *       popoverOpen={guidePopover2.popoverOpen}
 *       closePopover={guidePopover2.close}
 *       showHint={false}
 *     >
 *       <IconButton />
 *     </GuideAnchor>
 *     <GuidePopover
 *       anchorRef={guidePopover2.anchorRef}
 *       popoverOpen={guidePopover2.popoverOpen}
 *     >
 *       <div>Step 2 content</div>
 *       <Button onClick={handleNext}>Next</Button>
 *     </GuidePopover>
 *
 *     <GuideAnchor
 *       ref={guidePopover3.anchorRef}
 *       popoverOpen={guidePopover3.popoverOpen}
 *       closePopover={guidePopover3.close}
 *       showHint={false}
 *     >
 *       <IconButton />
 *     </GuideAnchor>
 *     <GuidePopover
 *       anchorRef={guidePopover3.anchorRef}
 *       popoverOpen={guidePopover3.popoverOpen}
 *     >
 *       <div>Step 3 content</div>
 *       <Button onClick={guidePopoverManager.finish}>Finish</Button>
 *     </GuidePopover>
 *   </>
 * );
 * ```
 */
export const useGuidePopoverManager = (
  popovers: GuidePopoverInstance[],
  options: UseGuidePopoverManagerOptions = {},
) => {
  const { autoStart = false, initialStep = 0 } = options;
  const [currentStep, setCurrentStep] = useState(-1);
  const totalSteps = popovers.length;

  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;
  const isActive = currentStep >= 0;

  /**
   * Opens the popover at the specified step and closes all others.
   */
  const goToStep = useCallback(
    (step: number) => {
      if (step < 0 || step >= totalSteps) {
        return;
      }

      // Close all popovers first
      popovers.forEach((popover) => {
        popover.close();
      });

      // Open the popover at the target step
      if (step >= 0 && step < totalSteps) {
        setCurrentStep(step);
        popovers[step].open();
      }
    },
    [popovers, totalSteps],
  );

  /**
   * Goes to the next step.
   */
  const next = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      goToStep(currentStep + 1);
    }
  }, [currentStep, totalSteps, goToStep]);

  /**
   * Goes to the previous step.
   */
  const previous = useCallback(() => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  }, [currentStep, goToStep]);

  /**
   * Starts the guide sequence from the first step.
   */
  const start = useCallback(() => {
    goToStep(initialStep);
  }, [goToStep, initialStep]);

  /**
   * Finishes the guide sequence and closes all popovers.
   */
  const finish = useCallback(() => {
    popovers.forEach((popover) => {
      popover.close();
    });
    setCurrentStep(-1);
  }, [popovers]);

  /**
   * Resets the guide sequence to initial state.
   */
  const reset = useCallback(() => {
    finish();
    if (autoStart) {
      start();
    }
  }, [finish, autoStart, start]);

  // Auto-start if enabled
  useEffect(() => {
    if (autoStart && currentStep === -1) {
      start();
    }
  }, [autoStart, currentStep, start]);

  return {
    currentStep,
    totalSteps,
    isFirst,
    isLast,
    isActive,
    next,
    previous,
    goToStep,
    start,
    finish,
    reset,
  };
};

export function isElementInsideViewport(elm: HTMLDivElement) {
  const rect = elm.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const isVisible =
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= windowHeight &&
    rect.right <= windowWidth;

  return isVisible;
}
