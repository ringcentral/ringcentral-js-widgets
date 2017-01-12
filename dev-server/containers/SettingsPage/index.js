import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import classnames from 'classnames';
import loginStatus from 'ringcentral-integration/modules/Auth/loginStatus';
import formatNumber from 'ringcentral-integration/lib/formatNumber';

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
import '../../../src/lib/commonStyles/colors.scss';
import 'bootstrap/dist/css/bootstrap.css';
//import { setPopMinimizedApp, setPopMatchingRecord } from '../../../src/modules/CallMonitor/actions';

class SettingsPage extends Component {

  componentDidMount() {
    this.props.onComponentDidMount();
  }

  componentDidUpdate() {
    this.props.onComponentDidUpdate();
  }

  render() {
    const region = this.props.showRegion ?
      (
        <LinkLine
          to="/settings/region"
          >
          {i18n.getString('region')}
        </LinkLine>
      ) :
      null;
    // TODO extract these components into their own and allow
    // settingspage to accept custom children
    // const autoPop = (
    //   <section className={styles.settingsSection}>
    //     <div className={styles.sectionTitle}>{i18n.getString('autoPopTitle')}</div>
    //     <IconLine
    //       icon={
    //         <Switch
    //           checked={this.props.isPopMatchingRecord}
    //           onChange={this.props.onPopMatchingRecordChange}
    //           />
    //       }
    //       >
    //       {i18n.getString('autoPopRecord')}
    //       <OverlayTrigger
    //         rootClose
    //         trigger="click"
    //         placement="bottom"
    //         overlay={<Popover id="popover1">{i18n.getString('autoPopRecordDesc')}</Popover>}>
    //         <i className={classnames('fa fa-info-circle', styles.iconInfo)} />
    //       </OverlayTrigger>
    //     </IconLine>
    //     <IconLine
    //       className={styles.group}
    //       icon={
    //         <Switch
    //           checked={this.props.isPopMinimizedApp}
    //           onChange={this.props.onPopMinimizedAppChange}
    //           />
    //       }
    //       >
    //       {i18n.getString('autoPopApp')}
    //       <OverlayTrigger
    //         rootClose
    //         trigger="click"
    //         placement="bottom"
    //         overlay={<Popover id="popover2">{i18n.getString('autoPopAppDesc')}</Popover>}>
    //         <i className={classnames('fa fa-info-circle', styles.iconInfo)} />
    //       </OverlayTrigger>
    //     </IconLine>
    //   </section>
    // );

    // const autoLog = (
    //   <IconLine
    //     icon={
    //       <Switch
    //         checked={this.props.autoCreateLog}
    //         onChange={this.props.onAutoCreateLogChange}
    //         />
    //     }
    //     >
    //     {i18n.getString('autoCreateLog')}
    //   </IconLine>
    // );
    // const click2dial = (
    //   <IconLine
    //     icon={
    //       <Switch
    //         checked={this.props.clickToDialEnabled}
    //         onChange={this.props.onClickToDialChange}
    //         />
    //     }
    //     >
    //     {i18n.getString('clickToDial')}
    //   </IconLine>
    // );
    return (
      <div className={classnames(styles.root, this.props.className)}>
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
          {
            // {autoPop}
          // {autoLog}
          // {click2dial}
        }
          <IconLine
            onClick={this.props.onLogoutButtonClick}
            icon={<span className={rcFont.RC_Logout} />}
            >
            {i18n.getString('logout')} {this.props.loginNumber}
          </IconLine>
          <Line>
            {i18n.getString('version')} {this.props.version}
          </Line>
          <div className={styles.eulaContainer} >
            <Eula
              className={styles.eula}
              currentLocale={this.props.currentLocale}
              brandId={this.props.brandId}
              />
          </div>
        </Panel>
      </div>
    );
  }
}

SettingsPage.propTypes = {
  showRegion: PropTypes.bool.isRequired,
  className: PropTypes.string,
  loginNumber: PropTypes.string,
  onLogoutButtonClick: PropTypes.func,
  version: PropTypes.string,
  brandId: PropTypes.string,
  currentLocale: PropTypes.string,
  // isPopMinimizedApp: PropTypes.bool.isRequired,
  // isPopMatchingRecord: PropTypes.bool.isRequired,
  onComponentDidMount: PropTypes.func.isRequired,
  onComponentDidUpdate: PropTypes.func.isRequired,
  // onPopMinimizedAppChange: PropTypes.func.isRequired,
  // onPopMatchingRecordChange: PropTypes.func.isRequired
};

export default connect((state, props) => {
  const loggedIn = props.auth.loginStatus === loginStatus.loggedIn;
  const loginNumber = (loggedIn &&
    props.accountInfo.ready &&
    props.extensionInfo.ready
  ) ?
    formatNumber({
      phoneNumber: `${
        props.accountInfo.mainCompanyNumber
      }*${props.extensionInfo.extensionNumber}`,
      countryCode: props.regionSettings.countryCode,
      areaCode: props.regionSettings.areaCode,
    }) :
    '';
  return {
    showRegion: loggedIn && props.brand.id === '1210' && (
      props.regionSettings.availableCountries.length > 1 ||
      !!props.regionSettings.availableCountries.find(c => c.isoCode === 'US') ||
      !!props.regionSettings.availableCountries.find(c => c.isoCode === 'CA')
    ),
    loginNumber,
    version: props.phone.version,
    currentLocale: props.locale.currentLocale,
    brandId: props.brand.id,
    // autoCreateLog: props.autoLogger.enabled,
    // clickToDialEnabled: props.adapter.clickToDialEnabled,
    // isPopMinimizedApp: state.callMonitor.isPopMinimizedApp,
    // isPopMatchingRecord: state.callMonitor.isPopMatchingRecord
  };
}, (dispatch, props) => ({
  onLogoutButtonClick: async () => {
    await props.auth.logout();
    props.router.history.replace('/welcome');
  },
  // onAutoCreateLogChange: checked => this.props.autoLogger.setEnabled(checked),
  // onClickToDialChange: checked => this.props.adapter.setClickToDialEnabled(checked),
  // onPopMinimizedAppChange: checked => dispatch(setPopMinimizedApp(checked)),
  // onPopMatchingRecordChange: checked => dispatch(setPopMatchingRecord(checked)),
  onComponentDidMount: () => {
    // const callMonitorSettings = props.phone.storage._storage.getItem('callMonitorSettings');
    // if (callMonitorSettings) {
    //   dispatch(setPopMinimizedApp(callMonitorSettings.isPopMinimizedApp));
    //   dispatch(setPopMatchingRecord(callMonitorSettings.isPopMatchingRecord));
    // }
  },
  onComponentDidUpdate: () => {
    // const callMonitor = props.phone.state.callMonitor;
    // props.phone.storage._storage.setItem('callMonitorSettings', {
    //   isPopMinimizedApp: callMonitor.isPopMinimizedApp,
    //   isPopMatchingRecord: callMonitor.isPopMatchingRecord
    // });
  }
}))(SettingsPage);
