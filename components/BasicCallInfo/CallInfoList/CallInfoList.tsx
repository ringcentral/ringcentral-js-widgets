import React, { FunctionComponent } from 'react';

import classnames from 'classnames';

import { RcList, RcListItem } from '@ringcentral/juno';

import copyButton from '../../CopyButton/CopyButton';
import CopyToClipboard from '../../CopyToClipboard';
import { CallInfo, CallInfoProps } from '../CallInfo';
import styles from './styles.scss';

export interface CallInfoListProps {
  callInfos?: Array<CallInfoProps>;
  className?: string;
  onCopySuccess?: (name: string) => void;
  currentLocale?: string;
}

export const CallInfoList: FunctionComponent<CallInfoListProps> = ({
  callInfos,
  className,
  onCopySuccess,
  currentLocale,
}) => {
  if (!callInfos || callInfos.length === 0) return null;

  return (
    <div data-sign="infoList" className={className}>
      <RcList>
        {callInfos.map(({ attr, name, content, enableCopy }, i) => (
          <RcListItem
            key={i}
            className={classnames(styles.listItem)}
            button={false}
          >
            <CallInfo name={name} content={content} />
            {enableCopy && (
              <div className={styles.copyBtn}>
                <CopyToClipboard
                  handleSuccess={() => onCopySuccess(attr)}
                  currentLocale={currentLocale}
                  button={copyButton}
                  copiedText={content}
                />
              </div>
            )}
          </RcListItem>
        ))}
      </RcList>
    </div>
  );
};
