import { RcFabIconButton, RcLink } from '@ringcentral-integration/rcui';
import handUpSvg from '@ringcentral-integration/rcui/icons/icon-hand-up.svg';
import phoneSvg from '@ringcentral-integration/rcui/icons/icon-phone.svg';
import React, { FunctionComponent, useEffect } from 'react';

import {
  EvDialerUIFunctions,
  EvDialerUIProps,
} from '../../interfaces/EvDialerUI.interface';
import { DeepWriteableValues } from '../../typings/deepWriteableValues';
import { Dialer } from './Dialer';
import i18n from './i18n';
import styles from './styles.scss';

const dialoutStatusMapping = {
  dialing: ['background', 'disabled'],
  callConnected: ['semantic', 'negative'],
  idle: ['semantic', 'positive'],
} as const;

export type DialerPanelProps = EvDialerUIProps & EvDialerUIFunctions;

const DialerPanel: FunctionComponent<DialerPanelProps> = ({
  dialout,
  toNumber,
  currentLocale,
  size,
  hasDialer,
  setToNumber,
  goToManualDialSettings,
  checkOnCall,
  dialoutStatus,
  hangup,
}) => {
  useEffect(() => {
    if (hasDialer) {
      checkOnCall();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!hasDialer) {
    return null;
  }
  const isDialing = dialoutStatus === 'dialing';
  const isIdle = dialoutStatus === 'idle';
  const isCallConnected = dialoutStatus === 'callConnected';

  const color = (dialoutStatusMapping[dialoutStatus] ||
    dialoutStatusMapping.idle) as DeepWriteableValues<
    typeof dialoutStatusMapping
  >;

  return (
    <Dialer
      value={toNumber}
      setValue={setToNumber}
      placeholder={i18n.getString('dialPlaceholder', currentLocale)}
    >
      <RcFabIconButton
        size={size}
        color={color}
        data-icon={isIdle ? 'answer' : 'hand-up'}
        symbol={isIdle ? phoneSvg : handUpSvg}
        data-sign="callButton"
        disabled={isDialing}
        onClick={() => {
          if (isIdle) {
            dialout();
          } else if (isCallConnected) {
            hangup();
          } else {
            // unexpected state
          }
        }}
      />
      <i className={styles.flexFill} />
      <div className={styles.link}>
        <RcLink
          size={size}
          handleOnClick={goToManualDialSettings}
          data-sign="manualDialSettings"
        >
          {i18n.getString('manualDialSettings', currentLocale)}
        </RcLink>
      </div>
    </Dialer>
  );
};

export { DialerPanel };
