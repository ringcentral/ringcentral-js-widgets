import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import BackHeader from '../BackHeader';
import Panel from '../Panel';
import DurationCounter from '../DurationCounter';
import ActiveCallUserInfo from '../ActiveCallUserInfo';
import ActiveCallPad from '../ActiveCallPad';
import ActiveCallDialPad from '../ActiveCallDialPad';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import rcFont from '../../assets/RcFont/RcFont.scss';
import styles from './styles.scss';

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
    const timeCounter = this.props.startTime ?
      (
        <span className={styles.timeCounter}>
          <DurationCounter startTime={this.props.startTime} />
        </span>
      ) : null;
    const userInfo = this.state.isShowKeyPad ? null : (
      <ActiveCallUserInfo
        name={this.props.userName}
        phoneNumber={this.props.phoneNumber}
        currentLocale={this.props.currentLocale}
        formatPhone={this.props.formatPhone}
        className={styles.userInfo}
        avatar={(
          <div className={styles.avatar}>
            <i className={classnames(dynamicsFont.portrait, styles.icon)} />
          </div>
        )}
      />
    );
    const buttonsPad = this.state.isShowKeyPad ? null : (
      <ActiveCallPad
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
      />
    ) : null;
    return (
      <div className={styles.root}>
        <BackHeader
          onBackClick={this.props.toggleMinimized}
          backButton={(
            <span className={styles.backButton}>
              <i className={classnames(dynamicsFont.arrow, styles.backIcon)} />
              <span className={styles.backLabel}>Calls</span>
            </span>
          )}
          buttons={[]}
        />
        <Panel>
          {timeCounter}
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
  sessionId: null,
  phoneNumber: null,
  callStatus: null,
  children: undefined,
};

export default ActiveCallPanel;
