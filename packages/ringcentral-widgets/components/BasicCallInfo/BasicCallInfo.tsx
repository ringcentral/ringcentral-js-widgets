import { RcIconButton } from '@ringcentral/juno';
import chevronLeftSvg from '@ringcentral/juno/icon/ChevronLeft';
import chevronRight from '@ringcentral/juno/icon/ChevronRight';
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
  onCopySuccess?: (name: string) => void;
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
  onCopySuccess,
  currentLocale,
}) => {
  const [open, setOpen] = useState(false);
  const [panelHeight, setPanelHeight] = useState('100%');
  const toggleOpen = () => setOpen(!open);

  useEffect(() => {
    if (callControlRef?.current) {
      setPanelHeight(`calc(100% - ${callControlRef.current.clientHeight}px)`);
    }
  }, [callControlRef, status]);

  // when ringing state change, close that info view
  useEffect(() => {
    if (open && !isRinging) {
      toggleOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRinging]);

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
              color="neutral.b04"
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
              /* !!!This token not exist! CONFIRM with Designer which one should use */
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
              className={open && styles.infoMain}
            />
            <CallInfoList
              callInfos={callInfos}
              className={styles.infoList}
              onCopySuccess={onCopySuccess}
              currentLocale={currentLocale}
            />
          </main>
        </div>
      </AnimationPanel>
    </>
  );
};
BasicCallInfo.defaultProps = {
  classes: {},
};
