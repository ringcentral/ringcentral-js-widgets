import React from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import CallAvatar from '../CallAvatar';
import ContactDisplay from '../ContactDisplay';
import IncomingCallPad from '../IncomingCallPad';
import styles from './styles.scss';

function UserInfo(props) {
  return (
    <div className={styles.userInfo}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarHolder}>
          <div className={classnames(styles.ringOutside, styles.ringing)} />
          <div className={classnames(styles.ringInner, styles.ringing)} />
          <div className={styles.avatar} data-sign="avatar">
            <CallAvatar avatarUrl={props.avatarUrl} />
          </div>
        </div>
      </div>
      <div className={styles.userNameContainer}>
        {props.callQueueName}
        <ContactDisplay
          className={styles.userName}
          selectClassName={styles.dropdown}
          contactMatches={props.nameMatches}
          phoneNumber={props.phoneNumber}
          fallBackName={props.fallBackName}
          currentLocale={props.currentLocale}
          areaCode={props.areaCode}
          countryCode={props.countryCode}
          showType={false}
          selected={props.selectedMatcherIndex}
          onSelectContact={props.onSelectMatcherName}
          isLogging={false}
          enableContactFallback
          brand={props.brand}
          showPlaceholder={props.showContactDisplayPlaceholder}
          sourceIcons={props.sourceIcons}
          phoneTypeRenderer={props.phoneTypeRenderer}
          phoneSourceNameRenderer={props.phoneSourceNameRenderer}
        />
      </div>
      <div className={styles.userPhoneNumber} data-sign="userPhoneNumber">
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
  sourceIcons: PropTypes.object,
  phoneTypeRenderer: PropTypes.func,
  phoneSourceNameRenderer: PropTypes.func,
  callQueueName: PropTypes.string,
};

UserInfo.defaultProps = {
  phoneNumber: null,
  avatarUrl: null,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  callQueueName: null,
};

function IncomingCallPanel(props) {
  return (
    <div
      data-sign="IncomingCallPanel"
      className={classnames(styles.root, props.className)}
    >
      <span
        data-sign="backButton"
        className={styles.backButton}
        onClick={props.onBackButtonClick}
      >
        <i className={classnames(dynamicsFont.arrow, styles.backIcon)} />
      </span>
      <UserInfo
        phoneNumber={props.phoneNumber}
        callQueueName={props.callQueueName}
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
        sourceIcons={props.sourceIcons}
        phoneTypeRenderer={props.phoneTypeRenderer}
        phoneSourceNameRenderer={props.phoneSourceNameRenderer}
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
        hasOtherActiveCall={props.hasOtherActiveCall}
        answerAndEnd={props.answerAndEnd}
        answerAndHold={props.answerAndHold}
        sessionId={props.sessionId}
        searchContact={props.searchContact}
        searchContactList={props.searchContactList}
        phoneTypeRenderer={props.phoneTypeRenderer}
        phoneSourceNameRenderer={props.phoneSourceNameRenderer}
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
  answerAndEnd: PropTypes.func,
  answerAndHold: PropTypes.func,
  hasOtherActiveCall: PropTypes.bool,
  sessionId: PropTypes.string.isRequired,
  sourceIcons: PropTypes.object,
  searchContactList: PropTypes.array.isRequired,
  searchContact: PropTypes.func.isRequired,
  phoneTypeRenderer: PropTypes.func,
  phoneSourceNameRenderer: PropTypes.func,
  callQueueName: PropTypes.string,
};

IncomingCallPanel.defaultProps = {
  className: null,
  phoneNumber: null,
  children: undefined,
  avatarUrl: null,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  answerAndEnd: undefined,
  answerAndHold: undefined,
  hasOtherActiveCall: false,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  callQueueName: null,
};

export default IncomingCallPanel;
