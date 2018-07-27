import React from 'react';
import PropTypes from 'prop-types';
import { isArray } from 'ringcentral-integration/lib/di/utils/is_type';
import CallInfo from './CallInfo';
import MergeInfo from './MergeInfo';
import ConferenceInfo from './ConferenceInfo';
import BackButton from '../BackButton';
import BackHeader from '../BackHeader';
import Panel from '../Panel';
import DurationCounter from '../DurationCounter';
import ActiveCallPad from '../ActiveCallPad';
import callCtrlLayouts from '../../enums/callCtrlLayouts';
import styles from './styles.scss';

function ActiveCallPanel({
  showBackButton,
  backButtonLabel,
  onBackButtonClick,
  currentLocale,
  nameMatches,
  fallBackName,
  phoneNumber,
  formatPhone,
  startTime,
  startTimeOffset,
  areaCode,
  countryCode,
  selectedMatcherIndex,
  onSelectMatcherName,
  avatarUrl,
  isOnMute,
  isOnHold,
  recordStatus,
  onMute,
  onUnmute,
  onHold,
  onUnhold,
  onRecord,
  onStopRecord,
  onShowKeyPad,
  onHangup,
  onPark,
  onAdd,
  onMerge,
  onShowFlipPanel,
  onToggleTransferPanel,
  onOpenPartiesModal,
  children,
  showContactDisplayPlaceholder,
  brand,
  flipNumbers,
  sourceIcons,
  layout,
  direction,
  addDisabled,
  mergeDisabled,
  conferenceCallEquipped,
  hasConferenceCall,
  conferenceCallParties,
  lastCallInfo,
  getAvatarUrl,
}) {
  const backHeader = showBackButton ? (
    <BackHeader
      onBackClick={onBackButtonClick}
      backButton={<BackButton label={backButtonLabel} />}
    />
  ) : null;

  const timeCounter = (
    <div className={styles.timeCounter}>
      {
        startTime
          ? <DurationCounter startTime={startTime} offset={startTimeOffset} />
          : <span aria-hidden="true">&nbsp;</span>
      }
    </div>
  );

  const currentCallTitle = (isArray(nameMatches) && nameMatches.length)
    ? nameMatches[0].name
    : formatPhone(phoneNumber);

  let callInfo;

  switch (layout) {
    case callCtrlLayouts.mergeCtrl:
      callInfo = (<MergeInfo
        currentLocale={currentLocale}
        timeCounter={timeCounter}
        lastCallInfo={lastCallInfo}
        currentCallAvatarUrl={avatarUrl}
        currentCallTitle={currentCallTitle || fallBackName}
        formatPhone={formatPhone}
        getAvatarUrl={getAvatarUrl}
      />);
      break;

    case callCtrlLayouts.conferenceCtrl:
      callInfo = (<ConferenceInfo
        currentLocale={currentLocale}
        partyProfiles={conferenceCallParties}
        onClick={onOpenPartiesModal}
      />);
      break;

    default:
      callInfo = (<CallInfo
        currentLocale={currentLocale}
        nameMatches={nameMatches}
        fallBackName={fallBackName}
        phoneNumber={phoneNumber}
        formatPhone={formatPhone}
        startTime={startTime}
        areaCode={areaCode}
        countryCode={countryCode}
        selectedMatcherIndex={selectedMatcherIndex}
        onSelectMatcherName={onSelectMatcherName}
        avatarUrl={avatarUrl}
        brand={brand}
        showContactDisplayPlaceholder={showContactDisplayPlaceholder}
        sourceIcons={sourceIcons}
      />);
      break;
  }

  return (
    <div className={styles.root}>
      {backHeader}
      <Panel className={styles.panel}>
        {layout !== callCtrlLayouts.mergeCtrl ? timeCounter : null}
        {callInfo}
        <ActiveCallPad
          className={styles.callPad}
          currentLocale={currentLocale}
          isOnMute={isOnMute}
          isOnHold={isOnHold}
          recordStatus={recordStatus}
          onMute={onMute}
          onUnmute={onUnmute}
          onHold={onHold}
          onUnhold={onUnhold}
          onRecord={onRecord}
          onStopRecord={onStopRecord}
          onShowKeyPad={onShowKeyPad}
          onHangup={onHangup}
          onAdd={onAdd}
          onMerge={onMerge}
          onShowFlipPanel={onShowFlipPanel}
          onToggleTransferPanel={onToggleTransferPanel}
          flipNumbers={flipNumbers}
          onPark={onPark}
          layout={layout}
          direction={direction}
          addDisabled={addDisabled}
          mergeDisabled={mergeDisabled}
          conferenceCallEquipped={conferenceCallEquipped}
          hasConferenceCall={hasConferenceCall}
        />
        {children}
      </Panel>
    </div>
  );
}

ActiveCallPanel.propTypes = {
  phoneNumber: PropTypes.string,
  nameMatches: PropTypes.arrayOf(PropTypes.object).isRequired,
  fallBackName: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  startTime: PropTypes.number,
  startTimeOffset: PropTypes.number,
  isOnMute: PropTypes.bool,
  isOnHold: PropTypes.bool,
  recordStatus: PropTypes.string.isRequired,
  onMute: PropTypes.func.isRequired,
  onUnmute: PropTypes.func.isRequired,
  onHold: PropTypes.func.isRequired,
  onUnhold: PropTypes.func.isRequired,
  onRecord: PropTypes.func.isRequired,
  onStopRecord: PropTypes.func.isRequired,
  onAdd: PropTypes.func,
  onMerge: PropTypes.func,
  onHangup: PropTypes.func.isRequired,
  onPark: PropTypes.func.isRequired,
  showBackButton: PropTypes.bool,
  backButtonLabel: PropTypes.string,
  onBackButtonClick: PropTypes.func,
  onShowKeyPad: PropTypes.func.isRequired,
  formatPhone: PropTypes.func.isRequired,
  children: PropTypes.node,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  selectedMatcherIndex: PropTypes.number.isRequired,
  onSelectMatcherName: PropTypes.func.isRequired,
  avatarUrl: PropTypes.string,
  brand: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
  onShowFlipPanel: PropTypes.func,
  flipNumbers: PropTypes.array,
  onToggleTransferPanel: PropTypes.func,
  onOpenPartiesModal: PropTypes.func,
  sourceIcons: PropTypes.object,
  layout: PropTypes.string.isRequired,
  direction: PropTypes.string,
  addDisabled: PropTypes.bool,
  mergeDisabled: PropTypes.bool,
  conferenceCallParties: PropTypes.array,
  conferenceCallEquipped: PropTypes.bool,
  hasConferenceCall: PropTypes.bool,
  lastCallInfo: PropTypes.object,
  getAvatarUrl: PropTypes.func,
};

ActiveCallPanel.defaultProps = {
  startTime: null,
  startTimeOffset: 0,
  isOnMute: false,
  isOnHold: false,
  phoneNumber: null,
  children: undefined,
  avatarUrl: null,
  showBackButton: false,
  backButtonLabel: 'Active Calls',
  onBackButtonClick: null,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  flipNumbers: [],
  onAdd: undefined,
  onMerge: undefined,
  onShowFlipPanel: () => null,
  onToggleTransferPanel: () => null,
  onOpenPartiesModal: () => null,
  sourceIcons: undefined,
  direction: null,
  addDisabled: false,
  mergeDisabled: false,
  conferenceCallEquipped: false,
  hasConferenceCall: false,
  conferenceCallParties: undefined,
  lastCallInfo: undefined,
  getAvatarUrl: () => null,
};

export default ActiveCallPanel;
