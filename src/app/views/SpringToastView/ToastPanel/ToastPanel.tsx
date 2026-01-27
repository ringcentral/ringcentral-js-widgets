import { useViewTransitionState } from '@ringcentral-integration/react-hooks';
import {
  ClickAwayListener,
  RcFade,
  RcPortal,
  RcSlide,
  RcSlideProps,
  useChange,
  useEventCallback,
  useEventListener,
  useRefState,
  useResultRef,
} from '@ringcentral/juno';
import clsx from 'clsx';
import React, { FunctionComponent, memo, useEffect, useRef } from 'react';

import { useFooterHeight } from '../../../components';
import { useLocale } from '../../../hooks';
import type { ToastItem, ToastItemPanelProps } from '../../../services';
import {
  DEFAULT_TOAST_GET_RENDERER,
  type ToastPanelProps,
} from '../../ToastView/ToastPanel';
import { ToastItemPanel } from '../ToastItemView/ToastItemPanel/ToastItemPanel';

type MemoItemProps = ToastItemPanelProps &
  Pick<RcSlideProps, 'in'> &
  Pick<ToastPanelProps, 'getRenderer' | 'brand'> & {
    onExited: (id: string) => void;
  };

const MemoToastItem: FunctionComponent<
  MemoItemProps & {
    component?: any;
  }
> = memo((props) => {
  const {
    id,
    payload,
    timestamp,
    message,
    level,
    ttl,
    loading,
    action,
    backdrop,
    brand,
    in: inProp,
    getRenderer = DEFAULT_TOAST_GET_RENDERER,
    dismiss,
    onExited,
    component: Component = ToastItemPanel,
    ...rest
  } = props;

  const alertItem: ToastItem = {
    id,
    message,
    payload,
    timestamp,
    level,
    ttl,
    loading,
    action,
    backdrop,
  };

  const Message = getRenderer(alertItem);
  const { currentLocale } = useLocale();

  return (
    <RcSlide key={id} in={inProp} onExited={() => onExited(id)} direction="up">
      <div
        className="flex bg-neutral-base rounded-sui-sm"
        // below view transition api may cause the toast item be opacity background, so we need to set the background color to that to avoid that
      >
        <Component {...rest} {...alertItem} dismiss={dismiss}>
          <Message
            message={alertItem}
            currentLocale={currentLocale}
            brand={brand}
            payload={payload}
          />
        </Component>
      </div>
    </RcSlide>
  );
});

export const ToastPanel: FunctionComponent<ToastPanelProps> = ({
  className,
  messages,
  size = 'small',
  messageAlign = 'left',
  position = 'bottom',
  fullWidth = true,
  backdrop,
  disableBackdropClick = true,
  disableEscapeKeyDown = true,
  dismiss,
  component,
  ...rest
}) => {
  const [currentMessagesRef, setCurrentMessages] = useRefState(messages);
  const listening = useRef(false);

  const deleteMapRef = useResultRef(() => new Map<string, boolean>());

  useChange(
    (prev, next) => {
      if (prev) {
        const prevLength = prev.length;
        const nextLength = next.length;
        const { current: deleteMap } = deleteMapRef;

        if (prevLength !== nextLength) {
          const nextSet = new Set(next.map((msg) => msg.id));

          if (nextLength < prevLength) {
            prev.forEach((x) => {
              if (!nextSet.has(x.id)) {
                deleteMap.set(x.id, true);
              }
            });
            return;
          }
        }
      }
      // find need remove messages
      setCurrentMessages(next, false);
    },
    () => messages,
  );

  const { current: currentMessages } = currentMessagesRef;
  const { current: deleteMap } = deleteMapRef;

  const handleClickAway = useEventCallback(() => {
    const [lastOne] = currentMessages.slice(-1);

    const { disableBackdropClick: itemDisabled = disableBackdropClick } =
      lastOne;

    if (!itemDisabled) {
      dismiss(lastOne.id, 'backdropClick');
    }
  });

  // TODO: work with mui modal manager, otherwise modal and Toast esc will got error behaviors when open at same time
  const { listen, remove } = useEventListener(
    document,
    'keydown',
    (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;

      // using current message
      const [lastOne] = messages.slice(-1);

      const { disableEscapeKeyDown: itemDisabled = disableEscapeKeyDown } =
        lastOne;

      if (!itemDisabled) {
        dismiss(lastOne.id, 'escapeKeyDown');
        e.preventDefault();
        e.stopPropagation();
      }
    },
    {
      startImmediately: false,
    },
  );

  const handleExited = useEventCallback((id: string) => {
    deleteMap.delete(id);
    setCurrentMessages(messages);
  });

  const nonElement = currentMessages.length === 0;

  useEffect(() => {
    if (nonElement) {
      if (listening.current) {
        remove();
        listening.current = false;
      }
      return;
    }

    listen();
    listening.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonElement]);

  const footerHeight = useFooterHeight();
  const renderHeight = useViewTransitionState(footerHeight);

  if (nonElement) {
    return null;
  }

  const showBackdrop =
    backdrop ||
    currentMessages.some((msg) => !deleteMap.get(msg.id) && msg.backdrop);

  return (
    <RcPortal>
      <div
        data-sign="toast-container"
        className={clsx(
          'fixed top-0 left-0 w-full h-full z-snackbar pointer-events-none pt-3 flex flex-col',
          className,
          position === 'top' ? 'justify-start' : 'justify-end',
        )}
      >
        <RcFade in={showBackdrop}>
          <div className="absolute left-0 top-0 w-full h-full bg-neutral-100 bg-opacity-40 z-[-1] pointer-events-auto" />
        </RcFade>
        <ClickAwayListener onClickAway={handleClickAway}>
          <section
            className={clsx(
              'inline-flex flex-col justify-end gap-3 px-5 mb-4 items-center [view-transition-name:toast]',
              fullWidth && 'w-full',
            )}
          >
            {currentMessages.map(
              ({ disableBackdropClick, disableEscapeKeyDown, ...message }) => (
                <MemoToastItem
                  key={message.id}
                  fullWidth={fullWidth}
                  size={size}
                  component={component}
                  messageAlign={messageAlign}
                  onExited={handleExited}
                  in={!deleteMap.get(message.id)}
                  dismiss={dismiss}
                  {...message}
                  {...rest}
                />
              ),
            )}
          </section>
        </ClickAwayListener>
        {renderHeight ? <div style={{ height: renderHeight }}></div> : null}
      </div>
    </RcPortal>
  );
};
