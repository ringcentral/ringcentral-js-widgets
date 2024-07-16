import type { PhoneType } from '@ringcentral-integration/commons/enums/phoneTypes';
import type { ContactModel } from '@ringcentral-integration/commons/interfaces/Contact.model';
import {
  filterByPhoneTypes,
  sortByPhoneTypes,
} from '@ringcentral-integration/commons/lib/phoneTypeHelper';
import clsx from 'clsx';
import { keys, map, reduce } from 'ramda';
import type { FunctionComponent } from 'react';
import React from 'react';

import dynamicsFont from '../../../assets/DynamicsFont/DynamicsFont.scss';
import type {
  clickToDial,
  clickToSMS,
  formatNumber,
} from '../ContactDetails.interface';
import i18n from '../i18n';
import styles from '../styles.scss';

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

interface PhoneListItemProps extends formatNumber, clickToSMS, clickToDial {
  currentLocale: string;
  contact: ContactModel;
  disableLinks: boolean;
  isCallButtonDisabled: boolean;
  isMultipleSiteEnabled: boolean;
  phoneNumber: string;
  rawPhoneNumber: string;
  phoneType: PhoneType;
}

const PhoneListItem: FunctionComponent<PhoneListItemProps> = ({
  contact,
  currentLocale,
  disableLinks,
  formatNumber,
  isCallButtonDisabled,
  isMultipleSiteEnabled,
  canCallButtonShow,
  canTextButtonShow,
  onClickToDial,
  onClickToSMS,
  phoneNumber,
  rawPhoneNumber,
  phoneType,
}) => {
  const formattedNumber = formatNumber(phoneNumber);
  // User will see, for example: (650) 123-4567
  const displayedPhoneNumber = rawPhoneNumber || formattedNumber;
  // User will use, for example: +16501234567
  // In multi-site feature, "user will see" and "user will use" are the same
  const usedPhoneNumber =
    isMultipleSiteEnabled && phoneType === 'extension'
      ? formattedNumber
      : phoneNumber;

  return (
    <li className={styles.clearBoth}>
      <div className={clsx(styles.text, styles.number)}>
        <span
          data-sign="contactNumber"
          aria-label={phoneType}
          title={usedPhoneNumber}
        >
          {displayedPhoneNumber}
        </span>
      </div>
      <div className={styles.menu}>
        {canCallButtonShow(phoneType) ? (
          <button
            type="button"
            data-sign="call"
            className={clsx(isCallButtonDisabled && styles.disabled)}
            title={`${i18n.getString(
              'call',
              currentLocale,
            )} ${usedPhoneNumber}`}
            disabled={isCallButtonDisabled}
            onClick={() => onClickToDial(contact, usedPhoneNumber)}
          >
            <i className={dynamicsFont.call} />
          </button>
        ) : null}
        {canTextButtonShow(phoneType) ? (
          <button
            type="button"
            className={clsx(disableLinks && styles.disabled)}
            data-sign="text"
            title={`${i18n.getString(
              'text',
              currentLocale,
            )} ${usedPhoneNumber}`}
            disabled={disableLinks}
            onClick={() => onClickToSMS(contact, usedPhoneNumber)}
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
    clickToSMS,
    clickToDial {
  currentLocale: string;
  contact: ContactModel;
  disableLinks: boolean;
  isCallButtonDisabled: boolean;
  isMultipleSiteEnabled: boolean;
}

export const PhoneSection: FunctionComponent<PhoneSectionProps> = ({
  contact,
  currentLocale,
  disableLinks,
  isCallButtonDisabled,
  isMultipleSiteEnabled,
  formatNumber,
  canCallButtonShow,
  canTextButtonShow,
  onClickToDial,
  onClickToSMS,
}) => {
  if (contact && contact.phoneNumbers && contact.phoneNumbers.length) {
    const sortedPhoneNumbers = sortByPhoneTypes(
      filterByPhoneTypes(contact.phoneNumbers),
    );
    const phoneMap = reduce(
      (acc, item) => {
        if (item.phoneType !== acc.lastType) {
          // @ts-expect-error TS(2322): Type '"business" | "extension" | "home" | "mobile"... Remove this comment to see the full error message
          acc.lastType = item.phoneType;
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          acc.map[item.phoneType] = [];
        }
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
      <section
        className={clsx(styles.section, styles.contacts)}
        aria-label="phone"
      >
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
                    canCallButtonShow={canCallButtonShow}
                    canTextButtonShow={canTextButtonShow}
                    formatNumber={formatNumber}
                    currentLocale={currentLocale}
                    isCallButtonDisabled={isCallButtonDisabled}
                    isMultipleSiteEnabled={isMultipleSiteEnabled}
                    disableLinks={disableLinks}
                    onClickToDial={onClickToDial}
                    onClickToSMS={onClickToSMS}
                  />
                ),
                phoneMap[phoneType],
              )}
            </PhoneList>
          ),
          keys(phoneMap),
        )}
      </section>
    );
  }
  return null;
};
