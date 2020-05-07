import 'animate.css/animate.min.css';

import classNames from 'classnames';
import React, { FunctionComponent, useEffect, useState } from 'react';

import {
  NotificationItem,
  NotificationItemProps,
  NotificationMessage,
} from './NotificationItem';
import styles from './styles.scss';

export type NotificationPanelProps = {
  messages: NotificationMessage[];
  exitAnimation?: string;
  entranceAnimation: string;

  backdropEntranceAnimation?: string;
  backdropExitAnimation?: string;

  dismiss: (id: string) => void;

  className: string;
  currentLocale: string;

  brand: string;
} & NotificationItemProps;

export const NotificationPanel: FunctionComponent<NotificationPanelProps> = ({
  messages,
  className,
  exitAnimation,
  entranceAnimation,
  backdropEntranceAnimation,
  backdropExitAnimation,
  duration,
  ...rest
}) => {
  const [currentMessages, setCurrentMessages] = useState(messages);

  const [timer, setTimer] = useState(null);

  useEffect(() => {
    // if length is gratter means that is delete item.
    if (currentMessages.length > messages.length) {
      currentMessages.forEach((cm) => {
        // if that can't find this id, that means that is delete
        if (!messages.some((m) => m.id === cm.id)) {
          cm.animation = exitAnimation;
          cm.backdropAnimation = backdropExitAnimation;
        } else {
          cm.animation = '';
          cm.backdropAnimation = '';
        }
      });

      setCurrentMessages([...currentMessages]);

      if (duration > 0) {
        const timerId = setTimeout(() => {
          setCurrentMessages(messages);
        }, duration);

        setTimer(timerId);
      }
    } else {
      if (timer) {
        clearTimeout(timer);
      }
      setCurrentMessages(messages);
    }
  }, [messages]);

  return (
    <div className={classNames(styles.root, className)}>
      {currentMessages.map((data, i) => {
        return (
          <NotificationItem
            {...rest}
            data={data}
            duration={duration}
            backdropAnimation={
              data.backdropAnimation ?? backdropEntranceAnimation
            }
            animation={data.animation ?? entranceAnimation}
            key={i}
          />
        );
      })}
    </div>
  );
};

NotificationPanel.defaultProps = {
  entranceAnimation: 'fadeInDown',
  exitAnimation: 'fadeOutUp',
  backdropEntranceAnimation: 'fadeIn',
  backdropExitAnimation: 'fadeOut',
  duration: 500,
};
