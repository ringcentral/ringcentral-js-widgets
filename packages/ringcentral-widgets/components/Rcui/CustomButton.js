import PropTypes from 'prop-types';
import { RcIconButton } from '@ringcentral-integration/rcui';
import React from 'react';
import styles from './styles.scss';

export const CustomArrowButton = ({ disabled, onClick, rotate }) => (
  <RcIconButton
    data-sign="arrow_icon"
    className={styles.button}
    style={{ transform: `rotate(${rotate}deg)` }}
    variant="round"
    size="medium"
    disabled={disabled}
    icon="arrow_right"
    onClick={onClick}
  />
);

CustomArrowButton.propTypes = {
  rotate: PropTypes.number,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
CustomArrowButton.defaultProps = {
  rotate: 0,
  disabled: false,
  onClick() {},
};
