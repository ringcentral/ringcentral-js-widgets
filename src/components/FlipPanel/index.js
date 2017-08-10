import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import BackHeader from '../BackHeader';
import RadioButtonGroup from '../RadioBtnGroup';
import CircleButton from '../CircleButton';
import FlipIcon from '../../assets/images/Flip.svg';
import EndIcon from '../../assets/images/End.svg';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';
import i18n from './i18n';

export default class FlipPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flipValue: this.props.flipNumbers.length === 0 ? '' : this.props.flipNumbers[0].phoneNumber,
      flipEnabled: true,
    };
    this.onRadioSelect = (value) => {
      this.setState({
        flipValue: value,
      });
    };
    this.flip = () => {
      this.props.flip(this.state.flipValue);
      this.setState({
        flipEnabled: false
      });
    };
  }
  render() {
    return (
      <div className={styles.root}>
        <BackHeader
          onBackClick={this.props.isOnFlip ? () => {} : this.props.hideFlipPanel}
          backButton={(
            <span className={styles.backButton}>
              {
                this.props.isOnFlip ? null :
                <i className={classnames(dynamicsFont.arrow, styles.backIcon)} />
              }
            </span>
          )}
          buttons={[]}
        >
          {i18n.getString('flipHeader', this.props.currentLocale)}
        </BackHeader>
        <div className={styles.flipContainer}>
          <RadioButtonGroup
            className={styles.radioGroup}
            radioOptions={this.props.flipNumbers}
            disabled={!this.state.flipEnabled}
            formatPhone={this.props.formatPhone}
            onRadioSelect={this.onRadioSelect}
          />
          <div className={styles.buttonGroup}>
            <div className={styles.button}>
              <CircleButton
                className={this.state.flipEnabled ? styles.flipButton : styles.buttonDisabled}
                iconClassName={styles.flipIcon}
                onClick={this.state.flipEnabled ? this.flip : () => {}}
                icon={FlipIcon}
                showBorder
              />
            </div>
            <div className={styles.button}>
              <CircleButton
                className={styles.hangupButton}
                iconClassName={styles.hangupIcon}
                onClick={this.props.hangup}
                icon={EndIcon}
                showBorder={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FlipPanel.propTypes = {
  isOnFlip: PropTypes.bool.isRequired,
  flipNumbers: PropTypes.array.isRequired,
  currentLocale: PropTypes.string.isRequired,
  formatPhone: PropTypes.func.isRequired,
  hideFlipPanel: PropTypes.func.isRequired,
  flip: PropTypes.func.isRequired,
  hangup: PropTypes.func.isRequired,
};
