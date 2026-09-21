import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { PageHeader } from '@ringcentral-integration/next-widgets/components';
import { useAsyncState } from '@ringcentral-integration/react-hooks';
import { ForwardMd } from '@ringcentral/spring-icon';
import {
  Dialer,
  DialerPadSoundsMPEG,
  DialPad,
  IconButton,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React, { useState } from 'react';
import { noop } from 'rxjs';

import type { ForwardViewPanelProps } from '../Forward.view.interface';
import i18n from '../i18n';

export const ForwardPage: FunctionComponent<ForwardViewPanelProps> = (
  props,
) => {
  const {
    onAction = noop,
    callVolume = 1,
    outputDeviceId = '',
    toNumber: toNumberProp,
    onToNumberChange,
    recipients: recipientsProp,
    onRecipientsChange,
    ContactSearch: ToContactSearch,
    actionButtonDisabled,
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
      <PageHeader
        onBackClick={() => onAction('activeCall')}
        data-sign="forwardPageHeader"
      >
        {t('forwardTitle')}
      </PageHeader>
      <Dialer>
        <div
          data-sign="forwardPage"
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
              'flex flex-col flex-auto items-center overflow-auto pb-2 gap-8 pt-6 w-full h-0',
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

            <div className={clsx(contactSearchExpanded && 'hidden')}>
              <IconButton
                TooltipProps={{
                  title: t('forward'),
                }}
                symbol={ForwardMd}
                color="success"
                variant="contained"
                size="xxxlarge"
                iconSize="large"
                data-sign="forwardButton"
                disabled={actionButtonDisabled}
                onClick={() => {
                  onAction('startForward');
                }}
              />
            </div>
          </main>
        </div>
      </Dialer>
    </>
  );
};
