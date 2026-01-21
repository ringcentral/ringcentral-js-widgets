import { downloadFileWithIframe } from '@ringcentral-integration/utils';
import { RcIconButton, RcIconButtonProps } from '@ringcentral/juno';
import { Download } from '@ringcentral/juno-icon';
import React, { FC } from 'react';

import { useLocale } from '../../hooks';

import i18n from './i18n';

type DownloadButtonProps = {
  url?: string;
  name?: string;
} & RcIconButtonProps;

export const DownloadButton: FC<DownloadButtonProps> = ({
  url,
  name,
  ...rest
}) => {
  const { t } = useLocale(i18n);
  return (
    <RcIconButton
      size="medium"
      color="neutral.f04"
      variant="plain"
      title={t('download')}
      aria-label="download file"
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!url) return;

        downloadFileWithIframe(url, name!);
      }}
      symbol={Download}
      {...rest}
    />
  );
};
