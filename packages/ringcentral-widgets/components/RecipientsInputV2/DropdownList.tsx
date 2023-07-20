import React, { forwardRef, useImperativeHandle, useRef } from 'react';

import classnames from 'classnames';

import { RecipientOption } from './RecipientOption';
import type {
  DropdownListHandles,
  DropdownListProps,
} from './RecipientsInputV2.interface';
import styles from './styles.scss';

export const DropdownList = forwardRef<DropdownListHandles, DropdownListProps>(
  (
    {
      currentLocale,
      className,
      recipientOptions,
      selectedIndex,
      formatContactPhone,
      setSelectedIndex,
      addToRecipients,
      enableTitle,
      visibility,
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      recipientInfoRenderer,
      recipientPhoneRenderer,
    },
    ref,
  ) => {
    const listEl = useRef(null);
    useImperativeHandle(ref, () => ({
      scrollUp() {
        if (listEl.current) {
          // @ts-expect-error TS(2339): Property 'scrollTop' does not exist on type 'never... Remove this comment to see the full error message
          listEl.current.scrollTop = Math.floor(
            // @ts-expect-error TS(2339): Property 'scrollTop' does not exist on type 'never... Remove this comment to see the full error message
            Math.max(listEl.current.scrollTop - 53, 0),
          );
        }
      },
      scrollDown() {
        if (listEl.current) {
          // @ts-expect-error TS(2339): Property 'scrollTop' does not exist on type 'never... Remove this comment to see the full error message
          listEl.current.scrollTop = Math.floor(
            Math.min(
              // @ts-expect-error TS(2339): Property 'scrollTop' does not exist on type 'never... Remove this comment to see the full error message
              listEl.current.scrollTop + 53,
              // @ts-expect-error TS(2339): Property 'scrollHeight' does not exist on type 'ne... Remove this comment to see the full error message
              listEl.current.scrollHeight,
            ),
          );
        }
      },
      setScrollPosition(scrollTop) {
        if (listEl.current) {
          // @ts-expect-error TS(2339): Property 'scrollTop' does not exist on type 'never... Remove this comment to see the full error message
          listEl.current.scrollTop = Math.floor(scrollTop);
        }
      },
    }));
    if (!visibility || recipientOptions.length === 0) {
      return null;
    }
    return (
      <ul
        className={classnames(styles.dropdownList, className)}
        ref={listEl}
        data-sign="dropdownList"
      >
        {recipientOptions.map((item, index) => (
          <RecipientOption
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
            recipientInfoRenderer={recipientInfoRenderer}
            recipientPhoneRenderer={recipientPhoneRenderer}
            splitter="|"
          />
        ))}
      </ul>
    );
  },
);

DropdownList.displayName = 'DropdownList';
