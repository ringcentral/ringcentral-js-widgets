import {
  RcIconButton,
  RcLink,
  RcLinkSize,
  RcPaletteKeys,
  RcTypographyVariant,
  styled,
} from '@ringcentral/juno';
import handUpSvg from '@ringcentral/juno/icon/HandUp';
import phoneSvg from '@ringcentral/juno/icon/Phone';
import React, { FunctionComponent } from 'react';

import {
  EvDialerUIFunctions,
  EvDialerUIProps,
} from '../../interfaces/EvDialerUI.interface';
import { Dialer } from './Dialer';
import i18n from './i18n';
import styles from './styles.scss';

const dialoutStatusMapping: Record<
  'dialing' | 'callConnected' | 'idle',
  RcPaletteKeys
> = {
  dialing: 'danger.b03',
  callConnected: 'danger.b03',
  idle: 'success.b03',
};

const LinkSizeMapping: Record<RcLinkSize, RcTypographyVariant> = {
  small: 'caption1',
  medium: 'body1',
  large: 'headline',
};

export type DialerPanelProps = EvDialerUIProps & EvDialerUIFunctions;

const DialButton = styled(RcIconButton)`
  box-shadow: none !important;
`;

const DialerPanel: FunctionComponent<DialerPanelProps> = ({
  dialout,
  toNumber,
  currentLocale,
  size,
  hasDialer,
  setToNumber,
  goToManualDialSettings,
  dialoutStatus = 'idle',
  dialButtonDisabled,
  hangup,
}) => {
  if (!hasDialer) {
    return null;
  }
  const isIdle = dialoutStatus === 'idle';
  const color = dialoutStatusMapping[dialoutStatus];

  return (
    <Dialer
      value={toNumber}
      setValue={setToNumber}
      placeholder={i18n.getString('dialPlaceholder', currentLocale)}
    >
      <DialButton
        size={size === 'medium' ? 'large' : size}
        variant="contained"
        color={color}
        data-icon={isIdle ? 'answer' : 'hand-up'}
        symbol={isIdle ? phoneSvg : handUpSvg}
        data-sign="callButton"
        disabled={dialButtonDisabled}
        onClick={() => {
          if (isIdle) {
            dialout();
          } else {
            hangup();
          }
        }}
      >
        phone
      </DialButton>
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
