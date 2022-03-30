import { useSleep } from '@ringcentral/juno';
import 'animate.css/animate.min.css';

import React, { FunctionComponent, useEffect, useState } from 'react';

import classNames from 'classnames';

import { NotificationItem } from './NotificationItem';
import {
  NotificationMessage,
  NotificationPanelProps,
} from './NotificationPanel.interface';
import styles from './styles.scss';

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
  const { sleep, cancel } = useSleep();

  useEffect(() => {
    const updatedMessages: NotificationMessage[] = [];
    // if length is grater means that is delete item.
    if (currentMessages.length > messages.length) {
      currentMessages.forEach((currentMessage) => {
        const updatedMessage = {
          ...currentMessage,
        };
        // if that can't find this id, that means that is delete
        if (!messages.some((m) => m.id === currentMessage.id)) {
          updatedMessage.animation = exitAnimation;
          updatedMessage.backdropAnimation = backdropExitAnimation;
        } else {
          updatedMessage.animation = '';
          updatedMessage.backdropAnimation = '';
        }
        updatedMessages.push(updatedMessage);
      });

      setCurrentMessages(updatedMessages);

      if (duration > 0) {
        sleep(duration).then(() => {
          setCurrentMessages(messages);
        });
      }
    } else {
      cancel();
      setCurrentMessages(messages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
