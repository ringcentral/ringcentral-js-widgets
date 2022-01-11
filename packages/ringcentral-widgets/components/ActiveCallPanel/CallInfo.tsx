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
};
const CallInfo: React.SFC<CallInfoProps> = (props) => {
  let avatar;
  if (props.avatarUrl) {
    avatar = <CallAvatar avatarUrl={props.avatarUrl} />;
  } else {
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
          className={styles.contactDisplay}
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
};
CallInfo.defaultProps = {
  phoneNumber: null,
  avatarUrl: null,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  callQueueName: null,
};
export default CallInfo;
