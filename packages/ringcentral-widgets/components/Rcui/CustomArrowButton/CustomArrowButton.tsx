import { RcIconButton, RcIconButtonProps } from '@ringcentral-integration/rcui';
import React from 'react';

import styles from './styles.scss';

type CustomArrowButtonProps = {
  disabled?: boolean;
  onClick?: (...args: any[]) => any;
  icon?: RcIconButtonProps['icon'];
};
export const CustomArrowButton: React.FC<CustomArrowButtonProps> = ({
  disabled,
  onClick,
  icon,
}) => (
  <RcIconButton
    data-sign="arrow_icon"
    className={styles.button}
    variant="round"
    size="medium"
    disabled={disabled}
    icon={icon}
    onClick={onClick}
  />
);
CustomArrowButton.defaultProps = {
  disabled: false,
  onClick() {},
  icon: 'arrow_right',
};
