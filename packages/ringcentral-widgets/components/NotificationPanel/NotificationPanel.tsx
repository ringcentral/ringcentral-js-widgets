// TODO: should use juno animation to do that
import { useSleep } from '@ringcentral/juno';
import 'animate.css/animate.min.css';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React, { useEffect, useState } from 'react';

import { NotificationItem } from './NotificationItem';
import type {
  NotificationMessage,
  NotificationPanelProps,
} from './NotificationPanel.interface';
import styles from './styles.scss';

export const NotificationPanel: FunctionComponent<NotificationPanelProps> = ({
  entranceAnimation = 'fadeInDown',
  exitAnimation = 'fadeOutUp',
  backdropEntranceAnimation = 'fadeIn',
  backdropExitAnimation = 'fadeOut',
  duration = 500,
  messages,
  className,
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
        sleep(duration)
          .then(() => {
            setCurrentMessages(messages);
          })
          .catch(() => {
            // ignore cancel
          });
      }
    } else {
      cancel();
      setCurrentMessages(messages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <div className={clsx(styles.root, className)}>
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
