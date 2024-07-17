import React from 'react';

import CombineIcon from '../../assets/images/Combine.svg';
import { ActiveCallItem } from '../ActiveCallItemV2';
import BackButton from '../BackButton';
import BackHeader from '../BackHeader';
import CircleButton from '../CircleButton';

import i18n from './i18n';
import styles from './styles.scss';

type CallsOnholdContainerProps = {
  currentLocale: string;
  onMerge?: (...args: any[]) => any;
  calls: any[];
  areaCode: string;
  countryCode: string;
  brand?: string;
  showContactDisplayPlaceholder?: boolean;
  showCallerIdName?: boolean;
  webphoneAnswer?: (...args: any[]) => any;
  webphoneReject?: (...args: any[]) => any;
  webphoneHangup?: (...args: any[]) => any;
  webphoneResume?: (...args: any[]) => any;
  webphoneToVoicemail?: (...args: any[]) => any;
  enableContactFallback?: boolean;
  autoLog?: boolean;
  sourceIcons?: object;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  onBackButtonClick?: (...args: any[]) => any;
  disableMerge?: boolean;
  onAdd?: (...args: any[]) => any;
  getAvatarUrl?: (...args: any[]) => any;
};
const CallsOnholdContainer: React.FC<CallsOnholdContainerProps> = ({
  calls,
  currentLocale,
  areaCode,
  countryCode,
  brand,
  showContactDisplayPlaceholder,
  autoLog,
  showCallerIdName,
  webphoneAnswer,
  webphoneReject,
  webphoneHangup,
  webphoneResume,
  webphoneToVoicemail,
  enableContactFallback,
  sourceIcons,
  phoneTypeRenderer,
  phoneSourceNameRenderer,
  disableMerge,
  onBackButtonClick,
  onMerge,
  onAdd,
  getAvatarUrl,
}) => {
  const backHeader = (
    <BackHeader
      className={styles.header}
      onBackClick={onBackButtonClick}
      backButton={
        <BackButton label={i18n.getString('activeCall', currentLocale)} />
      }
    />
  );
  return (
    <div className={styles.root}>
      {backHeader}
      <div className={styles.callList}>
        {calls.length ? (
          calls.map((call) => (
            <ActiveCallItem
              call={call}
              key={call.id}
              showMergeCall
              currentLocale={currentLocale}
              areaCode={areaCode}
              countryCode={countryCode}
              brand={brand}
              showCallerIdName={showCallerIdName}
              showContactDisplayPlaceholder={showContactDisplayPlaceholder}
              onMergeCall={onMerge}
              // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
              webphoneAnswer={webphoneAnswer}
              // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
              webphoneReject={webphoneReject}
              // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
              webphoneHangup={webphoneHangup}
              // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
              webphoneResume={webphoneResume}
              // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
              webphoneToVoicemail={webphoneToVoicemail}
              enableContactFallback={enableContactFallback}
              autoLog={autoLog}
              sourceIcons={sourceIcons}
              phoneTypeRenderer={phoneTypeRenderer}
              phoneSourceNameRenderer={phoneSourceNameRenderer}
              disableMerge={disableMerge}
              hasActionMenu={false}
              showAnswer={false}
              getAvatarUrl={getAvatarUrl}
              showHold={false}
            />
          ))
        ) : (
          <div className={styles.noCalls}>
            {i18n.getString('noCalls', currentLocale)}
          </div>
        )}
      </div>
      <div className={styles.addBtnContainer}>
        <div className={styles.addBtn}>
          <span
            title={i18n.getString('add', currentLocale)}
            className={styles.webphoneButton}
          >
            <CircleButton
              className={styles.addBtnIcon}
              icon={CombineIcon}
              showBorder={false}
              onClick={onAdd}
            />
          </span>
        </div>
      </div>
    </div>
  );
};
CallsOnholdContainer.defaultProps = {
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  autoLog: false,
  webphoneToVoicemail: undefined,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  onBackButtonClick: undefined,
  onAdd: undefined,
  onMerge: undefined,
  disableMerge: false,
  getAvatarUrl: (i) => i,
};
export default CallsOnholdContainer;
