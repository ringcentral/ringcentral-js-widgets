import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';

import IconLine from '../IconLine';
import Line from '../Line';
import Switch from '../Switch';
import PresenceStatusIcon from '../PresenceStatusIcon';
import PresenceItem, { getPresenceStatusName } from '../PresenceItem';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';
import i18n from './i18n';

export default class PresenceSettingSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelects: props.showPresenceSettings,
    };

    this.toggleShow = () => {
      this.setState(preState => ({
        showSelects: !preState.showSelects,
      }));
    };

    this.onCallQueueChange = () => {
      if (this.state.dndStatus === dndStatus.doNotAcceptAnyCalls) {
        return;
      }
      this.setState(preState => ({
        dndStatus: (
          preState.dndStatus === dndStatus.takeAllCalls ?
            dndStatus.doNotAcceptDepartmentCalls :
            dndStatus.takeAllCalls
        ),
      }));
      this.props.toggleAcceptCallQueueCalls();
    };
  }

  render() {
    const sectionClass = classnames(
      styles.section,
      this.state.showSelects ? styles.showDropdown : null,
    );
    const acceptQueueCalls = this.props.isCallQueueMember ? (
      <IconLine
        icon={
          <Switch
            checked={this.props.dndStatus === dndStatus.takeAllCalls}
            onChange={this.onCallQueueChange}
          />
        }
      >
        {i18n.getString('acceptQueueCalls', this.props.currentLocale)}
      </IconLine>
    ) : null;
    const currentStatus = getPresenceStatusName(
      this.props.userStatus,
      this.props.dndStatus,
      this.props.currentLocale
    );
    return (
      <section className={sectionClass}>
        <IconLine
          icon={
            <span className={styles.dropdownIcon} >
              <i className={dynamicsFont.arrow} />
            </span>
          }
          onClick={this.toggleShow}
        >
          <div className={styles.title}>
            {i18n.getString('status', this.props.currentLocale)}
          </div>
          <div className={styles.subTitle}>
            <PresenceStatusIcon
              className={styles.statusIcon}
              userStatus={this.props.userStatus}
              dndStatus={this.props.dndStatus}
            />
            <span>
              {currentStatus}
            </span>
          </div>
        </IconLine>
        <Line className={styles.presenceList}>
          <PresenceItem
            userStatus={presenceStatus.available}
            currentLocale={this.props.currentLocale}
            onClick={this.props.setAvailable}
            selected={this.props.userStatus === presenceStatus.available}
          />
          <PresenceItem
            userStatus={presenceStatus.busy}
            dndStatus={dndStatus.takeAllCalls}
            currentLocale={this.props.currentLocale}
            onClick={this.props.setBusy}
            selected={
              this.props.userStatus === presenceStatus.busy &&
              this.props.dndStatus !== dndStatus.doNotAcceptAnyCalls
            }
          />
          <PresenceItem
            userStatus={presenceStatus.busy}
            dndStatus={dndStatus.doNotAcceptAnyCalls}
            currentLocale={this.props.currentLocale}
            onClick={this.props.setDoNotDisturb}
            selected={
              this.props.userStatus === presenceStatus.busy &&
              this.props.dndStatus === dndStatus.doNotAcceptAnyCalls
            }
          />
          <PresenceItem
            userStatus={presenceStatus.offline}
            currentLocale={this.props.currentLocale}
            onClick={this.props.setInvisible}
            selected={this.props.userStatus === presenceStatus.offline}
          />
        </Line>
        {acceptQueueCalls}
      </section>
    );
  }
}

PresenceSettingSection.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  dndStatus: PropTypes.string.isRequired,
  userStatus: PropTypes.string.isRequired,
  isCallQueueMember: PropTypes.bool.isRequired,
  setAvailable: PropTypes.func.isRequired,
  setBusy: PropTypes.func.isRequired,
  setDoNotDisturb: PropTypes.func.isRequired,
  setInvisible: PropTypes.func.isRequired,
  toggleAcceptCallQueueCalls: PropTypes.func.isRequired,
  showPresenceSettings: PropTypes.bool.isRequired,
};
