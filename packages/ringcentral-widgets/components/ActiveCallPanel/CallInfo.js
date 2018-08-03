import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ContactDisplay from '../ContactDisplay';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';
import CallAvatar from '../CallAvatar';

export default function CallInfo(props) {
  let avatar;
  if (props.avatarUrl) {
    avatar = (<CallAvatar avatarUrl={props.avatarUrl} />);
  } else {
    avatar = (<CallAvatar avatarUrl={null} />);
  }
  return (
    <div className={styles.userInfo}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatar}>
          {avatar}
        </div>
      </div>
      <div className={styles.userName}>
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
          disabled={false}
          selected={props.selectedMatcherIndex}
          onSelectContact={props.onSelectMatcherName}
          isLogging={false}
          enableContactFallback
          brand={props.brand}
          showPlaceholder={props.showContactDisplayPlaceholder}
          sourceIcons={props.sourceIcons}
        />
      </div>
      <div className={styles.userPhoneNumber}>
        {props.formatPhone(props.phoneNumber)}
      </div>
    </div>
  );
}

CallInfo.propTypes = {
  phoneNumber: PropTypes.string,
  formatPhone: PropTypes.func.isRequired,
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
  sourceIcons: PropTypes.object,
};

CallInfo.defaultProps = {
  phoneNumber: null,
  avatarUrl: null,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
};
