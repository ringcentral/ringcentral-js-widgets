import React, { Component } from 'react';

import classnames from 'classnames';

import CloseIcon from '../../assets/images/CloseIcon.svg';
import { Button } from '../Button';
import LogNotification from '../LogNotification';
import styles from './styles.scss';

type NotificationSectionProps = {
  currentLocale: string;
  formatPhone: (...args: any[]) => any;
  logNotification?: object;
  onCloseNotification?: (...args: any[]) => any;
  onDiscardNotification?: (...args: any[]) => any;
  onSaveNotification?: (...args: any[]) => any;
  onExpandNotification?: (...args: any[]) => any;
  showNotiLogButton?: boolean;
  currentNotificationIdentify?: string;
  currentSession?: object;
  onReject: (...args: any[]) => any;
  onHangup: (...args: any[]) => any;
  disableLinks?: boolean;
};
class NotificationSection extends Component<NotificationSectionProps, {}> {
  componentWillUpdate(nextProps) {
    const {
      logNotification,
      onCloseNotification,
      currentNotificationIdentify,
    } = nextProps;
    if (currentNotificationIdentify) {
      const { call = {} } = logNotification;
      const { result } = call;
      if (result) {
        onCloseNotification();
      }
    }
  }
  renderLogSection() {
    const {
      formatPhone,
      currentLocale,
      logNotification,
      showNotiLogButton,
      onCloseNotification,
      onSaveNotification,
      onExpandNotification,
      onDiscardNotification,
      currentNotificationIdentify,
      currentSession,
      onReject,
      onHangup,
      disableLinks,
    } = this.props;
    return (
      <div
        className={classnames(
          styles.root,
          logNotification.notificationIsExpand ? styles.cover : null,
        )}
      >
        <div className={styles.notificationModal}>
          <Button
            dataSign="closeButton"
            className={styles.closeBtn}
            onClick={onCloseNotification}
          >
            <CloseIcon />
          </Button>
          <LogNotification
            showEndButton
            showLogButton={showNotiLogButton}
            currentLocale={currentLocale}
            formatPhone={formatPhone}
            currentLog={logNotification}
            isExpand={logNotification.notificationIsExpand}
            onSave={onSaveNotification}
            onExpand={onExpandNotification}
            onDiscard={onDiscardNotification}
            onStay={onCloseNotification}
            onReject={() => onReject(currentNotificationIdentify)}
            onHangup={() => onHangup(currentNotificationIdentify)}
            currentSession={currentSession}
            disableLinks={disableLinks}
          />
        </div>
      </div>
    );
  }
  render() {
    return this.renderLogSection();
  }
}
NotificationSection.defaultProps = {
  // Notification
  logNotification: undefined,
  onCloseNotification: undefined,
  onDiscardNotification: undefined,
  onSaveNotification: undefined,
  onExpandNotification: undefined,
  showNotiLogButton: true,
  currentNotificationIdentify: '',
  currentSession: undefined,
  disableLinks: false,
};
export default NotificationSection;
