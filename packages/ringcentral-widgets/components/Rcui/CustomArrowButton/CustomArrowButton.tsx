import type { RcIconButtonProps } from '@ringcentral/juno';
import { RcIconButton } from '@ringcentral/juno';
import { ArrowRight1 } from '@ringcentral/juno-icon';
import type { FunctionComponent } from 'react';
import React from 'react';

type CustomArrowButtonProps = RcIconButtonProps;

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
