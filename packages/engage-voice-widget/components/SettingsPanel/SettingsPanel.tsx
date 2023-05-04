import React, { FunctionComponent } from 'react';

import classNames from 'classnames';

import { Tooltip } from '@ringcentral-integration/widgets/components/Rcui/Tooltip';
import { TOOLTIP_LONG_DELAY_TIME } from '@ringcentral-integration/widgets/lib/toolTipDelayTime';
import { RcButton, RcIconButton, RcTypography } from '@ringcentral/juno';
import { Edit } from '@ringcentral/juno-icon';

import {
  EvSettingsUIFunctions,
  EvSettingsUIProps,
} from '../../interfaces/EvSettingsUI.interface';
import i18n from './i18n';
import styles from './styles.scss';

export type SettingsPanelProps = EvSettingsUIProps & EvSettingsUIFunctions;

export const SettingsPanel: FunctionComponent<SettingsPanelProps> = ({
  onLogout,
  currentLocale,
  version,
  agentName,
  userName,
  sessionInfo,
  goToSessionUpdatePage,
  disableEditSessionButton,
  showEditSessionIcon,
}) => {
  return (
    <div className={styles.settingsPanel}>
      <div className={classNames(styles.name, styles.item)}>
        {agentName && (
          <Tooltip title={agentName} enterDelay={TOOLTIP_LONG_DELAY_TIME}>
            <div className={styles.agentName}>{agentName}</div>
          </Tooltip>
        )}
        <Tooltip title={userName} enterDelay={TOOLTIP_LONG_DELAY_TIME}>
          <div className={styles.userName}>{userName}</div>
        </Tooltip>
      </div>
      <div className={classNames(styles.info, styles.item)}>
        <div className={styles.infoTitle}>
          <span>{i18n.getString('sessionInfo', currentLocale)}</span>
          {showEditSessionIcon && (
            <span
              className={classNames({
                [styles.pointerWrap]: disableEditSessionButton,
                [styles.alignRight]: true,
              })}
            >
              <RcIconButton
                data-sign="editSession"
                title={i18n.getString('edit', currentLocale)}
                disabled={disableEditSessionButton}
                onClick={goToSessionUpdatePage}
                size="small"
                symbol={Edit}
              />
            </span>
          )}
        </div>
        <div className={classNames(styles.infoWrap)}>
          {sessionInfo.map(({ value, label }) => (
            <div className={styles.infoItem} key={value}>
              <RcTypography variant="caption1" className={styles.label}>
                {label}
              </RcTypography>
              <RcTypography variant="body1" className={styles.value}>
                {value}
              </RcTypography>
            </div>
          ))}
          <div className={classNames(styles.version, styles.item)}>
            {i18n.getString('version', currentLocale)}
            <span>{version}</span>
          </div>
        </div>
      </div>

      <div className={classNames(styles.logout)}>
        <RcButton
          data-sign="logout"
          variant="outlined"
          fullWidth
          onClick={onLogout}
          size="large"
        >
          {i18n.getString('logout', currentLocale)}
        </RcButton>
      </div>
    </div>
  );
};
