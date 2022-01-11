import { useEffect, useRef, useCallback } from 'react';
import { useEventCallback } from '@ringcentral/juno';

/**
 * controllable interval, provide easy way to control interval
 *
 * - cancel: cancel current interval
 * - pause: pause current interval
 * - play: play current interval
 * - getRunning: return current interval running state
 *
 *  @example
 * ```ts
 * const { cancel, play, pause } = useInterval(() => {
 *    console.log('interval be triggered');
 * }, 1000)
 *
 * // get current run times
 * useInterval((times) => {
 *    console.log('current times start from 1', times);
 * }, 2000)
 *
 * // not start interval immediately
 * useInterval((times) => {
 *    console.log('current times start from 1', times);
 * }, 2000, false)
 * ```
 */
export const useInterval = (
  /** callback with times, times start from 1 */
  callback: (times: number) => void,
  /** what delay time of that interval */
  delay: number = 0,
  /** is that start interval immediately */
  startImmediately = true,
) => {
  const intervalRef = useRef<number>();
  const countRef = useRef(0);

  const getRunning = useEventCallback(() => !!intervalRef.current);

  const savedCallback = useEventCallback((times: number) => {
    callback(times);
  });

  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  const cancel = useCallback(() => {
    pause();

    countRef.current = 0;
  }, [pause]);

  const play = useCallback(() => {
    const isRunning = getRunning();
    if (isRunning) return;
    intervalRef.current = window.setInterval(() => {
      countRef.current++;
      savedCallback(countRef.current);
    }, delay);
  }, [delay, getRunning, savedCallback]);

  useEffect(() => {
    if (startImmediately) {
      play();
    }

    return () => cancel();
  }, [cancel, play, startImmediately]);

  return {
    /**
     * cancel current interval
     */
    cancel,
    /**
     * pause current interval
     */
    pause,
    /**
     * play current interval
     */
    play,
    /**
     * return current interval running state
     */
    getRunning,
  };
};
