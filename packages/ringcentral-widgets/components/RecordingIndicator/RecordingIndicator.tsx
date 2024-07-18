import { RcIcon } from '@ringcentral/juno';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React from 'react';

import RecordIconActive from '../../assets/images/RecordOn.svg';
import { useSynchronizedAnimation } from '../../react-hooks/useSynchronizedAnimation';

import styles from './styles.scss';

type RecordingIndicatorProps = {
  className?: string;
};

export const RecordingIndicator: FunctionComponent<RecordingIndicatorProps> = ({
  className,
  ...rest
}) => {
  const animationClassName = styles.recordingIndicator;
  useSynchronizedAnimation(`.${animationClassName}`);

  return (
    <RcIcon
      {...rest}
      size="small"
      symbol={RecordIconActive}
      className={clsx(animationClassName, className)}
    />
  );
};
