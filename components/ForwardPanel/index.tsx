import clsx from 'clsx';
import React, { PureComponent } from 'react';

import ForwardIcon from '../../assets/images/Forward_white.svg';
import {
  PageHeader,
  PageHeaderBack,
  PageHeaderRemain,
  PageHeaderTitle,
} from '../BackHeader/PageHeader';
import CircleButton from '../CircleButton';
import DialPad from '../DialPad';

import { t } from './i18n';
import styles from './styles.scss';

type ForwardPanelProps = {
  onForward: (...args: any[]) => any;
  onBackClick: (...args: any[]) => any;
  telephonySessionId: string;
};
type ForwardPanelState = {
  toNumber: string;
  forwarding: boolean;
};
class ForwardPanel extends PureComponent<ForwardPanelProps, ForwardPanelState> {
  _mounted = false;
  constructor(props: any) {
    super(props);
    this.state = {
      toNumber: '',
      forwarding: false,
    };
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    this._mounted = true;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    this._mounted = false;
  }
  onButtonOutput = (key: any) => {
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
  onToNumberChange = (event: any) => {
    const toNumber = event.currentTarget.value;
    this.setState({
      toNumber,
    });
  };
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const { onBackClick, children } = this.props;
    const { forwarding } = this.state;
    return (
      <div className={styles.root} data-sign="forwardPage">
        <PageHeader>
          <PageHeaderBack onClick={onBackClick} className={styles.backHeader} />
          <PageHeaderTitle>{t('forward')}</PageHeaderTitle>
          <PageHeaderRemain />
        </PageHeader>
        <div className={clsx(styles.dialInput)}>
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
                className={clsx(styles.forwardIcon, {
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
export default ForwardPanel;
