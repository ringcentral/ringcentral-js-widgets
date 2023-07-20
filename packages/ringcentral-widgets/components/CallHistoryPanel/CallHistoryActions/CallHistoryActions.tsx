import type { FunctionComponent } from 'react';
import React from 'react';

import classnames from 'classnames';

import type { CallLogMenu } from '../CallHistoryPanel.interface';
import { ActionButton } from './ActionButton';
import { MenuButton } from './MenuButton';
import styles from './styles.scss';

export type CallHistoryActionProps = {
  actionMenu?: CallLogMenu;
  isWide?: boolean;
};

export const CallHistoryActions: FunctionComponent<CallHistoryActionProps> = ({
  actionMenu = [],
  isWide = true,
}) => {
  // only show first 3 buttons
  const displayedButtons = actionMenu.slice(0, 3);

  return (
    <div
      className={classnames([styles.actions, !isWide && styles.classic])}
      data-sign="callHistoryActions"
    >
      {displayedButtons.map(
        ({ icon, label, disabled, dataSign, action, subMenu }, index) => {
          if (action) {
            return (
              <ActionButton
                icon={icon}
                label={label}
                disabled={disabled}
                action={action}
                key={index}
                dataSign={dataSign}
              />
            );
          }
          if (subMenu) {
            return (
              <MenuButton
                icon={icon}
                label={label}
                disabled={disabled}
                subMenu={subMenu}
                key={index}
                dataSign={dataSign}
              />
            );
          }
          return null;
        },
      )}
    </div>
  );
};
