import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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

  render() {
    const {
      renderEditLogSection,
      currentLocale,
      onUpdateCallLog,
      currentLog,
      isInnerMask,
      showSaveLogBtn,
      onSaveCallLog,
    } = this.props;
    const {
      call,
      showSpinner,
      currentLogCall,
    } = currentLog;
    if (showSpinner) {
      return (<SpinnerOverlay className={styles.spinner} />);
    }
    const editLogSection = renderEditLogSection({
      currentLocale,
      onUpdateCallLog,
      currentLog,
    });
    const buttonPanelClassName = classnames(
      styles.buttonPanel,
      this.state.mainCtrlOverlapped && styles.overlapped
    );
    const buttonClassName = classnames(
      styles.primaryButton,
      currentLogCall.isSaving && styles.disabled
    );
    const saveLogBtn = showSaveLogBtn ? (
      <Button
        disabled={currentLogCall.isSaving}
        className={buttonClassName}
        onClick={() => onSaveCallLog(call)}>
        { i18n.getString('saveLog', currentLocale)}
      </Button>
    ) : null;
    return (
      <div className={styles.section}>
        <LogBasicInfo
          currentLog={this.props.currentLog}
          currentLocale={this.props.currentLocale}
          formatPhone={this.props.formatPhone}
        />
        <div
          ref={(ref) => { this.mainCtrl = ref; }}
          onScroll={() => this.checkOverlap()}
          className={styles.editSection}>
          {editLogSection}
        </div>
        <div
          className={buttonPanelClassName}>
          {saveLogBtn}
        </div>
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
  currentLocale: PropTypes.string.isRequired,
  formatPhone: PropTypes.func,
  onUpdateCallLog: PropTypes.func,
  onSaveCallLog: PropTypes.func,
  renderEditLogSection: PropTypes.func,
  isInnerMask: PropTypes.bool,
  showSaveLogBtn: PropTypes.bool,
};

LogSection.defaultProps = {
  currentLog: {},
  formatPhone: undefined,
  onUpdateCallLog: undefined,
  onSaveCallLog: undefined,
  renderEditLogSection: undefined,
  isInnerMask: undefined,
  showSaveLogBtn: true,
};
