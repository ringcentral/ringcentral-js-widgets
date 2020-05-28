import { RcIconButton } from '@ringcentral-integration/rcui';
import chevronLeftSvg from '@ringcentral-integration/rcui/icons/icon-chevron_left.svg';
import chevronRight from '@ringcentral-integration/rcui/icons/icon-chevron_right.svg';
import classNames from 'classnames';
import React, {
  FunctionComponent,
  MutableRefObject,
  useEffect,
  useState,
} from 'react';

import { AnimationPanel } from '../AnimationPanel';
import { ShinyBar, ShinyBarProps } from '../LogBasicInfoV2/ShinyBar';
import { BasicCallInfoMain, BasicCallInfoMainProps } from './BasicCallInfoMain';
import { CallInfoProps } from './CallInfo';
import { CallInfoList } from './CallInfoList';
import styles from './styles.scss';

export type BasicCallInfoProps = {
  currentLocale: string;
  isRinging: boolean;
  callInfos?: CallInfoProps[];
  callControlRef?: MutableRefObject<HTMLElement>;
  classes?: { panel?: string };
} & Pick<ShinyBarProps, 'status'> &
  Pick<BasicCallInfoMainProps, 'isInbound' | 'subject' | 'followInfos'>;

export const BasicCallInfo: FunctionComponent<BasicCallInfoProps> = ({
  subject,
  isInbound,
  isRinging,
  followInfos,
  callInfos,
  classes: { panel: panelClass },
  status,
  callControlRef,
}) => {
  const [open, setOpen] = useState(false);
  const [panelHeight, setPanelHeight] = useState('100%');
  const toggleOpen = () => setOpen(!open);

  useEffect(() => {
    if (callControlRef.current) {
      setPanelHeight(`calc(100% - ${callControlRef.current.clientHeight}px)`);
    }
  }, [callControlRef, status]);

  return (
    <>
      <div data-sign="basicCallInfo" className={styles.container}>
        <BasicCallInfoMain
          subject={subject}
          isInbound={isInbound}
          followInfos={followInfos}
        >
          <div className={styles.rightIcon}>
            <RcIconButton
              variant="round"
              size="small"
              color="grey.700"
              symbol={chevronRight}
              data-sign="detailButton"
              onClick={toggleOpen}
            />
          </div>
        </BasicCallInfoMain>
        <ShinyBar
          isRinging={isRinging}
          className={styles.bottom}
          status={status}
        />
      </div>

      <AnimationPanel
        open={open}
        className={classNames(styles.panelContainer, panelClass)}
        style={{
          height: panelHeight,
        }}
      >
        <div className={styles.panel}>
          <header>
            <RcIconButton
              variant="round"
              size="small"
              color="grey.700"
              symbol={chevronLeftSvg}
              data-sign="backButton"
              onClick={toggleOpen}
            />
          </header>
          <main>
            <BasicCallInfoMain
              subject={subject}
              isInbound={isInbound}
              followInfos={followInfos}
            />
            <CallInfoList callInfos={callInfos} className={styles.infoList} />
          </main>
        </div>
      </AnimationPanel>
    </>
  );
};
BasicCallInfo.defaultProps = {
  classes: {},
};
