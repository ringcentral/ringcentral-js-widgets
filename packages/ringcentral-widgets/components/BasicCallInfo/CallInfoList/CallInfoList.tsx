import React from 'react';

import { CallInfo, CallInfoProps } from '../CallInfo';
import styles from './styles.scss';

export interface CallInfoListProps {
  callInfos?: Array<CallInfoProps>;
}

const CallInfoList: React.FunctionComponent<CallInfoListProps> = ({
  callInfos,
}) => {
  if (!callInfos || callInfos.length === 0) return null;

  return (
    <div data-sign="infoList" className={styles.infoList}>
      {callInfos.map(({ name, content }, i) => (
        <CallInfo key={i} name={name} content={content} />
      ))}
    </div>
  );
};

export default CallInfoList;
