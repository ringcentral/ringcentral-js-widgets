import React, { FunctionComponent, useEffect, useState } from 'react';

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
  | 'handleWithIntervalTime'
  | 'stateText'
  | 'time'
  | 'disabled'
  | 'isWide'
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
      />
    </div>
  );
};

export { WorkingStateSelect };
