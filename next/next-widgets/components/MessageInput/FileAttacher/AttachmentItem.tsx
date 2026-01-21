import { FileMd } from '@ringcentral/spring-icon';
import { IconProps } from '@ringcentral/spring-ui';
import React, { FC, HTMLAttributes } from 'react';

import { DeleteButton, FileInfoWithAction } from './FileInfoWithAction';

type AttachmentItemProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  url?: string;
  onActionClick?: () => void;
  FileIconProps?: IconProps;
};

export const AttachmentItem: FC<AttachmentItemProps> = ({
  name,
  onActionClick,
  FileIconProps,
  ...rest
}) => {
  return (
    <FileInfoWithAction
      symbol={FileMd}
      fileName={name}
      FileIconProps={FileIconProps}
      action={<DeleteButton onClick={onActionClick} />}
      {...rest}
    />
  );
};
