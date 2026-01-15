/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  ClickAwayListener,
  getSelectionPosition,
  RcIconButton,
  RcPopper,
  styled,
  useEventListener,
  useForkRef,
  useTheme,
} from '@ringcentral/juno';
import { Emoji } from '@ringcentral/juno-icon';
import React, {
  ComponentProps,
  forwardRef,
  HTMLAttributes,
  lazy,
  PropsWithChildren,
  Ref,
  Suspense,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';

import i18n from '../i18n';
import styles from '../styles.scss';

import { Emoji as IEmoji } from './Emoji.interface';
import { useEmojiI18n } from './useEmojiI18n';

// Compatible with running in shared worker
// @ts-ignore
const Picker = lazy(() => import('@emoji-mart/react'));

type PositionType = ReturnType<typeof getSelectionPosition> | null;

export type EmojiMenuAction = {
  toggle: () => void;
  close: () => void;
  open: () => void;
};

export type EmojiMenuProps = PropsWithChildren<{
  currentLocale: string;
  onSelect: (emoji: IEmoji, position: PositionType) => void;
  /**
   * will close popup after select emoji
   */
  autoClose?: boolean;
  /**
   * will close popup when focus on input
   */
  closeWhenFocusOnInput?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  /**
   * target host to send emoji inputRef
   */
  getInputElement?: () => HTMLInputElement | HTMLTextAreaElement;
  action?: Ref<EmojiMenuAction>;
}> &
  Omit<HTMLAttributes<HTMLButtonElement>, 'onSelect'>;

type PopperRef = ComponentProps<typeof RcPopper>['popperRef'];

const _EmojiMenu = forwardRef<HTMLButtonElement, EmojiMenuProps>(
  (props, ref) => {
    const {
      closeWhenFocusOnInput = true,
      autoClose = true,
      action,
      currentLocale,
      onSelect,
      onOpen,
      onClose,
      getInputElement,
      ...rest
    } = props;

    const theme = useTheme();
    const popperRef: PopperRef = useRef(null);
    const positionRef = useRef<PositionType>(null);
    const innerRef = useRef<HTMLButtonElement>(null);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
      null,
    );
    const emojiI18n = useEmojiI18n(currentLocale);
    const isOpen = Boolean(anchorEl);
    const id = isOpen ? 'emoji-menu' : undefined;
    const anchorElRef = useForkRef(ref, innerRef);

    const close = () => {
      if (isOpen) {
        onClose?.();
        setAnchorEl(null);
      }
    };

    const open = () => {
      if (!isOpen) {
        onOpen?.();
        setAnchorEl(innerRef.current);
      }
    };

    const toggle = () => {
      if (isOpen) {
        close();
      } else {
        open();
      }
    };

    const handleClickAway = (): void => {
      const input = getInputElement?.();
      // when text input be focus, not close that popper
      if (
        input &&
        !closeWhenFocusOnInput &&
        document.activeElement === getInputElement?.()
      ) {
        return;
      }

      close();
    };

    const handleSelectEmoji = (data: IEmoji) => {
      onSelect(data, positionRef.current);
      positionRef.current = null;
      if (autoClose) {
        close();
      }
    };

    const preventFocus = (
      e: React.MouseEvent<HTMLElement, MouseEvent>,
    ): void => {
      const hostElm = e.nativeEvent.composedPath()?.[0] as HTMLElement;

      // when focus on search input not prevent default, and remember current focus position
      if (hostElm && hostElm.tagName.toLocaleLowerCase() === 'input') {
        const textField = getInputElement?.();

        if (textField) {
          positionRef.current = getSelectionPosition(textField);
        }

        return;
      }

      e.preventDefault();
    };

    // update popper position after view ready
    useLayoutEffect(() => {
      if (!isOpen) return;

      requestAnimationFrame(() => {
        popperRef.current?.update();
      });
    });

    useEventListener(getInputElement?.()!, 'focus', () => {
      positionRef.current = null;
    });

    useImperativeHandle(action, () => ({
      close,
      open,
      toggle,
    }));

    return (
      <>
        <RcIconButton
          aria-describedby={id}
          ref={anchorElRef}
          title={i18n.getString('emoji', currentLocale)}
          symbol={Emoji}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={toggle}
          {...rest}
        />
        <RcPopper
          placement="top"
          popperRef={popperRef}
          className={styles.emojiPopper}
          id={id}
          open={isOpen}
          anchorEl={anchorEl}
          modifiers={{
            flip: { enabled: false },
            arrow: { element: null, enabled: false },
            preventOverflow: {
              boundariesElement: 'viewport',
              enabled: true,
              padding: 10,
            },
            hide: {
              enabled: false,
            },
          }}
        >
          <ClickAwayListener onClickAway={handleClickAway}>
            <div
              onMouseDown={preventFocus}
              onKeyDown={(e) => {
                if (e.key !== 'Escape') {
                  return;
                }

                e.stopPropagation();
                onClose?.();
                close();
              }}
            >
              <Suspense fallback={null}>
                <Picker
                  // https://github.com/missive/emoji-mart#custom-emojis
                  perLine={7}
                  maxFrequentRows={2}
                  previewPosition="none"
                  i18n={emojiI18n}
                  onEmojiSelect={handleSelectEmoji}
                  theme={theme.palette.type}
                />
              </Suspense>
            </div>
          </ClickAwayListener>
        </RcPopper>
      </>
    );
  },
);

export const EmojiMenu = styled(_EmojiMenu)``;
