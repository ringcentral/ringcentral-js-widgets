import {
  RcIcon,
  RcIconProps,
  SvgSymbol,
  RcIconButton,
} from '@ringcentral/juno';
import { Close } from '@ringcentral/juno-icon';
import React, { FC } from 'react';

import styles from '../styles.scss';

import { FileName } from './FileName';

type AttachmentItemActionProps = {
  onClick?: () => void;
};

export const DeleteButton: FC<AttachmentItemActionProps> = ({ onClick }) => {
  return (
    <RcIconButton
      size="small"
      color="neutral.f07"
      onClick={onClick}
      data-sign="removeFileIconButton"
      symbol={Close}
    />
  );
};

export interface FileInfoProps {
  symbol: SvgSymbol;
  fileName: string;
  FileIconProps?: RcIconProps;
  key?: string;
  action?: React.ReactNode;
}

export const FileInfoWithAction: FC<FileInfoProps> = ({
  fileName,
  symbol,
  FileIconProps,
  action,
  ...rest
}) => {
  return (
    <div className={styles.fileInfoItem} data-sign="file-info" {...rest}>
      <RcIcon
        size="small"
        role="presentation"
        aria-label="File type icon"
        symbol={symbol}
        {...FileIconProps}
      />
      <div className={styles.fileNameWrapper}>
        <FileName fileName={fileName} />
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
