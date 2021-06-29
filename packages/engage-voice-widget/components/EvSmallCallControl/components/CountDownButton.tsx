import { RcIconButton, RcText } from '@ringcentral/juno';
import React, { FunctionComponent, useEffect, useState } from 'react';
import sleep from '@ringcentral-integration/commons/lib/sleep';

import i18n from '../i18n';
import { CallButtonsProps } from '../../SmallCallControl';

type CountDownProps = {
  data: number;
};
export const CountDown: FunctionComponent<CountDownProps> = ({ data }) => {
  const count = data > 99 ? '99+' : data;
  return (
    <RcText
      color="text.negative"
      variant="subheading1"
      data-sign="CountDownText"
    >
      {count}
    </RcText>
  );
};

export type CountDownButtonProps = CallButtonsProps & {
  onRestartTimer?(): void | Promise<void>;
  onResumeRecord?(): void;
  recordPauseCount?: number;
  timeStamp?: number;
};

export const CountDownButton: FunctionComponent<CountDownButtonProps> = ({
  currentLocale,
  onRestartTimer,
  onResumeRecord,
  size,
  className,
  dataSign,
  recordPauseCount,
  timeStamp,
}) => {
  const [intervalTime, setIntervalTime] = useState(recordPauseCount);

  useEffect(() => {
    if (!timeStamp) return;
    let clearTimerSet = () => {};
    const handleTime = async () => {
      const time = Math.ceil(
        recordPauseCount + (timeStamp - Date.now()) / 1000,
      );
      if (time < 0) {
        clearTimerSet();
        // to handle other tabs had not execute this part code because this Component destroyed
        await sleep(1000);

        onResumeRecord();
        return;
      }
      setIntervalTime(time);
    };

    const intervalId = setInterval(handleTime, 1000);
    handleTime();
    clearTimerSet = () => {
      clearInterval(intervalId);
    };
    return clearTimerSet;
  }, [timeStamp, recordPauseCount]);

  return (
    <RcIconButton
      data-sign={dataSign}
      color="danger.f02"
      symbol={() => <CountDown data={intervalTime} />}
      variant="round"
      title={i18n.getString('restartTimer', currentLocale)}
      onClick={onRestartTimer}
      size={size}
      className={className}
      shouldPersistBg
    />
  );
};

CountDownButton.defaultProps = {
  currentLocale: 'en-US',
  dataSign: 'CountDown',
};
