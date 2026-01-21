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

import i18n from './i18n';

export const useCallControlLayout = (
  call: CallControlViewPanelProps['call'],
  {
    main,
    expanded,
    onExpand,
    footer,
    onBack,
    onConferenceClick,
    aiNoteTip,
  }: {
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
    <>
      <div className="h-5 flex items-center ml-4 mr-3 mt-3">
        {connecting ? t('connecting') : duration}
        <i className="flex-auto" />
        {onExpand && typeof expanded === 'boolean' ? (
          <ExpandLogButton expanded={expanded} onExpand={onExpand} />
        ) : null}
      </div>

      <div
        data-sign="activeCallPanel"
        className="flex-auto flex flex-col gap-8"
      >
        <div
          data-sign="call-information"
          className="w-full py-2 pl-2 pr-4 flex"
        >
          <PageHeaderBackButton onClick={onBack} />
          <Avatar size="large" />

          <div className="flex-auto ml-2 w-1">
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
          </div>
        </div>

        <div className="flex flex-col items-center">{main}</div>

        <div className="flex justify-center items-center relative -mt-2">
          {footer}
        </div>

        {aiNoteTip && <div className="relative mx-3 mb-3">{aiNoteTip}</div>}
      </div>
    </>
  );
};
