import type { FunctionComponent } from 'react';
import React, { useEffect } from 'react';

import {
  PageHeader,
  PageHeaderBack,
  PageHeaderRemain,
  PageHeaderTitle,
} from '../BackHeader/PageHeader';
import { ContactDetails } from '../ContactDetails';
import Panel from '../Panel';

import type {
  ContactDetailsViewFunctionProps,
  ContactDetailsViewProps,
} from './ContactDetailsView.interface';
import i18n from './i18n';
import styles from './styles.scss';

interface MessageHolderProps {
  children: string;
}
const MessageHolder: FunctionComponent<MessageHolderProps> = ({ children }) => {
  return <div className={styles.placeholder}>{children}</div>;
};

export const ContactDetailsView: FunctionComponent<
  ContactDetailsViewFunctionProps & ContactDetailsViewProps
> = ({
  children,
  contact,
  currentLocale,
  isMultipleSiteEnabled,
  isCallButtonDisabled,
  disableLinks,
  showSpinner,
  formatNumber,
  canCallButtonShow,
  canTextButtonShow,
  onBackClick,
  onVisitPage,
  onLeavingPage,
  onClickMailTo,
  onClickToDial,
  onClickToSMS,
  sourceNodeRenderer,
  getPresence,
}) => {
  useEffect(() => {
    onVisitPage?.();

    return onLeavingPage;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let content = null;
  if (showSpinner) {
    content = (
      <MessageHolder>
        {i18n.getString('loadingContact', currentLocale)}
      </MessageHolder>
    );
  } else if (!contact) {
    content = (
      <MessageHolder>
        {i18n.getString('contactNotFound', currentLocale)}
      </MessageHolder>
    );
  } else {
    content = (
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
        getPresence={getPresence}
      />
    );
  }

  return (
    <div className={styles.root}>
      <PageHeader>
        <PageHeaderBack onClick={onBackClick} className={styles.header} />
        <PageHeaderTitle>
          {i18n.getString('contactDetails', currentLocale)}
        </PageHeaderTitle>
        <PageHeaderRemain />
      </PageHeader>
      <Panel className={styles.content}>
        {content}
        {children}
      </Panel>
    </div>
  );
};
