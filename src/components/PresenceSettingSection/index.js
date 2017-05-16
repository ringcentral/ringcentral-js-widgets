import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';

import IconLine from '../IconLine';
import Line from '../Line';
import Switch from '../Switch';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';
import i18n from './i18n';

function PresenceItem(props) {
  return (
    <a className={styles.presenceItem} onClick={props.onClick}>
      {props.icon}
      <span className={styles.statusName}>
        {props.name}
      </span>
      { props.selected && (<span className={styles.selected}>√</span>) }
    </a>
  );
}

PresenceItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default class PresenceSettingSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelects: true,
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

  _getPresenceStatus(currentUserStatus, currentDndStatus) {
    if (currentUserStatus !== presenceStatus.busy) {
      return i18n.getString(currentUserStatus, this.props.currentLocale);
    }
    return i18n.getString(currentUserStatus + currentDndStatus, this.props.currentLocale);
  }

  _getPresenceStatusIcon(currentUserStatus, currentDndStatus) {
    let iconClassName;
    if (currentUserStatus === presenceStatus.offline) {
      iconClassName = styles.invisible;
    }
    if (currentUserStatus === presenceStatus.busy) {
      if (currentDndStatus === dndStatus.doNotAcceptAnyCalls) {
        iconClassName = classnames(styles.status, styles.busy, styles.notDisturb);
      } else {
        iconClassName = classnames(styles.status, styles.busy);
      }
    }
    return (
      <span className={classnames(styles.status, iconClassName)}>
        <i className={dynamicsFont.collapse} />
      </span>
    );
  }

  render() {
    const presenceListClass = classnames(
      styles.presenceList,
      this.state.showSelects ? null : styles.hidden,
    );
    const dropdownIconClass = classnames(
      dynamicsFont.arrow,
      this.state.showSelects ? styles.show : null,
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
        Accept Queue Calls
      </IconLine>
    ) :
      null;
    const currentStatus = this._getPresenceStatus(
      this.props.userStatus,
      this.props.dndStatus
    );
    const currentStatusIcon = this._getPresenceStatusIcon(
      this.props.userStatus,
      this.props.dndStatus
    );
    return (
      <div className={styles.section}>
        <IconLine
          icon={
            <span className={dropdownIconClass} />
          }
          onClick={this.toggleShow}
        >
          <div className={styles.title}>
            {i18n.getString('status', this.props.currentLocale)}
          </div>
          <div className={styles.subTitle}>
            {currentStatusIcon}
            <span className={styles.statusName}>
              {currentStatus}
            </span>
          </div>
        </IconLine>
        <Line className={presenceListClass}>
          <PresenceItem
            icon={this._getPresenceStatusIcon(presenceStatus.available)}
            name={i18n.getString(presenceStatus.available, this.props.currentLocale)}
            onClick={this.props.setAvailable}
            selected={this.props.userStatus === presenceStatus.available}
          />
          <PresenceItem
            icon={this._getPresenceStatusIcon(
              presenceStatus.busy, dndStatus.takeAllCalls
            )}
            name={
              i18n.getString(
                presenceStatus.busy + dndStatus.takeAllCalls,
                this.props.currentLocale
              )
            }
            onClick={this.props.setBusy}
            selected={
              this.props.userStatus === presenceStatus.busy &&
              this.props.dndStatus !== dndStatus.doNotAcceptAnyCalls
            }
          />
          <PresenceItem
            icon={this._getPresenceStatusIcon(
              presenceStatus.busy, dndStatus.doNotAcceptAnyCalls
            )}
            name={
              i18n.getString(
                presenceStatus.busy + dndStatus.doNotAcceptAnyCalls,
                this.props.currentLocale
              )
            }
            onClick={this.props.setDoNotDisturb}
            selected={
              this.props.userStatus === presenceStatus.busy &&
              this.props.dndStatus === dndStatus.doNotAcceptAnyCalls
            }
          />
          <PresenceItem
            icon={this._getPresenceStatusIcon(presenceStatus.offline)}
            name={i18n.getString(presenceStatus.offline, this.props.currentLocale)}
            onClick={this.props.setInvisible}
            selected={this.props.userStatus === presenceStatus.offline}
          />
        </Line>
        {acceptQueueCalls}
      </div>
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
};
