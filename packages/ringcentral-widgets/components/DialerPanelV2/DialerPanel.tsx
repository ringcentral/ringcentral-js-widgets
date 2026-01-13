import type UserPhoneNumberInfo from '@rc-ex/core/lib/definitions/UserPhoneNumberInfo';
import type { ToNumber as Recipient } from '@ringcentral-integration/commons/modules/ComposeText';
import {
  flexCenterStyle,
  palette2,
  RcDialerPadSoundsMPEG,
  RcDialPad,
  RcIconButton,
  spacing,
  styled,
} from '@ringcentral/juno';
import { Phone } from '@ringcentral/juno-icon';
import type { FunctionComponent } from 'react';
import React, { useCallback } from 'react';

import { fullSizeStyle } from '../../lib/commonStyles';
import { CommunicationSetupPanel } from '../CommunicationSetupPanel';
import { SpinnerOverlay } from '../SpinnerOverlay';

// copy from import type { ContactSearchEntity } from '@ringcentral-integration/micro-contacts/src/app/services'; widget should not import from next arch
export type ContactSearchEntity = {
  id: string;
  name: string;
  phoneNumber: string;
  entityType?: string;
  phoneType?: string;
};

export type DialerPanelProps = {
  currentLocale: string;
  className?: string;
  dialButtonsClassName?: string;
  onCallButtonClick: (...args: any[]) => any;
  callButtonDisabled?: boolean;
  isWebphoneMode?: boolean;
  toNumber?: string;
  onToNumberChange?: (...args: any[]) => any;
  fromNumber?: string;
  fromNumbers?: UserPhoneNumberInfo[];
  changeFromNumber?: (...args: any[]) => any;
  formatPhone?: (...args: any[]) => any;
  showSpinner?: boolean;
  // use to set dial button volume(dialButtonVolume)
  callVolume?: number;
  outputDeviceId?: string;
  searchContact: (...args: any[]) => any;
  searchContactList: ContactSearchEntity[];
  recipient?: Recipient | null;
  recipients: Recipient[];
  clearToNumber: (...args: any[]) => any;
  triggerEventTracking: (eventName: string, contactType: string) => any;
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
  ContactSearch?: FunctionComponent<any>;
};

const DialerPanelContainer = styled.div`
  ${fullSizeStyle};
  box-sizing: border-box;
  background: ${palette2('neutral', 'f01')};
`;

const BodyBottom = styled.div`
  ${flexCenterStyle};
  margin-bottom: ${spacing(7)};
`;

const StyledRcDialPad = styled(RcDialPad)`
  [sf-classic] & {
    height: 90%;
  }
`;

const FlexWrapper = styled.div`
  ${fullSizeStyle};
  display: flex;
  flex-direction: column;
`;

// TODO: check withTabs
const DialerWrapper = styled.div<{ withTabs: boolean }>`
  flex: 1 1 auto;
  margin: ${({ withTabs }) => (withTabs ? spacing(0, 11) : spacing(2, 11))};
  display: flex;
  justify-content: center;
  flex-direction: column;
  [sf-classic] & {
    height: 70%;
    margin-left: 10px;
    margin-right: 10px;
  }
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
    callVolume,
    outputDeviceId,
    onCallButtonClick,
    callButtonDisabled,
    withTabs,
    ContactSearch,
    triggerEventTracking,
  } = props;

  // TODO: when have tag should check if need disable dial button
  // const hasTags = recipients.length > 0;
  const handleSelect = useCallback(
    async (...args) => {
      await setRecipient(...args);
      onCallButtonClick();
    },
    [setRecipient, onCallButtonClick],
  );

  return (
    <DialerPanelContainer>
      <CommunicationSetupPanel
        ContactSearch={ContactSearch}
        triggerEventTracking={triggerEventTracking}
        // To field
        recipients={recipients}
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
        toNumber={toNumber}
        // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
        onToNumberChange={onToNumberChange}
        setRecipient={handleSelect}
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
        <FlexWrapper>
          {/* @ts-expect-error TS(2322): Type 'boolean | undefined' is not */}
          <DialerWrapper withTabs={withTabs}>
            <StyledRcDialPad
              data-sign="dialPad"
              onChange={(value) => {
                // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
                onToNumberChange(toNumber + value, true);
              }}
              sounds={RcDialerPadSoundsMPEG}
              getDialPadButtonProps={(v) => ({
                'data-test-id': `${v}`,
                'data-sign': `dialPadBtn${v}`,
              })}
              volume={callVolume}
              sinkId={outputDeviceId}
            />
          </DialerWrapper>
          <BodyBottom>
            <RcIconButton
              data-sign="callButton"
              color="success.b03"
              symbol={Phone}
              size={withTabs ? 'medium' : 'large'}
              variant="contained"
              elevation="0"
              activeElevation="0"
              onClick={() => onCallButtonClick({ clickDialerToCall: true })}
              disabled={callButtonDisabled}
            />
          </BodyBottom>
          {showSpinner ? <SpinnerOverlay /> : null}
          {children}
        </FlexWrapper>
      </CommunicationSetupPanel>
    </DialerPanelContainer>
  );
};

const Empty: FunctionComponent = () => null;

DialerPanel.defaultProps = {
  callButtonDisabled: false,
  toNumber: '',
  fromNumbers: [],
  isWebphoneMode: false,
  changeFromNumber: Empty,
  onToNumberChange: Empty,
  formatPhone: (phoneNumber) => phoneNumber,
  showSpinner: false,
  callVolume: 1,
  outputDeviceId: '',
  recipients: [],
  autoFocus: false,
  showFromField: true,
  disableFromField: false,
  withTabs: false,
  inConference: false,
  isLastInputFromDialpad: false,
  showAnonymous: true,
};
