import {
  ClickAwayListener,
  palette2,
  RcFade,
  RcPortal,
  RcSlide,
  RcSlideProps,
  setOpacity,
  spacing,
  styled,
  useChange,
  useEventCallback,
  useEventListener,
  useRefState,
  useResultRef,
  zIndex,
} from '@ringcentral/juno';
import React, { FunctionComponent, memo, useEffect, useRef } from 'react';

import { useLocale } from '../../../hooks';
import type { ToastItem, ToastItemPanelProps } from '../../../services';
import { ToastItemPanel } from '../ToastItemView/ToastItemPanel/ToastItemPanel';

const ToastPanelHost = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zIndex('snackbar')};
  pointer-events: none;
  padding-top: ${spacing(3)};
  display: flex;
  justify-content: center;
`;

const backdropColor = setOpacity(palette2('neutral', 'b01'), '40');
const ToastBackdrop = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${backdropColor};
  z-index: -1;
  pointer-events: auto;
`;

type ToastListProps = {
  fullWidth: boolean;
};

const ToastList = styled.section<ToastListProps>`
  pointer-events: auto;
  display: inline-flex;
  flex-direction: column;
  pointer-events: none;
  width: ${({ fullWidth }) => fullWidth && '100%'};
  gap: ${spacing(2, 0)};
  padding: ${spacing(0, 5)};
`;

const AnimationHost = styled.div`
  display: flex;
`;

export type ToastRendererProps = {
  message: ToastItem;
  /**
   * addition payload data pass to message
   */
  payload?: any;
  /**
   * @deprecated please use `useLocale` instead.
   */
  currentLocale?: string;
  /**
   * @deprecated please use module view system to get that.
   */
  brand?: string;
};

export type ToastPanelProps = {
  messages: ToastItem[];
  className?: string;
  getRenderer?: (type: ToastItem) => FunctionComponent<ToastRendererProps>;
} & Omit<ToastItemPanelProps, keyof ToastItem> &
  Pick<
    ToastItem,
    'backdrop' | 'disableBackdropClick' | 'disableEscapeKeyDown'
  > &
  Pick<ToastRendererProps, 'brand'> & {
    // TODO: Workaround with old alert view
    component?: any;

    /**
     * set the position of the entire toast container, "bottom" by default.
     */
    position?: 'top' | 'bottom';
  };

type MemoItemProps = ToastItemPanelProps &
  Pick<RcSlideProps, 'in'> &
  Pick<ToastPanelProps, 'getRenderer' | 'brand'> & {
    onExited: (id: string) => void;
  };

const DefaultContent: FunctionComponent<ToastRendererProps> = ({ message }) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{message.message}</>;
};
export const DEFAULT_TOAST_GET_RENDERER = () => DefaultContent;

const MemoToastItem: FunctionComponent<
  MemoItemProps & {
    // TODO: Workaround with old alert view
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
    <RcSlide key={id} in={inProp} onExited={() => onExited(id)}>
      <AnimationHost>
        <Component {...rest} {...alertItem} dismiss={dismiss}>
          <Message
            message={alertItem}
            currentLocale={currentLocale}
            brand={brand}
            payload={payload}
          />
        </Component>
      </AnimationHost>
    </RcSlide>
  );
});

export const ToastPanel: FunctionComponent<ToastPanelProps> = ({
  className,
  messages,
  size = 'small',
  messageAlign = 'left',
  fullWidth = true,
  position = 'bottom',
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickAway = useEventCallback((e: React.MouseEvent<any>) => {
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

  if (nonElement) {
    return null;
  }

  const showBackdrop =
    backdrop ||
    currentMessages.some((msg) => !deleteMap.get(msg.id) && msg.backdrop);

  return (
    <RcPortal>
      <ToastPanelHost data-sign="toast-container" className={className}>
        <RcFade in={showBackdrop}>
          <ToastBackdrop />
        </RcFade>
        <ClickAwayListener onClickAway={handleClickAway}>
          <ToastList fullWidth={fullWidth}>
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
          </ToastList>
        </ClickAwayListener>
      </ToastPanelHost>
    </RcPortal>
  );
};
