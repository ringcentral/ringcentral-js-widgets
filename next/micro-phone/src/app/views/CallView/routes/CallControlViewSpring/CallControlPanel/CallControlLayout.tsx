import clsx from 'clsx';
import React, { type FC, type ReactNode } from 'react';

export type CallControlLayoutProps = {
  callInformation: ReactNode;
  footer: ReactNode;
  status: ReactNode;
  aiNoteTip?: ReactNode;
  className?: string;
  contentDataSign?: string;
  header?: ReactNode;
  isConferenceCall?: boolean;
  main?: ReactNode;
  statusEnd?: ReactNode;
};

export const CallControlLayout: FC<CallControlLayoutProps> = ({
  aiNoteTip,
  callInformation,
  className,
  contentDataSign,
  footer,
  header,
  isConferenceCall,
  main,
  status,
  statusEnd,
}) => {
  return (
    <>
      <div className="h-5 flex items-center ml-4 mr-3 mt-3">
        {status}
        <i className="flex-auto" />
        {statusEnd}
      </div>

      <div
        data-sign={contentDataSign}
        className={clsx('flex-auto flex flex-col', className)}
      >
        {callInformation}
        {header}
        <div
          className={clsx(
            'flex-auto flex flex-col h-0 overflow-auto pb-4',
            isConferenceCall ? 'gap-7 pt-7' : 'gap-8 pt-8',
          )}
        >
          {main && <div className="flex flex-col items-center">{main}</div>}

          <div className="flex justify-center items-center relative -mt-2">
            {footer}
          </div>

          {aiNoteTip && <div className="relative mx-3 mb-3">{aiNoteTip}</div>}
        </div>
      </div>
    </>
  );
};

export type CallControlInformationProps = {
  avatar: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  dataSign?: string;
  startAdornment?: ReactNode;
};

export const CallControlInformation: FC<CallControlInformationProps> = ({
  avatar,
  children,
  className,
  contentClassName,
  dataSign = 'call-information',
  startAdornment,
}) => {
  return (
    <div
      data-sign={dataSign}
      className={clsx('w-full py-2 pl-2 pr-4 flex', className)}
    >
      {startAdornment}
      {avatar}

      <div className={clsx('flex-auto ml-2 w-1', contentClassName)}>
        {children}
      </div>
    </div>
  );
};
