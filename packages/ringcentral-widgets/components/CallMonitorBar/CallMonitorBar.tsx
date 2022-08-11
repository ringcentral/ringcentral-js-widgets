import React, { FunctionComponent, useState } from 'react';

import { emptyArray, emptyFn, format } from '@ringcentral-integration/utils';

import { Button } from '../Button';
import CarrouselBar from '../CarrouselBar';
import DurationCounter from '../DurationCounter';
import { CallInfoBar } from './CallInfoBar';
import i18n from './i18n';
import styles from './styles.scss';

type CallMonitorBarProps = {
  currentLocale: string;
  ringingCalls?: any[];
  currentCalls?: any[];
  onHoldCalls?: any[];
  otherDeviceCalls?: any[];
  onCurrentCallBtnClick?: () => void;
  onViewCallBtnClick?: () => void;
  shouldDisplayCurrentCallBtn?: boolean;
  shouldDisplayViewCallsBtn?: boolean;
  shouldHideRingingCallStatus?: boolean;
  clickHeaderTrack?: () => void;
  useV2?: boolean;
};

export const CallMonitorBar: FunctionComponent<CallMonitorBarProps> = (
  props,
) => {
  const {
    ringingCalls = emptyArray,
    currentCalls = emptyArray,
    onHoldCalls = emptyArray,
    otherDeviceCalls = emptyArray,
    onCurrentCallBtnClick,
    onViewCallBtnClick,
    shouldDisplayCurrentCallBtn = false,
    shouldDisplayViewCallsBtn = false,
    shouldHideRingingCallStatus = false,
    clickHeaderTrack = emptyFn,
    useV2 = false,
    currentLocale,
  } = props;
  const [hoverBar, setHoverBar] = useState(false);
  const showBtn = () => {
    if (currentCalls.length > 0) {
      setHoverBar(true);
    }
  };
  const hideBtn = () => {
    setHoverBar(false);
  };
  const numberOfIncomingCalls = ringingCalls.length;
  const numberOfOnHoldCalls = onHoldCalls.length;
  const numberOfOtherDeviceCalls = otherDeviceCalls.length;

  return (
    <div
      className={styles.bar}
      onMouseOver={showBtn}
      onMouseLeave={hideBtn}
      onClick={clickHeaderTrack}
    >
      <div className={styles.box}>
        <CarrouselBar hoverBar={hoverBar}>
          {numberOfOnHoldCalls > 0 ? (
            <CallInfoBar
              label={
                numberOfOnHoldCalls === 1
                  ? format(i18n.getString('callOnHold', currentLocale), {
                      numberOf: numberOfOnHoldCalls,
                    })
                  : format(i18n.getString('callsOnHold', currentLocale), {
                      numberOf: numberOfOnHoldCalls,
                    })
              }
              currentLocale={currentLocale}
              onClick={onViewCallBtnClick}
              shouldDisplayViewCallsBtn={shouldDisplayViewCallsBtn}
              useV2={useV2}
              dataSign="CallOnHold"
            />
          ) : null}
          {!shouldHideRingingCallStatus && numberOfIncomingCalls > 0 ? (
            <CallInfoBar
              label={
                numberOfIncomingCalls === 1
                  ? format(i18n.getString('incomingCall', currentLocale), {
                      numberOf: numberOfIncomingCalls,
                    })
                  : format(i18n.getString('incomingCalls', currentLocale), {
                      numberOf: numberOfIncomingCalls,
                    })
              }
              currentLocale={currentLocale}
              onClick={onViewCallBtnClick}
              shouldDisplayViewCallsBtn={shouldDisplayViewCallsBtn}
              useV2={useV2}
              dataSign="IncomingCalls"
            />
          ) : null}
          {numberOfOtherDeviceCalls > 0 ? (
            <CallInfoBar
              label={
                numberOfOtherDeviceCalls === 1
                  ? format(i18n.getString('otherDeviceCall', currentLocale), {
                      numberOf: numberOfOtherDeviceCalls,
                    })
                  : format(i18n.getString('otherDeviceCalls', currentLocale), {
                      numberOf: numberOfOtherDeviceCalls,
                    })
              }
              currentLocale={currentLocale}
              onClick={onViewCallBtnClick}
              shouldDisplayViewCallsBtn={shouldDisplayViewCallsBtn}
              useV2={useV2}
              dataSign="otherDeviceCalls"
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
                  data-sign="currentCallButton"
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
};
