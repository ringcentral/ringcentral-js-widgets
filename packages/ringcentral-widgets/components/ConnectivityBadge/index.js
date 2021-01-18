import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import connectivityTypes from '../../modules/ConnectivityManager/connectivityTypes';
import Badge from '../Badge';
import Draggable from '../Draggable';
import i18n from './i18n';
import styles from './styles.scss';
import RetryIcon from '../../assets/images/RetryIcon.svg';
import OvalLoading from '../../assets/images/OvalLoading.svg';

const ConnectivityBadge = ({
  onClick,
  className,
  currentLocale,
  mode,
  webphoneConnecting,
  hasLimitedStatusError,
}) => {
  if (!mode) return null;

  const isWebphoneConnecting =
    mode === connectivityTypes.webphoneUnavailable && webphoneConnecting;
  const hasRetryButton =
    mode === connectivityTypes.webphoneUnavailable || hasLimitedStatusError;

  let view = null;
  if (isWebphoneConnecting) {
    view = (
      <Badge
        className={classnames(className, styles.badge, styles.loading)}
        name={i18n.getString(mode, currentLocale)}
      >
        {i18n.getString(connectivityTypes.connecting, currentLocale)}
        <OvalLoading width={12} height={12} />
      </Badge>
    );
  } else {
    view = (
      <Badge
        className={classnames(className, styles.badge, styles.result)}
        name={i18n.getString(mode, currentLocale)}
      >
        {i18n.getString(mode, currentLocale)}
        {hasRetryButton ? <RetryIcon width={12} height={12} /> : null}
      </Badge>
    );
  }
  return (
    <Draggable className={styles.root} onClick={onClick}>
      {view}
    </Draggable>
  );
};

ConnectivityBadge.propTypes = {
  className: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  mode: PropTypes.string,
  webphoneConnecting: PropTypes.bool,
  onClick: PropTypes.func,
  hasLimitedStatusError: PropTypes.bool,
};

ConnectivityBadge.defaultProps = {
  className: null,
  onClick() {},
  mode: null,
  webphoneConnecting: false,
  hasLimitedStatusError: false,
};

export default ConnectivityBadge;
