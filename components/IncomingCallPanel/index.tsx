import type { FunctionComponent } from 'react';
import React, { memo } from 'react';

import classnames from 'classnames';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import { CallAvatar } from '../CallAvatar';
import ContactDisplay from '../ContactDisplay';
import IncomingCallPad from '../IncomingCallPad';
import styles from './styles.scss';

// TODO: fix that props type when full refactor ready
const UserInfo: FunctionComponent<any> = ({
  avatarUrl,
  callQueueName,
  nameMatches,
  phoneNumber,
  fallBackName,
  currentLocale,
  areaCode,
  name,
  countryCode,
  selectedMatcherIndex,
  onSelectMatcherName,
  brand = 'RingCentral',
  showContactDisplayPlaceholder = true,
  sourceIcons,
  phoneTypeRenderer,
  phoneSourceNameRenderer,
  formatPhone,
}) => {
  return (
    <div className={styles.userInfo}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarHolder}>
          <div className={classnames(styles.ringOutside, styles.ringing)} />
          <div className={classnames(styles.ringInner, styles.ringing)} />
          <div className={styles.avatar} data-sign="avatar">
            <CallAvatar avatarUrl={avatarUrl} />
          </div>
        </div>
      </div>
      <div className={styles.userNameContainer}>
        {callQueueName}
        <ContactDisplay
          name={name}
          className={styles.userName}
          selectClassName={styles.dropdown}
          contactMatches={nameMatches}
          phoneNumber={phoneNumber}
          fallBackName={fallBackName}
          currentLocale={currentLocale}
          areaCode={areaCode}
          countryCode={countryCode}
          showType={false}
          selected={selectedMatcherIndex}
          onSelectContact={onSelectMatcherName}
          isLogging={false}
          enableContactFallback
          brand={brand}
          showPlaceholder={showContactDisplayPlaceholder}
          sourceIcons={sourceIcons}
          // @ts-expect-error TS(2322): Type '{ name: any; className: string; selectClassN... Remove this comment to see the full error message
          phoneTypeRenderer={phoneTypeRenderer}
          phoneSourceNameRenderer={phoneSourceNameRenderer}
        />
      </div>
      <div className={styles.userPhoneNumber} data-sign="userPhoneNumber">
        {formatPhone(phoneNumber)}
      </div>
    </div>
  );
};

const IncomingCallPanel: FunctionComponent<any> = ({
  className,
  onBackButtonClick,
  phoneNumber,
  callQueueName,
  currentLocale,
  formatPhone,
  nameMatches,
  fallBackName,
  areaCode,
  countryCode,
  selectedMatcherIndex,
  onSelectMatcherName,
  avatarUrl,
  brand = 'RingCentral',
  showContactDisplayPlaceholder,
  sourceIcons,
  phoneTypeRenderer,
  phoneSourceNameRenderer,
  forwardingNumbers,
  answer,
  reject,
  toVoiceMail,
  replyWithMessage,
  onForward,
  hasOtherActiveCall,
  answerAndEnd,
  answerAndHold,
  sessionId,
  searchContact,
  searchContactList,
  children,
  name,
}) => {
  return (
    <div
      data-sign="IncomingCallPanel"
      className={classnames(styles.root, className)}
    >
      <span
        data-sign="backButton"
        className={styles.backButton}
        onClick={onBackButtonClick}
      >
        <i className={classnames(dynamicsFont.arrow, styles.backIcon)} />
      </span>
      <UserInfo
        name={name}
        phoneNumber={phoneNumber}
        callQueueName={callQueueName}
        currentLocale={currentLocale}
        className={styles.userInfo}
        formatPhone={formatPhone}
        nameMatches={nameMatches}
        fallBackName={fallBackName}
        areaCode={areaCode}
        countryCode={countryCode}
        selectedMatcherIndex={selectedMatcherIndex}
        onSelectMatcherName={onSelectMatcherName}
        avatarUrl={avatarUrl}
        brand={brand}
        showContactDisplayPlaceholder={showContactDisplayPlaceholder}
        sourceIcons={sourceIcons}
        phoneTypeRenderer={phoneTypeRenderer}
        phoneSourceNameRenderer={phoneSourceNameRenderer}
      />
      <IncomingCallPad
        className={styles.callPad}
        forwardingNumbers={forwardingNumbers}
        formatPhone={formatPhone}
        answer={answer}
        reject={reject}
        toVoiceMail={toVoiceMail}
        replyWithMessage={replyWithMessage}
        onForward={onForward}
        currentLocale={currentLocale}
        hasOtherActiveCall={hasOtherActiveCall}
        answerAndEnd={answerAndEnd}
        answerAndHold={answerAndHold}
        sessionId={sessionId}
        searchContact={searchContact}
        searchContactList={searchContactList}
        phoneTypeRenderer={phoneTypeRenderer}
        phoneSourceNameRenderer={phoneSourceNameRenderer}
      />
      {children}
    </div>
  );
};

export default memo(IncomingCallPanel);
