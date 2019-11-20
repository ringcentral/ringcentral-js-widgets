import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';
import i18n from './i18n';

function RadioOption(props) {
  const {
    dataSign,
    currentIndex,
    selectedIndex,
    phoneNumber,
    label,
    currentLocale,
    onSelect,
  } = props;
  let btnClassName = '';
  if (currentIndex === selectedIndex) {
    btnClassName = classnames(styles.radioBtn, styles.active);
  } else {
    btnClassName = styles.radioBtn;
  }
  return (
    <div
      data-sign={dataSign}
      className={styles.radioOption}
      onClick={() => {
        onSelect(currentIndex);
      }}
    >
      <span className={btnClassName} />
      <span className={styles.optionNumber} title={phoneNumber}>
        {phoneNumber}
      </span>
      <span className={styles.optionLabel} title={label}>
        {i18n.getString(label, currentLocale)}
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
  dataSign: PropTypes.string,
};
RadioOption.defaultProps = {
  label: '',
  dataSign: '',
};

export default class RadioButtonGroup extends Component {
  constructor(props) {
    super(props);

    const { disabled, onRadioSelect, radioOptions } = props;
    this.state = {
      selectedIndex: 0,
    };
    this.chooseOption = (index) => {
      if (!disabled) {
        this.setState({
          selectedIndex: index,
        });
        onRadioSelect(radioOptions[index].phoneNumber);
      }
    };
  }

  render() {
    const {
      dataSign,
      className,
      radioOptions,
      formatPhone,
      currentLocale,
    } = this.props;

    const { selectedIndex } = this.state;
    return (
      <div className={classnames(styles.root, className)}>
        {radioOptions.map((number, idx) => (
          <RadioOption
            dataSign={dataSign}
            currentIndex={idx}
            selectedIndex={selectedIndex}
            key={number.id}
            phoneNumber={formatPhone(number.phoneNumber)}
            label={number.label}
            onSelect={this.chooseOption}
            currentLocale={currentLocale}
          />
        ))}
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
  dataSign: PropTypes.string,
};
RadioButtonGroup.defaultProps = {
  dataSign: '',
};
