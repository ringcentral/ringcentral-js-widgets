import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

export default function BackButton({
  label,
  showIcon,
}) {
  return (
    <span className={styles.backButton}>
      {
        showIcon
        ? (
          <i className={classnames(dynamicsFont.arrow, styles.backIcon)} />
        )
        : null
      }
      {
        label
          ? (
            <span className={styles.backLabel}>
              {label}
            </span>
          )
          : null
      }
    </span>
  );
}

BackButton.propTypes = {
  label: PropTypes.string,
  showIcon: PropTypes.bool,
};

BackButton.defaultProps = {
  label: undefined,
  showIcon: true,
};
