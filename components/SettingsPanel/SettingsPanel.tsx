import { RcButton, RcTypography } from '@ringcentral-integration/rcui';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { Tooltip } from 'ringcentral-widgets/components/Rcui/Tooltip';
import { TOOLTIP_LONG_DELAY_TIME } from 'ringcentral-widgets/lib/toolTipDelayTime';

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
  showEditSessionButton,
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
          {i18n.getString('sessionInfo', currentLocale)}
        </div>
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
        {showEditSessionButton && (
          <RcButton
            data-sign="editSession"
            onClick={goToSessionUpdatePage}
            classes={{ root: styles.editSession }}
            size="medium"
            fullWidth
          >
            {i18n.getString('editSession', currentLocale)}
          </RcButton>
        )}
      </div>
      <div className={classNames(styles.version, styles.item)}>
        {i18n.getString('version', currentLocale)}
        <span>{version}</span>
      </div>
      <div className={classNames(styles.logout, styles.item)}>
        <RcButton
          data-sign="logout"
          variant="outlined"
          fullWidth
          onClick={onLogout}
          size="medium"
        >
          {i18n.getString('logout', currentLocale)}
        </RcButton>
      </div>
    </div>
  );
};
