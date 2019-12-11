import React, { FunctionComponent } from 'react';
import SpinnerOverlay from '../SpinnerOverlay';
import BackHeader from '../BackHeader';
import Panel from '../Panel';

import { ContactDetails } from '../ContactDetails';
import styles from './styles.scss';
import i18n from './i18n';
import {
  ContactDetailsViewFunctionProps,
  ContactDetailsViewProps,
} from './ContactDetailsView.interface';

export const ContactDetailsView: FunctionComponent<
  ContactDetailsViewFunctionProps & ContactDetailsViewProps
> = ({
  //
  children,
  contact,
  currentLocale,
  isClickToDialEnabled,
  isCallButtonDisabled,
  isClickToTextEnabled,
  disableLinks,
  formatNumber,
  internalSmsPermission,
  onBackClick,
  onClickMailTo,
  onClickToDial,
  onClickToSMS,
  outboundSmsPermission,
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
      onClickToSMS={onClickToSMS}
      onClickToDial={onClickToDial}
      isClickToDialEnabled={isClickToDialEnabled}
      isCallButtonDisabled={isCallButtonDisabled}
      isClickToTextEnabled={isClickToTextEnabled}
      disableLinks={disableLinks}
      onClickMailTo={onClickMailTo}
      formatNumber={formatNumber}
      sourceNodeRenderer={sourceNodeRenderer}
      outboundSmsPermission={outboundSmsPermission}
      internalSmsPermission={internalSmsPermission}
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
