import React, { FunctionComponent } from 'react';
import {
  styled,
  palette2,
  RcDialPad,
  RcIconButton,
  spacing,
  flexCenterStyle,
  RcDialerPadSounds,
} from '@ringcentral/juno';
import Phone from '@ringcentral/juno/icon/Phone';
import { Recipient } from '../RecipientsInputV2/RecipientsInputV2.interface';
import { SpinnerOverlay } from '../SpinnerOverlay';
import { CommunicationSetupPanel } from '../CommunicationSetupPanel';
import { fullSizeStyle } from '../../lib/commonStyles';

export interface DialerPanelProps {
  currentLocale: string;
  className?: string;
  dialButtonsClassName?: string;
  onCallButtonClick: (...args: any[]) => any;
  callButtonDisabled?: boolean;
  isWebphoneMode?: boolean;
  toNumber?: string;
  onToNumberChange?: (...args: any[]) => any;
  fromNumber?: string;
  fromNumbers?: {
    phoneNumber: string;
    usageType?: string;
  }[];
  changeFromNumber?: (...args: any[]) => any;
  formatPhone?: (...args: any[]) => any;
  showSpinner?: boolean;
  dialButtonVolume?: number;
  dialButtonMuted?: boolean;
  searchContact: (...args: any[]) => any;
  searchContactList: {
    name: string;
    entityType: string;
    phoneType: string;
    phoneNumber: string;
  }[];
  recipient?: Recipient;
  recipients: Recipient[];
  clearToNumber: (...args: any[]) => any;
  setRecipient: (...args: any[]) => any;
  clearRecipient: (...args: any[]) => any;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  recipientsContactInfoRenderer?: (...args: any[]) => any;
  recipientsContactPhoneRenderer?: (...args: any[]) => any;
  autoFocus?: boolean;
  showFromField?: boolean;
  disableFromField?: boolean;
  withTabs?: boolean;
  inConference?: boolean;
  isLastInputFromDialpad?: boolean;
  useV2?: boolean;
  showAnonymous?: boolean;
}
const DialerPanelContainer = styled.div`
  ${fullSizeStyle};
  box-sizing: border-box;
  background: ${palette2('neutral', 'f01')};
`;

const BodyBottom = styled.div`
  ${flexCenterStyle};
  margin-bottom: ${spacing(7)};
`;

// TODO: check withTabs
const DialerWrapper = styled.div<{ withTabs: boolean }>`
  flex: 1 1 auto;
  margin: ${spacing(2, 11)};
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const DialerPanel: FunctionComponent<DialerPanelProps> = (props) => {
  const {
    currentLocale,
    onToNumberChange,
    toNumber,
    fromNumber,
    fromNumbers,
    changeFromNumber,
    formatPhone,
    isWebphoneMode,
    showSpinner,
    recipients,
    setRecipient,
    clearRecipient,
    autoFocus,
    showFromField = true,
    disableFromField = false,
    children,
    showAnonymous,
    dialButtonMuted,
    dialButtonVolume,
    onCallButtonClick,
    callButtonDisabled,
    withTabs,
  } = props;

  // TODO: when have tag should check if need disable dial button
  // const hasTags = recipients.length > 0;

  return (
    <DialerPanelContainer>
      <CommunicationSetupPanel
        // To field
        recipients={recipients}
        toNumber={toNumber}
        onToNumberChange={onToNumberChange}
        setRecipient={setRecipient}
        clearRecipient={clearRecipient}
        autoFocus={autoFocus}
        // From field
        showAnonymous={showAnonymous}
        fromNumber={fromNumber}
        fromNumbers={fromNumbers}
        changeFromNumber={changeFromNumber}
        formatPhone={formatPhone}
        showFromField={showFromField && isWebphoneMode}
        disableFromField={disableFromField}
        // Common
        currentLocale={currentLocale}
      >
        <DialerWrapper withTabs={withTabs}>
          <RcDialPad
            onChange={(value) => {
              onToNumberChange(toNumber + value, true);
            }}
            sounds={RcDialerPadSounds}
            getDialPadButtonProps={(v) => ({ 'data-test-id': `${v}` })}
            volume={dialButtonVolume}
            muted={dialButtonMuted}
          />
        </DialerWrapper>
        <BodyBottom>
          <RcIconButton
            data-sign="callButton"
            color="success.b03"
            symbol={Phone}
            size="large"
            variant="contained"
            elevation="0"
            activeElevation="0"
            onClick={onCallButtonClick}
            disabled={callButtonDisabled}
          />
        </BodyBottom>
        {showSpinner ? <SpinnerOverlay /> : null}
        {children}
      </CommunicationSetupPanel>
    </DialerPanelContainer>
  );
};

const Empty: FunctionComponent = () => null;

DialerPanel.defaultProps = {
  className: null,
  dialButtonsClassName: null,
  fromNumber: null,
  callButtonDisabled: false,
  toNumber: '',
  fromNumbers: [],
  isWebphoneMode: false,
  changeFromNumber: Empty,
  onToNumberChange: Empty,
  formatPhone: (phoneNumber) => phoneNumber,
  showSpinner: false,
  dialButtonVolume: 1,
  dialButtonMuted: false,
  recipients: [],
  autoFocus: false,
  showFromField: true,
  disableFromField: false,
  withTabs: false,
  inConference: false,
  isLastInputFromDialpad: false,
  showAnonymous: true,
};
