import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { OverlayTrigger, Popover } from 'react-bootstrap';
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
    showRegion,
    className,
    onLogoutButtonClick,
    loginNumber,
    version,
    currentLocale,
    brandId,
    EulaRenderer,
  }) {
  const region = showRegion ?
    (
      <LinkLine
        to="/settings/region"
        >
        {i18n.getString('region')}
      </LinkLine>
    ) :
    null;
  return (
    <div className={classnames(styles.root, className)}>
      <Header>
        {i18n.getString('settings')}
      </Header>
      <Panel className={styles.content}>
        <LinkLine
          to="/settings/calling"
          >
          {i18n.getString('calling')}
        </LinkLine>
        {region}
        {children}
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
  showRegion: PropTypes.bool.isRequired,
  className: PropTypes.string,
  loginNumber: PropTypes.string.isRequired,
  onLogoutButtonClick: PropTypes.func.isRequired,
  version: PropTypes.string.isRequired,
  brandId: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  EulaRenderer: PropTypes.func,
  callingSettingsUrl: PropTypes.string.isRequired,
};
SettingsPanel.defaultProps = {
  EulaRenderer: Eula,
};
