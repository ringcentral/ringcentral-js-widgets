import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { Xmd } from '@ringcentral/spring-icon';
import { Icon, IconButton, IconProps } from '@ringcentral/spring-ui';
import React, { FC } from 'react';

import { TextMiddleEllipsis } from './TextMiddleEllipsis';
import i18n from './i18n';

type AttachmentItemActionProps = {
  onClick?: () => void;
};

export const DeleteButton: FC<AttachmentItemActionProps> = ({ onClick }) => {
  const { t } = useLocale(i18n);
  return (
    <IconButton
      size="small"
      variant="icon"
      color="secondary"
      TooltipProps={{
        title: t('remove'),
      }}
      onClick={onClick}
      data-sign="removeFileIconButton"
      symbol={Xmd}
    />
  );
};

export interface FileInfoProps {
  symbol: IconProps['symbol'];
  fileName: string;
  fileSize?: number;
  FileIconProps?: IconProps;
  key?: string;
  action?: React.ReactNode;
}

export const FileInfoWithAction: FC<FileInfoProps> = ({
  fileName,
  fileSize,
  symbol,
  FileIconProps,
  action,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className="flex items-center h-[42px] p-[10px] w-full gap-2 rounded shadow"
      data-sign="file-info"
    >
      <Icon
        size="small"
        role="presentation"
        aria-label="File type icon"
        symbol={symbol}
        {...FileIconProps}
      />
      <div className="flex items-center flex-1 overflow-hidden">
        <div className="flex-1 overflow-hidden whitespace-nowrap">
          <TextMiddleEllipsis>{fileName}</TextMiddleEllipsis>
        </div>
        {fileSize !== undefined && (
          <div className="flex-shrink-0 ml-2 whitespace-nowrap text-right">
            {(fileSize / 1024).toFixed(1)} KB
          </div>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};
