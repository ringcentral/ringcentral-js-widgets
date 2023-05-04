import React, { FunctionComponent, useEffect, useState } from 'react';

import { IContact } from '@ringcentral-integration/commons/interfaces/Contact.model';
import { ActiveSession } from '@ringcentral-integration/commons/modules/ActiveCallControl';
import { RcDialerPadSounds, RcText, usePrevious } from '@ringcentral/juno';
import { Askfirst, TransferCall, Voicemail } from '@ringcentral/juno-icon';

import BackHeader from '../BackHeaderV2';
import { CommunicationSetupPanel } from '../CommunicationSetupPanel';
import { TabsEnum } from '../ContactSearchPanel/ContactSearchPanelEnum';
import i18n from './i18n';
import {
  CommunicationSetupPanelWrap,
  DefaultIcon,
  DefaultIconGroup,
  DefaultIconWrap,
  DialerWrapper,
  StyledRcDialPad,
  TransferPage,
} from './StyledTransferPanel';
import { recipientProps } from './TransferPanel.interface';

export type TransferPanelProps = {
  setActiveSessionId: (...args: any[]) => any;
  onTransfer: (...args: any[]) => any;
  onWarmTransfer: (...args: any[]) => any;
  onToVoicemail: (...args: any[]) => any;
  onBack: (...args: any[]) => any;
  onCallEnd: (...args: any[]) => any;
  autoFocus?: boolean;
  sessionId: string;
  session?: ActiveSession;
  controlBusy?: boolean;
  dialButtonVolume?: number;
  dialButtonMuted?: boolean;
  currentLocale: string;
  enableWarmTransfer: boolean;
  companyContacts?: IContact[];
  onTransferDataTrack?: (
    recipients: recipientProps[],
    toNumber: string,
  ) => void;
  onToVoicemailDataTrack?: (
    recipients: recipientProps[],
    toNumber: string,
  ) => void;
  onWarmTransferDataTrack?: (
    recipients: recipientProps[],
    toNumber: string,
  ) => void;
};

export const TransferPanel: FunctionComponent<TransferPanelProps> = (props) => {
  const {
    onBack,
    onCallEnd,
    onTransfer,
    onToVoicemail,
    session,
    sessionId,
    currentLocale,
    autoFocus,
    children,
    dialButtonVolume,
    dialButtonMuted,
    controlBusy,
    setActiveSessionId,
    onWarmTransfer,
    enableWarmTransfer,
    companyContacts,
    onTransferDataTrack,
    onToVoicemailDataTrack,
    onWarmTransferDataTrack,
  } = props;

  const previousSession = usePrevious(() => session);
  useEffect(() => {
    setActiveSessionId(sessionId);
  }, []);

  useEffect(() => {
    if (previousSession && !session) {
      onCallEnd();
    }
  }, [onCallEnd, session, previousSession]);

  const [toNumber, setToNumber] = useState('');
  const [recipients, setRecipients] = useState<recipientProps[]>([]);

  if (!session) {
    return null;
  }
  const isOnTransfer = !!session.isOnTransfer;

  const onToNumberChange = (toNumber: string) => {
    setToNumber(toNumber);
  };

  const setRecipient = (...recipient: recipientProps[]) => {
    setRecipients(recipient);
    setToNumber('');
  };

  const clearRecipient = () => {
    setRecipients([]);
    setToNumber('');
  };

  const getTransferNumber = () => {
    return (recipients.length > 0 && recipients[0].phoneNumber) || toNumber;
  };

  const onTransferCall = () => {
    onTransferDataTrack?.(recipients, toNumber);
    onTransfer(getTransferNumber(), sessionId);
  };

  const onWarmTransferCall = () => {
    onWarmTransferDataTrack?.(recipients, toNumber);
    onWarmTransfer(getTransferNumber(), sessionId);
  };

  const getVoicemailId = () => {
    return companyContacts?.filter(
      (item: any) =>
        item?.extensionNumber === (recipients[0]?.phoneNumber || toNumber),
    )[0]?.id;
  };

  const onToVoicemailCall = () => {
    onToVoicemailDataTrack?.(recipients, toNumber);
    //! select a company contact
    if (recipients.length > 0 && recipients[0]?.type === 'company') {
      onToVoicemail(recipients[0].id, sessionId);
    }

    //! click number on dial pad or use Directly Procee entry
    else if (
      (recipients.length > 0 && recipients[0]?.isDirectlyProceed) ||
      !!toNumber
    ) {
      onToVoicemail(getVoicemailId(), sessionId);
    } else {
      onToVoicemail();
    }
  };

  const getTransferButtonStatus = () => {
    if (isOnTransfer || controlBusy) return true;
    if (recipients.length !== 0 || toNumber !== '') return false;
    return true;
  };

  return (
    <TransferPage>
      <BackHeader
        onBackClick={onBack}
        title={i18n.getString('transferTo', currentLocale)}
      />
      <CommunicationSetupPanelWrap>
        {/* @ts-expect-error TS(2741): Property 'inputFullWidth' is missing in type '{ ch... Remove this comment to see the full error message */}
        <CommunicationSetupPanel
          // To field
          recipients={recipients}
          toNumber={toNumber}
          onToNumberChange={onToNumberChange}
          setRecipient={setRecipient}
          clearRecipient={clearRecipient}
          autoFocus={autoFocus}
          showFromField={false}
          defaultTab={TabsEnum.company}
          // Common
          currentLocale={currentLocale}
          directlyProceedType="transfer"
        >
          <DialerWrapper>
            <StyledRcDialPad
              data-sign="dialPad"
              onChange={(value) => {
                onToNumberChange(toNumber + value);
              }}
              sounds={RcDialerPadSounds}
              getDialPadButtonProps={(v) => ({
                'data-test-id': `${v}`,
                'data-sign': `dialPadBtn${v}`,
              })}
              volume={dialButtonVolume}
              muted={dialButtonMuted}
            />
          </DialerWrapper>
          <DefaultIconGroup>
            {enableWarmTransfer && (
              <DefaultIconWrap>
                <DefaultIcon
                  size="medium"
                  color="interactive.f01"
                  symbol={Askfirst}
                  data-sign="warmTransferBtn"
                  onClick={onWarmTransferCall}
                  disabled={getTransferButtonStatus()}
                />
                <RcText color="neutral.f06" variant="caption1">
                  {i18n.getString('warmTransfer', currentLocale)}
                </RcText>
              </DefaultIconWrap>
            )}
            <DefaultIconWrap>
              <DefaultIcon
                size="medium"
                color="interactive.f01"
                symbol={TransferCall}
                data-sign="transferBtn"
                onClick={onTransferCall}
                disabled={getTransferButtonStatus()}
              />
              <RcText color="neutral.f06" variant="caption1">
                {i18n.getString('blindTransfer', currentLocale)}
              </RcText>
            </DefaultIconWrap>
            {enableWarmTransfer && (
              <DefaultIconWrap>
                <DefaultIcon
                  size="medium"
                  color="interactive.f01"
                  symbol={Voicemail}
                  data-sign="toVoicemailBtn"
                  onClick={onToVoicemailCall}
                  disabled={getTransferButtonStatus()}
                />
                <RcText color="neutral.f06" variant="caption1">
                  {i18n.getString('toVoicemail', currentLocale)}
                </RcText>
              </DefaultIconWrap>
            )}
          </DefaultIconGroup>
          {children}
        </CommunicationSetupPanel>
      </CommunicationSetupPanelWrap>
    </TransferPage>
  );
};

TransferPanel.defaultProps = {
  dialButtonVolume: 1,
  dialButtonMuted: false,
};
