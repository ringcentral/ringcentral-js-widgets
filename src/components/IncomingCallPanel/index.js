import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import IncomingCallPad from '../IncomingCallPad';
import ContactDisplay from '../ContactDisplay';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

function UserInfo(props) {
  return (
    <div className={styles.userInfo}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarHolder}>
          <div className={classnames(styles.ringOutside, styles.ringing)} />
          <div className={classnames(styles.ringInner, styles.ringing)} />
          <div className={styles.avatar}>
            <i className={classnames(dynamicsFont.portrait, styles.icon)} />
          </div>
        </div>
      </div>
      <ContactDisplay
        className={styles.userName}
        selectClassName={styles.contactNameSelect}
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
      />
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
};

UserInfo.defaultProps = {
  className: null,
  phoneNumber: null,
};

export default function IncomingCallPanel(props) {
  return (
    <div className={styles.root}>
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
      />
      <IncomingCallPad
        answer={props.answer}
        reject={props.reject}
        toVoiceMail={props.toVoiceMail}
        replyWithMessage={props.replyWithMessage}
        currentLocale={props.currentLocale}
      />
      {props.children}
    </div>
  );
}

IncomingCallPanel.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string,
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
};

IncomingCallPanel.defaultProps = {
  userName: null,
  phoneNumber: null,
  children: undefined,
};
