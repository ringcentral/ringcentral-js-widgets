import {
  palette2,
  RcCircularProgress,
  RcLoading,
  setOpacity,
  styled,
  zIndex,
} from '@ringcentral/juno';
import React from 'react';

export type StyledLoadingPageProps = {
  size?: number;
  backgroundType?: 'mask';
  disableShrink?: boolean;
};

const backgroundColor = setOpacity(palette2('neutral', 'b01'), '40', true);

const StyledLoading = styled.div<StyledLoadingPageProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0px;
  left: 0px;
  background: ${backgroundColor};
  z-index: ${(props) => zIndex('tooltip')(props) + 1};
`;

export const LoadingOverlay = ({
  backgroundType,
  size,
  disableShrink,
}: StyledLoadingPageProps) => (
  <StyledLoading backgroundType={backgroundType}>
    <RcCircularProgress size={size} disableShrink={disableShrink} />
  </StyledLoading>
);

export const SpinnerOverlay = RcLoading;

SpinnerOverlay.defaultProps = {
  LoadingComponent: LoadingOverlay,
};
