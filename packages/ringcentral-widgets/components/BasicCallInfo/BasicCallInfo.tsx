import {
  RcExpansionPanel,
  RcExpansionPanelDetails,
  RcExpansionPanelSummary,
  RcIcon,
} from '@ringcentral-integration/rcui';
import arrowDownSvg from '@ringcentral-integration/rcui/icons/icon-arrow_down.svg';
import React from 'react';

import { ShinyBar, ShinyBarProps } from '../LogBasicInfoV2/ShinyBar';
import CallIcon from './CallIcon';
import { CallInfoProps } from './CallInfo';
import CallInfoList from './CallInfoList';
import CallSubject from './CallSubject';
import FollowInfo from './FollowInfo';
import styles from './styles.scss';

export type BasicCallInfoProps = {
  currentLocale: string;
  subject: string;
  isInbound: boolean;
  isRinging: boolean;
  followInfos?: string[];
  callInfos?: CallInfoProps[];
} & Pick<ShinyBarProps, 'status'>;

const BasicCallInfo: React.FunctionComponent<BasicCallInfoProps> = ({
  subject,
  isInbound,
  isRinging,
  followInfos,
  callInfos,
  status,
}) => {
  return (
    <div data-sign="basicCallInfo" className={styles.container}>
      <RcExpansionPanel
        square
        classes={{
          root: styles.root,
        }}
      >
        <RcExpansionPanelSummary
          classes={{
            root: styles.root,
          }}
          IconButtonProps={{
            size: 'small',
          }}
          expandIcon={
            <RcIcon size="medium" symbol={arrowDownSvg} color={['grey', 500]} />
          }
        >
          <CallIcon isInbound={isInbound} />
          <div className={styles.mainInfo}>
            <CallSubject subject={subject} />
            <FollowInfo infoList={followInfos} splitSign="|" />
          </div>
        </RcExpansionPanelSummary>
        <RcExpansionPanelDetails
          classes={{
            root: styles.detailRoot,
          }}
        >
          <CallInfoList callInfos={callInfos} />
        </RcExpansionPanelDetails>
      </RcExpansionPanel>
      <ShinyBar
        isRinging={isRinging}
        className={styles.bottom}
        status={status}
      />
    </div>
  );
};

export default BasicCallInfo;
