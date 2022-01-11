import React, { FunctionComponent, MouseEventHandler, useState } from 'react';

import classNames from 'classnames';

import { Tooltip } from '@ringcentral-integration/widgets/components/Rcui/Tooltip';
import { TOOLTIP_LONG_DELAY_TIME } from '@ringcentral-integration/widgets/lib/toolTipDelayTime';
import { RcButtonBase, RcIcon, RcMenu, RcMenuItem } from '@ringcentral/juno';
import {
  ArrowDown as arrowDownSvg,
  ArrowUp as arrowUpSvg,
} from '@ringcentral/juno/icon';

import { EvCustomAvailableAgentState } from '../../../../interfaces/EvMainViewUI.interface';
import styles from './styles.scss';

export interface WorkingStateButtonProps {
  label: string;
  optionIndex: number;
  onChange(state: EvCustomAvailableAgentState): void;
  options: EvCustomAvailableAgentState[];
  color: string;
  disabled: boolean;
  timerText: string;
  isWide: boolean;
  classes?: {
    paper?: string;
  };
}

export const WorkingStateButton: FunctionComponent<WorkingStateButtonProps> = ({
  label,
  options,
  optionIndex,
  color,
  onChange,
  disabled,
  timerText,
  classes,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!disabled) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuOpened = Boolean(anchorEl);

  return (
    <>
      <div
        tabIndex={0}
        role="button"
        className={classNames(styles.state, styles[color])}
        onClick={handleClick}
      >
        <RcButtonBase
          disabled={disabled}
          className={styles.fullWidth}
          data-sign="workingStateButton"
        >
          <div className={styles.stateDot} />
          <Tooltip title={label} enterDelay={TOOLTIP_LONG_DELAY_TIME}>
            <div className={styles.stateName} data-sign="stateName">
              {label}
            </div>
          </Tooltip>
          <div className={styles.timer} data-sign="timer">
            {timerText}
          </div>
          <RcIcon
            className={styles.icon}
            symbol={menuOpened ? arrowUpSvg : arrowDownSvg}
          />
        </RcButtonBase>
      </div>
      <RcMenu
        PaperProps={{ style: { maxHeight: 280 } }}
        classes={{ paper: classes.paper }}
        anchorEl={anchorEl}
        open={menuOpened}
        onClose={handleClose}
      >
        {options.map((state, i) => {
          const selected = optionIndex === i;
          return (
            <RcMenuItem
              key={i}
              onClick={() => {
                handleClose();
                onChange(state);
              }}
              data-sign="workingStateItem"
              size="medium"
              selected={selected}
            >
              <div
                className={classNames(
                  styles.stateListItemDot,
                  styles[state.color],
                )}
              />
              <div className={styles.stateItemName}>{state.agentAuxState}</div>
            </RcMenuItem>
          );
        })}
      </RcMenu>
    </>
  );
};

WorkingStateButton.defaultProps = {
  classes: {},
};
