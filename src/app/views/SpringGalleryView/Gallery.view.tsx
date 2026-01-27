/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  injectable,
  optional,
  portal,
  RcViewModule,
  UIProps,
} from '@ringcentral-integration/next-core';
import { useHammerZoom } from '@ringcentral-integration/react-hooks';
import { stopPropagation } from '@ringcentral-integration/utils';
import {
  RcAvatar,
  RcAvatarProps,
  RcIconButton,
  RcIconButtonGroup,
  RcSlide,
  RcText,
  RcZoomFrom,
} from '@ringcentral/juno';
import { Close } from '@ringcentral/juno-icon';
import clsx from 'clsx';
import React, { forwardRef, useRef, useState } from 'react';

import { DownloadButton } from '../../components/DownloadButton';
import { TextMiddleEllipsis } from '../../components/TextMiddleEllipsis';
import { ModalRef, ModalView, useModalItemView } from '../ModalView';

import type { GalleryViewOptions } from './Gallery.view.interface';
import { ZoomAction, ZoomActionType } from './styles';

type ImgProps = {
  $draggable: boolean;
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
    // TODO: fix in juno
    nodeRef?: any;
  };

export const gapHeight = 40;

const Img = forwardRef<HTMLImageElement, ImgProps>(
  ({ $draggable, nodeRef, ...props }, ref) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      data-sign="gallery-image"
      {...props}
      ref={ref}
      className={clsx(
        $draggable ? 'cursor-move' : 'cursor-default',
        'shadow-lg select-none max-w-full max-h-[calc(100vh-104px)] object-contain',
      )}
      width={600}
      height={400}
    />
  ),
);

const ContentProps = {
  style: { overflow: 'hidden' },
};
const TransitionProps = {
  timeout: 450,
};
const BackdropProps = { style: { opacity: 0 } };

const minScaleRate = 0.1;
const maxScaleRate = 20;

export type GalleryOpenInfo = {
  subject?: string;
  description?: string;
  primary?: string;
  secondary?: string;
  AvatarProps?: UIProps<RcAvatarProps>;
  downloadUrl?: string;
};

export type GalleryPayload = {
  url: string;
  alt?: string;
  info?: GalleryOpenInfo;
};

export type GalleryOpenOptions = {
  alt?: string;
  sourceElement?: HTMLElement;
  info?: GalleryOpenInfo;
};

@injectable({
  name: 'GalleryView',
})
export class GalleryView extends RcViewModule implements ModalRef {
  private sourceElement: HTMLElement | null = null;

  @portal
  private _gallery = this._modalView.create<GalleryPayload>({
    view: this,
    props: () => ({
      fullScreen: true,
      ContentProps,
      BackdropProps,
      disableEscapeKeyDown: false,
      TransitionProps,
      onExited: () => {
        this.sourceElement = null;
      },
    }),
  });

  constructor(
    private _modalView: ModalView,
    @optional('GalleryViewOptions')
    protected _galleryViewOptions?: GalleryViewOptions,
  ) {
    super();
  }

  /**
   * open image gallery from source element
   */
  open(url: string, { alt, sourceElement, info }: GalleryOpenOptions) {
    if (sourceElement) {
      this.sourceElement = sourceElement;
    }

    const result = this._modalView.open(this._gallery, {
      url,
      alt,
      info,
    });

    return result;
  }

  private getHostElement() {
    return {
      current: this.sourceElement || null,
    };
  }

  header = () => {
    const { props, action } = useModalItemView<GalleryPayload>();
    const { open, payload } = props;
    const { info } = payload || {};

    const {
      downloadUrl,
      subject,
      description,
      AvatarProps,
      primary,
      secondary,
    } = info || {};

    return (
      <RcSlide in={open}>
        <header className="bg-neutral-b4 flex items-center p-6 border-b border-neutral-b3 h-16">
          <div className="flex w-1/4 items-center justify-start pr-2 gap-2">
            <RcAvatar size="xsmall" {...AvatarProps} />
            <div>
              {primary && <RcText color="neutral.f06">{primary}</RcText>}
              {secondary && (
                <RcText color="neutral.f04" variant="caption1">
                  {secondary}
                </RcText>
              )}
            </div>
          </div>
          <div className="flex w-1/2 items-center justify-center gap-2">
            {subject && (
              <RcText color="neutral.f06">
                <TextMiddleEllipsis>{subject}</TextMiddleEllipsis>
              </RcText>
            )}
            {description && <RcText color="neutral.f04">{description}</RcText>}
          </div>
          <div className="flex w-1/4 items-center justify-end">
            <RcIconButtonGroup className="-mr-2">
              {downloadUrl && (
                <DownloadButton
                  size="medium"
                  data-sign="gallery-download"
                  url={downloadUrl}
                  variant="round"
                  name={subject}
                />
              )}
              <RcIconButton
                data-sign="gallery-close"
                symbol={Close}
                onClick={() => action?.close()}
              />
            </RcIconButtonGroup>
          </div>
        </header>
      </RcSlide>
    );
  };

  footer = null;

  component() {
    const { props, action } = useModalItemView<GalleryPayload>();
    const { open, payload } = props;
    const { url, alt } = payload || {};
    const [draggable, setDraggable] = useState(false);

    const zoomRef = useRef<ZoomActionType>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const zoomActions = useHammerZoom(imgRef, {
      container: containerRef,
      min: minScaleRate,
      max: maxScaleRate,
      onScale: (scale) => {
        zoomRef.current?.setRate(scale);
      },
      onDragChange: (state) => {
        setDraggable(state);
      },
    });

    const elementRef = this.getHostElement();
    const imgContainerRef = useRef<HTMLDivElement>(null);
    const img = (
      <Img
        ref={imgRef}
        $draggable={draggable}
        src={url}
        alt={alt}
        draggable="false"
      />
    );

    return (
      <div
        ref={containerRef}
        data-sign="gallery-container"
        className="bg-neutral-b5 relative flex items-center justify-center overflow-hidden h-full"
        onClick={() => {
          zoomActions.reset();
          action?.close();
        }}
      >
        <div
          ref={imgContainerRef}
          data-sign="gallery-image-container"
          onClick={(e) => {
            // when click on container, close modal
            if (e.target === imgContainerRef.current) return;

            // when click on img, stop propagation
            stopPropagation(e);
          }}
        >
          {elementRef.current ? (
            <RcZoomFrom from={elementRef} in={open} timeout={450}>
              {img}
            </RcZoomFrom>
          ) : (
            img
          )}
        </div>
        <ZoomAction
          ref={zoomRef}
          min={minScaleRate}
          max={maxScaleRate}
          onZoom={(scale) => {
            zoomActions?.zoom(scale);
          }}
        />
      </div>
    );
  }
}
