import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  PageHeader,
  PageHeaderBack,
  PageHeaderRemain,
  PageHeaderTitle,
} from '@ringcentral-integration/next-widgets/deprecated/components/PageHeader';
import { CommunicationSetupPanel } from '@ringcentral-integration/widgets/components/CommunicationSetupPanel';
import { TabsEnum } from '@ringcentral-integration/widgets/components/ContactSearchPanel/ContactSearchPanelEnum';
import { RcDialerPadSoundsMPEG, RcIconButton } from '@ringcentral/juno';
import { Phone } from '@ringcentral/juno-icon';
import type { FunctionComponent } from 'react';
import React, { useEffect, useState } from 'react';

import type { DialerViewCallParams } from '../../DialerView';
import type { RecipientProps } from '../AddCall.view.interface';
import i18n from '../i18n';

import {
  AddCallPage,
  BodyBottom,
  CommunicationSetupPanelWrap,
  DialerWrapper,
  StyledRcDialPad,
} from './StyledAddCallPanelPanel';

export type AddCallPanelProps = {
  currentLocale: string;
  ContactSearch: FunctionComponent<any>;
  onBack: (...args: any[]) => any;
  triggerEventTracking: (eventName: string, contactType: string) => any;
  autoFocus?: boolean;
  controlBusy?: boolean;
  // use to set dial button volume(dialButtonVolume)
  callVolume?: number;
  outputDeviceId?: string;
  onAddCall: (params: DialerViewCallParams<RecipientProps>) => void;
  hasCalls: boolean;
};

export const AddCallPanel: FunctionComponent<AddCallPanelProps> = (props) => {
  const {
    onBack,
    autoFocus,
    children,
    callVolume = 1,
    outputDeviceId = '',
    controlBusy,
    ContactSearch,
    onAddCall,
    currentLocale,
    hasCalls,
    triggerEventTracking,
  } = props;
  const { t } = useLocale(i18n);
  const [toNumber, setToNumber] = useState('');
  const [recipients, setRecipients] = useState<RecipientProps[]>([]);

  const onToNumberChange = (toNumber: string) => {
    setToNumber(toNumber);
  };

  const setRecipient = (...recipient: RecipientProps[]) => {
    setRecipients(recipient);
    setToNumber('');
    onAddCall({
      recipient: recipient[0],
    });
  };

  const clearRecipient = () => {
    setRecipients([]);
    setToNumber('');
  };

  const onAddCallHandler = () => {
    onAddCall({
      phoneNumber: toNumber,
    });
  };

  const noValue = toNumber === '' && recipients.length === 0;

  useEffect(() => {
    if (!hasCalls) {
      onBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasCalls]);

  return (
    <AddCallPage data-sign="addCallPage">
      {children}
      <PageHeader>
        <PageHeaderBack onClick={onBack} />
        <PageHeaderTitle>{t('addCall')}</PageHeaderTitle>
        <PageHeaderRemain />
      </PageHeader>
      <CommunicationSetupPanelWrap>
        {/* @ts-expect-error TS(2741): Property 'inputFullWidth' is missing in type '{ ch... Remove this comment to see the full error message */}
        <CommunicationSetupPanel
          triggerEventTracking={triggerEventTracking}
          ContactSearch={ContactSearch}
          // To field
          recipients={recipients}
          toNumber={toNumber}
          onToNumberChange={onToNumberChange}
          setRecipient={setRecipient}
          clearRecipient={clearRecipient}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          showFromField={false}
          defaultTab={TabsEnum.thirdParty}
          // Common
          currentLocale={currentLocale}
          directlyProceedType="dial"
        >
          <DialerWrapper>
            <StyledRcDialPad
              data-sign="dialPad"
              onChange={(value) => {
                onToNumberChange(toNumber + value);
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
              size="large"
              variant="contained"
              elevation="0"
              activeElevation="0"
              onClick={onAddCallHandler}
              disabled={controlBusy || noValue}
            />
          </BodyBottom>
        </CommunicationSetupPanel>
      </CommunicationSetupPanelWrap>
    </AddCallPage>
  );
};
