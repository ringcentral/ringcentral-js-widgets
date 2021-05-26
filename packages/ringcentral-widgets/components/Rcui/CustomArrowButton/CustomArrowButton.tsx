import { RcIconButton, RcIconButtonProps } from '@ringcentral/juno';
import arrowRight1Svg from '@ringcentral/juno/icon/ArrowRight1';
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
      /* !!!This token not exist! CONFIRM with Designer which one should use */
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
