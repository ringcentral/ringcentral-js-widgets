import { CONTENT_TYPE_TO_EXTENSION } from '@ringcentral-integration/utils/src/utils/fileHandler/constant';
import { RcIcon } from '@ringcentral/juno';
import { FileBorder } from '@ringcentral/juno-icon';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React from 'react';

import {
  getFileExtension,
  removeExtension,
} from '../../../utils/src/utils/fileHandler/fileHandler';
import { DownloadButton } from '../DownloadButton';
import { getFileSize } from '../MessageInput/FileAttacher/utils/getFileSize';

import styles from './styles.scss';

interface IFileAttachmentRenderProps {
  attachment: {
    contentType: string;
    fileName: string;
    height: number;
    width: number;
    id: number;
    size: number;
    type: 'MmsAttachment';
    uri: string;
  };
  currentLocale: string;
  onLinkClick?: (href?: string) => void;
}

export const FileAttachmentRender: FunctionComponent<
  IFileAttachmentRenderProps
> = ({ attachment, onLinkClick }) => {
  const fileName = attachment.fileName
    ? removeExtension(attachment.fileName)
    : attachment.id;
  const fileExt = attachment.fileName
    ? getFileExtension(attachment.fileName)
    : CONTENT_TYPE_TO_EXTENSION[attachment.contentType];
  const fileSize = getFileSize(attachment.size);
  const downloadUrl = `${attachment.uri}&contentDisposition=Attachment`;
  return (
    <div key={attachment.id} className="flex items-center w-full space-x-2">
      <RcIcon size="large" symbol={FileBorder} />
      <div className="flex-1 min-w-0">
        <div
          className="flex items-center text-neutral-b1 typography-mainText overflow-hidden"
          data-sign="file-full-name"
        >
          <div className="truncate">{fileName}</div>
          <div className={clsx('flex-none', styles.ext)}>.{fileExt}</div>
        </div>
        <div className="text-neutral-b2 text-sm">{fileSize}</div>
      </div>
      <div>
        <DownloadButton
          size="large"
          url={downloadUrl}
          name={`${fileName}.${fileExt}`}
          onClick={onLinkClick}
        />
      </div>
    </div>
  );
};
