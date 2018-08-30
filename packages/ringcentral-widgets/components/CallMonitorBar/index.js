import React from 'react';
import PropTypes from 'prop-types';
// import formatMessage from 'format-message';

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
              {i18n.getString('viewCall', currentLocale)}
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

export default function CallMonitorBar({
  // ringingCalls,
  // onHoldCalls,
  currentCalls,
  currentLocale,
  onCurrentCallBtnClick,
  // onViewCallBtnClick,
  shouldDisplayCurrentCallBtn,
  // shouldDisplayViewCallsBtn
}) {
  // const numberOfIncomingCalls = ringingCalls.length;
  // const numberOfOnHoldCalls = onHoldCalls.length;
  return (
    <CarrouselBar>
      {
        currentCalls.length > 0 ? (
          <div className={styles.bar}>
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
      {
        //   numberOfIncomingCalls > 0 ? (
        //     <CallInfoBar
        //       label={
        //         numberOfIncomingCalls === 1 ?
        //         formatMessage(i18n.getString('incomingCall', currentLocale), { numberOf: numberOfIncomingCalls }) :
        //         formatMessage(i18n.getString('incomingCalls', currentLocale), { numberOf: numberOfIncomingCalls })
        //       }
        //       currentLocale={currentLocale}
        //       onClick={onViewCallBtnClick}
        //       shouldDisplayViewCallsBtn={shouldDisplayViewCallsBtn}
        //   />
        // ) : null
        }
      {
        //   numberOfOnHoldCalls > 0 ? (
        //     <CallInfoBar
        //       label={
        //         numberOfOnHoldCalls === 1 ?
        //         formatMessage(i18n.getString('callOnHold', currentLocale), { numberOf: numberOfOnHoldCalls }) :
        //         formatMessage(i18n.getString('callsOnHold', currentLocale), { numberOf: numberOfOnHoldCalls })
        //       }
        //       currentLocale={currentLocale}
        //       onClick={onViewCallBtnClick}
        //       shouldDisplayViewCallsBtn={shouldDisplayViewCallsBtn}
        //   />
        // ) : null
      }
    </CarrouselBar>
  );
}
CallMonitorBar.propTypes = {
  // ringingCalls: PropTypes.array,
  currentCalls: PropTypes.array,
  // onHoldCalls: PropTypes.array,
  currentLocale: PropTypes.string.isRequired,
  onCurrentCallBtnClick: PropTypes.func,
  // onViewCallBtnClick: PropTypes.func,
  shouldDisplayCurrentCallBtn: PropTypes.bool,
  // shouldDisplayViewCallsBtn: PropTypes.bool,
};
CallMonitorBar.defaultProps = {
  // ringingCalls: [],
  currentCalls: [],
  // onHoldCalls: [],
  onCurrentCallBtnClick: undefined,
  // onViewCallBtnClick: undefined,
  shouldDisplayCurrentCallBtn: false,
  // shouldDisplayViewCallsBtn: false,
};
