import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { PageHeaderBackButton } from '@ringcentral-integration/next-widgets/components';
import { TeamMd } from '@ringcentral/spring-icon';
import { Icon, IconButton, Tooltip } from '@ringcentral/spring-ui';
import React from 'react';

import { ExpandLogButton } from '../../../../../components';
import { useContactRenderInfoFromCall } from '../../../../../hooks';
import contactRenderI18n from '../../../../../hooks/useContactRenderInfo/i18n';
import { isPreinsertCall } from '../../../../../services';
import { CallControlViewPanelProps } from '../CallControl.view.interface';

import { CallControlInformation, CallControlLayout } from './CallControlLayout';
import i18n from './i18n';

export const useCallControlLayout = (
  call: CallControlViewPanelProps['call'],
  {
    main,
    header,
    expanded,
    onExpand,
    footer,
    onBack,
    onConferenceClick,
    aiNoteTip,
  }: {
    header?: React.ReactNode;
    main: React.ReactNode;
    footer: React.ReactNode;
    aiNoteTip?: React.ReactNode;
    onBack: () => void;
    onConferenceClick: () => void;
  } & Pick<CallControlViewPanelProps, 'expanded' | 'onExpand'>,
) => {
  const {
    DisplayName,
    displayPhoneNumber,
    Avatar,
    duration,
    myCallerId,
    callQueueName,
    direction,
    OnOtherDevice,
  } = useContactRenderInfoFromCall(call, {
    phoneNumberDisplayMode: 'unknown',
    hideBlockedFromInfo: true,
  });
  const { t } = useLocale(i18n, contactRenderI18n);
  const connecting = isPreinsertCall(call);

  const conferenceParticipantsCount = call.conferenceParticipants?.length;
  const isInbound = direction === 'Inbound';

  const displayName = (
    <DisplayName
      displayControl={{
        maybe: true,
        viewable: true,
        matchCounts: true,
      }}
    />
  );

  return (
    <CallControlLayout
      aiNoteTip={aiNoteTip}
      callInformation={
        <CallControlInformation
          avatar={<Avatar size="large" />}
          startAdornment={<PageHeaderBackButton onClick={onBack} />}
        >
          {call.isConferenceCall ? (
            <>
              <h3
                className="truncate text-neutral-b0 typography-title w-full flex flex-col"
                data-sign="userDisplayName"
              >
                {displayName}
              </h3>
              <p
                className="typography-descriptorMini text-neutral-b2 mt-1"
                data-sign="userPhoneNumber"
              >
                {t('conferenceCall')}
              </p>
              {OnOtherDevice && <OnOtherDevice />}
              <div className="mt-2">
                <Tooltip
                  title={`${t(
                    'participants',
                  )} (${conferenceParticipantsCount})`}
                >
                  <IconButton
                    data-sign="conferenceCallParticipantsIcon"
                    size="xsmall"
                    color="secondary"
                    className="flex flex-row p-1 size-auto typography-descriptor px-2 gap-1.5 h-6"
                    onClick={onConferenceClick}
                  >
                    <Icon size="xsmall" symbol={TeamMd} />
                    <span>{conferenceParticipantsCount}</span>
                  </IconButton>
                </Tooltip>
              </div>
            </>
          ) : (
            <>
              <h3
                className="typography-title text-neutral-b0 truncate w-full flex flex-col"
                data-sign="userDisplayName"
              >
                {displayName}
              </h3>
              {displayPhoneNumber && (
                <p
                  className="typography-descriptorMini text-neutral-b0"
                  data-sign="userPhoneNumber"
                >
                  {displayPhoneNumber}
                </p>
              )}
              {OnOtherDevice && <OnOtherDevice />}
              {!callQueueName && myCallerId && (
                <p
                  className="typography-descriptorMini text-neutral-b2"
                  data-sign="userCallerId"
                >
                  {t(isInbound ? 'to' : 'myCallerId')}: {myCallerId}
                </p>
              )}
            </>
          )}
        </CallControlInformation>
      }
      contentDataSign="activeCallPanel"
      footer={footer}
      header={header}
      isConferenceCall={call.isConferenceCall}
      main={main}
      status={connecting ? t('connecting') : duration}
      statusEnd={
        onExpand && typeof expanded === 'boolean' ? (
          <ExpandLogButton expanded={expanded} onExpand={onExpand} />
        ) : null
      }
    />
  );
};
