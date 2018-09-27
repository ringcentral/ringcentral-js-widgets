import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatMessage from 'format-message';
import classnames from 'classnames';

import DurationCounter from '../DurationCounter';
import Button from '../Button';
import CarrouselBar from '../CarrouselBar';
import i18n from './i18n';
import styles from './styles.scss';

export function CallInfoBar({
  label,
  onClick,
  currentLocale,
  shouldDisplayViewCallsBtn
}) {
  return (
    <div className={styles.bar}>
      <div className={styles.currentCallInfo} onClick={onClick}>
        {label}
      </div>
      {
        shouldDisplayViewCallsBtn ?
          <Button
            className={styles.viewCallsBtn}
            onClick={onClick}
          >
            {i18n.getString('viewCalls', currentLocale)}
          </Button>
          : null
      }
    </div>
  );
}
CallInfoBar.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  currentLocale: PropTypes.string,
  shouldDisplayViewCallsBtn: PropTypes.bool,
};
CallInfoBar.defaultProps = {
  label: '',
  onClick: undefined,
  currentLocale: '',
  shouldDisplayViewCallsBtn: false
};

export default class CallMonitorBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverShow: false
    };
    this.showBtn = () => {
      if (this.props.currentCalls.length > 0) {
        this.setState({
          hoverShow: true
        });
      }
    };
    this.hideBtn = () => {
      this.setState({
        hoverShow: false
      });
    };
  }

  render() {
    const {
      ringingCalls,
      onHoldCalls,
      currentCalls,
      currentLocale,
      onCurrentCallBtnClick,
      onViewCallBtnClick,
      shouldDisplayCurrentCallBtn,
      shouldDisplayViewCallsBtn
    } = this.props;

    const numberOfIncomingCalls = ringingCalls.length;
    const numberOfOnHoldCalls = onHoldCalls.length;

    return (
      <div className={styles.bar} onMouseOver={this.showBtn} onMouseLeave={this.hideBtn}>
        <div className={classnames(styles.box, (this.state.hoverShow ? styles.show : styles.hide))}>
          <Button
            className={styles.currentCallBtn}
            onClick={onCurrentCallBtnClick}
          >
            {i18n.getString('currentCall', currentLocale)}
          </Button>
          <Button
            className={styles.viewCallsBtn}
            onClick={onViewCallBtnClick}
          >
            {i18n.getString('viewCalls', currentLocale)}
          </Button>
        </div>
        <div className={classnames(styles.box, (this.state.hoverShow ? styles.hide : styles.show))}>
          <CarrouselBar >
            {
              numberOfOnHoldCalls > 0 ? (
                <CallInfoBar
                  label={
                    numberOfOnHoldCalls === 1 ?
                      formatMessage(i18n.getString('callOnHold', currentLocale), { numberOf: numberOfOnHoldCalls }) :
                      formatMessage(i18n.getString('callsOnHold', currentLocale), { numberOf: numberOfOnHoldCalls })
                  }
                  currentLocale={currentLocale}
                  onClick={onViewCallBtnClick}
                  shouldDisplayViewCallsBtn={shouldDisplayViewCallsBtn}
                />
              ) : null
            }
            {
              numberOfIncomingCalls > 0 ? (
                <CallInfoBar
                  label={
                    numberOfIncomingCalls === 1 ?
                      formatMessage(i18n.getString('incomingCall', currentLocale), { numberOf: numberOfIncomingCalls }) :
                      formatMessage(i18n.getString('incomingCalls', currentLocale), { numberOf: numberOfIncomingCalls })
                  }
                  currentLocale={currentLocale}
                  onClick={onViewCallBtnClick}
                  shouldDisplayViewCallsBtn={shouldDisplayViewCallsBtn}
                />
              ) : null
            }
            {currentCalls.length > 0 ? (
              <div className={styles.bar} >
                <div className={styles.duration} onClick={onCurrentCallBtnClick}>
                  <DurationCounter
                    startTime={currentCalls[0].startTime}
                  />
                </div>
                {
                  shouldDisplayCurrentCallBtn && onCurrentCallBtnClick ?
                    <Button
                      className={styles.currentCallBtn}
                      onClick={onCurrentCallBtnClick}
                    >
                      {i18n.getString('currentCall', currentLocale)}
                    </Button>
                    : null
                }
              </div>
            ) : null
            }
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
  currentLocale: PropTypes.string.isRequired,
  onCurrentCallBtnClick: PropTypes.func,
  onViewCallBtnClick: PropTypes.func,
  shouldDisplayCurrentCallBtn: PropTypes.bool,
  shouldDisplayViewCallsBtn: PropTypes.bool
};
CallMonitorBar.defaultProps = {
  ringingCalls: [],
  currentCalls: [],
  onHoldCalls: [],
  onCurrentCallBtnClick: undefined,
  onViewCallBtnClick: undefined,
  shouldDisplayCurrentCallBtn: false,
  shouldDisplayViewCallsBtn: false
};

