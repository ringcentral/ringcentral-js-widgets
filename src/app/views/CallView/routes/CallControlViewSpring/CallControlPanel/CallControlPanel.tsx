import { FormattedPhoneNumber } from '@ringcentral-integration/micro-auth/src/app/components';
import {
  CallButton,
  MenuItemText,
  MenuList,
  Option,
} from '@ringcentral/spring-ui';
import React, { type FC, useMemo } from 'react';

import { useCallActionButtons } from '../../../../../hooks';
import { CallControlViewPanelProps } from '../CallControl.view.interface';

import { AiNoteTip } from './AiNoteTip';
import { CallCtrlButton } from './CallCtrlButton';
import { TransferringCall } from './TransferringCall';
import { useCallControlLayout } from './useCallControlLayout';

export const CallControlPanel: React.FC<CallControlViewPanelProps> = (
  props,
) => {
  const {
    flipNumbers,
    actions,
    call,
    transferringCalls,
    onAction,
    AudioCardComponent: AudioCard,
  } = props;
  const isConferenceCall = Boolean(call.isConferenceCall);
  const callActions = useCallActionButtons(actions, onAction, {
    isConferenceCall,
  });

  const renderActions = useMemo(() => callActions.slice(0, -1), [callActions]);

  const actionButtons = useMemo(
    () => (
      <div
        className="flex flex-wrap gap-4 justify-center px-10"
        data-sign="actionButtons"
      >
        {renderActions.map(
          ({
            actionType,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            iconSize,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            size,
            ...rest
          }) => {
            return (
              <CallCtrlButton
                key={actionType}
                menuPlacement={actionType === 'audio' ? 'right' : undefined}
                menuList={
                  actionType === 'flip' ? (
                    <MenuList
                      onChange={(value: string) => onAction('flip', value)}
                    >
                      {flipNumbers.map((item, index) => (
                        <Option key={index} value={item.flipNumber}>
                          <MenuItemText>
                            <div className="text-neutral-b1">{item.label}</div>
                            <div className="text-neutral-b2">
                              <FormattedPhoneNumber
                                phoneNumber={item.phoneNumber}
                              />
                            </div>
                          </MenuItemText>
                        </Option>
                      ))}
                    </MenuList>
                  ) : actionType === 'audio' ? (
                    AudioCard
                  ) : undefined
                }
                data-sign={actionType}
                {...rest}
                value=""
              />
            );
          },
        )}
        {process.env.NODE_ENV === 'test' && (
          <span data-sign="actionTypes">
            {renderActions.map((b) => b.actionType).join(',')}
          </span>
        )}
      </div>
    ),
    [flipNumbers, onAction, renderActions, AudioCard],
  );

  const Component = transferringCalls
    ? TransferringCall
    : NormalCallControlPanel;

  return <Component {...props}>{actionButtons}</Component>;
};

const NormalCallControlPanel: FC<CallControlViewPanelProps> = ({
  actions,
  call,
  expanded,
  onAction,
  onExpand,
  aiNoteTipType,
  viewAiNote,
  onCloseAiNoteTip,
  children,
}) => {
  const isConferenceCall = Boolean(call.isConferenceCall);
  const callActions = useCallActionButtons(actions, onAction, {
    isConferenceCall,
  });
  const hungUpActionProps = useMemo(
    () => callActions[callActions.length - 1],
    [callActions],
  );

  if (
    process.env.NODE_ENV !== 'production' &&
    (!hungUpActionProps || hungUpActionProps.actionType !== 'hangUp')
  ) {
    throw new Error(
      'The last action should be hangUp, you may have a bug, please check the CallControl.view',
    );
  }

  const aiNoteTip = aiNoteTipType ? (
    <AiNoteTip
      aiNoteTipType={aiNoteTipType}
      onView={viewAiNote}
      onCloseAiNoteTip={onCloseAiNoteTip}
    />
  ) : undefined;

  const {
    // just omit the actionType from the end
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    actionType: lastActionType,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    label,
    ...end
  } = hungUpActionProps;

  return useCallControlLayout(call, {
    main: children,
    footer: (
      <CallButton
        {...end}
        variant="end"
        TooltipProps={{ title: end.tooltip }}
        size="medium"
        data-sign="hangUp"
      />
    ),
    onBack: () => {
      onAction('back');
    },
    onConferenceClick: () => {
      onAction('viewConferenceList');
    },
    aiNoteTip,
    expanded,
    onExpand,
  });
};
