import { RcFabIconButton, RcFabIconButtonProps } from '@ringcentral/juno';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import {
  Tooltip,
  TooltipProps,
} from '@ringcentral-integration/widgets/components/Rcui/Tooltip';

import styles from './styles.scss';

export type CircleIconButtonProps = {
  active?: boolean;
  normal?: boolean;
  className?: string;
  dataSign?: string;
} & Pick<
  RcFabIconButtonProps,
  | 'color'
  | 'symbol'
  | 'size'
  | 'className'
  | 'disabled'
  | 'onClick'
  | 'innerRef'
> &
  Pick<TooltipProps, 'title' | 'placement'>;

export const CircleIconButton: FunctionComponent<CircleIconButtonProps> = ({
  symbol,
  color,
  title,
  size,
  disabled,
  onClick,
  innerRef,
  active,
  normal,
  className,
  placement,
  dataSign,
}) => {
  // this div provides ref for RcTooltip because RcFabIconButton can't
  return (
    <Tooltip title={title} placement={placement}>
      <div>
        <RcFabIconButton
          data-sign={dataSign}
          color={color}
          symbol={symbol}
          size={size}
          classes={{
            root: classNames({
              [styles.buttonNormal]: normal,
              [styles.buttonActive]: active,
              [styles.buttonDisable]: disabled,
              [className]: !!className,
            }),
          }}
          disabled={disabled}
          onClick={onClick}
          innerRef={innerRef}
        />
      </div>
    </Tooltip>
  );
};

CircleIconButton.defaultProps = {
  active: false,
  normal: false,
  className: undefined,
  placement: 'bottom',
  dataSign: undefined,
};
