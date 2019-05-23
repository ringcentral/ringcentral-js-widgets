import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Badge from '../Badge';
import Draggable from '../Draggable';
import i18n from './i18n';
import styles from './styles.scss';
import RetryIcon from '../../assets/images/RetryIcon.svg';
import OvalLoading from '../../assets/images/OvalLoading.svg';

const emptyFn = (() => {});
export default function WebphoneBadge({
  onClick,
  className,
  currentLocale,
  isConnecting,
}) {
  let view = null;
  if (isConnecting) {
    onClick = emptyFn;
    view = (
      <Badge
        className={classnames(className, styles.badge, styles.loading)}
        name={i18n.getString('webphoneUnavailable', currentLocale)}>
        {i18n.getString('Connecting', currentLocale)}
        <OvalLoading width={12} height={12} />
      </Badge>
    );
  } else {
    view = (
      <Badge
        className={classnames(className, styles.badge, styles.result)}
        name={i18n.getString('webphoneUnavailable', currentLocale)}>
        {i18n.getString('webphoneUnavailable', currentLocale)}
        <RetryIcon width={12} height={12} />
      </Badge>
    );
  }

  return (
    <Draggable className={styles.root} onClick={onClick}>
      {view}
    </Draggable>
  );
}

WebphoneBadge.propTypes = {
  className: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isConnecting: PropTypes.bool,
};

WebphoneBadge.defaultProps = {
  className: null,
  onClick() {},
  isConnecting: false,
};
