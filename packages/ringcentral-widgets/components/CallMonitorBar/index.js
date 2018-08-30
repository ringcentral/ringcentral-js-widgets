import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { concat } from 'ramda';
import formatMessage from 'format-message';

import DurationCounter from '../DurationCounter';
import Button from '../Button';
import CarrouselBar from '../CarrouselBar';
import i18n from './i18n';
import styles from './styles.scss';

const ALL_CALL_PATH = '/calls';
const ACTIVE_CALL_PATH = '/calls/active';

export function CallInfoBar({
  label,
  onClick,
  currentPath,
  currentLocale
}) {
  return (
    <div className={styles.bar}>
      <div className={styles.currentCallInfo} onClick={onClick}>
        {label}
      </div>
      {
          currentPath !== ALL_CALL_PATH ?
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
  currentPath: PropTypes.string,
  currentLocale: PropTypes.string,
};

export default function CallMonitorBar({
  ringingCalls,
  onHoldCalls,
  currentCalls,
  currentPath,
  currentLocale,
  onCurrentCallBtnClick,
  onViewCallBtnClick
}) {
  const numberOfIncomingCalls = ringingCalls.length;
  const numberOfOnHoldCalls = onHoldCalls.length;
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
                currentPath !== ACTIVE_CALL_PATH ?
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
        //       numberOfIncomingCalls === 1 ?
        //       formatMessage(i18n.getString('incomingCall', currentLocale), { numberOf: numberOfIncomingCalls }) :
        //       formatMessage(i18n.getString('incomingCalls', currentLocale), { numberOf: numberOfIncomingCalls })
        //     }
        //       currentLocale={currentLocale}
        //       currentPath={currentPath}
        //       onClick={onViewCallBtnClick}
        //   />
        // ) : null
        }
      {
        //   numberOfOnHoldCalls > 0 ? (
        //     <CallInfoBar
        //       label={
        //       numberOfOnHoldCalls === 1 ?
        //       formatMessage(i18n.getString('callOnHold', currentLocale), { numberOf: numberOfOnHoldCalls }) :
        //       formatMessage(i18n.getString('callsOnHold', currentLocale), { numberOf: numberOfOnHoldCalls })
        //     }
        //       currentLocale={currentLocale}
        //       currentPath={currentPath}
        //       onClick={onViewCallBtnClick}
        //   />
        // ) : null
      }
    </CarrouselBar>
  );
}
CallMonitorBar.propTypes = {
  ringingCalls: PropTypes.array,
  currentCalls: PropTypes.array,
  onHoldCalls: PropTypes.array,
  currentPath: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  onCurrentCallBtnClick: PropTypes.func,
  onViewCallBtnClick: PropTypes.func,
};
CallMonitorBar.defaultProps = {
  ringingCalls: [],
  currentCalls: [],
  onHoldCalls: [],
  currentPath: '',
  onCurrentCallBtnClick: undefined,
  onViewCallBtnClick: undefined,
};
