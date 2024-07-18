import clsx from 'clsx';
import React, { Component } from 'react';

import EndIcon from '../../assets/images/End.svg';
import FlipIcon from '../../assets/images/Flip.svg';
import BackButton from '../BackButton';
import BackHeader from '../BackHeader';
import CircleButton from '../CircleButton';
import RadioButtonGroup from '../RadioBtnGroup';

import i18n from './i18n';
import styles from './styles.scss';

type FlipPanelProps = {
  isOnFlip?: boolean;
  flipNumbers: any[];
  currentLocale: string;
  formatPhone: (...args: any[]) => any;
  onBack: (...args: any[]) => any;
  onFlip: (...args: any[]) => any;
  onComplete: (...args: any[]) => any;
  onCallEnd: (...args: any[]) => any;
  session?: object | null;
  sessionId: string;
};
type FlipPanelState = {
  flipValue: any;
  flipEnabled: boolean;
};
class FlipPanel extends Component<FlipPanelProps, FlipPanelState> {
  constructor(props: any) {
    super(props);
    this.state = {
      flipValue:
        this.props.flipNumbers.length === 0
          ? ''
          : this.props.flipNumbers[0].phoneNumber,
      flipEnabled: !this.props.isOnFlip,
    };
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    const { session, onCallEnd } = this.props;
    if (session && !nextProps.session) {
      onCallEnd();
    }
  }
  onRadioSelect = (value: any) => {
    this.setState({
      flipValue: value,
    });
  };
  onFlip = () => {
    this.props.onFlip(this.state.flipValue, this.props.sessionId);
    this.setState({
      flipEnabled: false,
    });
  };
  onComplete = () => {
    this.props.onComplete(this.props.sessionId);
  };
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const { isOnFlip, onBack, currentLocale, flipNumbers, formatPhone } =
      this.props;
    const { flipEnabled } = this.state;
    return (
      <div className={styles.root} data-sign="flipPanel">
        <BackHeader
          // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | null' is not ass... Remove this comment to see the full error message
          onBackClick={isOnFlip ? null : onBack}
          backButton={<BackButton showIcon={!isOnFlip} />}
          className={styles.backHeader}
        >
          <span data-sign="flipTitle" className={styles.headerTitle}>
            {i18n.getString('flipHeader', currentLocale)}
          </span>
        </BackHeader>
        <div className={styles.flipContainer}>
          <RadioButtonGroup
            // @ts-expect-error TS(2322): Type '{ dataSign: string; className: string; radio... Remove this comment to see the full error message
            dataSign="flipNumber"
            className={styles.radioGroup}
            radioOptions={flipNumbers}
            disabled={!flipEnabled}
            formatPhone={formatPhone}
            onRadioSelect={this.onRadioSelect}
            currentLocale={currentLocale}
          />
          <div className={styles.buttonGroup}>
            <div
              data-sign="flip"
              className={styles.button}
              title={i18n.getString('flip', currentLocale)}
            >
              <CircleButton
                disabled={!flipEnabled}
                className={clsx(
                  styles.flipButton,
                  flipEnabled ? '' : styles.disabled,
                )}
                iconClassName={styles.flipIcon}
                onClick={this.onFlip}
                icon={FlipIcon}
                showBorder
              />
            </div>
            <div
              data-sign="flipComplete"
              className={styles.button}
              title={i18n.getString('complete', currentLocale)}
            >
              <CircleButton
                disabled={!isOnFlip}
                className={clsx(
                  styles.completeButton,
                  isOnFlip ? '' : styles.disabled,
                )}
                onClick={this.onComplete}
                icon={EndIcon}
                showBorder
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
FlipPanel.defaultProps = {
  session: null,
  isOnFlip: false,
};
export default FlipPanel;
