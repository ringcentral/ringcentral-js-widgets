import { RcIcon } from '@ringcentral/juno';
import { InfoBorder } from '@ringcentral/juno-icon';
import type { FunctionComponent } from 'react';
import React from 'react';

import { Button } from '../Button';
import IconLine from '../IconLine';
import { Tooltip } from '../Rcui/Tooltip';

import type { ButtonLineItemProps } from './SettingsPanel.interface';
import styles from './styles.scss';

export const ButtonLineItem: FunctionComponent<ButtonLineItemProps> = ({
  show,
  dataSign,
  children,
  tooltip,
  customTitle,
  btnText,
  subTitle,
  onClick,
}) => {
  if (!show) {
    return null;
  }
  return (
    <IconLine
      iconClassName={styles.buttonIcon}
      dataSign={dataSign}
      icon={
        <Button
          {...(dataSign ? { dataSign: `${dataSign}_button` } : {})}
          onClick={onClick}
        >
          {btnText}
        </Button>
      }
    >
      <span>
        {(subTitle && (
          <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
            {customTitle}
            <span data-sign="subTitle" className={styles.subTitle}>
              {subTitle}
            </span>
          </div>
        )) ||
          customTitle}
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
      {children}
    </IconLine>
  );
};
