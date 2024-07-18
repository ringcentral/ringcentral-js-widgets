import { palette2, RcListItem, styled } from '@ringcentral/juno';
import React from 'react';

import { ContactInfo } from './ContactInfo';
import { ContactPhone } from './ContactPhone';
import { DoNotCallIndicator } from './DoNotCallIndicator';
import styles from './styles.scss';

const StyledListItem = styled(RcListItem)`
  color: ${palette2('neutral', 'f04')};
  font-size: 13px;
`;

type ContactItemProps = {
  currentLocale: string;
  onClick: (...args: any[]) => any;
  formatContactPhone: (...args: any[]) => any;
  name: string;
  entityType: string;
  phoneType: string;
  phoneNumber: string;
  active: boolean;
  onHover: (...args: any[]) => any;
  titleEnabled?: boolean;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  contactInfoRenderer?: (...args: any[]) => any;
  contactPhoneRenderer?: (...args: any[]) => any;
  doNotCall?: boolean;
};

export const ContactItem: React.FC<ContactItemProps> = ({
  currentLocale,
  active,
  onHover,
  onClick,
  name,
  entityType,
  phoneType,
  phoneNumber,
  formatContactPhone,
  titleEnabled,
  doNotCall,
  phoneTypeRenderer,
  phoneSourceNameRenderer,
  contactInfoRenderer: ContactInfoRenderer,
  contactPhoneRenderer: ContactPhoneRenderer,
}) => {
  if (!ContactInfoRenderer) {
    ContactInfoRenderer = ContactInfo;
  }
  if (!ContactPhoneRenderer) {
    ContactPhoneRenderer = ContactPhone;
  }
  return (
    <StyledListItem
      className={styles.contactItem}
      onMouseOver={onHover}
      selected={active}
      data-sign="contactItem"
    >
      <div className={styles.clickable} onClick={onClick}>
        <ContactInfoRenderer
          currentLocale={currentLocale}
          name={name}
          entityType={entityType}
          phoneType={phoneType}
          phoneNumber={phoneNumber}
          formatContactPhone={formatContactPhone}
          phoneTypeRenderer={phoneTypeRenderer}
          phoneSourceNameRenderer={phoneSourceNameRenderer}
          titleEnabled={titleEnabled}
          doNotCall={doNotCall}
        />
        <DoNotCallIndicator
          doNotCall={doNotCall}
          currentLocale={currentLocale}
        />
        <ContactPhoneRenderer
          currentLocale={currentLocale}
          name={name}
          entityType={entityType}
          phoneType={phoneType}
          phoneNumber={phoneNumber}
          formatContactPhone={formatContactPhone}
          phoneTypeRenderer={phoneTypeRenderer}
          phoneSourceNameRenderer={phoneSourceNameRenderer}
          titleEnabled={titleEnabled}
        />
      </div>
    </StyledListItem>
  );
};

ContactItem.defaultProps = {
  titleEnabled: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  contactInfoRenderer: undefined,
  contactPhoneRenderer: undefined,
  doNotCall: false,
};
