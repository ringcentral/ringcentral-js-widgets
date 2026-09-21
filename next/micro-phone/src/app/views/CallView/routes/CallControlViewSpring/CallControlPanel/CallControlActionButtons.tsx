import React, { type FC } from 'react';

import type {
  CallActionType,
  useCallActionButtons,
} from '../../../../../hooks';

import { CallCtrlButton, type CallCtrlButtonProps } from './CallCtrlButton';

type CallActionButtonProps = ReturnType<typeof useCallActionButtons>[number];

type CallControlActionButtonsProps = {
  actionButtons: CallActionButtonProps[];
  actionDataSign?: (actionType: CallActionType) => string;
  dataSign?: string;
  getButtonProps?: (
    actionType: CallActionType,
  ) => Pick<CallCtrlButtonProps, 'menuList' | 'menuPlacement'> | undefined;
};

export const CallControlActionButtons: FC<CallControlActionButtonsProps> = ({
  actionButtons,
  actionDataSign,
  dataSign = 'actionButtons',
  getButtonProps,
}) => {
  return (
    <div
      className="flex flex-wrap gap-4 justify-center px-10"
      data-sign={dataSign}
    >
      {actionButtons.map(
        ({
          actionType,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          iconSize,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          size,
          ...rest
        }) => {
          const buttonProps = getButtonProps?.(actionType);

          return (
            <div
              key={actionType}
              className="flex-[0_0_calc(33.333%-0.67rem)] min-w-0 basis-[calc(33.333%-0.67rem)]"
            >
              <CallCtrlButton
                data-sign={actionDataSign?.(actionType) || actionType}
                menuPlacement={buttonProps?.menuPlacement}
                menuList={buttonProps?.menuList}
                {...rest}
                value=""
              />
            </div>
          );
        },
      )}
      {process.env.NODE_ENV === 'test' && (
        <span data-sign="actionTypes">
          {actionButtons.map((button) => button.actionType).join(',')}
        </span>
      )}
    </div>
  );
};
