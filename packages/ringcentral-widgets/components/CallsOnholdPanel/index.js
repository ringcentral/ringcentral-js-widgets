import React from 'react';
import PropTypes from 'prop-types';
import ActiveCallItem from '../ActiveCallItemV2';
import CircleButton from '../CircleButton';
import BackButton from '../BackButton';
import BackHeader from '../BackHeader';
import styles from './styles.scss';
import i18n from './i18n';
import CombineIcon from '../../assets/images/Combine.svg';

export default function CallsOnholdContainer({
  calls,
  currentLocale,
  areaCode,
  countryCode,
  brand,
  showContactDisplayPlaceholder,
  autoLog,
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
}) {
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
              showContactDisplayPlaceholder={showContactDisplayPlaceholder}
              onMergeCall={onMerge}
              webphoneAnswer={webphoneAnswer}
              webphoneReject={webphoneReject}
              webphoneHangup={webphoneHangup}
              webphoneResume={webphoneResume}
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
}

CallsOnholdContainer.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  onMerge: PropTypes.func,
  calls: PropTypes.array.isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  brand: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
  webphoneAnswer: PropTypes.func,
  webphoneReject: PropTypes.func,
  webphoneHangup: PropTypes.func,
  webphoneResume: PropTypes.func,
  webphoneToVoicemail: PropTypes.func,
  enableContactFallback: PropTypes.bool,
  autoLog: PropTypes.bool,
  sourceIcons: PropTypes.object,
  phoneTypeRenderer: PropTypes.func,
  phoneSourceNameRenderer: PropTypes.func,
  onBackButtonClick: PropTypes.func,
  disableMerge: PropTypes.bool,
  onAdd: PropTypes.func,
  getAvatarUrl: PropTypes.func,
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
