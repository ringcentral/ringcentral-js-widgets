import React, { FunctionComponent, ReactNode } from 'react';
import classnames from 'classnames';
import { map, addIndex } from 'ramda';
import styles from '../styles.scss';
import i18n from '../i18n';
import { onClickMailTo } from '../ContactDetails.interface';

export interface EmailsProps extends onClickMailTo {
  currentLocale: string;
  emails: string[];
  contactType: string;
}

export const Emails: FunctionComponent<EmailsProps> = ({
  currentLocale,
  onClickMailTo,
  emails,
  contactType,
}) => {
  if (emails && emails.length > 0) {
    const emailList = addIndex<string, ReactNode>(map)(
      (email, idx) => (
        <li key={idx}>
          <a
            title={email}
            className={onClickMailTo ? styles.underline : null}
            onClick={onClickMailTo && (() => onClickMailTo(email, contactType))}
          >
            {email}
          </a>
        </li>
      ),
      emails,
    );
    return (
      <div className={classnames(styles.section, styles.email)}>
        <div className={styles.label}>
          <span>{i18n.getString('emailLabel', currentLocale)}</span>
        </div>
        <ul className={styles.content}>{emailList}</ul>
      </div>
    );
  }
  return null;
};
