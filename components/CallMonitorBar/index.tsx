import React, { Component } from 'react';

import formatMessage from 'format-message';
import PropTypes from 'prop-types';

import { Button } from '../Button';
import CarrouselBar from '../CarrouselBar';
import DurationCounter from '../DurationCounter';
import i18n from './i18n';
import styles from './styles.scss';

export function CallInfoBar({
  label,
  onClick,
  currentLocale,
  shouldDisplayViewCallsBtn,
  useV2,
}) {
  const buttonText = useV2 ? 'view' : 'viewCalls';
  return (
    <div className={useV2 ? styles.callInfoBarV2 : styles.bar}>
      <div className={styles.currentCallInfo} title={label} onClick={onClick}>
        {label}
      </div>
      {shouldDisplayViewCallsBtn ? (
        <Button
          className={styles.viewCallsBtn}
          tooltip={i18n.getString(buttonText, currentLocale)}
          onClick={onClick}
        >
          {i18n.getString(buttonText, currentLocale)}
        </Button>
      ) : null}
    </div>
  );
}
CallInfoBar.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  currentLocale: PropTypes.string,
  shouldDisplayViewCallsBtn: PropTypes.bool,
  useV2: PropTypes.bool,
};
CallInfoBar.defaultProps = {
  label: '',
  onClick: undefined,
  currentLocale: '',
  shouldDisplayViewCallsBtn: false,
  useV2: false,
};

class CallMonitorBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverBar: false,
    };
    this.showBtn = () => {
      if (this.props.currentCalls.length > 0) {
        this.setState({
          hoverBar: true,
        });
      }
    };
    this.hideBtn = () => {
      this.setState({
        hoverBar: false,
      });
    };
  }

  render() {
    const {
      ringingCalls,
      onHoldCalls,
      currentCalls,
      otherDeviceCalls,
      currentLocale,
      onCurrentCallBtnClick,
      onViewCallBtnClick,
      shouldDisplayCurrentCallBtn,
      shouldDisplayViewCallsBtn,
      shouldHideRingingCallStatus,
      clickHeaderTrack,
      useV2,
    } = this.props;

    const numberOfIncomingCalls = ringingCalls.length;
    const numberOfOnHoldCalls = onHoldCalls.length;
    const numberOfOtherDeviceCalls = otherDeviceCalls.length;

    return (
      <div
        className={styles.bar}
        onMouseOver={this.showBtn}
        onMouseLeave={this.hideBtn}
        onClick={clickHeaderTrack}
      >
        <div className={styles.box}>
          <CarrouselBar hoverBar={this.state.hoverBar}>
            {numberOfOnHoldCalls > 0 ? (
              <CallInfoBar
                label={
                  numberOfOnHoldCalls === 1
                    ? formatMessage(
                        i18n.getString('callOnHold', currentLocale),
                        { numberOf: numberOfOnHoldCalls },
                      )
                    : formatMessage(
                        i18n.getString('callsOnHold', currentLocale),
                        { numberOf: numberOfOnHoldCalls },
                      )
                }
                currentLocale={currentLocale}
                onClick={onViewCallBtnClick}
                shouldDisplayViewCallsBtn={shouldDisplayViewCallsBtn}
                useV2={useV2}
              />
            ) : null}
            {!shouldHideRingingCallStatus && numberOfIncomingCalls > 0 ? (
              <CallInfoBar
                label={
                  numberOfIncomingCalls === 1
                    ? formatMessage(
                        i18n.getString('incomingCall', currentLocale),
                        { numberOf: numberOfIncomingCalls },
                      )
                    : formatMessage(
                        i18n.getString('incomingCalls', currentLocale),
                        { numberOf: numberOfIncomingCalls },
                      )
                }
                currentLocale={currentLocale}
                onClick={onViewCallBtnClick}
                shouldDisplayViewCallsBtn={shouldDisplayViewCallsBtn}
                useV2={useV2}
              />
            ) : null}
            {numberOfOtherDeviceCalls > 0 ? (
              <CallInfoBar
                label={
                  numberOfOtherDeviceCalls === 1
                    ? formatMessage(
                        i18n.getString('otherDeviceCall', currentLocale),
                        { numberOf: numberOfOtherDeviceCalls },
                      )
                    : formatMessage(
                        i18n.getString('otherDeviceCalls', currentLocale),
                        { numberOf: numberOfOtherDeviceCalls },
                      )
                }
                currentLocale={currentLocale}
                onClick={onViewCallBtnClick}
                shouldDisplayViewCallsBtn={shouldDisplayViewCallsBtn}
                useV2={useV2}
              />
            ) : null}
            {currentCalls.length > 0 ? (
              <div className={useV2 ? styles.callInfoBarV2 : styles.bar}>
                <div
                  data-sign="callDuration"
                  className={styles.duration}
                  onClick={onCurrentCallBtnClick}
                >
                  <DurationCounter startTime={currentCalls[0].startTime} />
                </div>
                {shouldDisplayCurrentCallBtn && onCurrentCallBtnClick ? (
                  <Button
                    dataSign="currentCallButton"
                    className={styles.currentCallBtn}
                    onClick={onCurrentCallBtnClick}
                  >
                    {i18n.getString('currentCall', currentLocale)}
                  </Button>
                ) : null}
              </div>
            ) : null}
          </CarrouselBar>
        </div>
      </div>
    );
  }
}
CallMonitorBar.propTypes = {
  ringingCalls: PropTypes.array,
  currentCalls: PropTypes.array,
  onHoldCalls: PropTypes.array,
  otherDeviceCalls: PropTypes.array,
  currentLocale: PropTypes.string.isRequired,
  onCurrentCallBtnClick: PropTypes.func,
  onViewCallBtnClick: PropTypes.func,
  shouldDisplayCurrentCallBtn: PropTypes.bool,
  shouldDisplayViewCallsBtn: PropTypes.bool,
  shouldHideRingingCallStatus: PropTypes.bool,
  clickHeaderTrack: PropTypes.func,
  useV2: PropTypes.bool,
};
CallMonitorBar.defaultProps = {
  ringingCalls: [],
  currentCalls: [],
  onHoldCalls: [],
  otherDeviceCalls: [],
  onCurrentCallBtnClick: undefined,
  onViewCallBtnClick: undefined,
  shouldDisplayCurrentCallBtn: false,
  shouldDisplayViewCallsBtn: false,
  shouldHideRingingCallStatus: false,
  clickHeaderTrack() {},
  useV2: false,
};

export default CallMonitorBar;
