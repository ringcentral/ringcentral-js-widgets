import React, { FC } from 'react';

import { AttachmentItem } from './AttachmentItem';
import type { FileItem } from './AttachmentItem.interface';

export type AttachmentListProps = {
  files?: FileItem[];
  onRemoveAttachment?: (file: FileItem) => void;
};

export const AttachmentList: FC<AttachmentListProps> = ({
  files = [],
  onRemoveAttachment,
}) => {
  return (
    <>
      {files.map((file, index) => {
        const { name, id } = file;
        return (
          <AttachmentItem
            key={`file-idx-${index}-${id}`}
            name={name}
            onActionClick={() => onRemoveAttachment?.(file)}
          />
        );
      })}
    </>
  );
};
