import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import IncomingCallPad from '../IncomingCallPad';
import ContactDisplay from '../ContactDisplay';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

function UserInfo(props) {
  let avatar;
  if (props.avatarUrl) {
    avatar = (<img src={props.avatarUrl} alt="avatar" />);
  } else {
    avatar = (<i className={classnames(dynamicsFont.portrait, styles.icon)} />);
  }
  return (
    <div className={styles.userInfo}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarHolder}>
          <div className={classnames(styles.ringOutside, styles.ringing)} />
          <div className={classnames(styles.ringInner, styles.ringing)} />
          <div className={styles.avatar}>
            {avatar}
          </div>
        </div>
      </div>
      <div className={styles.userNameContainer}>
        <ContactDisplay
          className={styles.userName}
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
      </div>
      <div className={styles.userPhoneNumber}>
        {props.formatPhone(props.phoneNumber)}
      </div>
    </div>
  );
}

UserInfo.propTypes = {
  phoneNumber: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  formatPhone: PropTypes.func.isRequired,
  nameMatches: PropTypes.array.isRequired,
  fallBackName: PropTypes.string.isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  selectedMatcherIndex: PropTypes.number.isRequired,
  onSelectMatcherName: PropTypes.func.isRequired,
  avatarUrl: PropTypes.string,
  brand: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
};

UserInfo.defaultProps = {
  className: null,
  phoneNumber: null,
  avatarUrl: null,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
};

export default function IncomingCallPanel(props) {
  return (
    <div className={classnames(styles.root, props.className)}>
      <span className={styles.backButton} onClick={props.onBackButtonClick}>
        <i className={classnames(dynamicsFont.arrow, styles.backIcon)} />
      </span>
      <UserInfo
        phoneNumber={props.phoneNumber}
        currentLocale={props.currentLocale}
        className={styles.userInfo}
        formatPhone={props.formatPhone}
        nameMatches={props.nameMatches}
        fallBackName={props.fallBackName}
        areaCode={props.areaCode}
        countryCode={props.countryCode}
        selectedMatcherIndex={props.selectedMatcherIndex}
        onSelectMatcherName={props.onSelectMatcherName}
        avatarUrl={props.avatarUrl}
        brand={props.brand}
        showContactDisplayPlaceholder={props.showContactDisplayPlaceholder}
      />
      <IncomingCallPad
        className={styles.callPad}
        forwardingNumbers={props.forwardingNumbers}
        formatPhone={props.formatPhone}
        answer={props.answer}
        reject={props.reject}
        toVoiceMail={props.toVoiceMail}
        replyWithMessage={props.replyWithMessage}
        onForward={props.onForward}
        currentLocale={props.currentLocale}
        isMultiCall={props.isMultiCall}
        answerAndEnd={props.answerAndEnd}
        answerAndHold={props.answerAndHold}
      />
      {props.children}
    </div>
  );
}

IncomingCallPanel.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string,
  className: PropTypes.string,
  answer: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
  toVoiceMail: PropTypes.func.isRequired,
  replyWithMessage: PropTypes.func.isRequired,
  children: PropTypes.node,
  formatPhone: PropTypes.func.isRequired,
  nameMatches: PropTypes.array.isRequired,
  fallBackName: PropTypes.string.isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  selectedMatcherIndex: PropTypes.number.isRequired,
  onSelectMatcherName: PropTypes.func.isRequired,
  avatarUrl: PropTypes.string,
  onBackButtonClick: PropTypes.func.isRequired,
  forwardingNumbers: PropTypes.array.isRequired,
  onForward: PropTypes.func.isRequired,
  brand: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
};

IncomingCallPanel.defaultProps = {
  className: null,
  phoneNumber: null,
  children: undefined,
  avatarUrl: null,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
};
