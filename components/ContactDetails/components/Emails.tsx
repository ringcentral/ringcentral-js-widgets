import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';

import classnames from 'classnames';
import { addIndex, map } from 'ramda';

import type { onClickMailTo } from '../ContactDetails.interface';
import i18n from '../i18n';
import styles from '../styles.scss';

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
            // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
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
      <section
        className={classnames(styles.section, styles.email)}
        aria-label="email"
      >
        <div className={styles.label}>
          <span>{i18n.getString('emailLabel', currentLocale)}</span>
        </div>
        <ul className={styles.content}>{emailList}</ul>
      </section>
    );
  }
  return null;
};
