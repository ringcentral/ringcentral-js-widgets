import 'animate.css/animate.min.css';

import classNames from 'classnames';
import React, { FunctionComponent, useEffect, useState } from 'react';

import {
  NotificationItem,
  NotificationItemProps,
  NotificationMessage,
} from './NotificationItem';
import styles from './styles.scss';

export type NotificationProps = {
  messages: NotificationMessage[];
  exitAnimation?: string;
  entranceAnimation: string;

  dismiss: (id: string) => void;

  className: string;
  currentLocale: string;

  brand: string;
} & NotificationItemProps;

export const NotificationPanel: FunctionComponent<NotificationProps> = ({
  messages,
  className,
  exitAnimation,
  entranceAnimation,
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
        } else {
          cm.animation = '';
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
      {currentMessages.map((message, i) => {
        return (
          <NotificationItem
            {...rest}
            message={message}
            duration={duration}
            animation={message.animation ?? entranceAnimation}
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
  duration: 500,
};
