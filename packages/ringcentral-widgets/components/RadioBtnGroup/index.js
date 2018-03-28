import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';
import i18n from './i18n';

function RadioOption(props) {
  let btnClassName = '';
  if (props.currentIndex === props.selectedIndex) {
    btnClassName = classnames(styles.radioBtn, styles.active);
  } else {
    btnClassName = styles.radioBtn;
  }
  return (
    <div className={styles.radioOption} onClick={() => { props.onSelect(props.currentIndex); }}>
      <span className={btnClassName} />
      <span className={styles.optionNumber}>
        {props.phoneNumber}
      </span>
      <span className={styles.optionLabel} title={props.label}>
        {i18n.getString(props.label, props.currentLocale)}
      </span>
    </div>
  );
}
RadioOption.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  label: PropTypes.string,
  selectedIndex: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
};
RadioOption.defaultProps = {
  label: ''
};

export default class RadioButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
    this.chooseOption = (index) => {
      if (!this.props.disabled) {
        this.setState({
          selectedIndex: index,
        });
        this.props.onRadioSelect(this.props.radioOptions[index].phoneNumber);
      }
    };
  }
  render() {
    return (
      <div className={classnames(styles.root, this.props.className)}>
        {
          this.props.radioOptions.map((number, idx) => (
            <RadioOption
              currentIndex={idx}
              selectedIndex={this.state.selectedIndex}
              key={number.id}
              phoneNumber={this.props.formatPhone(number.phoneNumber)}
              label={number.label}
              onSelect={this.chooseOption}
              currentLocale={this.props.currentLocale}
            />
         ))
        }
      </div>
    );
  }
}

RadioButtonGroup.propTypes = {
  className: PropTypes.string.isRequired,
  radioOptions: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  formatPhone: PropTypes.func.isRequired,
  onRadioSelect: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
};
