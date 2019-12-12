import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import IconLine from '../../IconLine';
import Switch from '../../Switch';
import i18n from '../i18n';
import { onSwitchLineItemChange } from '../SettingsPanel.interface';
import styles from '../styles.scss';

export interface SwitchLineItemProps extends onSwitchLineItemChange {
  name?: string;
  currentLocale?: string;
  customTitle?: string;
  switchTitle?: string;
  show?: boolean;
  dataSign?: string;
  disabled?: boolean;
  checked?: boolean;
}

export const SwitchLineItem: FunctionComponent<SwitchLineItemProps> = ({
  show,
  name,
  customTitle,
  switchTitle,
  currentLocale,
  dataSign,
  disabled,
  checked,
  onChange,
}) => {
  if (!show) {
    return null;
  }
  return (
    <IconLine
      icon={
        <Switch
          {...(dataSign ? { dataSign } : {})}
          title={switchTitle}
          disable={disabled}
          checked={checked}
          onChange={onChange}
        />
      }
    >
      <span className={classnames(disabled && styles.disableText)}>
        {customTitle || i18n.getString(name, currentLocale)}
      </span>
    </IconLine>
  );
};
