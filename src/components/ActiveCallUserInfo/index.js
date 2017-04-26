import React, { PropTypes } from 'react';
import classnames from 'classnames';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

import i18n from './i18n';

export default function ActiveCallUserInfo(props) {
  const className = classnames(
    styles.root, props.isBig ? styles.big : null, props.className
  );
  const name = props.name || i18n.getString('unkonw', props.currentLocale);
  return (
    <div className={className}>
      <div className={styles.userAvatar}>
        <i className={dynamicsFont.portrait} />
      </div>
      <div className={styles.userPhoneNumber}>{props.phoneNumber}</div>
      <div className={styles.userName}>{name}</div>
    </div>
  );
}

ActiveCallUserInfo.propTypes = {
  name: PropTypes.string,
  isBig: PropTypes.bool,
  className: PropTypes.string,
  phoneNumber: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
};

ActiveCallUserInfo.defaultProps = {
  name: null,
  className: null,
  phoneNumber: null,
  isBig: false,
};
