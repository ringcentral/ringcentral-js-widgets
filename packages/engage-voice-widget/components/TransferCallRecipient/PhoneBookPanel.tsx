import React, { FunctionComponent } from 'react';

import { Tooltip } from 'ringcentral-widgets/components/Rcui/Tooltip';
import { TOOLTIP_DEFAULT_DELAY_TIME } from 'ringcentral-widgets/lib/toolTipDelayTime';
import {
  EvTransferCallUIFunctions,
  EvTransferCallUIProps,
} from '../../interfaces';
import { ListItemWithScrollCheck } from '../ListItemWithScrollCheck';
import { SearchSelectField } from '../SearchSelectField';
import i18n from './i18n';
import styles from './styles.scss';

export type PhoneBookPanelProps = Pick<
  EvTransferCallUIProps & EvTransferCallUIFunctions,
  | 'currentLocale'
  | 'goBack'
  | 'transferPhoneBook'
  | 'transferPhoneBookSelectedIndex'
  | 'changeTransferPhoneBookSelected'
  | 'searchPhoneBook'
  | 'transferCountryOptions'
>;

const PhoneBookPanel: FunctionComponent<PhoneBookPanelProps> = ({
  currentLocale,
  goBack,
  transferPhoneBook,
  transferPhoneBookSelectedIndex,
  changeTransferPhoneBookSelected,
  searchPhoneBook,
  transferCountryOptions,
}) => {
  return (
    <SearchSelectField
      open
      onBackClick={goBack}
      title={i18n.getString('phoneBookTransfer', currentLocale)}
      placeholder={i18n.getString('search', currentLocale)}
      options={transferPhoneBook}
      searchOption={searchPhoneBook}
      currentLocale={currentLocale}
      listRenderer={(
        transferPhoneBook: EvTransferCallUIProps['transferPhoneBook'],
        scrollCheck,
      ) => {
        return (
          <>
            {transferPhoneBook.map(({ countryId, destination, name }, i) => {
              const country = transferCountryOptions.find(
                (country) => country.countryId === countryId,
              );
              if (typeof country === 'undefined' || country === null)
                return null;
              const countryName =
                country.countryId !== 'USA'
                  ? country.countryName || country.countryId
                  : '';
              const phoneBookName = `${name} ${countryName}`;
              return (
                <ListItemWithScrollCheck
                  onClick={() => changeTransferPhoneBookSelected(i)}
                  selected={i === transferPhoneBookSelectedIndex}
                  key={i}
                  className={styles.phoneBookItem}
                  scrollCheck={scrollCheck}
                  data-sign="phoneContact"
                >
                  <p className={styles.phoneBookName}>
                    <Tooltip
                      title={phoneBookName}
                      enterDelay={TOOLTIP_DEFAULT_DELAY_TIME}
                    >
                      <span className={styles.content}>{phoneBookName}</span>
                    </Tooltip>
                  </p>
                  <p className={styles.phoneBookDest}>{destination}</p>
                </ListItemWithScrollCheck>
              );
            })}
          </>
        );
      }}
    />
  );
};

export { PhoneBookPanel };
