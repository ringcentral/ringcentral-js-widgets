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
      flipValue: '',
    };
    this.radioSelect = (value) => {
      this.setState({
        flipValue: value,
      });
    };
    this.flip = () => {
      this.props.flip(this.state.flipValue);
    };
  }
  render() {
    const formatFlipNumbers = [];
    this.props.flipNumbers.forEach((item) => {
      formatFlipNumbers.push({
        number: this.props.formatPhone(item.phoneNumber),
        label: item.label
      });
    });
    return (
      <div className={styles.root}>
        <BackHeader
          onBackClick={this.props.hideFlipPanel}
          backButton={(
            <span className={styles.backButton}>
              <i className={classnames(dynamicsFont.arrow, styles.backIcon)} />
              <span className={styles.backLabel}>
                {i18n.getString('flipHeader', this.props.currentLocale)}
              </span>
            </span>
          )}
          buttons={[]}
        />
        <div className={styles.flipContainer}>
          <RadioButtonGroup
            radioOptions={formatFlipNumbers}
            radioSelect={this.radioSelect}
            className={styles.radioGroup}
          />
          <div className={styles.buttonGroup}>
            <div className={styles.button}>
              <CircleButton
                className={styles.flipButton}
                iconClassName={styles.flipIcon}
                onClick={this.flip}
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
  flipNumbers: PropTypes.array.isRequired,
  formatPhone: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  hideFlipPanel: PropTypes.func.isRequired,
  flip: PropTypes.func.isRequired,
  hangup: PropTypes.func.isRequired,
};
