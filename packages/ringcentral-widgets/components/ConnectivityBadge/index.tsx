import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React from 'react';

import OvalLoading from '../../assets/images/OvalLoading.svg';
import RetryIcon from '../../assets/images/RetryIcon.svg';
import { connectivityTypes } from '../../modules/ConnectivityManager';
import Badge from '../Badge';
import Draggable from '../Draggable';

import i18n from './i18n';
import styles from './styles.scss';

export interface ConnectivityBadgeProps {
  className?: string;
  currentLocale: string;
  mode: string;
  webphoneConnecting: boolean;
  hasLimitedStatusError: boolean;
  onClick: () => void;
  showBadgeAlert: () => void;
}

const ConnectivityBadge: FunctionComponent<ConnectivityBadgeProps> = ({
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
        dataSign={'ConnectivityBadge'}
        className={clsx(className, styles.badge, styles.loading)}
        name={i18n.getString(mode, currentLocale)}
      >
        {i18n.getString(connectivityTypes.connecting, currentLocale)}
        <OvalLoading width={12} height={12} />
      </Badge>
    );
  } else {
    view = (
      <Badge
        dataSign={'ConnectivityBadge'}
        className={clsx(className, styles.badge, styles.result)}
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
ConnectivityBadge.defaultProps = {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  className: null,
  onClick() {},
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  mode: null,
  webphoneConnecting: false,
  hasLimitedStatusError: false,
};
export default ConnectivityBadge;
