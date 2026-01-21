import { logger } from '@ringcentral-integration/next-core';
import {
  RcBackdrop,
  RcBackdropProps,
  RcCircularProgress,
  RcCircularProgressProps,
  RcPortal,
  spacing,
  styled,
  zIndex,
} from '@ringcentral/juno';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React, { useState } from 'react';

import { CarouselModalDialogGlobalStyle, outOfViewStyle } from './styles';

type CarouselModalItemDialogSize = {
  width: number;
  height: number;
};

export type CarouselModalItemProps = {
  url: string;
  show: boolean;
  /**
   * before iframe be loaded, is show loading for user
   *
   * @default false
   */
  showLoading?: boolean;
  /**
   * backdrop props when loading
   */
  LoadingBackdropProps?: RcBackdropProps;
  /**
   * spinner props when loading
   */
  LoadingSpinnerProps?: RcCircularProgressProps;
  /**
   * emit when not found inner container
   */
  onLoadFail?: (e: React.SyntheticEvent<HTMLIFrameElement, Event>) => void;
  /**
   * container getter that be call after iframe loaded to find the root container
   */
  getContainerSize: (
    contentDocument: Document | null,
  ) => CarouselModalItemDialogSize | undefined;
  /**
   * that container size, if have set will force use that size instead of `getContainer` return size
   */
  size?: CarouselModalItemDialogSize;
} & HTMLAttributes<HTMLDivElement>;

const TopRcBackdrop = styled(RcBackdrop)`
  z-index: ${zIndex('modal')};
`;

const _CarouselModalItem: FunctionComponent<CarouselModalItemProps> = (
  props,
) => {
  const {
    url,
    title,
    show,
    size: forceSize,
    showLoading = false,
    LoadingBackdropProps,
    LoadingSpinnerProps,
    getContainerSize,
    onLoadFail,
    ...rest
  } = props;
  const [size, setSize] = useState(
    forceSize || {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    },
  );
  const [loading, setLoading] = useState(true);

  const handleLoad = (
    e: React.SyntheticEvent<HTMLIFrameElement, Event>,
  ): void => {
    if (forceSize) {
      setLoading(false);
      return;
    }

    const iframe = e.target as HTMLIFrameElement;
    const size = getContainerSize(iframe.contentDocument);

    if (!size) {
      logger.warn('[CarouselModalItem]', 'getContainerSize not found size');

      onLoadFail?.(e);
      return;
    }

    setSize(size);
    setLoading(false);
  };

  const handleError = (
    e: React.SyntheticEvent<HTMLIFrameElement, Event>,
  ): void => {
    onLoadFail?.(e);
  };

  return (
    <>
      {showLoading && show ? (
        <RcPortal>
          <TopRcBackdrop {...LoadingBackdropProps} open={loading}>
            <RcCircularProgress size={32} {...LoadingSpinnerProps} />
          </TopRcBackdrop>
        </RcPortal>
      ) : null}
      {show && <CarouselModalDialogGlobalStyle {...size} loading={loading} />}
      <div key={url} {...rest}>
        <iframe
          key={url}
          tabIndex={-1}
          onLoad={handleLoad}
          onError={handleError}
          width={size.width}
          height={size.height}
          src={url}
          title={title}
        />
      </div>
    </>
  );
};

export const CarouselModalItem = styled(_CarouselModalItem)`
  ${({ show }) => !show && outOfViewStyle};

  iframe {
    display: block;
    line-height: 0;
    border-radius: ${spacing(3)};
  }
`;
