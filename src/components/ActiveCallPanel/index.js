import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import Button from '../Button';
import Badge from '../Badge';
import Draggable from '../Draggable';
import DurationCounter from '../DurationCounter';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import rcFont from '../../assets/RcFont/RcFont.scss';
import styles from './styles.scss';

import i18n from './i18n';

function ContactUser(props) {
  const name = props.name || i18n.getString('unkonw', props.currentLocale);
  return (
    <div className={styles.user}>
      <div className={styles.userAvatar}>
        <i className={dynamicsFont.portrait} />
      </div>
      <div className={styles.userPhoneNumber}>{props.phoneNumber}</div>
      <div className={styles.userName}>{name}</div>
    </div>
  );
}

ContactUser.propTypes = {
  name: PropTypes.string,
  phoneNumber: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
};

ContactUser.defaultProps = {
  name: null,
};

function OperationButton(props) {
  const className = classnames(styles.operationButton, props.className);
  return (
    <div className={className}>
      <Button
        className={styles.button}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </Button>
      <div className={styles.buttonTitle}>
        {props.title}
      </div>
    </div>
  );
}

OperationButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

OperationButton.defaultProps = {
  className: undefined,
  disabled: false,
  children: undefined,
};

class ActiveCallPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minimized: false,
      badgeOffsetX: 0,
      badgeOffsetY: 0,
      connectedAt: new Date(),
    };

    this.updatePositionOffset = (x, y) => {
      this.setState({
        badgeOffsetX: x,
        badgeOffsetY: y,
      });
    };
  }

  render() {
    if (!this.props.active) {
      return null;
    }

    if (this.props.minimized) {
      return (
        <Draggable
          className={styles.draggable}
          onClick={this.props.toggleMinimized}
          positionOffsetX={this.state.badgeOffsetX}
          positionOffsetY={this.state.badgeOffsetY}
          updatePositionOffset={this.updatePositionOffset}
        >
          <Badge
            className={styles.phoneBage}
            name={'active-call'}
          >
            <span className={styles.activeIcon}>
              <i className={dynamicsFont.active} />
            </span>
            Calling
          </Badge>
        </Draggable>
      );
    }

    return (
      <div className={styles.root}>
        <Button
          className={styles.minimizeButton}
          onClick={this.props.toggleMinimized}
        >
          <i className={dynamicsFont.close} />
        </Button>
        <span className={styles.connectStatus}>
          <i className={rcFont.uniBD} />
        </span>
        <span className={styles.timeCounter}>
          <DurationCounter startTime={this.state.connectedAt} />
        </span>

        <ContactUser
          name={this.props.userName}
          phoneNumber={this.props.phoneNumber}
          currentLocale={this.props.currentLocale}
        />
        <div className={styles.buttonRow}>
          <OperationButton
            onClick={() => null}
            title={'Mute'}
          >
            <i className={rcFont.uni7B} />
          </OperationButton>
          <OperationButton
            onClick={() => null}
            title={'Keypad'}
          >
            <i className={rcFont.uniA4} />
          </OperationButton>
          <OperationButton
            onClick={() => null}
            title={'Audio'}
          >
            <i className={rcFont.uni2496} />
          </OperationButton>
        </div>
        <div className={styles.buttonRow}>
          <OperationButton
            onClick={() => null}
            title={'Hold'}
          >
            <i className={rcFont.uni2474} />
          </OperationButton>
          <OperationButton
            onClick={() => null}
            title={'Record'}
          >
            <i className={rcFont.icon_radio_off} />
          </OperationButton>
          <OperationButton
            onClick={() => null}
            title={'Add'}
          >
            <i className={rcFont.ActionButtons_Add} />
          </OperationButton>
        </div>
        <div className={styles.buttonRow}>
          <OperationButton
            onClick={() => null}
            title={'Transfer'}
          >
            <i className={rcFont['icon-transfer']} />
          </OperationButton>
          <OperationButton
            onClick={() => null}
            title={'Park'}
          >
            <i className={rcFont.uni2E} />
          </OperationButton>
          <OperationButton
            onClick={() => null}
            title={'Flip'}
          >
            <i className={rcFont['icon-flip']} />
          </OperationButton>
        </div>
        <div className={styles.buttonRow}>
          <Button
            className={classnames(styles.button, styles.stopButton)}
            onClick={this.props.hangup}
            disabled={false}
          >
            <i className={rcFont.uni44} />
          </Button>
        </div>
      </div>
    );
  }
}

ActiveCallPanel.propTypes = {
  active: PropTypes.bool.isRequired,
  hangup: PropTypes.func.isRequired,
  minimized: PropTypes.bool.isRequired,
  toggleMinimized: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  userName: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
};

ActiveCallPanel.defaultProps = {
  userName: null,
};

export default ActiveCallPanel;
