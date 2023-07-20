import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';

import classnames from 'classnames';

import i18n from '../i18n';
import styles from '../styles.scss';

export interface CompanyInfoItemProps {
  label: string;
  value: ReactNode;
}

export const CompanyInfoItem: FunctionComponent<CompanyInfoItemProps> = ({
  label,
  value,
}) => {
  return (
    <div className={styles.item}>
      <div className={styles.label}>
        <span>{label}</span>
      </div>
      <div className={styles.content}>
        <span className={styles.text}>{value}</span>
      </div>
    </div>
  );
};

export interface CompanyInfoProps {
  currentLocale: string;
  company?: string;
  jobTitle?: string;
}

export const CompanyInfo: FunctionComponent<CompanyInfoProps> = ({
  currentLocale,
  company,
  jobTitle,
}) => {
  const content = [];
  if (company) {
    content.push(
      <CompanyInfoItem
        key="company"
        label={i18n.getString('company', currentLocale)}
        value={company}
      />,
    );
  }
  if (jobTitle) {
    content.push(
      <CompanyInfoItem
        key="jobTitle"
        label={i18n.getString('jobTitle', currentLocale)}
        value={jobTitle}
      />,
    );
  }
  if (content.length) {
    return (
      <div className={classnames(styles.section, styles.companyInfo)}>
        {content}
      </div>
    );
  }
  return null;
};
