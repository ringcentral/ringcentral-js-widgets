import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { PageHeader } from '@ringcentral-integration/next-widgets/components';
import {
  CallFilledMd,
  HoldFilledMd,
  TransferCallMd,
} from '@ringcentral/spring-icon';
import { CallButton, Icon, IconButton } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { type FC } from 'react';

import { ExpandLogButton } from '../../../../../components';
import { useContactRenderInfoFromCall } from '../../../../../hooks';
import useCallActionButtonsI18n from '../../../../../hooks/useCallActionButtons/i18n';
import { CallControlViewPanelProps } from '../CallControl.view.interface';

import i18n from './i18n';

type TransferringCallItemProps = {
  active: boolean;
  dataSign: string;
} & Pick<CallControlViewPanelProps, 'call' | 'onAction'>;

const TransferringCallItem: FC<TransferringCallItemProps> = ({
  call,
  active,
  dataSign,
  onAction,
}) => {
  const { telephonySessionId } = call;
  const { DisplayName, duration, holding } = useContactRenderInfoFromCall(
    call,
    { phoneNumberDisplayMode: 'phoneNumber' },
  );

  const { t } = useLocale(useCallActionButtonsI18n);

  return (
    <li
      data-telephony-session-id={telephonySessionId}
      className="flex flex-nowrap gap-4"
      data-sign={dataSign}
    >
      <button
        className={clsx(
          'flex flex-nowrap items-center flex-auto gap-2 rounded-full px-4 py-2 text-left typography-mainText hover:bg-neutral-b4/40',
          active ? 'bg-neutral-b4' : undefined,
        )}
        onClick={() => {
          if (active) return;

          onAction('activeCall', telephonySessionId);
          onAction('unHold', telephonySessionId);
        }}
      >
        <span
          className="text-neutral-b0 flex-auto truncate w-0"
          data-sign="displayName"
        >
          <DisplayName />
        </span>
        <span className="">{duration}</span>
        <Icon
          data-sign={`${holding ? 'holdIcon' : 'callIcon'}`}
          symbol={holding ? HoldFilledMd : CallFilledMd}
          size="small"
        />
      </button>
      <CallButton
        variant="end"
        size="small"
        TooltipProps={{
          title: t(call.isConferenceCall ? 'leaveCall' : 'endCall'),
        }}
        data-sign="endCall"
        className={active ? undefined : 'invisible'}
        onClick={() => {
          onAction('hangUpWarmTransfer', telephonySessionId);
        }}
      />
    </li>
  );
};

export const TransferringCall: React.FC<CallControlViewPanelProps> = ({
  transferringCalls,
  expanded,
  onAction,
  onExpand,
  call,
  children,
}) => {
  const { t } = useLocale(i18n);
  const activeTelephonySessionId = call.telephonySessionId;

  return (
    <div data-sign="transferring-calls">
      <PageHeader
        className="h-12"
        onBackClick={() => onAction('back')}
        endAdornment={
          onExpand && typeof expanded === 'boolean' ? (
            <ExpandLogButton expanded={expanded} onExpand={onExpand} />
          ) : null
        }
      >
        {t('transferTitle')}
      </PageHeader>
      <ul className="mx-4 space-y-1 mt-6">
        {transferringCalls!.map((transferringCall, index) => {
          const currTelephonySessionId = transferringCall.telephonySessionId;
          return (
            <TransferringCallItem
              key={currTelephonySessionId}
              dataSign={`call-item-${index}`}
              call={transferringCall}
              active={currTelephonySessionId === activeTelephonySessionId}
              onAction={onAction}
            />
          );
        })}
      </ul>

      <div className="flex flex-col items-center mt-6 mb-12">{children}</div>

      <div className="flex justify-center items-center relative">
        <IconButton
          color="success"
          size="xxxlarge"
          iconSize="large"
          TooltipProps={{ title: t('completeTransfer') }}
          variant="contained"
          data-sign="completeWarnTransfer"
          symbol={TransferCallMd}
          onClick={() => {
            onAction('completeWarmTransfer');
          }}
        />
      </div>
    </div>
  );
};
