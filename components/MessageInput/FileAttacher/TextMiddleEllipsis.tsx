import clsx from 'clsx';
import React, { memo } from 'react';

import { getMiddleSplit } from './utils';

type TextMiddleEllipsisProps = {
  max?: number;
  middle?: number;
  children: string;
  className?: string;
} & Omit<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >,
  'children'
>;

/**
 * provide you can ellipsis text in the middle
 *
 * @default max check be 22
 * @default middle check be -8
 */
export const TextMiddleEllipsis = memo(
  ({ max, middle, children, className, ...rest }: TextMiddleEllipsisProps) => {
    const { left, right } = getMiddleSplit(children, { max, middle });
    return (
      <span
        className={clsx('w-full inline-flex', className)}
        {...rest}
        title={children}
      >
        <span className="truncate">{left}</span>
        {right && <span className="flex-none">{right}</span>}
      </span>
    );
  },
);
