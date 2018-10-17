import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatus';
import callDirections from 'ringcentral-integration/enums/callDirections';

import SpinnerOverlay from '../SpinnerOverlay';
import Button from '../Button';
import styles from './styles.scss';
import LogBasicInfo from '../LogBasicInfo';
import i18n from './i18n';

export default class LogSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainCtrlOverlapped: false
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
    const {
      scrollHeight,
      clientHeight,
      scrollTop
    } = this.mainCtrl;
    const overlappedHeight = scrollHeight - clientHeight - scrollTop;
    const mainCtrlOverlapped = overlappedHeight > 1;
    if (mainCtrlOverlapped !== this.state.mainCtrlOverlapped) {
      this.setState({ mainCtrlOverlapped });
    }
  }

  genEditLogSection() {
    const {
      renderEditLogSection, currentLocale,
      onSaveCallLog, onUpdateCallLog,
      currentLog, additionalInfo
    } = this.props;
    const editLogSection = renderEditLogSection({
      currentLocale,
      onSaveCallLog,
      onUpdateCallLog,
      currentLog,
      additionalInfo,
    });
    return (
      <div
        ref={(ref) => { this.mainCtrl = ref; }}
        onScroll={() => this.checkOverlap()}
        className={styles.editSection}>
        {editLogSection}
      </div>
    );
  }

  genSaveLogButton() {
    const {
      showSaveLogBtn, renderSaveLogButton,
      currentLocale, onSaveCallLog,
      currentLog
    } = this.props;
    const {
      call,
      currentLogCall,
    } = currentLog;
    const buttonPanelClassName = classnames(
      styles.buttonPanel,
      this.state.mainCtrlOverlapped && styles.overlapped
    );
    const buttonClassName = classnames(
      styles.primaryButton,
      currentLogCall.isSaving && styles.disabled
    );
    if (!showSaveLogBtn) {
      return null;
    }
    if (renderSaveLogButton) {
      return renderSaveLogButton({
        currentLocale,
        onSaveCallLog,
        currentLog,
        overlapped: this.state.mainCtrlOverlapped
      });
    }
    return (
      <div
        className={buttonPanelClassName}>
        <Button
          disabled={currentLogCall.isSaving}
          className={buttonClassName}
          onClick={() => onSaveCallLog(call)}>
          {i18n.getString('saveLog', currentLocale)}
        </Button>
      </div>
    );
  }

  genLogBasicInfo() {
    return (
      <LogBasicInfo
        currentLog={this.props.currentLog}
        currentLocale={this.props.currentLocale}
        formatPhone={this.props.formatPhone}
      />
    );
  }

  genLogBasicInfoWithSmallCallCtrl() {
    const currentlog = this.props.currentLog;
    const { currentSessionId, call } = currentlog;
    const { telephonyStatus, result } = call;
    const status = telephonyStatus || result;
    // if `result` is exist, call has been disconnect
    if (result) {
      return this.genLogBasicInfo();
    }
    function disabledToCallControl() {
      return (
        callDirections.inbound === call.direction &&
        telephonyStatuses.ringing === telephonyStatus
      );
    }

    const onLogBasicInfoClick = disabledToCallControl()
      ? () => { }
      : this.props.onLogBasicInfoClick;

    const wrapperCls = classnames(styles.infoWithCtrlWrapper, {
      [styles.pointer]: !disabledToCallControl()
    });
    return (
      <div className={styles.infoWithCtrlWrapper}>
        <div className={wrapperCls} onClick={onLogBasicInfoClick}>
          <LogBasicInfo
            currentLog={this.props.currentLog}
            currentLocale={this.props.currentLocale}
            formatPhone={this.props.formatPhone}
          />
        </div>
        <div className={styles.callCtrlWrapper}>
          {this.props.renderSmallCallContrl(status, currentSessionId)}
        </div>
      </div>
    );
  }

  render() {
    const {
      currentLog,
      isInnerMask,
      showSmallCallControl
    } = this.props;
    const {
      showSpinner,
    } = currentLog;
    if (showSpinner) {
      return (<SpinnerOverlay className={styles.spinner} />);
    }

    return (
      <div className={styles.section}>
        {showSmallCallControl ? this.genLogBasicInfoWithSmallCallCtrl() : this.genLogBasicInfo()}
        {this.genEditLogSection()}
        {this.genSaveLogButton()}
        {
          isInnerMask ? (
            <div className={styles.innerMask} />
          ) : null
        }
      </div>);
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
  onLogBasicInfoClick() { },
  renderSmallCallContrl() { },
  showSaveLogBtn: true,
  showSmallCallControl: true,
};
