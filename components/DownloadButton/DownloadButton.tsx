import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { downloadFileWithIframe } from '@ringcentral-integration/utils';
import { DownloadMd } from '@ringcentral/spring-icon';
import { IconButton, IconButtonProps } from '@ringcentral/spring-ui';
import React, { FC } from 'react';

import i18n from './i18n';

type DownloadButtonProps = {
  url?: string;
  name?: string;
  onClick?: (href?: string) => void;
  size?: IconButtonProps['size'];
} & Omit<IconButtonProps, 'size' | 'onClick'>;

export const DownloadButton: FC<DownloadButtonProps> = ({
  url,
  name,
  onClick,
  size = 'small',
  ...rest
}) => {
  const { t } = useLocale(i18n);

  return (
    <IconButton
      size={size}
      color="secondary"
      variant="icon"
      title={t('download')}
      data-sign="download"
      TooltipProps={{
        title: t('download'),
      }}
      aria-label="download file"
      onClick={async (e) => {
        if (onClick) return onClick(url);

        e.preventDefault();
        e.stopPropagation();

        if (!url) return;

        downloadFileWithIframe(url, name!);
      }}
      symbol={DownloadMd}
      {...rest}
    />
  );
};
