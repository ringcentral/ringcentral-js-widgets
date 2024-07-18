import { format } from '@ringcentral-integration/utils';
import { RcAlert, RcTooltip } from '@ringcentral/juno';
import React, { useEffect, useState } from 'react';

import i18n from './i18n';
import styles from './styles.scss';

type CountdownTimerProps = {
  creationTime: number;
  duration: number;
  currentLocale: string;
  variant: 'plain' | 'info' | 'tooltip';
  children?: any;
};

export const CountdownTimer = ({
  creationTime,
  duration,
  variant,
  currentLocale,
  children = <span />,
}: CountdownTimerProps) => {
  const endTime = creationTime + duration * 60 * 1000; // ms
  const remain = Math.floor((endTime - Date.now()) / 1000); // s
  const [timeRemaining, setTimeRemaining] = useState(remain);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const remainingTime = Math.floor((endTime - Date.now()) / 1000); // s
      if (remainingTime <= -1) {
        clearInterval(intervalId);
        // do something when time is up
      }
      setTimeRemaining(remainingTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [creationTime, duration]);

  const minutes = Math.ceil(timeRemaining / 60);
  const seconds = Math.ceil(timeRemaining % 60);

  let countdownInfo: string;
  if (timeRemaining > 60) {
    countdownInfo = `${format(
      i18n.getString('infoMessageMins', currentLocale),
      {
        delayTime: minutes,
      },
    )}`;
  } else if (timeRemaining === 60) {
    /* 1 minute */
    countdownInfo = `${format(i18n.getString('infoMessageMin', currentLocale), {
      delayTime: minutes,
    })}`;
  } else if (seconds !== 1) {
    countdownInfo = `${format(
      i18n.getString('infoMessageSecs', currentLocale),
      {
        delayTime: seconds,
      },
    )}`;
  } else {
    /* 1 second */
    countdownInfo = `${format(i18n.getString('infoMessageSec', currentLocale), {
      delayTime: seconds,
    })}`;
  }

  if (timeRemaining < 0 && variant === 'tooltip') {
    return children;
  } else if (timeRemaining < 0) {
    return null;
  }

  switch (variant) {
    case 'info':
      return (
        <div data-sign="delaySavingTimer" className={styles.wrapper}>
          <RcAlert icon className={styles.alert}>
            {countdownInfo}
          </RcAlert>
        </div>
      );
    case 'tooltip':
      return (
        <RcTooltip title={countdownInfo} ignorePointer>
          {children}
        </RcTooltip>
      );
    case 'plain':
    default:
      return (
        <div
          data-sign="delaySavingTimer"
          className={styles.plaintext}
          title={countdownInfo}
        >
          {countdownInfo}
        </div>
      );
  }
};
