import React, { FunctionComponent } from 'react';

import { ContactModel } from '@ringcentral-integration/commons/interfaces/Contact.model';

import { CompanyInfo } from './components/CompanyInfo';
import { Emails } from './components/Emails';
import { PhoneSection } from './components/PhoneSection';
import { Profile } from './components/Profile';
import {
  clickToDial,
  clickToSMS,
  formatNumber,
  onClickMailTo,
  sourceNodeRenderer,
} from './ContactDetails.interface';
import styles from './styles.scss';

interface ContactDetailsProps
  extends onClickMailTo,
    clickToSMS,
    clickToDial,
    formatNumber,
    sourceNodeRenderer {
  currentLocale: string;
  contact: ContactModel;
  disableLinks: boolean;
  isMultipleSiteEnabled: boolean;
  isCallButtonDisabled: boolean;
}

export const ContactDetails: FunctionComponent<ContactDetailsProps> = ({
  contact,
  currentLocale,
  onClickMailTo,
  disableLinks,
  isMultipleSiteEnabled,
  isCallButtonDisabled,
  canCallButtonShow,
  canTextButtonShow,
  formatNumber,
  onClickToDial,
  onClickToSMS,
  sourceNodeRenderer,
}) => {
  return (
    <div className={styles.root} role="main">
      <Profile
        contact={contact}
        sourceNodeRenderer={sourceNodeRenderer}
        currentLocale={currentLocale}
        isMultipleSiteEnabled={isMultipleSiteEnabled}
      />
      <CompanyInfo
        company={contact.company}
        currentLocale={currentLocale}
        jobTitle={contact.jobTitle}
      />
      <PhoneSection
        contact={contact}
        currentLocale={currentLocale}
        disableLinks={disableLinks}
        canCallButtonShow={canCallButtonShow}
        canTextButtonShow={canTextButtonShow}
        isCallButtonDisabled={isCallButtonDisabled}
        isMultipleSiteEnabled={isMultipleSiteEnabled}
        formatNumber={formatNumber}
        onClickToDial={onClickToDial}
        onClickToSMS={onClickToSMS}
      />
      <Emails
        contactType={contact.type}
        currentLocale={currentLocale}
        emails={contact.emails}
        onClickMailTo={onClickMailTo}
      />
    </div>
  );
};
