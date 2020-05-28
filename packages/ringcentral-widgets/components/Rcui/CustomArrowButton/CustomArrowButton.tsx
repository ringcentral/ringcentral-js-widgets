import { RcIconButton, RcIconButtonProps } from '@ringcentral-integration/rcui';
import arrowRight1Svg from '@ringcentral-integration/rcui/icons/icon-arrow_right1.svg';
import React, { FunctionComponent } from 'react';

type CustomArrowButtonProps = {
  disabled?: boolean;
} & RcIconButtonProps;

export const CustomArrowButton: FunctionComponent<CustomArrowButtonProps> = ({
  ...rest
}) => {
  return (
    <RcIconButton
      data-sign="arrow_icon"
      color="grey.600"
      variant="plain"
      {...rest}
    />
  );
};
CustomArrowButton.defaultProps = {
  onClick() {},
  symbol: arrowRight1Svg,
  size: 'large',
};
