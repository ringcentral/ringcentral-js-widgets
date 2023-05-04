import React, { FunctionComponent } from 'react';

import classnames from 'classnames';

import IconLine from '../IconLine';
import Switch from '../Switch';
import i18n from './i18n';
import { SwitchLineItemProps } from './SettingsPanel.interface';
import styles from './styles.scss';

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
        {/* @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message */}
        {customTitle || i18n.getString(name, currentLocale)}
      </span>
    </IconLine>
  );
};
