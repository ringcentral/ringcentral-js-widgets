import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import BackHeader from '../BackHeader';
import Panel from '../Panel';
import DurationCounter from '../DurationCounter';
import ActiveCallPad from '../ActiveCallPad';
import ContactDisplay from '../ContactDisplay';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

function CallInfo(props) {
  const timeCounter = props.startTime ?
    (
      <span className={styles.timeCounter}>
        <span className={styles.splitLine}>|</span>
        <DurationCounter startTime={props.startTime} />
      </span>
    ) : null;
  let avatar;
  if (props.avatarUrl) {
    avatar = (<img src={props.avatarUrl} alt="avatar" />);
  } else {
    avatar = (<i className={classnames(dynamicsFont.portrait, styles.icon)} />);
  }
  return (
    <div className={styles.userInfo}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatar}>
          {avatar}
        </div>
      </div>
      <div className={styles.infoContent}>
        <div className={styles.userName}>
          <ContactDisplay
            className={styles.contactDisplay}
            contactMatches={props.nameMatches}
            phoneNumber={props.phoneNumber}
            fallBackName={props.fallBackName}
            currentLocale={props.currentLocale}
            areaCode={props.areaCode}
            countryCode={props.countryCode}
            showType={false}
            disabled={false}
            selected={props.selectedMatcherIndex}
            onSelectContact={props.onSelectMatcherName}
            isLogging={false}
            enableContactFallback
            brand={props.brand}
            showPlaceholder={props.showContactDisplayPlaceholder}
          />
          {timeCounter}
        </div>
        <div className={styles.userPhoneNumber}>
          {props.formatPhone(props.phoneNumber)}
        </div>
      </div>
    </div>
  );
}

CallInfo.propTypes = {
  phoneNumber: PropTypes.string,
  formatPhone: PropTypes.func.isRequired,
  startTime: PropTypes.number,
  nameMatches: PropTypes.array.isRequired,
  fallBackName: PropTypes.string.isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  selectedMatcherIndex: PropTypes.number.isRequired,
  onSelectMatcherName: PropTypes.func.isRequired,
  avatarUrl: PropTypes.string,
  brand: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
};

CallInfo.defaultProps = {
  phoneNumber: null,
  startTime: null,
  avatarUrl: null,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
};

function ActiveCallPanel({
  onBackButtonClick,
  backButtonLabel,
  currentLocale,
  nameMatches,
  fallBackName,
  phoneNumber,
  formatPhone,
  startTime,
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
  hangup,
  onAdd,
  onShowFlipPanel,
  children,
  showContactDisplayPlaceholder,
  brand,
  flipNumbers
}) {
  return (
    <div className={styles.root}>
      <BackHeader
        onBackClick={onBackButtonClick}
        backButton={(
          <span className={styles.backButton}>
            <i className={classnames(dynamicsFont.arrow, styles.backIcon)} />
            <span className={styles.backLabel}>{backButtonLabel}</span>
          </span>
        )}
        buttons={[]}
      />
      <Panel>
        <CallInfo
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
        />
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
          hangup={hangup}
          onAdd={onAdd}
          onShowFlipPanel={onShowFlipPanel}
          flipNumbers={flipNumbers}
        />
        {children}
      </Panel>
    </div>
  );
}

ActiveCallPanel.propTypes = {
  phoneNumber: PropTypes.string,
  nameMatches: PropTypes.array.isRequired,
  fallBackName: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  startTime: PropTypes.number,
  isOnMute: PropTypes.bool,
  isOnHold: PropTypes.bool,
  recordStatus: PropTypes.string.isRequired,
  onMute: PropTypes.func.isRequired,
  onUnmute: PropTypes.func.isRequired,
  onHold: PropTypes.func.isRequired,
  onUnhold: PropTypes.func.isRequired,
  onRecord: PropTypes.func.isRequired,
  onStopRecord: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  hangup: PropTypes.func.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
  onShowKeyPad: PropTypes.func.isRequired,
  formatPhone: PropTypes.func.isRequired,
  children: PropTypes.node,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  selectedMatcherIndex: PropTypes.number.isRequired,
  onSelectMatcherName: PropTypes.func.isRequired,
  avatarUrl: PropTypes.string,
  backButtonLabel: PropTypes.string,
  brand: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
  onShowFlipPanel: PropTypes.func,
  flipNumbers: PropTypes.array,
};

ActiveCallPanel.defaultProps = {
  startTime: null,
  isOnMute: false,
  isOnHold: false,
  phoneNumber: null,
  children: undefined,
  avatarUrl: null,
  backButtonLabel: 'Active Calls',
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  flipNumbers: [],
  onShowFlipPanel: () => null,
};

export default ActiveCallPanel;
