import { RcFabIconButton, RcLink } from '@ringcentral/juno';
import handUpSvg from '@ringcentral/juno/icon/HandUp';
import phoneSvg from '@ringcentral/juno/icon/Phone';
import React, { FunctionComponent } from 'react';

import {
  EvDialerUIFunctions,
  EvDialerUIProps,
} from '../../interfaces/EvDialerUI.interface';
import { DeepWriteableValues } from '../../typings/deepWriteableValues';
import { Dialer } from './Dialer';
import i18n from './i18n';
import styles from './styles.scss';

const dialoutStatusMapping = {
  dialing: ['element', 'disabled'],
  callConnected: ['semantic', 'negative'],
  idle: ['semantic', 'positive'],
} as const;

const LinkSizeMapping = {
  small: 'caption1',
  medium: 'body1',
  large: 'headline',
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
  dialoutStatus,
  dialButtonDisabled,
  hangup,
}) => {
  if (!hasDialer) {
    return null;
  }
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
        disabled={dialButtonDisabled}
        onClick={() => {
          if (isIdle) {
            dialout();
          } else if (isCallConnected) {
            hangup();
          } else {
            // unexpected state
          }
        }}
      >
        phone
      </RcFabIconButton>
      <i className={styles.flexFill} />
      <div className={styles.link}>
        <RcLink
          variant={LinkSizeMapping[size]}
          onClick={goToManualDialSettings}
          data-sign="manualDialSettings"
        >
          {i18n.getString('manualDialSettings', currentLocale)}
        </RcLink>
      </div>
    </Dialer>
  );
};

export { DialerPanel };
