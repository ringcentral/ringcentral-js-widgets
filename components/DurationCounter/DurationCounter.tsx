import { formatDuration } from '@ringcentral-integration/commons/lib/formatDuration';
import {
  useForceUpdate,
  useInterval,
  usePrevious,
  useResultRef,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';

type DurationCounterProps = {
  className?: string;
  /**
   * The start time in milliseconds since the Unix epoch.
   */
  startTime: number | undefined;
  /**
   * An optional offset in milliseconds to adjust the start time.
   *
   * @default 0
   */
  offset?: number;
};

/**
 * DurationCounter component displays a formatted duration that updates every second.
 */
export const DurationCounter: React.FC<DurationCounterProps> = (props) => {
  const { startTime } = props;
  const prev = usePrevious(() => startTime);
  const forceUpdate = useForceUpdate();

  // when startTime changes, force update to full re-render the component
  useEffect(() => {
    if (prev && prev !== startTime) {
      forceUpdate();
    }
  }, [forceUpdate, prev, startTime]);

  if (prev && prev !== startTime) {
    return null;
  }

  return <InnerDurationCounter {...props} />;
};

/**
 * DurationCounter component displays a formatted duration that updates every second.
 */
const InnerDurationCounter: React.FC<DurationCounterProps> = ({
  className,
  startTime,
  offset = 0,
}) => {
  const getFormattedDuration = useCallback(() => {
    if (startTime === undefined) return formatDuration(startTime);

    const adjustedStartTime = startTime + offset;

    const duration = Math.round((Date.now() - adjustedStartTime) / 1000);

    return formatDuration(duration);
  }, [offset, startTime]);

  // use result ref to avoid re-creating the function on every render
  const defaultValueRef = useResultRef(getFormattedDuration);

  const [duration, setDuration] = useState<string>(defaultValueRef.current);

  useInterval(() => setDuration(getFormattedDuration()), 1000);

  return (
    <span
      className={clsx(className, 'typography-descriptorMini')}
      data-sign="duration"
    >
      {duration}
    </span>
  );
};
