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
                  // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
                  handleSuccess={() => onCopySuccess(attr)}
                  // @ts-expect-error TS(2769): No overload matches this call.
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
