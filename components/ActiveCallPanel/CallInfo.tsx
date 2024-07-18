import React from 'react';

import CallAvatar from '../CallAvatar';
import ContactDisplay from '../ContactDisplay';

import styles from './styles.scss';

type CallInfoProps = {
  phoneNumber?: string;
  formatPhone: (...args: any[]) => any;
  nameMatches: any[];
  fallBackName: string;
  areaCode: string;
  countryCode: string;
  currentLocale: string;
  selectedMatcherIndex: number;
  onSelectMatcherName: (...args: any[]) => any;
  avatarUrl?: string;
  brand?: string;
  showContactDisplayPlaceholder?: boolean;
  sourceIcons?: object;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  callQueueName?: string;
  callerIdName?: string;
};
const CallInfo: React.FC<CallInfoProps> = (props) => {
  let avatar;
  if (props.avatarUrl) {
    avatar = <CallAvatar avatarUrl={props.avatarUrl} />;
  } else {
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
    avatar = <CallAvatar avatarUrl={null} />;
  }
  return (
    <div className={styles.userInfo}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatar} data-sign="avatar">
          {avatar}
        </div>
      </div>
      <div className={styles.userName}>
        {props.callQueueName}
        <ContactDisplay
          formatPhone={props.formatPhone}
          className={styles.contactDisplay}
          callerIdName={props.callerIdName}
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
          // @ts-expect-error TS(2322): Type 'object | undefined' is not assignable to typ... Remove this comment to see the full error message
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
};
CallInfo.defaultProps = {
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  callerIdName: undefined,
};
export default CallInfo;
