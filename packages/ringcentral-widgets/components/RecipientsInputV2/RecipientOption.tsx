import React, { FunctionComponent } from 'react';

import classnames from 'classnames';

import { RecipientInfo } from './RecipientInfo';
import { RecipientPhone } from './RecipientPhone';
import { RecipientOptionProps } from './RecipientsInputV2.interface';
import styles from './styles.scss';

export const RecipientOption: FunctionComponent<RecipientOptionProps> = ({
  active,
  recipientInfoRenderer: RecipientInfoRenderer = RecipientInfo,
  recipientPhoneRenderer: RecipientPhoneRenderer = RecipientPhone,
  onClick,
  onHover,
  ...baseProps
}) => {
  const className = classnames(styles.contactItem, active && styles.active);
  return (
    <li className={className} onMouseOver={onHover} data-sign="recipientOption">
      <div className={styles.clickable} onClick={onClick}>
        <RecipientInfoRenderer {...baseProps} />
        <RecipientPhoneRenderer {...baseProps} />
      </div>
    </li>
  );
};
