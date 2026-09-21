import { useOnReRender } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, {
  FunctionComponent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

export type AnchorOverlayProps = {
  /**
   * The anchor element to overlay, or a getter that returns it.
   * When null, nothing is rendered.
   * The overlay will cover the entire anchor with the same width and height.
   */
  anchorEl: HTMLElement | null | (() => HTMLElement | null);
  /**
   * Optional className for the overlay root.
   */
  className?: string;
  /**
   * Optional style for the overlay root.
   */
  style?: React.CSSProperties;
  /**
   * layer index of the overlay
   *
   * higher layer index will be rendered on top of lower layer index
   * @default 0
   */
  layer?: number;
  /**
   * children to render
   */
  children: React.ReactNode;
};

function getAnchorRect(anchorEl: HTMLElement | null): DOMRect | null {
  if (!anchorEl) return null;
  return anchorEl.getBoundingClientRect();
}

/**
 * Renders children in a layer that fully covers the anchor element with the same width and height.
 * Position is updated when the anchor moves or resizes (e.g. on tab switch, layout change, or scroll).
 */
function resolveAnchor(
  anchor: HTMLElement | null | (() => HTMLElement | null),
): HTMLElement | null {
  return typeof anchor === 'function' ? anchor() : anchor;
}

export const AnchorOverlay: FunctionComponent<AnchorOverlayProps> = ({
  anchorEl,
  children,
  className,
  style,
  layer = 0,
}) => {
  const hostRef = useRef(null);
  const resolvedAnchor =
    resolveAnchor(anchorEl) ||
    // when anchorEl is null, use hostRef as anchor to fake not display anything on the screen
    hostRef.current;
  const [rect, setRect] = useState<DOMRect | null>(() =>
    getAnchorRect(resolvedAnchor),
  );

  const bodyHideRef = useRef(false);

  const updateRect = useCallback(() => {
    // when body be hide, do nothing
    if (bodyHideRef.current) return;

    const newRect = getAnchorRect(resolvedAnchor);
    setRect((prev) => {
      if (!prev && !newRect) return prev;
      if (!newRect) return null;
      if (
        prev &&
        prev.top === newRect.top &&
        prev.left === newRect.left &&
        prev.width === newRect.width &&
        prev.height === newRect.height
      ) {
        return prev;
      }
      return newRect;
    });
  }, [resolvedAnchor]);

  useLayoutEffect(() => {
    if (!resolvedAnchor) {
      setRect(null);
      return;
    }
    updateRect();
    // 1. Create the IntersectionObserver instance
    const observer = globalThis.IntersectionObserver
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const isHide =
                !entry.isIntersecting || entry.intersectionRatio === 0;
              // When the outer container becomes display: none,
              // entry.isIntersecting turns false and intersectionRatio drops to 0
              const shouldRefresh = !isHide && isHide !== bodyHideRef.current;
              bodyHideRef.current = isHide;
              if (shouldRefresh) {
                updateRect();
              }
            });
          },
          {
            threshold: [0, 0.1], // Triggers as soon as layout visibility changes
          },
        )
      : undefined;

    // 2. Observe the iframe internal document.body
    observer?.observe(document.body);
    const resizeObserver = new ResizeObserver(updateRect);
    resizeObserver.observe(resolvedAnchor);
    window.addEventListener('scroll', updateRect, true);
    window.addEventListener('resize', updateRect);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', updateRect, true);
      window.removeEventListener('resize', updateRect);
      observer?.disconnect();
    };
  }, [resolvedAnchor, updateRect]);

  useOnReRender(updateRect);

  if (!resolvedAnchor || !rect) {
    return null;
  }

  return (
    <>
      <div ref={hostRef} className="sr-only"></div>
      {createPortal(
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          className={clsx('bg-neutral-base overflow-hidden', className)}
          style={{
            position: 'fixed',
            top: rect.top,
            left: rect.left,
            // in test env use 100% for us better debug
            width: process.env.NODE_ENV === 'test' ? '100%' : rect.width,
            height: process.env.NODE_ENV === 'test' ? '100%' : rect.height,
            // same as the drawer z-index
            zIndex: 1200 + layer,
            ...style,
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>,
        document.body,
      )}
    </>
  );
};
