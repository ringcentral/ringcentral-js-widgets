import { downloadFileWithIframe } from '@ringcentral-integration/utils';
import { RcIconButton, type RcIconButtonProps } from '@ringcentral/juno';
import { Download } from '@ringcentral/juno-icon';
import React, { FC } from 'react';

import { t } from './i18n';

type DownloadButtonProps = {
  url?: string;
  name?: string;
  onClick?: (href?: string) => void;
  size?: RcIconButtonProps['size'];
};

export const DownloadButton: FC<DownloadButtonProps> = ({
  url,
  name,
  onClick,
  size = 'small',
}) => {
  return (
    <RcIconButton
      title={t('download')}
      size={size}
      color="neutral.f07"
      variant="plain"
      data-sign="download"
      symbol={Download}
      onClick={(e) => {
        if (onClick) return onClick(url);

        e.preventDefault();
        e.stopPropagation();

        if (!url) return;

        downloadFileWithIframe(url, name!);
      }}
    />
  );
};
