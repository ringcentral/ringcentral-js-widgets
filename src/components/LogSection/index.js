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
      updateCurrentLog,
      currentLog,
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
      updateCurrentLog,
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
          <Button
            disabled={currentLogCall.isSaving}
            className={buttonClassName}
            onClick={() => this.props.saveCurrentLog(call)}>
            {i18n.getString('saveLog', currentLocale)}
          </Button>
        </div>
      </div>);
  }
}

LogSection.propTypes = {
  currentLog: PropTypes.object,
  currentLocale: PropTypes.string.isRequired,
  formatPhone: PropTypes.func,
  updateCurrentLog: PropTypes.func,
  saveCurrentLog: PropTypes.func,
  renderEditLogSection: PropTypes.func,
};

LogSection.defaultProps = {
  currentLog: {},
  formatPhone: undefined,
  updateCurrentLog: undefined,
  saveCurrentLog: undefined,
  renderEditLogSection: undefined,
};
