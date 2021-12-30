import React, { FunctionComponent, useEffect, useState } from 'react';

import classNames from 'classnames';

import {
  EvMainViewUIFunctions,
  EvMainViewUIProps,
} from '../../../interfaces/EvMainViewUI.interface';
import styles from './styles.scss';
import { WorkingStateButton } from './WorkingStateButton';

type WorkingStateSelectProps = Pick<
  EvMainViewUIProps & EvMainViewUIFunctions,
  | 'handleWithIntervalTime'
  | 'agentStates'
  | 'changeWorkingState'
  | 'getTimerText'
  | 'currentStateIndex'
  | 'getStateColor'
  | 'stateText'
  | 'time'
  | 'disabled'
  | 'isWide'
  | 'hideOffHookBtn'
>;

const WorkingStateSelect: FunctionComponent<WorkingStateSelectProps> = ({
  agentStates,
  getStateColor,
  handleWithIntervalTime,
  stateText,
  time,
  currentStateIndex,
  getTimerText,
  changeWorkingState,
  disabled,
  isWide,
  hideOffHookBtn,
}) => {
  const [intervalTime, setIntervalTime] = useState(Date.now() - time);
  const stateColor = getStateColor(intervalTime);

  useEffect(() => {
    const handleTime = () => {
      const intervalTime = Date.now() - Number(time);
      handleWithIntervalTime(intervalTime);
      setIntervalTime(intervalTime);
    };
    const timerId = setInterval(handleTime, 1000);
    handleTime();
    return () => clearInterval(timerId);
  }, [time]);

  return (
    <div className={styles.selectHeader}>
      <WorkingStateButton
        label={stateText}
        optionIndex={currentStateIndex}
        onChange={changeWorkingState}
        options={agentStates}
        color={stateColor}
        disabled={disabled}
        isWide={isWide}
        timerText={getTimerText(intervalTime)}
        classes={{
          paper: classNames(styles.paper, hideOffHookBtn && styles.wider),
        }}
      />
    </div>
  );
};

export { WorkingStateSelect };
