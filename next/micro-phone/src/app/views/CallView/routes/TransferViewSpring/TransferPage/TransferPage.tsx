import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { PageHeader } from '@ringcentral-integration/next-widgets/components';
import { useAsyncState } from '@ringcentral-integration/react-hooks';
import {
  AskFirstMd,
  TransferCallMd,
  VoicemailMd,
} from '@ringcentral/spring-icon';
import {
  Dialer,
  DialerPadSoundsMPEG,
  DialPad,
  IconButton,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { FunctionComponent, useState } from 'react';
import { noop } from 'rxjs';

import type { TransferViewPanelProps } from '../Transfer.view.interface';

import i18n from './i18n';

const iconContainerClassName =
  'inline-flex items-center justify-start flex-col gap-2 w-20';

export const TransferPage: FunctionComponent<TransferViewPanelProps> = ({
  onAction = noop,
  callVolume,
  outputDeviceId,
  enableWarmTransfer,
  actionButtonDisabled,
  toNumber: toNumberProp,
  onToNumberChange,
  recipients: recipientsProp,
  onRecipientsChange,
  ContactSearch: ToContactSearch,
}) => {
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
        {t('transferTo')}
      </PageHeader>
      <Dialer>
        <div
          data-sign="transferPage"
          className="flex flex-col items-center pt-4 flex-auto"
        >
          <div
            className={clsx(
              'w-full flex flex-col',
              contactSearchExpanded ? 'flex-auto min-h-0' : 'flex-none',
            )}
          >
            {/* @ts-ignore */}
            <ToContactSearch
              defaultTab="company"
              source="transfer"
              open={contactSearchExpanded}
              componentType="DialTextField"
              inputValue={toNumber}
              recipient={recipients[0]}
              onInputValueChange={setToNumber}
              onSelect={setRecipients}
              onRemove={clearRecipient}
              onExpanded={setContactSearchExpanded}
            />
          </div>

          <main
            className={clsx(
              'flex flex-col flex-auto items-center overflow-auto pb-3 gap-8 pt-6 w-full h-0',
              contactSearchExpanded && 'hidden',
            )}
          >
            <DialPad
              data-sign="dialPad"
              volume={callVolume}
              sinkId={outputDeviceId}
              sounds={DialerPadSoundsMPEG}
              size="medium"
              className="gap-y-2"
            />

            <div
              className={clsx(
                'grid grid-cols-3 gap-x-1',
                contactSearchExpanded && 'hidden',
              )}
            >
              {enableWarmTransfer && (
                <div className={iconContainerClassName}>
                  <IconButton
                    size="xlarge"
                    color="primary"
                    data-sign="warmTransferBtn"
                    disabled={actionButtonDisabled}
                    symbol={AskFirstMd}
                    value="warmTransfer"
                    onClick={() => onAction('startWarmTransfer')}
                  />
                  <div className="typography-descriptorMini text-center">
                    {t('warmTransfer')}
                  </div>
                </div>
              )}
              <div className={iconContainerClassName}>
                <IconButton
                  size="xlarge"
                  color="primary"
                  data-sign="transferBtn"
                  disabled={actionButtonDisabled}
                  symbol={TransferCallMd}
                  value="blindTransfer"
                  onClick={() => onAction('startTransfer')}
                />
                <div className="typography-descriptorMini text-center">
                  {t('blindTransfer')}
                </div>
              </div>
              <div className={iconContainerClassName}>
                <IconButton
                  size="xlarge"
                  symbol={VoicemailMd}
                  color="primary"
                  variant="outlined"
                  disabled={actionButtonDisabled}
                  data-sign="toVoicemailBtn"
                  onClick={() => onAction('startTransferToVoicemail')}
                />
                <div className="typography-descriptorMini text-center">
                  {t('toVoicemail')}
                </div>
              </div>
            </div>
          </main>
        </div>
      </Dialer>
    </>
  );
};
