import React, { FunctionComponent } from 'react';
import classnames from 'classnames';
import { map, reduce, keys } from 'ramda';
import phoneTypes from 'ringcentral-integration/enums/phoneTypes';
import {
  sortByPhoneTypes,
  filterByPhoneTypes,
} from 'ringcentral-integration/lib/phoneTypeHelper';
import { ContactModel } from 'ringcentral-integration/models/Contact.model';
import dynamicsFont from '../../../assets/DynamicsFont/DynamicsFont.scss';
import styles from '../styles.scss';
import i18n from '../i18n';
import {
  onClickToSMS,
  formatNumber,
  onClickToDial,
} from '../ContactDetails.interface';

/**
 * TODO
 * 1. Refactor phone type and phoneTypeOrder into modules
 * 2. RawNumberDisplay
 */

interface PhoneListProps {
  label: string;
}

const PhoneList: FunctionComponent<PhoneListProps> = ({ label, children }) => {
  return (
    <div className={styles.item}>
      <div className={styles.label}>
        <span>{label}</span>
      </div>
      <ul className={styles.content}>{children}</ul>
    </div>
  );
};

interface PhoneListItemProps extends formatNumber, onClickToDial, onClickToSMS {
  currentLocale: string;
  contact: ContactModel;
  disableLinks: boolean;
  internalSmsPermission: boolean;
  isClickToDialEnabled: boolean;
  isCallButtonDisabled: boolean;
  isClickToTextEnabled: boolean;
  outboundSmsPermission: boolean;
  phoneNumber: string;
  rawPhoneNumber: string;
  phoneType: string;
}

const PhoneListItem: FunctionComponent<PhoneListItemProps> = ({
  contact,
  currentLocale,
  disableLinks,
  formatNumber,
  internalSmsPermission,
  isClickToDialEnabled,
  isCallButtonDisabled,
  isClickToTextEnabled,
  onClickToDial,
  onClickToSMS,
  outboundSmsPermission,
  phoneNumber,
  rawPhoneNumber,
  phoneType,
}) => {
  const formattedNumber = rawPhoneNumber || formatNumber(phoneNumber);
  const showCallButton = !(
    !isClickToDialEnabled || phoneType === phoneTypes.fax
  );
  const showTextButton = !(
    !isClickToTextEnabled ||
    phoneType === phoneTypes.fax ||
    (phoneType === phoneTypes.extension && !internalSmsPermission) ||
    (phoneType !== phoneTypes.extension && !outboundSmsPermission)
  );
  return (
    <li>
      <div className={classnames(styles.text, styles.number)}>
        <span data-sign="contactNumber" title={phoneNumber}>
          {formattedNumber}
        </span>
      </div>
      <div className={styles.menu}>
        {showCallButton ? (
          <button
            type="button"
            className={classnames(isCallButtonDisabled && styles.disabled)}
            title={`${i18n.getString('call', currentLocale)} ${phoneNumber}`}
            disabled={isCallButtonDisabled}
            onClick={() => onClickToDial(contact, phoneNumber)}
          >
            <i className={dynamicsFont.call} />
          </button>
        ) : null}
        {showTextButton ? (
          <button
            type="button"
            className={classnames(disableLinks && styles.disabled)}
            title={`${i18n.getString('text', currentLocale)} ${phoneNumber}`}
            disabled={disableLinks}
            onClick={() => onClickToSMS(contact, phoneNumber)}
          >
            <i className={dynamicsFont.composeText} />
          </button>
        ) : null}
      </div>
    </li>
  );
};

export interface PhoneSectionProps
  extends formatNumber,
    onClickToDial,
    onClickToSMS {
  currentLocale: string;
  contact: ContactModel;
  disableLinks: boolean;
  isClickToDialEnabled: boolean;
  isCallButtonDisabled: boolean;
  isClickToTextEnabled: boolean;
  internalSmsPermission: boolean;
  outboundSmsPermission: boolean;
}

export const PhoneSection: FunctionComponent<PhoneSectionProps> = ({
  contact,
  currentLocale,
  disableLinks,
  isClickToDialEnabled,
  isCallButtonDisabled,
  isClickToTextEnabled,
  formatNumber,
  internalSmsPermission,
  onClickToDial,
  onClickToSMS,
  outboundSmsPermission,
}) => {
  if (contact && contact.phoneNumbers && contact.phoneNumbers.length) {
    const sortedPhoneNumbers = sortByPhoneTypes(
      filterByPhoneTypes(contact.phoneNumbers),
    );
    const phoneMap = reduce(
      (acc, item) => {
        if (item.phoneType !== acc.lastType) {
          acc.lastType = item.phoneType;
          acc.map[item.phoneType] = [];
        }
        acc.map[item.phoneType].push(item);
        return acc;
      },
      {
        map: {},
        lastType: null,
      },
      sortedPhoneNumbers,
    ).map;
    return (
      <div className={classnames(styles.section, styles.contacts)}>
        {map(
          (phoneType) => (
            <PhoneList
              key={phoneType}
              label={i18n.getString(phoneType, currentLocale)}
            >
              {map(
                ({ phoneNumber, rawPhoneNumber }) => (
                  <PhoneListItem
                    key={phoneNumber}
                    phoneNumber={phoneNumber}
                    rawPhoneNumber={rawPhoneNumber}
                    phoneType={phoneType}
                    contact={contact}
                    formatNumber={formatNumber}
                    currentLocale={currentLocale}
                    isClickToDialEnabled={isClickToDialEnabled}
                    isCallButtonDisabled={isCallButtonDisabled}
                    isClickToTextEnabled={isClickToTextEnabled}
                    disableLinks={disableLinks}
                    internalSmsPermission={internalSmsPermission}
                    onClickToDial={onClickToDial}
                    onClickToSMS={onClickToSMS}
                    outboundSmsPermission={outboundSmsPermission}
                  />
                ),
                phoneMap[phoneType],
              )}
            </PhoneList>
          ),
          keys(phoneMap),
        )}
      </div>
    );
  }
  return null;
};
