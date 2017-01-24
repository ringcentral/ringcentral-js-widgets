import React, { PropTypes } from 'react';
import classnames from 'classnames';

import rcFont from '../../../src/assets/RcFont/RcFont.scss';
import Header from '../../../src/components/Header';
import Panel from '../../../src/components/Panel';
import Line from '../../../src/components/Line';
import LinkLine from '../../../src/components/LinkLine';
import IconLine from '../../../src/components/IconLine';
import Eula from '../../../src/components/Eula';
import styles from './styles.scss';
import Switch from '../../../src/components/Switch';
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
}) {
  const region = showRegion ?
    (
      <LinkLine
        to={regionSettingsUrl} >
        {i18n.getString('region')}
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
        {i18n.getString('clickToDial')}
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
      {i18n.getString('autoCreateLog')}
    </IconLine>
  ) :
    null;
  return (
    <div className={classnames(styles.root, className)}>
      <Header>
        {i18n.getString('settings')}
      </Header>
      <Panel className={styles.content}>
        <LinkLine
          to={callingSettingsUrl}
          >
          {i18n.getString('calling')}
        </LinkLine>
        {region}
        {children}
        {autoLog}
        {clickToDial}
        <IconLine
          onClick={onLogoutButtonClick}
          icon={<span className={rcFont.RC_Logout} />}
          >
          {i18n.getString('logout')} {loginNumber}
        </IconLine>
        <Line>
          {i18n.getString('version')} {version}
        </Line>
        <div className={styles.eulaContainer} >
          <EulaRenderer
            className={styles.eula}
            currentLocale={currentLocale}
            brandId={brandId}
            />
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
};
SettingsPanel.defaultProps = {
  className: null,
  EulaRenderer: Eula,
  children: null,
  showClickToDial: false,
  clickToDialEnabled: false,
  onClickToDialChange: () => {},
  showAutoLog: false,
  autoLogEnabled: false,
  onAutoLogChange: () => {},
};
