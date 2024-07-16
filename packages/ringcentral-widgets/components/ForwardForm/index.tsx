import { isBlank } from '@ringcentral-integration/commons/lib/isBlank';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Button } from '../Button';
import RecipientsInput from '../RecipientsInput';

import i18n from './i18n';
import styles from './styles.scss';

const cleanRegex = /[^\d+*-\s]/g;

const ForwardNumbers = ({ numbers, onSelect, selected, formatPhone }: any) => {
  return (
    <div className={styles.numbers}>
      {numbers.map((number: any, index: any) => (
        <div
          key={number.id}
          data-sign={`forward-number-${number.label.toLowerCase()}`}
          className={clsx(
            styles.number,
            index === selected ? styles.active : null,
          )}
          onClick={() => onSelect(index)}
        >
          <span className={styles.label} title={number.label}>
            {number.label}
          </span>
          <span className={styles.colon}>:</span>
          <span>{formatPhone(number.phoneNumber)}</span>
        </div>
      ))}
    </div>
  );
};

ForwardNumbers.propTypes = {
  numbers: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
  formatPhone: PropTypes.func.isRequired,
};

class ForwardForm extends Component {
  _mounted: any;
  customInput: any;
  filter: any;
  onForward: any;
  onSelect: any;
  onSelectCustomNumber: any;
  constructor(props: any) {
    super(props);
    this.state = {
      selectedIndex: 0,
      customValue: '',
      handling: false,
      recipient: null,
    };

    this.filter = (value: any) => value.replace(cleanRegex, '');

    this.onSelect = (index: any) => {
      this.setState({
        selectedIndex: index,
      });
      // @ts-expect-error TS(2339): Property 'onChange' does not exist on type 'Readon... Remove this comment to see the full error message
      if (typeof this.props.onChange === 'function') {
        // @ts-expect-error TS(2339): Property 'onChange' does not exist on type 'Readon... Remove this comment to see the full error message
        this.props.onChange(this.getValue());
      }
    };

    this.onForward = async () => {
      this.setState({
        handling: true,
      });
      // @ts-expect-error TS(2339): Property 'onForward' does not exist on type 'Reado... Remove this comment to see the full error message
      const result = await this.props.onForward(this.getValue());
      if (!this._mounted) {
        return;
      }
      this.setState({
        handling: false,
      });
      if (result) {
        // @ts-expect-error TS(2339): Property 'onCancel' does not exist on type 'Readon... Remove this comment to see the full error message
        this.props.onCancel();
      }
    };

    this.onSelectCustomNumber = () => {
      // @ts-expect-error TS(2339): Property 'forwardingNumbers' does not exist on typ... Remove this comment to see the full error message
      this.onSelect(this.props.forwardingNumbers.length);
      setTimeout(() => {
        if (this.customInput) {
          this.customInput.focus();
        }
      }, 100);
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

  getValue() {
    // @ts-expect-error TS(2339): Property 'selectedIndex' does not exist on type 'R... Remove this comment to see the full error message
    if (this.state.selectedIndex < this.props.forwardingNumbers.length) {
      const forwardingNumber =
        // @ts-expect-error TS(2339): Property 'forwardingNumbers' does not exist on typ... Remove this comment to see the full error message
        this.props.forwardingNumbers[this.state.selectedIndex];
      return forwardingNumber && forwardingNumber.phoneNumber;
    }
    // @ts-expect-error TS(2339): Property 'recipient' does not exist on type 'Reado... Remove this comment to see the full error message
    if (this.state.recipient) {
      // @ts-expect-error TS(2339): Property 'recipient' does not exist on type 'Reado... Remove this comment to see the full error message
      return this.state.recipient.phoneNumber;
    }
    // @ts-expect-error TS(2339): Property 'customValue' does not exist on type 'Rea... Remove this comment to see the full error message
    return this.state.customValue;
  }

  _onCustomValueChange = (value: any) => {
    this.setState({
      customValue: value,
    });
  };

  _clearToNumber = () => {
    this.setState({
      customValue: '',
    });
  };

  _setRecipient = (recipient: any) => {
    this.setState({
      recipient,
    });
    this._clearToNumber();
  };

  _clearRecipient = () => {
    this.setState({
      recipient: null,
    });
  };

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const {
      // @ts-expect-error TS(2339): Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
      className,
      // @ts-expect-error TS(2339): Property 'onCancel' does not exist on type 'Readon... Remove this comment to see the full error message
      onCancel,
      // @ts-expect-error TS(2339): Property 'currentLocale' does not exist on type 'R... Remove this comment to see the full error message
      currentLocale,
      // @ts-expect-error TS(2339): Property 'forwardingNumbers' does not exist on typ... Remove this comment to see the full error message
      forwardingNumbers,
      // @ts-expect-error TS(2339): Property 'formatPhone' does not exist on type 'Rea... Remove this comment to see the full error message
      formatPhone,
      // @ts-expect-error TS(2339): Property 'searchContact' does not exist on type 'R... Remove this comment to see the full error message
      searchContact,
      // @ts-expect-error TS(2339): Property 'searchContactList' does not exist on typ... Remove this comment to see the full error message
      searchContactList,
      // @ts-expect-error TS(2339): Property 'phoneTypeRenderer' does not exist on typ... Remove this comment to see the full error message
      phoneTypeRenderer,
      // @ts-expect-error TS(2339): Property 'phoneSourceNameRenderer' does not exist ... Remove this comment to see the full error message
      phoneSourceNameRenderer,
      // @ts-expect-error TS(2339): Property 'autoFocus' does not exist on type 'Reado... Remove this comment to see the full error message
      autoFocus,
    } = this.props;
    const value = this.getValue();
    // @ts-expect-error TS(2339): Property 'handling' does not exist on type 'Readon... Remove this comment to see the full error message
    const disableButton = isBlank(value) || this.state.handling;
    return (
      <div data-sign="forwardPage" className={clsx(styles.root, className)}>
        <ForwardNumbers
          formatPhone={formatPhone}
          numbers={forwardingNumbers}
          onSelect={this.onSelect}
          // @ts-expect-error TS(2339): Property 'selectedIndex' does not exist on type 'R... Remove this comment to see the full error message
          selected={this.state.selectedIndex}
        />
        <div
          data-sign="customNumber"
          className={clsx(
            styles.custromNumber,
            // @ts-expect-error TS(2339): Property 'selectedIndex' does not exist on type 'R... Remove this comment to see the full error message
            this.state.selectedIndex === forwardingNumbers.length
              ? styles.active
              : null,
          )}
          onClick={this.onSelectCustomNumber}
        >
          <div className={styles.customLabel}>
            {i18n.getString('customNumber', currentLocale)}
          </div>
          <RecipientsInput
            label=""
            placeholder=""
            inputRef={(ref) => {
              this.customInput = ref;
            }}
            // @ts-expect-error TS(2339): Property 'customValue' does not exist on type 'Rea... Remove this comment to see the full error message
            value={this.state.customValue}
            className={styles.customInput}
            onChange={this._onCustomValueChange}
            onClean={this._clearToNumber}
            // @ts-expect-error TS(2339): Property 'recipient' does not exist on type 'Reado... Remove this comment to see the full error message
            recipient={this.state.recipient}
            addToRecipients={this._setRecipient}
            removeFromRecipients={this._clearRecipient}
            searchContact={searchContact}
            searchContactList={searchContactList}
            phoneTypeRenderer={phoneTypeRenderer}
            phoneSourceNameRenderer={phoneSourceNameRenderer}
            formatContactPhone={formatPhone}
            currentLocale={currentLocale}
            titleEnabled
            autoFocus={autoFocus}
          />
        </div>
        <div className={styles.buttonGroup}>
          <Button
            dataSign="cancel"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            {i18n.getString('cancel', currentLocale)}
          </Button>
          <Button
            dataSign="forwardCall"
            className={clsx(
              styles.forwardButton,
              disableButton ? styles.disabled : null,
            )}
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

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
ForwardForm.propTypes = {
  className: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  forwardingNumbers: PropTypes.array.isRequired,
  formatPhone: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  searchContactList: PropTypes.array.isRequired,
  searchContact: PropTypes.func.isRequired,
  phoneTypeRenderer: PropTypes.func,
  phoneSourceNameRenderer: PropTypes.func,
  autoFocus: PropTypes.bool,
};

// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
ForwardForm.defaultProps = {
  className: null,
  onChange: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  autoFocus: true,
};

export default ForwardForm;
