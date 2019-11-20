import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

import ContactEntry from './ContactEntry';

const ContactDropdownListV2 = forwardRef(function ContactDropDownListV2(
  {
    currentLocale,
    className,
    contacts,
    selectedIndex,
    formatContactPhone,
    setSelectedIndex,
    addToRecipients,
    enableTitle,
    visibility,
    phoneTypeRenderer,
    phoneSourceNameRenderer,
    contactInfoRenderer,
    contactPhoneRenderer,
  },
  ref,
) {
  const listEl = useRef(null);
  useImperativeHandle(ref, () => ({
    scrollUp() {
      if (listEl.current) {
        listEl.current.scrollTop = Math.floor(
          Math.max(listEl.current.scrollTop - 53, 0),
        );
      }
    },
    scrollDown() {
      if (listEl.current) {
        listEl.current.scrollTop = Math.floor(
          Math.min(listEl.current.scrollTop + 53, listEl.current.scrollHeight),
        );
      }
    },
    setScrollPosition(scrollTop) {
      if (listEl.current) {
        listEl.current.scrollTop = Math.floor(scrollTop);
      }
    },
  }));
  if (!visibility || contacts.length === 0) {
    return null;
  }
  return (
    <ul className={classnames(styles.dropdownList, className)} ref={listEl}>
      {contacts.map((item, index) => (
        <ContactEntry
          currentLocale={currentLocale}
          active={selectedIndex === index}
          name={item.name}
          entityType={item.entityType}
          phoneType={item.phoneType}
          phoneNumber={item.phoneNumber}
          phoneTypeRenderer={phoneTypeRenderer}
          phoneSourceNameRenderer={phoneSourceNameRenderer}
          formatContactPhone={formatContactPhone}
          onHover={() => setSelectedIndex(index)}
          onClick={() => addToRecipients(item)}
          key={`${index}${item.phoneNumber}${item.name}${item.phoneType}`}
          enableTitle={enableTitle}
          contactInfoRenderer={contactInfoRenderer}
          contactPhoneRenderer={contactPhoneRenderer}
          splitter="|"
        />
      ))}
    </ul>
  );
});

ContactDropdownListV2.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired,
  className: PropTypes.string,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      entityType: PropTypes.string.isRequired,
      phoneType: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
    }),
  ).isRequired,
  formatContactPhone: PropTypes.func.isRequired,
  addToRecipients: PropTypes.func.isRequired,
  setSelectedIndex: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  enableTitle: PropTypes.bool,
  phoneTypeRenderer: PropTypes.func,
  phoneSourceNameRenderer: PropTypes.func,
  contactInfoRenderer: PropTypes.func,
  contactPhoneRenderer: PropTypes.func,
};

ContactDropdownListV2.defaultProps = {
  className: null,
  enableTitle: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  contactInfoRenderer: undefined,
  contactPhoneRenderer: undefined,
};

export default ContactDropdownListV2;
