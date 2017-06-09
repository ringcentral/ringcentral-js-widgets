import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import BackHeader from '../BackHeader';
import Panel from '../Panel';
import DurationCounter from '../DurationCounter';
import ActiveCallPad from '../ActiveCallPad';
import ActiveCallDialPad from '../ActiveCallDialPad';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

function CallInfo(props) {
  const timeCounter = props.startTime ?
    (
      <span className={styles.timeCounter}>
        <span className={styles.splitLine}>|</span>
        <DurationCounter startTime={props.startTime} />
      </span>
    ) : null;
  return (
    <div className={styles.userInfo}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatar}>
          <i className={classnames(dynamicsFont.portrait, styles.icon)} />
        </div>
      </div>
      <div className={styles.infoContent}>
        <div className={styles.userName}>
          {props.name}
          { timeCounter }
        </div>
        <div className={styles.userPhoneNumber}>
          {props.formatPhone(props.phoneNumber)}
        </div>
      </div>
    </div>
  );
}

CallInfo.propTypes = {
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string,
  formatPhone: PropTypes.func.isRequired,
  startTime: PropTypes.number,
};

CallInfo.defaultProps = {
  phoneNumber: null,
  startTime: null,
};

class ActiveCallPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowKeyPad: false,
    };

    this.hiddenKeyPad = () => {
      this.setState({
        isShowKeyPad: false,
      });
    };

    this.showKeyPad = () => {
      this.setState({
        isShowKeyPad: true,
      });
    };
  }

  render() {
    const userInfo = this.state.isShowKeyPad ? null : (
      <CallInfo
        name={this.props.userName}
        phoneNumber={this.props.phoneNumber}
        formatPhone={this.props.formatPhone}
        startTime={this.props.startTime}
      />
    );
    const buttonsPad = this.state.isShowKeyPad ? null : (
      <ActiveCallPad
        currentLocale={this.props.currentLocale}
        isOnMute={this.props.isOnMute}
        isOnHold={this.props.isOnHold}
        isOnRecord={this.props.isOnRecord}
        onMute={this.props.onMute}
        onUnmute={this.props.onUnmute}
        onHold={this.props.onHold}
        onUnhold={this.props.onUnhold}
        onRecord={this.props.onRecord}
        onStopRecord={this.props.onStopRecord}
        onShowKeyPad={this.showKeyPad}
        hangup={this.props.hangup}
        onAdd={this.props.onAdd}
      />
    );
    const dialPad = this.state.isShowKeyPad ? (
      <ActiveCallDialPad
        onChange={this.props.onKeyPadChange}
        hiddenDialPad={this.hiddenKeyPad}
        hangup={this.props.hangup}
        currentLocale={this.props.currentLocale}
      />
    ) : null;
    return (
      <div className={styles.root}>
        <BackHeader
          onBackClick={this.props.toggleMinimized}
          backButton={(
            <span className={styles.backButton}>
              <i className={classnames(dynamicsFont.arrow, styles.backIcon)} />
              <span className={styles.backLabel}>Active Calls</span>
            </span>
          )}
          buttons={[]}
        />
        <Panel>
          {userInfo}
          {buttonsPad}
          {dialPad}
          {this.props.children}
        </Panel>
      </div>
    );
  }
}

ActiveCallPanel.propTypes = {
  phoneNumber: PropTypes.string,
  userName: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  startTime: PropTypes.number,
  isOnMute: PropTypes.bool,
  isOnHold: PropTypes.bool,
  isOnRecord: PropTypes.bool,
  onMute: PropTypes.func.isRequired,
  onUnmute: PropTypes.func.isRequired,
  onHold: PropTypes.func.isRequired,
  onUnhold: PropTypes.func.isRequired,
  onRecord: PropTypes.func.isRequired,
  onStopRecord: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  hangup: PropTypes.func.isRequired,
  toggleMinimized: PropTypes.func.isRequired,
  onKeyPadChange: PropTypes.func.isRequired,
  formatPhone: PropTypes.func.isRequired,
  children: PropTypes.node,
};

ActiveCallPanel.defaultProps = {
  userName: null,
  startTime: null,
  isOnMute: false,
  isOnHold: false,
  isOnRecord: false,
  phoneNumber: null,
  children: undefined,
};

export default ActiveCallPanel;
