import { RcIconButton, RcIconButtonProps } from '@ringcentral/juno';
import { Attachment } from '@ringcentral/juno-icon';
import React, { FC } from 'react';
import { useFileUpload } from 'use-file-upload';

import i18n from './i18n';

type AttachmentMenuViewProps = RcIconButtonProps & {
  acceptTypes: string;
  currentLocale: string;
  multiple?: boolean;
  onUpload?: (files: File[]) => void;
};

const handlePreventLeaveFocus = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
): void => e.preventDefault();

export const AttachButton: FC<AttachmentMenuViewProps> = ({
  acceptTypes: accept,
  multiple = false,
  currentLocale,
  onUpload,
  ...rest
}) => {
  const [, selectFile] = useFileUpload();
  return (
    <RcIconButton
      data-sign="attachButton"
      size="medium"
      symbol={Attachment}
      title={i18n.getString('attachFiles', currentLocale)}
      {...rest}
      onMouseDown={handlePreventLeaveFocus}
      onClick={() =>
        selectFile({ accept, multiple }, (result) => {
          const files = multiple
            ? (result as unknown as { file: File }[])
            : [result as unknown as { file: File }];
          onUpload?.(files.map((it) => it.file));
        })
      }
    />
  );
};
