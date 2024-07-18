import { RcIcon } from '@ringcentral/juno';
import { InfoBorder } from '@ringcentral/juno-icon';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React from 'react';

import IconLine from '../IconLine';
import { Tooltip } from '../Rcui/Tooltip';
import Switch from '../Switch';

import type { SwitchLineItemProps } from './SettingsPanel.interface';
import i18n from './i18n';
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
  tooltip,
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
      <span className={clsx(disabled && styles.disableText)}>
        {/* @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message */}
        {customTitle || i18n.getString(name, currentLocale)}
        {tooltip ? (
          <>
            &nbsp;
            <Tooltip title={tooltip}>
              <span data-sign={`${dataSign}_tooltip`}>
                <RcIcon
                  size="small"
                  symbol={InfoBorder}
                  className={styles.tooltipIcon}
                />
              </span>
            </Tooltip>
          </>
        ) : null}
      </span>
    </IconLine>
  );
};
