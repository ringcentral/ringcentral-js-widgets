import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CloseIcon from '../../assets/images/CloseIcon.svg';
import { Button } from '../Button';
import LogNotification from '../LogNotification';

import styles from './styles.scss';

export default class NotificationSection extends Component {
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

NotificationSection.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  formatPhone: PropTypes.func.isRequired,
  // - Notification
  logNotification: PropTypes.object,
  onCloseNotification: PropTypes.func,
  onDiscardNotification: PropTypes.func,
  onSaveNotification: PropTypes.func,
  onExpandNotification: PropTypes.func,
  showNotiLogButton: PropTypes.bool,
  currentNotificationIdentify: PropTypes.string,
  currentSession: PropTypes.object,
  onReject: PropTypes.func.isRequired,
  onHangup: PropTypes.func.isRequired,
  disableLinks: PropTypes.bool,
};

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
