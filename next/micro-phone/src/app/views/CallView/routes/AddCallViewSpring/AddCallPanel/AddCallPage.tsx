import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { PageHeader } from '@ringcentral-integration/next-widgets/components';
import { useAsyncState } from '@ringcentral-integration/react-hooks';
import {
  CallButton,
  Dialer,
  DialerPadSoundsMPEG,
  DialPad,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React, { useState } from 'react';

import { MyCallerIdDropdown } from '../../../../../components/MyCallerIdDropdown';
import type { AddCallViewPanelProps } from '../AddCall.view.interface';
import i18n from '../i18n';

export const AddCallPage: FunctionComponent<AddCallViewPanelProps> = (
  props,
) => {
  const {
    onAction,
    callVolume = 1,
    outputDeviceId = '',
    toNumber: toNumberProp,
    onToNumberChange,
    recipients: recipientsProp,
    onRecipientsChange,
    ContactSearch: ToContactSearch,
    actionButtonDisabled,
    isWebphoneMode,
    showAnonymous,
    disableFromField,
    fromNumber,
    fromNumbers,
    onFromNumberChange,
  } = props;
  const { t } = useLocale(i18n);

  const [toNumber, setToNumber] = useAsyncState(toNumberProp, onToNumberChange);
  const [recipients, setRecipients] = useAsyncState(
    recipientsProp,
    onRecipientsChange,
  );
  const [contactSearchExpanded, setContactSearchExpanded] = useState(false);

  const clearRecipient = () => {
    setRecipients([]);
    setToNumber('');
  };

  return (
    <>
      <PageHeader onBackClick={() => onAction('activeCall')}>
        {t('addCall')}
      </PageHeader>
      {isWebphoneMode && (
        <div className="flex justify-center">
          <MyCallerIdDropdown
            showAnonymous={showAnonymous}
            disabled={disableFromField}
            value={fromNumber}
            onChange={onFromNumberChange}
            options={fromNumbers}
          />
        </div>
      )}
      <div
        data-sign="addCallPage"
        className="flex flex-col items-center mt-2 flex-auto gap-y-2"
      >
        <Dialer>
          <div className="flex flex-col w-full h-full">
            {/* @ts-ignore */}
            <ToContactSearch
              defaultTab="company"
              open={contactSearchExpanded}
              componentType="DialTextField"
              inputValue={toNumber}
              recipient={recipients[0]}
              onInputValueChange={onToNumberChange}
              onSelect={setRecipients}
              onRemove={clearRecipient}
              onExpanded={setContactSearchExpanded}
            />

            <main
              className={clsx(
                'px-10 py-2 flex flex-col items-center flex-auto',
                contactSearchExpanded && 'hidden',
              )}
            >
              <DialPad
                data-sign="dialPad"
                volume={callVolume}
                sounds={DialerPadSoundsMPEG}
                size="medium"
                sinkId={outputDeviceId}
                className="gap-y-2"
              />

              <div className="flex justify-center items-center pt-2">
                <CallButton
                  variant="start"
                  size="medium"
                  data-sign="callButton"
                  disabled={actionButtonDisabled}
                  onClick={() => {
                    onAction('startAdd');
                  }}
                />
              </div>
            </main>
          </div>
        </Dialer>
      </div>
    </>
  );
};
