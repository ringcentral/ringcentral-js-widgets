import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import i18n from './i18n';
import styles from './styles.scss';

const RadioOption = (props: any) => {
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
    btnClassName = clsx(styles.radioBtn, styles.active);
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
};
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

class RadioButtonGroup extends Component {
  chooseOption: any;
  constructor(props: any) {
    super(props);

    const { disabled, onRadioSelect, radioOptions } = props;
    this.state = {
      selectedIndex: 0,
    };
    this.chooseOption = (index: any) => {
      if (!disabled) {
        this.setState({
          selectedIndex: index,
        });
        onRadioSelect(radioOptions[index].phoneNumber);
      }
    };
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    // @ts-expect-error TS(2339): Property 'dataSign' does not exist on type 'Readon... Remove this comment to see the full error message
    const { dataSign, className, radioOptions, formatPhone, currentLocale } =
      this.props;

    // @ts-expect-error TS(2339): Property 'selectedIndex' does not exist on type 'R... Remove this comment to see the full error message
    const { selectedIndex } = this.state;
    return (
      <div className={clsx(styles.root, className)}>
        {radioOptions.map((number: any, idx: any) => (
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

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
RadioButtonGroup.propTypes = {
  className: PropTypes.string.isRequired,
  radioOptions: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  formatPhone: PropTypes.func.isRequired,
  onRadioSelect: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  dataSign: PropTypes.string,
};
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
RadioButtonGroup.defaultProps = {
  dataSign: '',
};

export default RadioButtonGroup;
