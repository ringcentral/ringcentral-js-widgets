import { RcIconProps } from '@ringcentral/juno';
import { FileBorder } from '@ringcentral/juno-icon';
import React, { FC, HTMLAttributes } from 'react';

import styles from '../styles.scss';

import { DeleteButton, FileInfoWithAction } from './FileInfoWithAction';

type AttachmentItemProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  url?: string;
  onActionClick?: () => void;
  FileIconProps?: RcIconProps;
};

export const AttachmentItem: FC<AttachmentItemProps> = ({
  name,
  onActionClick,
  FileIconProps,
  ...rest
}) => {
  return (
    <div className={styles.attachmentItem} {...rest}>
      <FileInfoWithAction
        symbol={FileBorder}
        fileName={name}
        FileIconProps={FileIconProps}
        action={<DeleteButton onClick={onActionClick} />}
      />
    </div>
  );
};
