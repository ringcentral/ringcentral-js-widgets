import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import BackButton from '../BackButton';
import BackHeader from '../BackHeader';
import RadioButtonGroup from '../RadioBtnGroup';
import CircleButton from '../CircleButton';
import FlipIcon from '../../assets/images/Flip.svg';
import EndIcon from '../../assets/images/End.svg';
import styles from './styles.scss';
import i18n from './i18n';

export default class FlipPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flipValue:
        this.props.flipNumbers.length === 0
          ? ''
          : this.props.flipNumbers[0].phoneNumber,
      flipEnabled: !this.props.isOnFlip,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { session, onCallEnd } = this.props;
    if (session && !nextProps.session) {
      onCallEnd();
    }
  }

  onRadioSelect = (value) => {
    this.setState({
      flipValue: value,
    });
  }

  onFlip = () => {
    this.props.onFlip(this.state.flipValue, this.props.sessionId);
    this.setState({
      flipEnabled: false,
    });
  }

  onComplete = () => {
    this.props.onComplete(this.props.sessionId);
  }

  render() {
    const {
      isOnFlip,
      onBack,
      currentLocale,
      flipNumbers,
      formatPhone,
    } = this.props;
    const { flipEnabled } = this.state;
    return (
      <div className={styles.root}>
        <BackHeader
          onBackClick={isOnFlip ? null : onBack}
          backButton={<BackButton showIcon={!isOnFlip} />}
        >
          <span data-sign="flipTitle" className={styles.headerTitle}>
            {i18n.getString('flipHeader', currentLocale)}
          </span>
        </BackHeader>
        <div className={styles.flipContainer}>
          <RadioButtonGroup
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
                className={classnames(
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
                className={classnames(
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

FlipPanel.propTypes = {
  isOnFlip: PropTypes.bool,
  flipNumbers: PropTypes.array.isRequired,
  currentLocale: PropTypes.string.isRequired,
  formatPhone: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onFlip: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onCallEnd: PropTypes.func.isRequired,
  session: PropTypes.object,
  sessionId: PropTypes.string.isRequired,
};

FlipPanel.defaultProps = {
  session: null,
  isOnFlip: false,
};
