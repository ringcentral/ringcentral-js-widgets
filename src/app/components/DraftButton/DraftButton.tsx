import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { RcIconButton } from '@ringcentral/juno';
import { Draft } from '@ringcentral/juno-icon';
import type { FunctionComponent, MouseEventHandler } from 'react';
import React from 'react';

import i18n from './i18n';

interface DraftButtonInterface {
  onClick: MouseEventHandler<HTMLButtonElement>;
  title?: string;
  currentLocale: string;
  disabled?: boolean;
}

export const DraftButton: FunctionComponent<DraftButtonInterface> = ({
  onClick,
  currentLocale,
  title,
  disabled = false,
}) => {
  const { t } = useLocale(i18n);

  return (
    <RcIconButton
      symbol={Draft}
      title={title || t('title')}
      onClick={onClick}
      color="action.primary"
      variant="plain"
      data-sign="draftBtn"
      disabled={disabled}
    />
  );
};
