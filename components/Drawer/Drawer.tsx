/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
  DialogProps,
  FocusTrap,
  Portal,
  SlideIn,
  usePrevious,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import { motion, MotionProps } from 'framer-motion';
import React, { FunctionComponent, useEffect, useState } from 'react';

// TODO: spring-ui still not have drawer component, so we use a custom drawer component
export const Drawer: FunctionComponent<DialogProps> = ({
  open,
  onClose,
  children,
  onKeyDown,
  onEscapeKeyDown,
  disableEscapeKeyDown,
  disablePortal,
  container,
  disableRestoreFocus,
  backdropProps,
  bodyProps,
  disableBackdropAnimation,
  onExitComplete,
  ...rest
}) => {
  useEffect(() => {
    if (open) {
      setShouldRender(true);
    } else {
      if (disableBackdropAnimation) {
        setShouldRender(false);
      }
    }
  }, [open, disableBackdropAnimation]);

  const prevOpen = usePrevious(() => open);

  const [shouldRender, setShouldRender] = useState(open);

  useEffect(() => {
    if (prevOpen && !open) {
      onClose?.({} as any, 'closeButtonClick');
    }
  }, [prevOpen, open, onClose]);

  const onAnimationComplete: MotionProps['onAnimationComplete'] = (e) => {
    if (!open) {
      onExitComplete?.();
      setShouldRender(false);
    }
  };

  return shouldRender ? (
    <Portal disablePortal={disablePortal} container={container}>
      <motion.div
        className="fixed inset-0 z-drawer flex items-end justify-center"
        role="presentation"
        {...rest}
      >
        <div
          aria-hidden
          data-sign="backdrop"
          className={clsx(
            'absolute inset-0 bg-neutral-b0/50 transition-opacity duration-300',
            open ? 'opacity-100' : 'opacity-0',
          )}
          onClick={(e) => onClose?.(e, 'backdropClick')}
          {...backdropProps}
        />

        <SlideIn
          toggle={open}
          from="bottom"
          className="w-full"
          onAnimationComplete={onAnimationComplete}
        >
          <div
            role="dialog"
            aria-modal="true"
            className={
              'relative w-full bg-neutral-base rounded-t-lg shadow-lg transform transition-transform duration-300 ease-out'
            }
            style={{ maxHeight: '80vh' }}
            onKeyDown={(e) => {
              onKeyDown?.(e);

              if (!disableEscapeKeyDown && e.key === 'Escape') {
                onEscapeKeyDown?.(e);
                onClose?.(e, 'escapeKeyDown');
              }
            }}
            {...(bodyProps as any)}
          >
            <FocusTrap open={open} disableRestoreFocus={disableRestoreFocus}>
              <div
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                tabIndex={0}
                className="overflow-y-auto"
              >
                {children}
              </div>
            </FocusTrap>
          </div>
        </SlideIn>
      </motion.div>
    </Portal>
  ) : null;
};
