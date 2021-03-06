import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import Message, { MessageProps } from '../Message';
import { ANIMATION_DURATION } from './AnimationAlertUtils';

type AnimationMessageProps = {
  animation?: string;
  duration?: number;
} & MessageProps;

export const AnimationMessage: FunctionComponent<AnimationMessageProps> = ({
  animation,
  duration,
  ...props
}) => {
  const second = duration / 1000;
  return (
    <div
      className={classnames([animation, 'animated'])}
      style={{
        animationDuration: `${second}s`,
      }}
    >
      <Message {...props} />
    </div>
  );
};
AnimationMessage.defaultProps = {
  animation: undefined,
  duration: ANIMATION_DURATION,
};
