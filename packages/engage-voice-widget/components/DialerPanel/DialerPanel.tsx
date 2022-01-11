import React, { FunctionComponent } from 'react';

import {
  RcButton,
  RcLink,
  RcLinkSize,
  RcText,
  RcTypographyVariant,
} from '@ringcentral/juno';

import {
  EvDialerUIFunctions,
  EvDialerUIProps,
} from '../../interfaces/EvDialerUI.interface';
import { Dialer } from './Dialer';
import { RcLinkWrapper, RcTextWrapper } from './DialerPanelWrapper';
import i18n from './i18n';

const LinkSizeMapping: Record<RcLinkSize, RcTypographyVariant> = {
  small: 'caption1',
  medium: 'body1',
  large: 'headline1',
};

export type DialerPanelProps = EvDialerUIProps & EvDialerUIFunctions;

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

  return (
    <Dialer
      value={toNumber}
      setValue={setToNumber}
      placeholder={i18n.getString('dialPlaceholder', currentLocale)}
    >
      {!toNumber && (
        <RcTextWrapper>
          <RcText
            variant="inherit"
            align="center"
            noWrap={false}
            color="neutral.f03"
            data-sign="callButtonTip"
          >
            {i18n.getString('callButtonTip', currentLocale)}
          </RcText>
          <RcText
            variant="inherit"
            align="center"
            noWrap={false}
            color="neutral.f03"
            data-sign="callButtonEmergencyTip"
          >
            {i18n.getString('callButtonEmergencyTip', currentLocale)}
          </RcText>
        </RcTextWrapper>
      )}

      {toNumber && (
        <RcButton
          size={size === 'medium' ? 'large' : size}
          disabledVariant="normal"
          title={i18n.getString('callButton', currentLocale)}
          data-sign="callButton"
          disabled={!isIdle || dialButtonDisabled}
          onClick={() => {
            if (isIdle) {
              dialout();
            } else {
              hangup();
            }
          }}
        >
          {i18n.getString('callButton', currentLocale)}
        </RcButton>
      )}
      <RcLinkWrapper>
        <RcLink
          variant={LinkSizeMapping[size]}
          onClick={goToManualDialSettings}
          data-sign="manualDialSettings"
        >
          {i18n.getString('manualDialSettings', currentLocale)}
        </RcLink>
      </RcLinkWrapper>
    </Dialer>
  );
};

export { DialerPanel };
