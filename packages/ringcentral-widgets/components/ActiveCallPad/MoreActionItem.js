import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';

export default function MoreActionItem({
  title,
  icon: Icon,
  disabled,
  onClick,
  dataSign,
}) {
  const iconClassName = classnames(
    styles.buttonIcon,
    disabled ? styles.buttonDisabled : styles.buttonActive,
  );
  return (
    <div className={styles.buttonItem} onClick={disabled ? null : onClick}>
      <div className={iconClassName} data-sign={dataSign}>
        {<Icon />}
      </div>
      <div className={styles.buttonName}>{title}</div>
    </div>
  );
}

MoreActionItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  dataSign: PropTypes.string,
};

MoreActionItem.defaultProps = {
  dataSign: '',
};
