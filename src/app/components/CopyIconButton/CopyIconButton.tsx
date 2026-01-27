import { RcIconButton, useRefState, useSleep } from '@ringcentral/juno';
import { Check, Copy } from '@ringcentral/juno-icon';
import React, {
  type ComponentProps,
  type FunctionComponent,
  useEffect,
} from 'react';
import { useCopyToClipboard } from 'react-use';

import { useLocale } from '../../hooks';

import i18n from './i18n';

type CopyIconButtonProps = {
  /**
   * text that you want to copy
   */
  text?: string;
  /**
   * copied success disappear time
   *
   * @default 3000
   */
  disappearTime?: number;
  /**
   * copy text that you want to copy when click
   */
  getText?: () => string;
  /**
   * trigger when copied success
   */
  onCopied?: (copiedText: string) => void;
} & ComponentProps<typeof RcIconButton>;

const preventFocus = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
): void => e.preventDefault();

export const CopyIconButton: FunctionComponent<CopyIconButtonProps> = ({
  text,
  getText,
  onCopied,
  disappearTime = 3000,
  ...rest
}) => {
  const [, copy] = useCopyToClipboard();
  const { t } = useLocale(i18n);

  const [copiedRef, setCopied] = useRefState(false);

  const { sleep } = useSleep();

  const copied = copiedRef.current;

  useEffect(() => {
    if (!copied) return;

    sleep(disappearTime).then(() => {
      setCopied(false, true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copied]);

  return copied ? (
    <RcIconButton
      variant="plain"
      disableRipple
      title={t('copied')}
      color="success.f02"
      onMouseDown={preventFocus}
      size="small"
      TooltipProps={{
        placement: 'top',
      }}
      symbol={Check}
      {...rest}
    />
  ) : (
    <RcIconButton
      variant="plain"
      title={t('copy')}
      size="small"
      onMouseDown={preventFocus}
      symbol={Copy}
      onClick={() => {
        setCopied(true, false);
        const copyText = text || getText?.();

        if (process.env.NODE_ENV !== 'production' && !copyText) {
          console.warn(
            '[CopyIconButton] cannot get correct text, make sure you have set `text` or `getText` prop',
          );
          return;
        }

        const copiedText = copyText || '';
        copy(copiedText);
        onCopied?.(copiedText);
      }}
      {...rest}
    />
  );
};
