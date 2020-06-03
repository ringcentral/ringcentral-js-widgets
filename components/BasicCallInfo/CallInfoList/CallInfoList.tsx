import React from 'react';

import { CallInfo, CallInfoProps } from '../CallInfo';

export interface CallInfoListProps {
  callInfos?: Array<CallInfoProps>;
  className?: string;
}

export const CallInfoList: React.FunctionComponent<CallInfoListProps> = ({
  callInfos,
  className,
}) => {
  if (!callInfos || callInfos.length === 0) return null;

  return (
    <div data-sign="infoList" className={className}>
      {callInfos.map(({ name, content }, i) => (
        <CallInfo key={i} name={name} content={content} />
      ))}
    </div>
  );
};
