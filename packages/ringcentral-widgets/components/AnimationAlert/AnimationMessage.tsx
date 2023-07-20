import type { FunctionComponent } from 'react';
import React from 'react';

import classnames from 'classnames';

import type { MessageProps } from '../Message';
import Message from '../Message';
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
  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
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
