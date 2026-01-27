import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { useCallActionButtons } from '@ringcentral-integration/micro-phone/src/app/hooks';
import { ActionMenuList } from '@ringcentral-integration/next-widgets/components';
import {
  CallMd,
  HoldMd,
  IncomingCallMd,
  ActiveCallMd,
} from '@ringcentral/spring-icon';
import { Icon, Menu, MenuList, Tooltip } from '@ringcentral/spring-ui';
import type { FunctionComponent } from 'react';
import React, { useRef } from 'react';

import { useContactRenderInfoFromCall } from '../../../hooks/useContactRenderInfo';
import { ActiveCallInfoListItem } from '../../CallView/routes/ActiveCallsViewSpring/ActiveCallsPanel';
import { QuickCallActionViewPanelProps } from '../QuickCallAction.view.interface';

import i18n from './i18n';

const SingleCallInfo: FunctionComponent<{
  call: NonNullable<QuickCallActionViewPanelProps['currentCall']>;
}> = ({ call }) => {
  const { DisplayName, duration, ringing, OnOtherDevice } =
    useContactRenderInfoFromCall(call, {
      phoneNumberDisplayMode: 'phoneNumber',
    });

  return (
    <div className="flex items-center w-full">
      <div className="relative">
        <Icon
          className="size-9 flex items-center justify-center"
          size="medium"
          data-sign={`${ringing ? 'ringing' : 'active'}-call-icon`}
          symbol={ringing ? IncomingCallMd : ActiveCallMd}
        />
      </div>
      <div className="flex flex-col mx-4 flex-auto w-0">
        <span className="typography-subtitle truncate">
          <DisplayName />
        </span>
        <div className="flex items-center flex-nowrap gap-1">
          <span className="typography-mainText">{duration}</span>
          {OnOtherDevice && <OnOtherDevice color="secondary" />}
        </div>
      </div>
    </div>
  );
};

export const QuickCallActionPanel: FunctionComponent<
  QuickCallActionViewPanelProps
> = ({
  actions,
  currentCall,
  ringCalls,
  holdingCalls,
  activeCalls,
  swapCalls,
  mergeCalls,
  swapMenuOpened,
  onSwapMenuOpen,
  mergeMenuOpened,
  onMergeMenuOpen,
  onAction,
}) => {
  const swapMenuRef = useRef(null);
  const mergeMenuRef = useRef(null);
  const isConferenceCall = currentCall
    ? Boolean(currentCall.isConferenceCall)
    : false;
  const buttons = useCallActionButtons(actions, onAction, { isConferenceCall });

  const { t } = useLocale(i18n);

  const ringCallCount = ringCalls.length;
  const onHoldCallCount = holdingCalls.length;
  const activeCallCount = activeCalls.length;
  const allCallsCount = ringCallCount + onHoldCallCount + activeCallCount;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      tabIndex={0}
      role="button"
      data-sign="QuickCallAction"
      className="bg-gradient-mixed bg-base-primary-b-high-contrast bg-cover-neutral-b0/30 text-neutral-50 w-full py-2 pl-2 pr-4 flex items-center h-14"
      onClick={() => {
        onAction('activeCall');
      }}
    >
      {currentCall ? (
        <SingleCallInfo call={currentCall} />
      ) : (
        <div className="ml-2">
          <h3 className="typography-subtitle" data-sign="calls">
            {t('calls', { count: allCallsCount })}
          </h3>
          <div className="typography-mainText flex gap-2 items-center">
            {ringCallCount > 0 && (
              <Tooltip title={`${ringCallCount} ${t('incoming')}`}>
                <div
                  className="flex gap-1 text-success-f"
                  data-sign="ring-calls"
                >
                  <Icon size="small" symbol={IncomingCallMd} />
                  <span>{ringCallCount}</span>
                </div>
              </Tooltip>
            )}
            {onHoldCallCount > 0 && (
              <Tooltip title={`${onHoldCallCount} ${t('onHold')}`}>
                <div
                  className="flex gap-1 text-warning-f"
                  data-sign="hold-calls"
                >
                  <Icon size="small" symbol={HoldMd} />
                  <span>{onHoldCallCount}</span>
                </div>
              </Tooltip>
            )}
            {activeCallCount > 0 && (
              <Tooltip title={`${activeCallCount} ${t('active')}`}>
                <div
                  className="flex gap-1 text-danger-f"
                  data-sign="active-calls"
                >
                  <Icon size="small" symbol={CallMd} />
                  <span>{activeCallCount}</span>
                </div>
              </Tooltip>
            )}
          </div>
        </div>
      )}
      <i className="flex-auto" />
      <div className="flex gap-1">
        <ActionMenuList
          buttons={buttons}
          variant="plain"
          refMap={{
            swap: swapMenuRef,
            merge: mergeMenuRef,
          }}
          propsMap={{
            merge: {
              TooltipProps: {
                title: t('mergeCalls'),
              },
            },
            unmute: {
              color: 'secondary',
              variant: 'outlined',
            },
          }}
        />
      </div>
      <Menu
        anchorEl={swapMenuRef.current}
        onClose={() => onSwapMenuOpen(false)}
        open={swapMenuOpened}
        onClick={(e) => {
          // TODO: spring-ui issue, when click the backdrop will trigger the onClick event also UXSYS-3892
          e.stopPropagation();
        }}
      >
        <h4 className="text-neutral-b2 typography-mainText mx-4">
          {t('swapWith')}:
        </h4>
        {swapCalls.length > 0 && (
          <MenuList>
            {swapCalls.map((call) => (
              <ActiveCallInfoListItem
                key={call.telephonySessionId}
                call={call}
                onClick={() => {
                  onAction('startSwap', call.telephonySessionId);
                  onSwapMenuOpen(false);
                }}
              />
            ))}
          </MenuList>
        )}
      </Menu>
      <Menu
        anchorEl={mergeMenuRef.current}
        onClose={() => onMergeMenuOpen(false)}
        open={mergeMenuOpened}
        onClick={(e) => {
          // TODO: spring-ui issue, when click the backdrop will trigger the onClick event also UXSYS-3892
          e.stopPropagation();
        }}
        disableEnforceFocus
      >
        <h4 className="text-neutral-b2 typography-mainText mx-4">
          {t('mergeWith')}:
        </h4>
        {mergeCalls.length > 0 && (
          <MenuList>
            {mergeCalls.map((call) => (
              <ActiveCallInfoListItem
                key={call.telephonySessionId}
                call={call}
                onClick={() => {
                  onAction('startMerge', call.telephonySessionId);
                  onMergeMenuOpen(false);
                }}
              />
            ))}
          </MenuList>
        )}
      </Menu>
    </div>
  );
};
