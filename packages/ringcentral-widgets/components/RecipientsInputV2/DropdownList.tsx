import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

import { RecipientOption } from './RecipientOption';
import {
  DropdownListHandles,
  DropdownListProps,
} from './RecipientsInputV2.interface';

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
          listEl.current.scrollTop = Math.floor(
            Math.max(listEl.current.scrollTop - 53, 0),
          );
        }
      },
      scrollDown() {
        if (listEl.current) {
          listEl.current.scrollTop = Math.floor(
            Math.min(
              listEl.current.scrollTop + 53,
              listEl.current.scrollHeight,
            ),
          );
        }
      },
      setScrollPosition(scrollTop) {
        if (listEl.current) {
          listEl.current.scrollTop = Math.floor(scrollTop);
        }
      },
    }));
    if (!visibility || recipientOptions.length === 0) {
      return null;
    }
    return (
      <ul className={classnames(styles.dropdownList, className)} ref={listEl}>
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
