import { logger } from '@ringcentral-integration/next-core';
import { CheckMd, CopyMd } from '@ringcentral/spring-icon';
import {
  IconButton,
  IconButtonProps,
  useRefState,
  useSleep,
} from '@ringcentral/spring-ui';
import React, { type FunctionComponent, useEffect } from 'react';
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
} & IconButtonProps;

const preventFocus = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
): void => e.preventDefault();

export const CopyIconButtonSpring: FunctionComponent<CopyIconButtonProps> = ({
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
    <IconButton
      variant="icon"
      className="text-success"
      onMouseDown={preventFocus}
      size="xsmall"
      TooltipProps={{
        placement: 'top',
        title: t('copied'),
      }}
      symbol={CheckMd}
      {...rest}
    />
  ) : (
    <IconButton
      variant="icon"
      TooltipProps={{
        placement: 'top',
        title: t('copy'),
      }}
      size="xsmall"
      color="secondary"
      onMouseDown={preventFocus}
      symbol={CopyMd}
      data-sign="copy"
      onClick={() => {
        setCopied(true, false);
        const copyText = text || getText?.();

        if (process.env.NODE_ENV !== 'production' && !copyText) {
          logger.warn(
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
