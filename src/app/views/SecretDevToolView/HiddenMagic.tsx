import clsx from 'clsx';
import { useObservable, useSubscription } from 'observable-hooks';
import React, { FunctionComponent, useRef } from 'react';
import {
  defer,
  filter,
  fromEvent,
  mergeMap,
  of,
  retry,
  scan,
  tap,
  timer,
} from 'rxjs';

export interface HiddenMagicProps {
  className?: string;
  /**
   * the times that you need to click inside 3s
   */
  times?: number;
  onShowChange: () => void;
}

const _HiddenMagic: FunctionComponent<HiddenMagicProps> = ({
  onShowChange,
  times = 5,
  ...rest
}) => {
  const hiddenRef = useRef<HTMLDivElement>(null);

  const click$ = useObservable(
    () =>
      defer(() =>
        fromEvent(hiddenRef.current!, 'click').pipe(
          scan((acc) => acc + 1, 0),
          mergeMap((x, i) =>
            i === 0
              ? timer(2000).pipe(
                  tap(() => {
                    throw new Error();
                  }),
                )
              : of(x),
          ),
          filter((x) => x === times),
          tap(() => {
            onShowChange();
            // throw error to end inner timer
            throw new Error();
          }),
          retry(),
        ),
      ),
    [],
  );

  useSubscription(click$);

  return <div {...rest} ref={hiddenRef} />;
};

/**
 * that hiddenMagic to show something in viewport,
 */
export const HiddenMagic: FunctionComponent<HiddenMagicProps> = ({
  className,
  ...rest
}) => {
  return (
    <_HiddenMagic
      {...rest}
      className={clsx(className, 'fixed right-0 bottom-0 size-8 z-tooltip')}
    />
  );
};
