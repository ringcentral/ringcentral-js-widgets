import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { Tooltip } from 'ringcentral-widgets/components/Rcui/Tooltip';
import { TOOLTIP_LONG_DELAY_TIME } from 'ringcentral-widgets/lib/toolTipDelayTime';

import {
  EvTransferCallUIFunctions,
  EvTransferCallUIProps,
} from '../../../interfaces';
import { formatPhoneNumber } from '../../../lib/FormatPhoneNumber';
import { ListItem, SelectList } from '../../SelectList';
import transferCallI18n from '../i18n';
import transferCallStyles from '../styles.scss';
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
>;

const PhoneBookPanel: FunctionComponent<PhoneBookPanelProps> = ({
  currentLocale,
  goBack,
  transferPhoneBook,
  transferPhoneBookSelectedIndex,
  changeTransferPhoneBookSelected,
  searchPhoneBook,
}) => {
  return (
    <SelectList
      onBackClick={goBack}
      title={i18n.getString('phoneBookTransfer', currentLocale)}
      placeholder={transferCallI18n.getString('search', currentLocale)}
      options={transferPhoneBook}
      searchOption={searchPhoneBook}
      currentLocale={currentLocale}
      renderListItem={({
        option,
        index: i,
      }: {
        option: EvTransferCallUIProps['transferPhoneBook'][number];
        index: number;
      }) => {
        const { destination, phoneBookName } = option;

        return (
          <ListItem
            onClick={() => changeTransferPhoneBookSelected(i)}
            selected={i === transferPhoneBookSelectedIndex}
            key={i}
            className={transferCallStyles.listItem}
            data-sign="phoneContact"
          >
            <div className={styles.full}>
              <p className={styles.phoneBookName}>
                <Tooltip
                  title={phoneBookName}
                  enterDelay={TOOLTIP_LONG_DELAY_TIME}
                >
                  <span className={transferCallStyles.ellipsis}>
                    {phoneBookName}
                  </span>
                </Tooltip>
              </p>
              <p className={classNames(styles.phoneBookDest, styles.ellipsis)}>
                {formatPhoneNumber({
                  phoneNumber: destination,
                  currentLocale,
                })}
              </p>
            </div>
          </ListItem>
        );
      }}
    />
  );
};

export { PhoneBookPanel };
