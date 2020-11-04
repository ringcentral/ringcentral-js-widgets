import React, { FunctionComponent } from 'react';
import { SpinnerOverlay } from '../SpinnerOverlay';
import BackHeader from '../BackHeader';
import Panel from '../Panel';

import { ContactDetails } from '../ContactDetails';
import styles from './styles.scss';
import i18n from './i18n';
import {
  ContactDetailsViewFunctionProps,
  ContactDetailsViewProps,
} from './ContactDetailsView.interface';

export const ContactDetailsView: FunctionComponent<ContactDetailsViewFunctionProps &
  ContactDetailsViewProps> = ({
  //
  children,
  contact,
  currentLocale,
  isMultipleSiteEnabled,
  isCallButtonDisabled,
  disableLinks,
  formatNumber,
  canCallButtonShow,
  canTextButtonShow,
  onBackClick,
  onClickMailTo,
  onClickToDial,
  onClickToSMS,
  showSpinner,
  sourceNodeRenderer,
}) => {
  if (!contact) return null;
  const content = showSpinner ? (
    <SpinnerOverlay />
  ) : (
    <ContactDetails
      currentLocale={currentLocale}
      contact={contact}
      canCallButtonShow={canCallButtonShow}
      canTextButtonShow={canTextButtonShow}
      onClickToSMS={onClickToSMS}
      onClickToDial={onClickToDial}
      isMultipleSiteEnabled={isMultipleSiteEnabled}
      isCallButtonDisabled={isCallButtonDisabled}
      disableLinks={disableLinks}
      onClickMailTo={onClickMailTo}
      formatNumber={formatNumber}
      sourceNodeRenderer={sourceNodeRenderer}
    />
  );
  return (
    <div className={styles.root}>
      <BackHeader onBackClick={onBackClick} className={styles.header}>
        {i18n.getString('contactDetails', currentLocale)}
      </BackHeader>
      <Panel className={styles.content}>
        {content}
        {children}
      </Panel>
    </div>
  );
};
