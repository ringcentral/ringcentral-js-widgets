import React, { FunctionComponent } from 'react';
import { ContactModel } from 'ringcentral-integration/models/Contact.model';
import { CompanyInfo } from './components/CompanyInfo';
import { Emails } from './components/Emails';
import { Profile } from './components/Profile';

import styles from './styles.scss';
import { PhoneSection } from './components/PhoneSection';
import {
  onClickMailTo,
  onClickToDial,
  onClickToSMS,
  formatNumber,
  sourceNodeRenderer,
} from './ContactDetails.interface';

interface ContactDetailsProps
  extends onClickMailTo,
    onClickToDial,
    onClickToSMS,
    formatNumber,
    sourceNodeRenderer {
  currentLocale: string;
  contact: ContactModel;
  disableLinks: boolean;
  isMultipleSiteEnabled: boolean;
  isCallButtonDisabled: boolean;
  isClickToDialEnabled: boolean;
  isClickToTextEnabled: boolean;
  internalSmsPermission: boolean;
  outboundSmsPermission: boolean;
}

export const ContactDetails: FunctionComponent<ContactDetailsProps> = ({
  contact,
  currentLocale,
  onClickMailTo,
  disableLinks,
  isMultipleSiteEnabled,
  isCallButtonDisabled,
  isClickToDialEnabled,
  isClickToTextEnabled,
  formatNumber,
  internalSmsPermission,
  onClickToDial,
  onClickToSMS,
  outboundSmsPermission,
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
        isClickToDialEnabled={isClickToDialEnabled}
        isCallButtonDisabled={isCallButtonDisabled}
        isClickToTextEnabled={isClickToTextEnabled}
        isMultipleSiteEnabled={isMultipleSiteEnabled}
        formatNumber={formatNumber}
        internalSmsPermission={internalSmsPermission}
        onClickToDial={onClickToDial}
        onClickToSMS={onClickToSMS}
        outboundSmsPermission={outboundSmsPermission}
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
