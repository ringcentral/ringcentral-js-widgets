import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import { AppAnnouncement } from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { ActionMenuList } from '@ringcentral-integration/next-widgets/components';
import { CaretLeftMd } from '@ringcentral/spring-icon';
import {
  IconButton,
  List,
  ListItem,
  ListItemProps,
  ListItemText,
  Tooltip,
} from '@ringcentral/spring-ui';
import React, { type Ref, useImperativeHandle, useRef, useState } from 'react';

import {
  useCallActionButtons,
  useContactRenderInfoFromCall,
} from '../../../../../hooks';
import { ActiveCallsPanelProps } from '../ActiveCalls.view.interface';

import i18n from './i18n';

type ActiveCallInfoListItemAction = {
  setTooltipForceHide: (forceHide: boolean) => void;
};

type ActiveCallInfoListItemProps = {
  call: Call;
  action?: Ref<ActiveCallInfoListItemAction>;
  /**
   * the item by default will show tooltip when mouse over, set tooltip to false to disable it
   */
  tooltip?: boolean;
} & ListItemProps;

export const ActiveCallInfoListItem: React.FC<ActiveCallInfoListItemProps> = ({
  call,
  children,
  action,
  tooltip,
  ...rest
}) => {
  const { DisplayName, duration, CallStatus, Avatar, OnOtherDevice } =
    useContactRenderInfoFromCall(call, {
      phoneNumberDisplayMode: 'phoneNumber',
    });
  const { t } = useLocale(i18n);

  const displayNameSpan = <DisplayName />;

  const [tooltipForceHide, setTooltipForceHide] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(
    action,
    () => ({
      setTooltipForceHide: (val) => {
        if (!tooltip || val === tooltipForceHide) return;

        const root = rootRef.current;
        if (root) {
          // force hide tooltip when mouse leave or enter again for can re-calculate the mouse over timer
          if (val) {
            root.dispatchEvent(new MouseEvent('mouseleave'));
          } else {
            root.dispatchEvent(new MouseEvent('mouseenter'));
          }

          setTooltipForceHide(val);
        }
      },
    }),
    [tooltip, tooltipForceHide],
  );

  const item = (
    <ListItem
      data-tooltip-force-hide={tooltipForceHide}
      ref={rootRef}
      key={call.telephonySessionId}
      size="large"
      className="group"
      classes={{
        content: 'bg-inherit',
      }}
      {...rest}
    >
      <Avatar size="large" />
      <ListItemText
        data-sign="displayName"
        primary={
          OnOtherDevice ? (
            <div className="flex items-center flex-nowrap gap-1">
              {displayNameSpan}
              <OnOtherDevice mode="icon" />
            </div>
          ) : (
            displayNameSpan
          )
        }
        secondary={<CallStatus>({duration})</CallStatus>}
      />
      {children}
    </ListItem>
  );

  return tooltip ? (
    <Tooltip
      title={t('callScreen')}
      delay={1000}
      tooltipForceHide={tooltipForceHide}
    >
      {item}
    </Tooltip>
  ) : (
    item
  );
};

const ActiveCallItem: React.FC<
  {
    call: Call;
  } & Pick<
    ActiveCallsPanelProps,
    'useActionsHandler' | 'useActiveCallItemActions'
  >
> = ({ call, useActionsHandler, useActiveCallItemActions }) => {
  const actions = useActiveCallItemActions(call);
  const onAction = useActionsHandler(call.telephonySessionId!);
  const isConferenceCall = Boolean(call.isConferenceCall);
  const buttons = useCallActionButtons(actions, onAction, {
    isConferenceCall,
  });

  const { t } = useLocale(i18n);

  const actionRef = useRef<ActiveCallInfoListItemAction>(null);

  return (
    <ActiveCallInfoListItem
      call={call}
      onClick={() => onAction('activeCall', call.telephonySessionId)}
      action={actionRef}
      tooltip
    >
      <ActionMenuList
        buttons={buttons}
        showIconAtMenuList={false}
        TooltipProps={{
          placement: 'top',
        }}
        moreButtonProps={{
          size: 'medium',
          TooltipProps: {
            title: t('callActions'),
          },
        }}
        propsMap={{
          all: {
            size: 'medium',
            iconSize: 'small',
            onMouseOver: () => {
              actionRef.current?.setTooltipForceHide(true);
            },
            onMouseLeave: () => {
              actionRef.current?.setTooltipForceHide(false);
            },
          },
        }}
      />
    </ActiveCallInfoListItem>
  );
};

export const ActiveCallsPanel: React.FC<ActiveCallsPanelProps> = ({
  backToCall,
  calls,
  useActionsHandler,
  useActiveCallItemActions,
}) => {
  const onAction = useActionsHandler(backToCall.telephonySessionId);

  const { DisplayName, holding, ringing } = useContactRenderInfoFromCall(
    backToCall,
    {
      phoneNumberDisplayMode: 'phoneNumber',
    },
  );
  const { t } = useLocale(i18n);

  return (
    <>
      <AppAnnouncement>
        <div
          data-sign="top-active-call-bar"
          className="bg-gradient-mixed bg-base-primary-b-high-contrast bg-cover-neutral-b0/30 text-neutral-50 w-full py-2 pl-2 pr-4 flex items-center h-14"
        >
          <IconButton
            data-sign="backButton"
            symbol={CaretLeftMd}
            variant="inverted"
            color="secondary"
            background={false}
            onClick={() => {
              onAction('activeCall');
            }}
          />
          <ListItemText
            className="ml-2"
            primary={
              <span className="text-neutral-base" data-sign="status">
                {t(
                  ringing
                    ? 'incomingCall'
                    : holding
                    ? 'onHoldCall'
                    : 'activeCall',
                )}
              </span>
            }
            secondary={
              <span className="text-neutral-b4" data-sign="displayName">
                <DisplayName />
              </span>
            }
          />
        </div>
      </AppAnnouncement>

      <List data-sign="active-calls-list">
        {calls.map((call, index) => (
          <ActiveCallItem
            key={`${call.telephonySessionId}-${index}`}
            call={call}
            useActionsHandler={useActionsHandler}
            useActiveCallItemActions={useActiveCallItemActions}
          />
        ))}
      </List>
    </>
  );
};
