import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatus';
import callDirections from 'ringcentral-integration/enums/callDirections';
import { isRingingInboundCall } from 'ringcentral-integration/lib/callLogHelpers';

import SpinnerOverlay from '../SpinnerOverlay';
import { Button } from '../Button';
import styles from './styles.scss';
import LogBasicInfo from '../LogBasicInfo';
import i18n from './i18n';

const EditSection = ({ children, scrollerRef, ...rest }) => (
  <div {...rest} ref={scrollerRef} className={classnames(styles.editSection)}>
    {children}
  </div>
);

EditSection.propTypes = {
  children: PropTypes.object,
  scrollerRef: PropTypes.func,
};

EditSection.defaultProps = {
  children: null,
  scrollerRef: undefined,
};

const SaveButton = ({ isSaving, onClick, overlapped, children }) => (
  <div
    className={classnames(styles.buttonPanel, overlapped && styles.overlapped)}
  >
    <Button
      className={classnames(styles.primaryButton, isSaving && styles.disabled)}
      disabled={isSaving}
      onClick={onClick}
    >
      {children}
    </Button>
  </div>
);

SaveButton.propTypes = {
  isSaving: PropTypes.bool,
  onClick: PropTypes.func,
  overlapped: PropTypes.bool,
  children: PropTypes.string,
};

SaveButton.defaultProps = {
  isSaving: false,
  onClick() {},
  overlapped: false,
  children: null,
};

export default class LogSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainCtrlOverlapped: false,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.checkOverlap, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkOverlap, false);
  }

  checkOverlap() {
    if (!this.mainCtrl) {
      return;
    }
    const { scrollHeight, clientHeight, scrollTop } = this.mainCtrl;
    const overlappedHeight = scrollHeight - clientHeight - scrollTop;
    const mainCtrlOverlapped = overlappedHeight > 1;
    if (mainCtrlOverlapped !== this.state.mainCtrlOverlapped) {
      this.setState({ mainCtrlOverlapped });
    }
  }

  getEditLogSection() {
    const {
      renderEditLogSection,
      currentLocale,
      onSaveCallLog,
      onUpdateCallLog,
      currentLog,
      additionalInfo,
      onCallLogSaved,
    } = this.props;
    return renderEditLogSection({
      currentLocale,
      onSaveCallLog,
      onUpdateCallLog,
      currentLog,
      additionalInfo,
      onCallLogSaved,
    });
  }

  genSaveLogButton() {
    const {
      showSaveLogBtn,
      renderSaveLogButton,
      currentLocale,
      onSaveCallLog,
      currentLog,
    } = this.props;
    const { call, currentLogCall } = currentLog;
    if (!showSaveLogBtn) {
      return null;
    }
    if (renderSaveLogButton) {
      return renderSaveLogButton({
        currentLocale,
        onSaveCallLog,
        currentLog,
        overlapped: this.state.mainCtrlOverlapped,
      });
    }
    return (
      <SaveButton
        isSaving={currentLogCall.isSaving}
        onClick={() => onSaveCallLog(call)}
        overlapped={this.state.mainCtrlOverlapped}
      >
        {i18n.getString('saveLog', currentLocale)}
      </SaveButton>
    );
  }

  renderLogBasicInfo() {
    const { currentLog, showSmallCallControl } = this.props;
    const { currentSessionId, call } = currentLog;
    const { telephonyStatus, result } = call;
    const status = telephonyStatus || result;
    // if `result` is exist, call has been disconnect
    const isActive = !result;
    const clickable = isActive && !isRingingInboundCall(call);
    let extraButton;
    if (showSmallCallControl && isActive) {
      extraButton = this.props.renderSmallCallContrl(status, currentSessionId);
    }
    return (
      <LogBasicInfo
        dataSign="leftSectionInfo"
        currentLog={this.props.currentLog}
        currentLocale={this.props.currentLocale}
        formatPhone={this.props.formatPhone}
        extraButton={extraButton}
        clickable={clickable}
        onClick={
          clickable ? this.props.onLogBasicInfoClick : () => console.log('noop')
        }
      />
    );
  }

  render() {
    const {
      currentLog,
      isInnerMask,
      // onCloseLogSection
    } = this.props;
    const { showSpinner } = currentLog;
    if (showSpinner) {
      return <SpinnerOverlay className={styles.spinner} />;
    }
    return (
      <div className={styles.root}>
        {this.renderLogBasicInfo()}
        <EditSection
          scrollerRef={(el) => {
            this.mainCtrl = el;
          }}
          onScroll={() => this.checkOverlap()}
        >
          {this.getEditLogSection()}
        </EditSection>
        {this.genSaveLogButton()}
        {isInnerMask ? <div className={styles.innerMask} /> : null}
      </div>
    );
  }
}

LogSection.propTypes = {
  currentLog: PropTypes.object,
  additionalInfo: PropTypes.object,
  currentLocale: PropTypes.string.isRequired,
  formatPhone: PropTypes.func,
  onUpdateCallLog: PropTypes.func,
  onSaveCallLog: PropTypes.func,
  renderEditLogSection: PropTypes.func,
  renderSaveLogButton: PropTypes.func,
  isInnerMask: PropTypes.bool,
  onLogBasicInfoClick: PropTypes.func,
  showSaveLogBtn: PropTypes.bool,
  showSmallCallControl: PropTypes.bool,
  renderSmallCallContrl: PropTypes.func,
  onCallLogSaved: PropTypes.func,
};

LogSection.defaultProps = {
  currentLog: {},
  additionalInfo: undefined,
  formatPhone: undefined,
  onUpdateCallLog: undefined,
  onSaveCallLog: undefined,
  renderEditLogSection: undefined,
  renderSaveLogButton: undefined,
  isInnerMask: undefined,
  onLogBasicInfoClick() {},
  renderSmallCallContrl() {},
  showSaveLogBtn: true,
  showSmallCallControl: true,
  onCallLogSaved: undefined,
};
