/* eslint-disable react/no-multi-comp */
import React, {
  useRef,
  useImperativeHandle,
  useState,
  forwardRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';
import ContactDropdownList from '../ContactDropdownListV2';
import SelectedRecipients from './SelectedRecipients';
import PhoneNumberInput from './PhoneNumberInput';
import i18n from '../RecipientsInput/i18n';

/**
 * Specs:
 * 1. When dialer buttons are pressed, the cursor should be moved to the end of the string,
 *    and the focus set to the input field. RCINT-7706
 * 2. Simplify recipient/recipients property
 */

function isSplitterKey(e) {
  if (
    e.key === ',' ||
    e.key === ';' ||
    e.key === 'Enter' ||
    (e.key === 'Unidentified' && // for Safari (FF cannot rely on keyCode...)
      (e.keyCode === 186 || // semicolon
      e.keyCode === 188 || // comma
        e.keyCode === 13)) // enter
  ) {
    return true;
  }
  return false;
}

const RecipientsInputV2 = forwardRef(function RcipientsInputV2(
  {
    className,
    enableTitle,
    recipients,
    multiple,
    useRCUI,
    value,
    removeFromRecipients,
    recipientsClassName,
    placeholder,
    currentLocale,
    onInputChange,
    onInputClear,
    label = `${i18n.getString('to', currentLocale)}:`,
    searchContactList,
    formatContactPhone,
    phoneTypeRenderer,
    phoneSourceNameRenderer,
    contactInfoRenderer,
    contactPhoneRenderer,
    addToRecipients,
    isLastInputFromDialpad,
  },
  ref,
) {
  const thisEl = useRef(null);
  const listEl = useRef(null);
  const inputEl = useRef(null);
  const [stateValue, setStateValue] = useState(value);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const lastInputTimestamp = useRef(0);
  useImperativeHandle(ref, () => ({
    focus() {
      setIsInputFocused(true);
      if (inputEl.current) {
        inputEl.current.focus();
      }
    },
    blur() {
      setIsInputFocused(false);
      if (inputEl.current) {
        inputEl.current.blur();
      }
    },
  }));
  useEffect(() => {
    const handler = ({ target }) => {
      if (thisEl.current && !thisEl.current.contains(target)) {
        if (inputEl.current) {
          inputEl.current.blur();
        }
        setIsInputFocused(false);
      }
    };
    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  }, []); // pass [] so this only runs on mount and unmount

  useEffect(() => {
    if (value !== stateValue && Date.now() - lastInputTimestamp.current > 300) {
      setStateValue(value);
    }
  }, [value]);

  const toNumberInput =
    !multiple && recipients.length ? null : (
      <PhoneNumberInput
        ref={inputEl}
        placeholder={placeholder}
        value={stateValue}
        currentLocale={currentLocale}
        onChange={(newValue) => {
          lastInputTimestamp.current = Date.now();
          setStateValue(newValue);
          setSelectedIndex(0);
          onInputChange(newValue);
          if (listEl.current) {
            listEl.current.setScrollPosition(0);
          }
        }}
        onClear={() => {
          setStateValue('');
          onInputClear();
        }}
        onFocus={() => {
          setIsInputFocused(true);
        }}
      />
    );
  return (
    <div
      className={classnames(
        styles.container,
        useRCUI ? styles.rcuiStyle : null,
        className,
      )}
      ref={thisEl}
      onKeyDown={(e) => {
        if (isInputFocused && stateValue.length >= 3) {
          if (e.key === 'ArrowUp') {
            if (selectedIndex > 0) {
              setSelectedIndex((prevIndex) => prevIndex - 1);
              if (selectedIndex - 1 < searchContactList.length - 4) {
                listEl.current.scrollUp();
              }
            }
          } else if (e.key === 'ArrowDown') {
            if (selectedIndex < searchContactList.length - 1) {
              setSelectedIndex((prevIndex) => prevIndex + 1);
              if (selectedIndex + 1 > 4) {
                listEl.current.scrollDown();
              }
            }
          }
        }

        if (isSplitterKey(e)) {
          e.preventDefault();
          if (stateValue.length === 0) {
            return;
          }
          const selectedContact = searchContactList[selectedIndex];
          if (selectedContact && e.key === 'Enter') {
            addToRecipients({
              ...selectedContact,
            });
          } else {
            addToRecipients({
              name: stateValue.replace(',', ''),
              phoneNumber: stateValue.replace(',', ''),
            });
          }
        }
      }}
    >
      <span className={styles.label}>{label}</span>
      <div
        className={classnames(useRCUI && styles.rcuiStyle, styles.rightPanel)}
      >
        <SelectedRecipients
          recipients={recipients}
          onRemove={removeFromRecipients}
          className={recipientsClassName}
        />
        {toNumberInput}
      </div>
      <ContactDropdownList
        currentLocale={currentLocale}
        ref={listEl}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        addToRecipients={(contact) => {
          setStateValue('');
          onInputChange('');
          addToRecipients(contact);
        }}
        contacts={searchContactList}
        formatContactPhone={formatContactPhone}
        visibility={isInputFocused && !isLastInputFromDialpad}
        enableTitle={enableTitle}
        phoneTypeRenderer={phoneTypeRenderer}
        phoneSourceNameRenderer={phoneSourceNameRenderer}
        contactInfoRenderer={contactInfoRenderer}
        contactPhoneRenderer={contactPhoneRenderer}
      />
    </div>
  );
});

const searchContactListType = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    entityType: PropTypes.string.isRequired,
    phoneType: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }),
);
const recipientsType = PropTypes.arrayOf(
  PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
);

RecipientsInputV2.propTypes = {
  addToRecipients: PropTypes.func.isRequired,
  className: PropTypes.string,
  contactInfoRenderer: PropTypes.func,
  contactPhoneRenderer: PropTypes.func,
  currentLocale: PropTypes.string.isRequired,
  enableTitle: PropTypes.bool,
  formatContactPhone: PropTypes.func.isRequired,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  onInputChange: PropTypes.func.isRequired,
  onInputClear: PropTypes.func.isRequired,
  phoneSourceNameRenderer: PropTypes.func,
  phoneTypeRenderer: PropTypes.func,
  placeholder: PropTypes.string,
  recipients: recipientsType.isRequired,
  recipientsClassName: PropTypes.string,
  removeFromRecipients: PropTypes.func.isRequired,
  searchContactList: searchContactListType.isRequired,
  useRCUI: PropTypes.bool,
  value: PropTypes.string.isRequired,
  isLastInputFromDialpad: PropTypes.bool,
};

RecipientsInputV2.defaultProps = {
  className: undefined,
  contactInfoRenderer: undefined,
  contactPhoneRenderer: undefined,
  enableTitle: false,
  label: undefined,
  multiple: false,
  phoneSourceNameRenderer: undefined,
  phoneTypeRenderer: undefined,
  placeholder: undefined,
  recipientsClassName: undefined,
  useRCUI: false,
  isLastInputFromDialpad: false,
};

export default RecipientsInputV2;
