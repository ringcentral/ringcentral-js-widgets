/* eslint-disable react/no-multi-comp */
import type { KeyboardEvent } from 'react';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import classnames from 'classnames';

import i18n from '../RecipientsInput/i18n';
import { DropdownList } from './DropdownList';
import { PhoneNumberInput } from './PhoneNumberInput';
import type {
  RecipientsInputV2Handles,
  RecipientsInputV2Props,
} from './RecipientsInputV2.interface';
import { SelectedRecipients } from './SelectedRecipients';
import styles from './styles.scss';

/**
 * Specs:
 * 1. When dialer buttons are pressed, the cursor should be moved to the end of the string,
 *    and the focus set to the input field. RCINT-7706
 * 2. Simplify recipient/recipients property
 */

function isSplitterKey(e: KeyboardEvent): boolean {
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
export const RecipientsInputV2 = forwardRef<
  RecipientsInputV2Handles,
  RecipientsInputV2Props
>(
  (
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
  ) => {
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
          // @ts-expect-error TS(2339): Property 'focus' does not exist on type 'never'.
          inputEl.current.focus();
        }
      },
      blur() {
        setIsInputFocused(false);
        if (inputEl.current) {
          // @ts-expect-error TS(2339): Property 'blur' does not exist on type 'never'.
          inputEl.current.blur();
        }
      },
    }));
    useEffect(() => {
      const handler = ({ target }: MouseEvent) => {
        // @ts-expect-error TS(2339): Property 'contains' does not exist on type 'never'... Remove this comment to see the full error message
        if (thisEl.current && !thisEl.current.contains(target)) {
          if (inputEl.current) {
            // @ts-expect-error TS(2339): Property 'blur' does not exist on type 'never'.
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
      if (
        value !== stateValue &&
        Date.now() - lastInputTimestamp.current > 300
      ) {
        setStateValue(value);
      }
    }, [value, stateValue]);

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
              // @ts-expect-error TS(2339): Property 'setScrollPosition' does not exist on typ... Remove this comment to see the full error message
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
                  // @ts-expect-error TS(2531): Object is possibly 'null'.
                  listEl.current.scrollUp();
                }
              }
            } else if (e.key === 'ArrowDown') {
              if (selectedIndex < searchContactList.length - 1) {
                setSelectedIndex((prevIndex) => prevIndex + 1);
                if (selectedIndex + 1 > 4) {
                  // @ts-expect-error TS(2531): Object is possibly 'null'.
                  listEl.current.scrollDown();
                }
              }
            }
          }

          if (isSplitterKey(e)) {
            e.preventDefault();
            const trimmedValue = stateValue.trim();
            const selectedContact = searchContactList[selectedIndex];
            if (trimmedValue.length === 0 && !selectedContact) {
              return;
            }
            if (selectedContact && e.key === 'Enter') {
              addToRecipients({
                ...selectedContact,
              });
            } else {
              addToRecipients({
                name: trimmedValue.replace(',', ''),
                phoneNumber: trimmedValue.replace(',', ''),
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
        <DropdownList
          currentLocale={currentLocale}
          ref={listEl}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          addToRecipients={(contact) => {
            setStateValue('');
            onInputChange('');
            addToRecipients(contact);
          }}
          recipientOptions={searchContactList}
          formatContactPhone={formatContactPhone}
          visibility={isInputFocused && !isLastInputFromDialpad}
          enableTitle={enableTitle}
          phoneTypeRenderer={phoneTypeRenderer}
          phoneSourceNameRenderer={phoneSourceNameRenderer}
          recipientInfoRenderer={contactInfoRenderer}
          recipientPhoneRenderer={contactPhoneRenderer}
        />
      </div>
    );
  },
);

RecipientsInputV2.defaultProps = {
  enableTitle: false,
  multiple: false,
  useRCUI: false,
  isLastInputFromDialpad: false,
};
