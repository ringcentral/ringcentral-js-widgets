import React, { PropTypes } from 'react';
import classnames from 'classnames';

import styles from './styles.scss';
import i18n from './i18n';

export default function ActiveCallUserInfo(props) {
  const className = classnames(
    styles.root, props.className
  );
  const name = props.name || i18n.getString('unkonw', props.currentLocale);
  return (
    <div className={className}>
      <div className={styles.avatarContainer}>
        {props.avatar}
      </div>
      <div className={styles.userName}>{name}</div>
      <div className={styles.userPhoneNumber}>
        {props.formatPhone(props.phoneNumber)}
      </div>
    </div>
  );
}

ActiveCallUserInfo.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  phoneNumber: PropTypes.string,
  avatar: PropTypes.node,
  currentLocale: PropTypes.string.isRequired,
  formatPhone: PropTypes.func.isRequired,
};

ActiveCallUserInfo.defaultProps = {
  name: null,
  className: null,
  phoneNumber: null,
  isBig: false,
  avatar: undefined,
};
