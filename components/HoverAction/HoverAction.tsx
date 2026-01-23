import clsx from 'clsx';
import React, { type FunctionComponent } from 'react';

type HoverActionProps = {
  /**
   * when be true, always keep the action be visible
   */
  open?: boolean;
};

export const HoverAction: FunctionComponent<HoverActionProps> = ({
  children,
  open,
}) => {
  return (
    <div
      data-sign="hover-actions"
      className={clsx(
        'flex gap-1 absolute right-0 top-0 h-full items-center bg-inherit transition-neutral-01-fast transition-transform pl-4 pr-2',
        'group-hover:translate-x-0 group-[.sui-focus-visible-within]:translate-x-0',
        open ? 'translate-x-0' : 'translate-x-full',
      )}
    >
      {children}
    </div>
  );
};
