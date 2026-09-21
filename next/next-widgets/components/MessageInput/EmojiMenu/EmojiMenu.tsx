import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { useTheme } from '@ringcentral/juno';

/* eslint-disable jsx-a11y/no-static-element-interactions */
import { EmojiMd as Emoji } from '@ringcentral/spring-icon';
import {
  ClickAwayListener,
  getSelectionPosition,
  IconButton,
  Popper,
  useEventListener,
  useForkRef,
} from '@ringcentral/spring-ui';
import React, {
  ComponentProps,
  forwardRef,
  HTMLAttributes,
  lazy,
  PropsWithChildren,
  Ref,
  Suspense,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';

import i18n from '../i18n';

import { Emoji as IEmoji } from './Emoji.interface';
import './styles.scss';
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

type PopperRef = ComponentProps<typeof Popper>['ref'];

export const EmojiMenu = forwardRef<HTMLButtonElement, EmojiMenuProps>(
  (props, ref) => {
    const {
      closeWhenFocusOnInput = true,
      autoClose = true,
      action,
      onSelect,
      onOpen,
      onClose,
      getInputElement,
    } = props;

    const theme = useTheme();
    const popperRef: PopperRef = useRef(null);
    const positionRef = useRef<PositionType>(null);
    const innerRef = useRef<HTMLButtonElement>(null);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
      null,
    );
    const emojiI18n = useEmojiI18n();
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

    useEffect(() => {
      // preload emoji picker
      // @ts-ignore
      import('@emoji-mart/react');
    }, []);

    // update popper position after view ready
    useLayoutEffect(() => {
      if (!isOpen) return;

      requestAnimationFrame(() => {
        (popperRef.current as any)?.update?.();
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
    const { t } = useLocale(i18n);

    return (
      <>
        <IconButton
          variant="icon"
          size="large"
          color="secondary"
          aria-describedby={id}
          className="text-neutral-b2"
          ref={anchorElRef}
          TooltipProps={{
            title: t('emoji'),
          }}
          data-sign="emojiButton"
          symbol={Emoji}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={toggle}
        />
        {isOpen && (
          <Popper
            placement="top"
            ref={popperRef}
            className="z-modal min-h-[300px] min-w-[280px] w-full"
            id={id}
            anchorEl={anchorEl}
            padding={{
              left: 10,
            }}
          >
            <ClickAwayListener onClickAway={handleClickAway}>
              <div
                className="border rounded-sui-sm shadow-md"
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
                    // TODO: spring-ui not have light or dark in the theme info, need to fix inside spring-ui
                    theme={theme.palette.type}
                  />
                </Suspense>
              </div>
            </ClickAwayListener>
          </Popper>
        )}
      </>
    );
  },
);
