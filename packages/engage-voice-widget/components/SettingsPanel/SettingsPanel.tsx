import {
  RcCircularProgress,
  RcIcon,
  RcList,
  RcListItem,
  RcSwitch,
} from '@ringcentral-integration/rcui';
import logoutSvg from '@ringcentral-integration/rcui/icons/icon-Logout.svg';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import {
  EvSettingsUIFunctions,
  EvSettingsUIProps,
} from '../../interfaces/EvSettingsUI.interface';
import i18n from './i18n';
import styles from './styles.scss';

const containerClass = classNames(styles.offhookStatusContainer, styles.item);
const versionClass = classNames(styles.version, styles.item);

export type SettingsPanelProps = EvSettingsUIProps & EvSettingsUIFunctions;

export const SettingsPanel: FunctionComponent<SettingsPanelProps> = ({
  onLogout,
  currentLocale,
  isOffHookDisable,
  offhookState,
  version,
  offhook,
  isOffhooking,
}) => {
  const offhookStatusText = i18n.getString('offhookStatus', currentLocale);
  const logoutText = i18n.getString('logout', currentLocale);
  const offhookStateText = i18n.getString(offhookState, currentLocale);

  return (
    <div className={styles.settingsPanel}>
      <div className={styles.list}>
        <RcList>
          <RcListItem
            title={logoutText}
            size="small"
            button
            classes={{
              root: styles.settingItem,
            }}
            onClick={onLogout}
          >
            {logoutText}
            <RcIcon
              size="small"
              className={styles.logoutIcon}
              symbol={logoutSvg}
            />
          </RcListItem>
        </RcList>
      </div>
      <div className={versionClass}>
        {i18n.getString('version', currentLocale)} {version}
      </div>
    </div>
  );
};
