import React, { PropTypes } from 'react';
import classnames from 'classnames';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import Header from '../Header';
import Panel from '../Panel';
import Line from '../Line';
import LinkLine from '../LinkLine';
import IconLine from '../IconLine';
import Eula from '../Eula';
import styles from './styles.scss';
import Switch from '../Switch';
import i18n from './i18n';

export default function SettingsPanel({
  children,
  className,
  onLogoutButtonClick,
  loginNumber,
  version,
  currentLocale,
  brandId,
  EulaRenderer,
  callingSettingsUrl,
  regionSettingsUrl,
  showAutoLog,
  autoLogEnabled,
  onAutoLogChange,
  showClickToDial,
  clickToDialEnabled,
  onClickToDialChange,
  showRegion,
  showHeader,
}) {
  const region = showRegion ?
    (
      <LinkLine
        to={regionSettingsUrl} >
        {i18n.getString('region', currentLocale)}
      </LinkLine>
    ) :
    null;
  const clickToDial = showClickToDial ?
    (
      <IconLine
        icon={
          <Switch
            checked={clickToDialEnabled}
            onChange={onClickToDialChange}
          />
        }
      >
        {i18n.getString('clickToDial', currentLocale)}
      </IconLine>
    ) :
    null;
  const autoLog = showAutoLog ? (
    <IconLine
      icon={
        <Switch
          checked={autoLogEnabled}
          onChange={onAutoLogChange}
        />
      }
    >
      {i18n.getString('autoCreateLog', currentLocale)}
    </IconLine>
  ) :
    null;
  const header = showHeader ? (
    <Header>
      {i18n.getString('settings', currentLocale)}
    </Header>
  ) : null;
  return (
    <div className={classnames(styles.root, className)}>
      {header}
      <Panel
        className={classnames(
          styles.content,
          showHeader && styles.contentWithHeader,
        )}>
        <LinkLine
          to={callingSettingsUrl} >
          {i18n.getString('calling', currentLocale)}
        </LinkLine>
        {region}
        {children}
        {autoLog}
        {clickToDial}
        <section className={styles.section}>
          <Line>
            <EulaRenderer
              className={styles.eula}
              currentLocale={currentLocale}
              brandId={brandId} />
          </Line>
        </section>
        <section className={styles.section}>
          <IconLine
            onClick={onLogoutButtonClick}
            icon={
              <span className={dynamicsFont.logout} />
            } >
            {i18n.getString('logout', currentLocale)}
            <span className={styles.loginNumber}>
              {` ${loginNumber}`}
            </span>
          </IconLine>
        </section>
        <div className={styles.versionContainer} >
          {i18n.getString('version', currentLocale)} {version}
        </div>
      </Panel>
    </div>
  );
}

SettingsPanel.propTypes = {
  brandId: PropTypes.string.isRequired,
  callingSettingsUrl: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  EulaRenderer: PropTypes.func,
  loginNumber: PropTypes.string.isRequired,
  onLogoutButtonClick: PropTypes.func.isRequired,
  regionSettingsUrl: PropTypes.string.isRequired,
  showAutoLog: PropTypes.bool,
  autoLogEnabled: PropTypes.bool,
  onAutoLogChange: PropTypes.func,
  showRegion: PropTypes.bool.isRequired,
  showClickToDial: PropTypes.bool,
  clickToDialEnabled: PropTypes.bool,
  onClickToDialChange: PropTypes.func,
  version: PropTypes.string.isRequired,
  showHeader: PropTypes.bool,
};
SettingsPanel.defaultProps = {
  className: null,
  EulaRenderer: Eula,
  children: null,
  showClickToDial: false,
  clickToDialEnabled: false,
  onClickToDialChange: () => { },
  showAutoLog: false,
  autoLogEnabled: false,
  onAutoLogChange: () => { },
  showHeader: false
};
