import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isBlank from 'ringcentral-integration/lib/isBlank';

import TextInput from '../TextInput';
import Button from '../Button';

import styles from './styles.scss';
import i18n from './i18n';

const cleanRegex = /[^\d+*-]/g;

function ForwardNumbers({
  numbers,
  onSelect,
  selected,
  formatPhone,
}) {
  return (
    <div className={styles.numbers}>
      {
        numbers.map((number, index) => (
          <div
            key={number.id}
            className={
              classnames(styles.number, (index === selected ? styles.active : null))
            }
            onClick={() => onSelect(index)}
          >
            <span className={styles.label} title={number.label}>{number.label}</span>
            <span className={styles.colon}>:</span>
            <span className={styles.phoneNumber} title={formatPhone(number.phoneNumber)}>{formatPhone(number.phoneNumber)}</span>
          </div>
        ))
      }
    </div>
  );
}

ForwardNumbers.propTypes = {
  numbers: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
  formatPhone: PropTypes.func.isRequired,
};

export default class ForwardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      customValue: '',
      handling: false,
    };

    this.filter = value => value.replace(cleanRegex, '');
    this.onCustomValueChange = (e) => {
      const value = e.currentTarget.value;
      const cleanValue = this.filter(value);
      this.setState({
        customValue: cleanValue,
      });
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(cleanValue);
      }
    };

    this.onSelect = (index) => {
      this.setState({
        selectedIndex: index,
      });
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.getValue());
      }
    };

    this.onForward = async () => {
      this.setState({
        handling: true,
      });
      const result = await this.props.onForward(this.getValue());
      if (!this._mounted) {
        return;
      }
      this.setState({
        handling: false,
      });
      if (result) {
        this.props.onCancel();
      }
    };

    this.onSelectCustomNumber = () => {
      this.onSelect(this.props.forwardingNumbers.length);
      if (this.customInput && this.customInput.input) {
        setTimeout(() => {
          this.customInput.input.focus();
        }, 100);
      }
    };
  }

  componentDidMount() {
    this._mounted = true;
    this.focusInput();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  getValue() {
    if (this.state.selectedIndex < this.props.forwardingNumbers.length) {
      const forwardingNumber = this.props.forwardingNumbers[this.state.selectedIndex];
      return (
        forwardingNumber && forwardingNumber.phoneNumber
      );
    }
    return this.state.customValue;
  }

  focusInput() {
    if (
      this.state.selectedIndex === this.props.forwardingNumbers.length &&
      this.customInput &&
      this.customInput.input
    ) {
      this.customInput.input.focus();
    }
  }

  render() {
    const {
      className,
      onCancel,
      currentLocale,
      forwardingNumbers,
      formatPhone,
    } = this.props;
    const value = this.getValue();
    const disableButton = isBlank(value) && !this.state.handling;
    return (
      <div className={classnames(styles.root, className)}>
        <ForwardNumbers
          formatPhone={formatPhone}
          numbers={forwardingNumbers}
          onSelect={this.onSelect}
          selected={this.state.selectedIndex}
        />
        <div
          className={
            classnames(
              styles.custromNumber,
              this.state.selectedIndex === forwardingNumbers.length ? styles.active : null
            )
          }
          onClick={this.onSelectCustomNumber}
        >
          <div className={styles.customLabel}>
            {i18n.getString('customNumber', currentLocale)}
          </div>
          <TextInput
            ref={(input) => { this.customInput = input; }}
            filter={this.filter}
            className={styles.customInput}
            value={this.state.customValue}
            onChange={this.onCustomValueChange}
          />
        </div>
        <div className={styles.buttonGroup}>
          <Button
            className={styles.cancelButton}
            onClick={onCancel}
          >
            {i18n.getString('cancel', currentLocale)}
          </Button>
          <Button
            className={
              classnames(styles.forwardButton, disableButton ? styles.disabled : null)
            }
            onClick={this.onForward}
            disabled={disableButton}
          >
            <span className={styles.buttonText}>
              {i18n.getString('forward', currentLocale)}
            </span>
          </Button>
        </div>
      </div>
    );
  }
}

ForwardForm.propTypes = {
  className: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  forwardingNumbers: PropTypes.array.isRequired,
  formatPhone: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
  onChange: PropTypes.func,
};

ForwardForm.defaultProps = {
  className: null,
  onChange: undefined,
};
