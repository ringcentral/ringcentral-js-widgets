/* eslint-disable jsx-a11y/alt-text */
import MessageAttachmentInfo from '@rc-ex/core/lib/definitions/MessageAttachmentInfo';
import { DownloadButton } from '@ringcentral-integration/next-widgets/components';
import {
  getFileExtension,
  removeExtension,
} from '@ringcentral-integration/utils';
import { CONTENT_TYPE_TO_EXTENSION } from '@ringcentral-integration/utils/src/utils/fileHandler/constant';
import { useResizeObserver } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import type { ComponentProps, FunctionComponent } from 'react';
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';

import styles from './styles.scss';

const TiffViewer = React.lazy(() => import('./TiffViewer'));

export interface ImageAttachmentRenderProps {
  direction?: 'Inbound' | 'Outbound';
  attachment: MessageAttachmentInfo;
  handleImageLoad?: () => void;
}

export const PreviewMedia: FunctionComponent<
  {
    height: number;
    width: number;
    maxWidth?: number;
  } & ComponentProps<'img'>
> = (props) => {
  const {
    maxWidth: maxWidthProp = global.document.body.clientWidth,
    height,
    width,
    ...rest
  } = props;

  const [maxWidth, setMaxWidth] = useState(maxWidthProp);

  const heightRatio = useMemo(() => height! / width!, [height, width]);
  const toWidth = useMemo(() => Math.min(maxWidth, width), [maxWidth, width]);

  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useResizeObserver(
    containerRef,
    () => {
      const parentElm = containerRef.current?.parentElement;
      if (parentElm) {
        setMaxWidth(parentElm.clientWidth);
      }
    },
    {
      mode: 'throttle',
    },
  );

  return (
    <div
      ref={containerRef}
      style={{
        width: `${toWidth}px`,
        height: `${toWidth * heightRatio}px`,
      }}
    >
      <img ref={imgRef} draggable="false" className="w-full h-full" {...rest} />
    </div>
  );
};

export const ImageAttachmentRender: FunctionComponent<
  ImageAttachmentRenderProps
> = (props) => {
  const { attachment, direction, handleImageLoad, ...rest } = props;

  const { uri, fileNameWithoutExt, fileExt, fileName, isTiff } = useMemo(() => {
    const nextUri = attachment.uri;
    const nextFileNameWithoutExt = attachment.fileName
      ? removeExtension(attachment.fileName)
      : attachment.id;
    const nextFileExt = attachment.fileName
      ? getFileExtension(attachment.fileName)
      : CONTENT_TYPE_TO_EXTENSION[attachment.contentType!];
    return {
      uri: nextUri,
      fileNameWithoutExt: nextFileNameWithoutExt,
      fileExt: nextFileExt,
      fileName: `${nextFileNameWithoutExt}.${nextFileExt}`,
      isTiff: nextFileExt.indexOf('tif') > -1,
    };
  }, [
    attachment.contentType,
    attachment.fileName,
    attachment.id,
    attachment.uri,
  ]);
  const [resolvedSize, setResolvedSize] = useState<{
    width: number;
    height: number;
  } | null>(
    attachment.width && attachment.height
      ? {
          width: attachment.width,
          height: attachment.height,
        }
      : null,
  );

  useEffect(() => {
    if (isTiff) {
      return;
    }

    if (attachment.width && attachment.height) {
      setResolvedSize({
        width: attachment.width,
        height: attachment.height,
      });
      return;
    }

    if (!uri) {
      return;
    }

    let active = true;
    const img = new Image();
    img.onload = () => {
      if (!active) {
        return;
      }
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      if (width > 0 && height > 0) {
        setResolvedSize({ width, height });
      }
    };
    img.src = uri;

    return () => {
      active = false;
      img.onload = null;
    };
  }, [attachment.height, attachment.width, isTiff, uri]);

  return (
    <div
      key={attachment.id}
      {...rest}
      className={clsx(
        'rounded-lg overflow-hidden relative outline-none z-10',
        direction === 'Outbound'
          ? 'last:rounded-br-none'
          : 'last:rounded-bl-none',
        styles.previewMedia,
      )}
    >
      {isTiff ? (
        <Suspense fallback={null}>
          <TiffViewer tiffUrl={uri!} onLoad={handleImageLoad} />
        </Suspense>
      ) : resolvedSize ? (
        <PreviewMedia
          height={resolvedSize.height}
          width={resolvedSize.width}
          loading="lazy"
          tabIndex={0}
          src={uri}
          alt={fileName}
          title={fileName}
          draggable="false"
          onLoad={handleImageLoad}
        />
      ) : (
        <div className="w-24 h-24" />
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
