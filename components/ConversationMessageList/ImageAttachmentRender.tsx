import MessageAttachmentInfo from '@rc-ex/core/lib/definitions/MessageAttachmentInfo';
import {
  getFileExtension,
  removeExtension,
} from '@ringcentral-integration/utils';
import { CONTENT_TYPE_TO_EXTENSION } from '@ringcentral-integration/utils/src/utils/fileHandler/constant';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React, { Suspense } from 'react';

import { DownloadButton } from '../DownloadButton';

import styles from './styles.scss';

const TiffViewer = React.lazy(() => import('./TiffViewer'));

export interface ImageAttachmentRenderProps {
  attachment: MessageAttachmentInfo;
  handleImageLoad?: () => void;
}

export const ImageAttachmentRender: FunctionComponent<
  ImageAttachmentRenderProps
> = (props) => {
  const { attachment, handleImageLoad, ...rest } = props;

  const uri = attachment.uri;
  const fileNameWithoutExt = attachment.fileName
    ? removeExtension(attachment.fileName)
    : attachment.id;
  const fileExt = attachment.fileName
    ? getFileExtension(attachment.fileName)
    : CONTENT_TYPE_TO_EXTENSION[attachment.contentType!];
  const fileName = `${fileNameWithoutExt}.${fileExt}`;
  const isTiff = fileExt.indexOf('tif') > -1;

  return (
    <div
      key={attachment.id}
      {...rest}
      className={clsx(
        'rounded-lg overflow-hidden relative outline-none z-10',
        styles.previewMedia,
      )}
    >
      {isTiff ? (
        <Suspense fallback={<div></div>}>
          <TiffViewer tiffUrl={uri!} onLoad={handleImageLoad} />
        </Suspense>
      ) : (
        <img
          loading="lazy"
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          src={uri}
          alt={fileName}
          title={fileName}
          draggable="false"
          className="w-full"
          onLoad={handleImageLoad}
        />
      )}
      <div
        className={clsx(
          'bg-neutral-b4 h-8 p-2 flex items-center absolute left-0 bottom-0 translate-y-full transition-neutral-01-fast w-full',
          styles.hoverAction,
        )}
        data-sign="image-toolbar"
      >
        {fileName && (
          <div
            className="flex typography-mainText overflow-hidden flex-auto pr-2"
            data-sign="image-name"
          >
            <div className="truncate">{fileNameWithoutExt}</div>
            <div className={clsx('flex-none', styles.ext)}>.{fileExt}</div>
          </div>
        )}
        <div className="ml-auto">
          <DownloadButton
            size="medium"
            url={`${uri}&contentDisposition=Attachment`}
            name={fileName}
          />
        </div>
      </div>
    </div>
  );
};
