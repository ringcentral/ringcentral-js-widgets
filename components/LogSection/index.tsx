import React, { Component } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import { isRingingInboundCall } from '@ringcentral-integration/commons/lib/callLogHelpers';

import { Button } from '../Button';
import LogBasicInfo from '../LogBasicInfo';
import { SpinnerOverlay } from '../SpinnerOverlay';
import i18n from './i18n';
import styles from './styles.scss';

const EditSection = ({ children, scrollerRef, ...rest }: any) => (
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

const SaveButton = ({ isSaving, onClick, overlapped, children }: any) => (
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

class LogSection extends Component {
  mainCtrl: any;
  constructor(props: any) {
    super(props);
    this.state = {
      mainCtrlOverlapped: false,
    };
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    window.addEventListener('resize', this.checkOverlap, false);
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2339): Property 'mainCtrlOverlapped' does not exist on ty... Remove this comment to see the full error message
    if (mainCtrlOverlapped !== this.state.mainCtrlOverlapped) {
      this.setState({ mainCtrlOverlapped });
    }
  }

  getEditLogSection() {
    const {
      // @ts-expect-error TS(2339): Property 'renderEditLogSection' does not exist on ... Remove this comment to see the full error message
      renderEditLogSection,
      // @ts-expect-error TS(2339): Property 'currentLocale' does not exist on type 'R... Remove this comment to see the full error message
      currentLocale,
      // @ts-expect-error TS(2339): Property 'onSaveCallLog' does not exist on type 'R... Remove this comment to see the full error message
      onSaveCallLog,
      // @ts-expect-error TS(2339): Property 'onUpdateCallLog' does not exist on type ... Remove this comment to see the full error message
      onUpdateCallLog,
      // @ts-expect-error TS(2339): Property 'currentLog' does not exist on type 'Read... Remove this comment to see the full error message
      currentLog,
      // @ts-expect-error TS(2339): Property 'additionalInfo' does not exist on type '... Remove this comment to see the full error message
      additionalInfo,
      // @ts-expect-error TS(2339): Property 'onCallLogSaved' does not exist on type '... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2339): Property 'showSaveLogBtn' does not exist on type '... Remove this comment to see the full error message
      showSaveLogBtn,
      // @ts-expect-error TS(2339): Property 'renderSaveLogButton' does not exist on t... Remove this comment to see the full error message
      renderSaveLogButton,
      // @ts-expect-error TS(2339): Property 'currentLocale' does not exist on type 'R... Remove this comment to see the full error message
      currentLocale,
      // @ts-expect-error TS(2339): Property 'onSaveCallLog' does not exist on type 'R... Remove this comment to see the full error message
      onSaveCallLog,
      // @ts-expect-error TS(2339): Property 'currentLog' does not exist on type 'Read... Remove this comment to see the full error message
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
        // @ts-expect-error TS(2339): Property 'mainCtrlOverlapped' does not exist on ty... Remove this comment to see the full error message
        overlapped: this.state.mainCtrlOverlapped,
      });
    }
    return (
      <SaveButton
        isSaving={currentLogCall.isSaving}
        onClick={() => onSaveCallLog(call)}
        // @ts-expect-error TS(2339): Property 'mainCtrlOverlapped' does not exist on ty... Remove this comment to see the full error message
        overlapped={this.state.mainCtrlOverlapped}
      >
        {i18n.getString('saveLog', currentLocale)}
      </SaveButton>
    );
  }

  renderLogBasicInfo() {
    // @ts-expect-error TS(2339): Property 'currentLog' does not exist on type 'Read... Remove this comment to see the full error message
    const { currentLog, showSmallCallControl } = this.props;
    const { currentSessionId, call } = currentLog;
    const { telephonyStatus, result } = call;
    const status = telephonyStatus || result;
    // if `result` is exist, call has been disconnect
    const isActive = !result;
    const clickable = isActive && !isRingingInboundCall(call);
    let extraButton;
    if (showSmallCallControl && isActive) {
      // @ts-expect-error TS(2339): Property 'renderSmallCallContrl' does not exist on... Remove this comment to see the full error message
      extraButton = this.props.renderSmallCallContrl(status, currentSessionId);
    }
    return (
      <LogBasicInfo
        dataSign="leftSectionInfo"
        // @ts-expect-error TS(2339): Property 'currentLog' does not exist on type 'Read... Remove this comment to see the full error message
        currentLog={this.props.currentLog}
        // @ts-expect-error TS(2339): Property 'currentLocale' does not exist on type 'R... Remove this comment to see the full error message
        currentLocale={this.props.currentLocale}
        // @ts-expect-error TS(2339): Property 'formatPhone' does not exist on type 'Rea... Remove this comment to see the full error message
        formatPhone={this.props.formatPhone}
        extraButton={extraButton}
        clickable={clickable}
        onClick={
          // @ts-expect-error TS(2339): Property 'onLogBasicInfoClick' does not exist on t... Remove this comment to see the full error message
          clickable ? this.props.onLogBasicInfoClick : () => console.log('noop')
        }
      />
    );
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const {
      // @ts-expect-error TS(2339): Property 'currentLog' does not exist on type 'Read... Remove this comment to see the full error message
      currentLog,
      // @ts-expect-error TS(2339): Property 'isInnerMask' does not exist on type 'Rea... Remove this comment to see the full error message
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
          scrollerRef={(el: any) => {
            this.mainCtrl = el;
          }}
          // @ts-expect-error TS(2322): Type '{ children: any; scrollerRef: (el: any) => v... Remove this comment to see the full error message
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

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
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

// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
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

export default LogSection;
