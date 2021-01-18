import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ForwardIcon from '../../assets/images/Forward_white.svg';
import DialPad from '../DialPad';
import BackHeader from '../BackHeader';
import CircleButton from '../CircleButton';
import styles from './styles.scss';
import i18n from './i18n';

export default class ForwardPanel extends PureComponent {
  _mounted = false;
  static propTypes = {
    onForward: PropTypes.func.isRequired,
    currentLocale: PropTypes.string.isRequired,
    onBackClick: PropTypes.func.isRequired,
    telephonySessionId: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      toNumber: '',
      forwarding: false,
    };
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  onButtonOutput = (key) => {
    this.setState((preState) => {
      const value = preState.toNumber + key;
      return { toNumber: value };
    });
  };

  onForward = async () => {
    const { onForward, telephonySessionId } = this.props;
    this.setState({
      forwarding: true,
    });
    await onForward(this.state.toNumber, telephonySessionId);
    // forward success then page destroyed
    if (!this._mounted) return;
    this.setState({
      forwarding: false,
    });
  };

  onToNumberChange = (event) => {
    const toNumber = event.currentTarget.value;
    this.setState({
      toNumber,
    });
  };

  render() {
    const { onBackClick, currentLocale, children } = this.props;
    const { forwarding } = this.state;
    return (
      <div className={styles.root}>
        <BackHeader onBackClick={onBackClick} className={styles.backHeader}>
          {i18n.getString('forward', currentLocale)}
        </BackHeader>
        <div className={classnames(styles.dialInput)}>
          <input
            data-sign="input"
            className={styles.input}
            value={this.state.toNumber}
            onChange={this.onToNumberChange}
            autoFocus // eslint-disable-line
          />
        </div>
        <div className={styles.padContainer}>
          <DialPad
            dataSign="forwardDialpad"
            className={styles.dialPad}
            onButtonOutput={this.onButtonOutput}
          />
          <div className={styles.buttonRow}>
            <div className={styles.button}>
              <CircleButton
                dataSign="forwardBtn"
                onClick={this.onForward}
                icon={ForwardIcon}
                className={classnames(styles.forwardIcon, {
                  [styles.forwardIconDisable]: forwarding,
                })}
              />
            </div>
          </div>
        </div>
        {children}
      </div>
    );
  }
}
