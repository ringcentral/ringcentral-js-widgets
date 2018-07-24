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
      flipValue: this.props.flipNumbers.length === 0 ? '' : this.props.flipNumbers[0].phoneNumber,
      flipEnabled: !this.props.isOnFlip,
    };
    this.onRadioSelect = (value) => {
      this.setState({
        flipValue: value,
      });
    };
    this.onFlip = () => {
      this.props.onFlip(this.state.flipValue);
      this.setState({
        flipEnabled: false,
      });
    };
  }
  render() {
    return (
      <div className={styles.root}>
        <BackHeader
          onBackClick={this.props.isOnFlip ? null : this.props.hideFlipPanel}
          backButton={<BackButton showIcon={!this.props.isOnFlip} />}
        >
          <span className={styles.headerTitle}>
            {i18n.getString('flipHeader', this.props.currentLocale)}
          </span>
        </BackHeader>
        <div className={styles.flipContainer}>
          <RadioButtonGroup
            className={styles.radioGroup}
            radioOptions={this.props.flipNumbers}
            disabled={!this.state.flipEnabled}
            formatPhone={this.props.formatPhone}
            onRadioSelect={this.onRadioSelect}
            currentLocale={this.props.currentLocale}
          />
          <div className={styles.buttonGroup}>
            <div className={styles.button} title={i18n.getString('flip', this.props.currentLocale)}>
              <CircleButton
                disabled={!this.state.flipEnabled}
                className={
                  classnames(styles.flipButton, this.state.flipEnabled ? '' : styles.disabled)
                }
                iconClassName={styles.flipIcon}
                onClick={this.onFlip}
                icon={FlipIcon}
                showBorder
              />
            </div>
            <div className={styles.button} title={i18n.getString('complete', this.props.currentLocale)}>
              <CircleButton
                disabled={!this.props.isOnFlip}
                className={
                  classnames(styles.completeButton, this.props.isOnFlip ? '' : styles.disabled)
                }
                onClick={this.props.complete}
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
  isOnFlip: PropTypes.bool.isRequired,
  flipNumbers: PropTypes.array.isRequired,
  currentLocale: PropTypes.string.isRequired,
  formatPhone: PropTypes.func.isRequired,
  hideFlipPanel: PropTypes.func.isRequired,
  onFlip: PropTypes.func.isRequired,
  complete: PropTypes.func.isRequired,
};
