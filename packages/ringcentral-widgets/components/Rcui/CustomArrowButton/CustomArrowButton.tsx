import { RcIconButton, RcIconButtonProps } from '@ringcentral-integration/rcui';
import React from 'react';
import arrowRight1Svg from '@ringcentral-integration/rcui/icons/icon-arrow_right1.svg';

import styles from './styles.scss';

type CustomArrowButtonProps = {
  disabled?: boolean;
  onClick?: (...args: any[]) => any;
  symbol?: RcIconButtonProps['symbol'];
};
export const CustomArrowButton: React.FC<CustomArrowButtonProps> = ({
  disabled,
  onClick,
  symbol,
}) => (
  <RcIconButton
    data-sign="arrow_icon"
    className={styles.button}
    variant="round"
    size="medium"
    disabled={disabled}
    symbol={symbol}
    onClick={onClick}
  />
);
CustomArrowButton.defaultProps = {
  disabled: false,
  onClick() {},
  symbol: arrowRight1Svg,
};
