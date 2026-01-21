import {
  RcIconButton,
  useEventListener,
  useKeyboardMoveFocus,
} from '@ringcentral/juno';
import { ArrowLeft2, ArrowRight, Close } from '@ringcentral/juno-icon';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';

import { DialogContentReset, useModalItemView } from '../../ModalView';

import { CarouselModalItem, CarouselModalItemProps } from './CarouselModalItem';
import {
  ButtonWrap,
  CarouselModalDialogInvisibleGlobalStyle,
  CloseWrap,
  DotItem,
  DotWrap,
} from './styles';

export type CarouselModalPanelProps = {
  activeIndex: number;
  setActiveIndex: (activeIndex: number) => void;
  invisible?: boolean;
} & HTMLAttributes<HTMLDivElement> &
  Pick<CarouselModalItemProps, 'onLoadFail' | 'getContainerSize'>;

export type CarouselModalItemInfo = {
  url: string;
  size?: {
    width: number;
    height: number;
  };
};

export type CarouselModalPayload = {
  data: CarouselModalItemInfo[];
  /**
   * when open init carousel index
   *
   * @default 0
   */
  initIndex?: number;
} & Pick<
  CarouselModalItemProps,
  'showLoading' | 'LoadingBackdropProps' | 'LoadingSpinnerProps'
>;

export const CarouselModalPanel: FunctionComponent<CarouselModalPanelProps> = ({
  activeIndex,
  getContainerSize,
  setActiveIndex,
  onLoadFail,
  invisible,
}) => {
  const { action, props } = useModalItemView<CarouselModalPayload>();

  const payload = props.payload!;

  const { data, showLoading } = payload;
  const totalLength = data.length;
  const moreThenHalf = activeIndex >= totalLength / 2;

  const { onKeyFocusedIndexHandle } = useKeyboardMoveFocus({
    options: data,
    columns: totalLength,
    focusedIndexRef: { current: activeIndex },
    infinite: false,
    onFocusedIndexChange: (event, toIndex) => {
      setActiveIndex(toIndex);

      event?.preventDefault();
    },
  });

  useEventListener(global.document, 'keydown', (e: React.KeyboardEvent) => {
    onKeyFocusedIndexHandle(e);
  });

  return (
    <>
      {invisible ? <CarouselModalDialogInvisibleGlobalStyle /> : null}
      <DialogContentReset>
        <CloseWrap>
          <RcIconButton
            symbol={Close}
            variant="outline"
            radius="circle"
            size="small"
            color="neutral.f06"
            onClick={() => {
              action?.close();
            }}
          />
        </CloseWrap>
        {activeIndex !== 0 ? (
          <ButtonWrap direction="left">
            <RcIconButton
              symbol={ArrowLeft2}
              variant="inverse"
              size="xlarge"
              color="neutral.f11"
              onClick={() => {
                setActiveIndex(activeIndex - 1);
              }}
            />
          </ButtonWrap>
        ) : null}
        {data.map(({ url, size }, i) => (
          <CarouselModalItem
            // here index never be change, so use i is find
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            url={url}
            show={i === activeIndex}
            size={size}
            showLoading={showLoading}
            onLoadFail={onLoadFail}
            getContainerSize={getContainerSize}
          />
        ))}
        {activeIndex !== totalLength - 1 ? (
          <ButtonWrap direction="right">
            <RcIconButton
              symbol={ArrowRight}
              variant="inverse"
              size="xlarge"
              color="neutral.f11"
              onClick={() => {
                setActiveIndex(activeIndex + 1);
              }}
            />
          </ButtonWrap>
        ) : null}
        {totalLength > 1 ? (
          <DotWrap>
            <DotItem
              active={!moreThenHalf}
              onClick={() => {
                setActiveIndex(0);
              }}
            />
            <DotItem
              active={moreThenHalf}
              onClick={() => {
                setActiveIndex(totalLength - 1);
              }}
            />
          </DotWrap>
        ) : null}
      </DialogContentReset>
    </>
  );
};
