import React, { FunctionComponent } from 'react';

import { RcIconButton, RcIconButtonProps } from '@ringcentral/juno';
import { ArrowRight1 } from '@ringcentral/juno-icon';

type CustomArrowButtonProps = {} & RcIconButtonProps;

export const CustomArrowButton: FunctionComponent<CustomArrowButtonProps> = ({
  ...rest
}) => {
  return (
    <RcIconButton
      data-sign="arrow_icon"
      color="neutral.f03"
      variant="plain"
      {...rest}
    />
  );
};
CustomArrowButton.defaultProps = {
  onClick() {},
  symbol: ArrowRight1,
  size: 'large',
};
