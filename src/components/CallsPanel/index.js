import React, { PropTypes } from 'react';
import 'core-js/fn/array/find';
import Header from '../Header';
import Panel from '../Panel';
import SpinnerOverlay from '../SpinnerOverlay';
import CallList from '../CallList';

import styles from './styles.scss';


export default function CallsPanel({
  currentLocale,
  calls,
  areaCode,
  countryCode,
  onViewContact,
  onLogCall,
  onClickToDial,
  onClickToSms,
  isLoggedContact,
  disableLinks,
  disableClickToDial,
  outboundSmsPermission,
  internalSmsPermission,
  dateTimeFormatter,
  showSpinner,
  title,
  active,
  loggingMap,
  webphoneAnswer,
  webphoneReject,
  webphoneHangup,
  webphoneResume,
}) {
  const content = showSpinner ?
    <SpinnerOverlay /> :
    (
      <CallList
        currentLocale={currentLocale}
        calls={calls}
        areaCode={areaCode}
        countryCode={countryCode}
        onViewContact={onViewContact}
        onLogCall={onLogCall}
        onClickToDial={onClickToDial}
        onClickToSms={onClickToSms}
        isLoggedContact={isLoggedContact}
        disableLinks={disableLinks}
        disableClickToDial={disableClickToDial}
        outboundSmsPermission={outboundSmsPermission}
        internalSmsPermission={internalSmsPermission}
        dateTimeFormatter={dateTimeFormatter}
        active={active}
        loggingMap={loggingMap}
        webphoneAnswer={webphoneAnswer}
        webphoneReject={webphoneReject}
        webphoneHangup={webphoneHangup}
        webphoneResume={webphoneResume}
      />
    );
  return (
    <div className={styles.root}>
      <Header>
        {title}
      </Header>
      <Panel className={styles.content}>
        {content}
      </Panel>
    </div>
  );
}

CallsPanel.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  calls: PropTypes.arrayOf(PropTypes.any).isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  onViewContact: PropTypes.func,
  onClickToDial: PropTypes.func,
  onClickToSms: PropTypes.func,
  onLogCall: PropTypes.func,
  isLoggedContact: PropTypes.func,
  disableLinks: PropTypes.bool.isRequired,
  disableClickToDial: PropTypes.bool,
  outboundSmsPermission: PropTypes.bool,
  internalSmsPermission: PropTypes.bool,
  dateTimeFormatter: PropTypes.func.isRequired,
  showSpinner: PropTypes.bool,
  title: PropTypes.string,
  active: PropTypes.bool,
  loggingMap: PropTypes.object,
  webphoneAnswer: PropTypes.func,
  webphoneReject: PropTypes.func,
  webphoneHangup: PropTypes.func,
  webphoneResume: PropTypes.func,
};

CallsPanel.defaultProps = {
  onViewContact: undefined,
  onLogCall: undefined,
  onClickToDial: undefined,
  onClickToSms: undefined,
  disableClickToDial: false,
  outboundSmsPermission: false,
  internalSmsPermission: false,
  showSpinner: false,
  title: '',
  active: false,
  isLoggedContact: undefined,
  loggingMap: {},
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
};
