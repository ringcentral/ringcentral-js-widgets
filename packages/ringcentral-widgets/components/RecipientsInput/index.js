import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';
import RemoveButton from '../RemoveButton';
import ContactDropdownList from '../ContactDropdownList';
import i18n from './i18n';

/**
 * Set mouse focus and move cursor to end of input
 * @param {HTMLElement} inputField
 */
const focusCampo = (inputField) => {
  inputField.blur();
  if (inputField && inputField.value.length !== 0) {
    if (inputField.createTextRange) {
      const FieldRange = inputField.createTextRange();
      FieldRange.moveStart('character', inputField.value.length);
      FieldRange.collapse();
      FieldRange.select();
    } else if (inputField.selectionStart || inputField.selectionStart === 0) {
      const elemLen = inputField.value.length;
      inputField.selectionStart = elemLen;
      inputField.selectionEnd = elemLen;
    }
  }
  inputField.focus();
};

function SelectedRecipientItem({
  phoneNumber,
  name = phoneNumber,
  title = name,
  onRemove,
}) {
  const className = phoneNumber.length > 5 ? styles.phoneNumber : styles.extension;
  return (
    <li
      className={className}
      title={title}
    >
      <span>{name}</span>
      <RemoveButton
        className={styles.removeReceiver}
        onClick={onRemove}
        visibility
      />
    </li>
  );
}

SelectedRecipientItem.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  name: PropTypes.string,
  title: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
};
SelectedRecipientItem.defaultProps = {
  name: undefined,
  title: undefined,
};

function SelectedRecipients({
  recipient,
  recipients,
  multiple,
  onRemove,
  className
}) {
  if (multiple && recipients.length) {
    return (
      <ul className={classnames(className, styles.selectReceivers)}>
        {
          recipients.map(item => (
            <SelectedRecipientItem
              key={item.phoneNumber}
              name={item.name}
              phoneNumber={item.phoneNumber}
              onRemove={() => onRemove(item.phoneNumber)}
            />
          ))
        }
      </ul>
    );
  } else if (!multiple && recipient) {
    return (
      <ul className={classnames(className, styles.selectReceivers)}>
        <SelectedRecipientItem
          key={recipient.phoneNumber}
          name={recipient.name}
          phoneNumber={recipient.phoneNumber}
          onRemove={() => onRemove(recipient.phoneNumber)}
        />
      </ul>
    );
  }
  return null;
}

SelectedRecipients.propTypes = {
  onRemove: PropTypes.func.isRequired,
  recipient: PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
  recipients: PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string,
  })).isRequired,
  multiple: PropTypes.bool.isRequired,
  className: PropTypes.string,
};
SelectedRecipients.defaultProps = {
  recipient: null,
  className: undefined,
};

class RecipientsInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      isFocusOnInput: false,
      selectedContactIndex: 0,
      scrollDirection: null,
    };

    this.setSelectedIndex = (index) => {
      this.setState({
        selectedContactIndex: index,
        scrollDirection: null,
      });
    };
    this.scrollOperation = (direction) => {
      if (direction === 'ArrowDown' || direction === 'ArrowUp') {
        this.setState({
          scrollDirection: direction,
        });
      }
    };
    this.addSelectedContactIndex = () => {
      const { length } = this.props.searchContactList;
      if (this.state.selectedContactIndex >= (length - 1)) {
        this.setState({
          selectedContactIndex: length - 1,
        });
      } else {
        this.setState(preState => ({
          selectedContactIndex: (preState.selectedContactIndex + 1),
        }));
      }
    };

    this.reduceSelectedContactIndex = () => {
      if (this.state.selectedContactIndex > 0) {
        this.setState(preState => ({
          selectedContactIndex: (preState.selectedContactIndex - 1),
        }));
      } else {
        this.setState({
          selectedContactIndex: 0,
        });
      }
    };

    this.isSplitter = (e) => {
      if (
        e.key === ',' || e.key === ';' || e.key === 'Enter' ||
        (e.key === 'Unidentified' && // for Safari (FF cannot rely on keyCode...)
          (e.keyCode === 186 || // semicolon
            e.keyCode === 188 || // comma
            e.keyCode === 13)) // enter
      ) {
        return true;
      }
      return false;
    };
    // using React SyntheticEvent to deal with cross browser issue
    this.handleHotKey = (e: React.KeyboardEvent) => {
      if (this.state.isFocusOnInput && this.state.value.length >= 3) {
        if (e.key === 'ArrowUp') {
          this.reduceSelectedContactIndex();
          this.scrollOperation(e.key);
        } else if (e.key === 'ArrowDown') {
          this.addSelectedContactIndex();
          this.scrollOperation(e.key);
        }
      } else {
        this.setState({
          selectedContactIndex: 0,
        });
      }
      if (this.isSplitter(e)) {
        e.preventDefault();
        if (this.state.value.length === 0) {
          return;
        }
        const relatedContactList = this.state.value.length >= 3 ?
          this.props.searchContactList : [];
        const currentSelected
          = relatedContactList[this.state.selectedContactIndex];
        if (currentSelected && e.key === 'Enter') {
          this.props.addToRecipients({
            name: currentSelected.name,
            phoneNumber: currentSelected.phoneNumber,
          });
        } else {
          this.props.addToRecipients({
            name: this.state.value.replace(',', ''),
            phoneNumber: this.state.value.replace(',', ''),
          });
        }
      }
    };
  }

  onInputKeyUp = (e) => {
    this.props.searchContact(e.currentTarget.value);
    this.setState({
      isFocusOnInput: true
    });
  }

  onInputFocus = () => {
    this.setState({
      isFocusOnInput: true
    });
  }

  onInputChange = (e) => {
    const { value } = e.currentTarget;
    this.setState({ value }, () => {
      this.props.onChange(value);
    });
    if (this.listRef) {
      this.listRef.scrollTop = 0;
    }
  }

  onClean = () => {
    this.setState({ value: '' });
    this.props.onClean();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.value !== undefined &&
      nextProps.value !== this.props.value &&
      nextProps.value !== this.state.value
    ) {
      this.setState({ value: nextProps.value }, () => {
        if (this.inputRef) {
          focusCampo(this.inputRef);
        }
      });
      this.props.searchContact(nextProps.value);
    }
  }

  componentDidMount() {
    this.props.searchContact(this.props.value);
    window.addEventListener('click', this.clickHandler);
    if (this.props.autoFocus) {
      this._focusTimeout = setTimeout(() => {
        if (this.inputRef) {
          this.inputRef.focus();
        }
      }, 300);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.clickHandler);
  }

  clickHandler = (evt) => {
    if (this.listRef && this.listRef.contains(evt.target)) return;
    if (this.inputRef && this.inputRef.contains(evt.target)) {
      this.setState({
        isFocusOnInput: true
      });
      return;
    }
    this.setState({
      isFocusOnInput: false
    });
  }

  _addToRecipients = (item) => {
    this.setState({ value: '', isFocusOnInput: false });
    this.props.addToRecipients(item);
  }

  setInputRef = (ref) => {
    this.inputRef = ref;
    if (typeof this.props.inputRef === 'function') {
      this.props.inputRef(ref);
    }
  }

  render() {
    // TODO a temporary fix for rendering slower search result.
    const relatedContactList = this.state.value.length >= 3 ?
      this.props.searchContactList.slice(0, 50) : [];
    const label = (
      <label>
        {
          this.props.label === undefined
            ? `${i18n.getString('to', this.props.currentLocale)}:`
            : this.props.label
        }
      </label>
    );
    const toNumberInput = !this.props.multiple && this.props.recipient ?
      null :
      (
        <div className={styles.inputWrapper}>
          <div className={styles.inputField}>
            <input
              ref={this.setInputRef}
              name="receiver"
              value={this.state.value}
              onChange={this.onInputChange}
              className={styles.numberInput}
              maxLength={30}
              onFocus={this.onInputFocus}
              onKeyUp={this.onInputKeyUp}
              placeholder={
                this.props.placeholder === undefined
                  ? i18n.getString('enterNameOrNumber', this.props.currentLocale)
                  : this.props.placeholder
              }
              autoComplete="off"
            />
          </div>
          <RemoveButton
            className={styles.removeButton}
            onClick={this.onClean}
            visibility={
              this.state.value.length > 0
            }
          />
        </div>
      );

    return (
      <div
        className={classnames(styles.container, this.props.className)}
        onKeyDown={this.handleHotKey}
      >
        {label}
        <div className={this.props.label === undefined ? styles.rightPanel : ''}>
          <SelectedRecipients
            recipient={this.props.recipient}
            recipients={this.props.recipients}
            multiple={this.props.multiple}
            onRemove={this.props.removeFromRecipients}
            className={this.props.recipientsClassName}
          />
          {toNumberInput}
        </div>
        <ContactDropdownList
          currentLocale={this.props.currentLocale}
          listRef={(ref) => { this.listRef = ref; }}
          scrollDirection={this.state.scrollDirection}
          selectedIndex={this.state.selectedContactIndex}
          setSelectedIndex={this.setSelectedIndex}
          addToRecipients={this._addToRecipients}
          items={relatedContactList}
          formatContactPhone={this.props.formatContactPhone}
          visibility={this.state.isFocusOnInput}
          titleEnabled={this.props.titleEnabled}
          phoneTypeRenderer={this.props.phoneTypeRenderer}
          contactInfoRenderer={this.props.contactInfoRenderer}
          contactPhoneRenderer={this.props.contactPhoneRenderer}
        />
      </div>
    );
  }
}

RecipientsInput.propTypes = {
  className: PropTypes.string,
  recipientsClassName: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  searchContactList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    entityType: PropTypes.string.isRequired,
    phoneType: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  })).isRequired,
  recipient: PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
  recipients: PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string,
  })),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClean: PropTypes.func.isRequired,
  addToRecipients: PropTypes.func.isRequired,
  removeFromRecipients: PropTypes.func.isRequired,
  formatContactPhone: PropTypes.func.isRequired,
  searchContact: PropTypes.func,
  titleEnabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  currentLocale: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  inputRef: PropTypes.func,
  phoneTypeRenderer: PropTypes.func,
  contactInfoRenderer: PropTypes.func,
  contactPhoneRenderer: PropTypes.func,
};

RecipientsInput.defaultProps = {
  className: undefined,
  recipientsClassName: undefined,
  label: undefined,
  placeholder: undefined,
  recipient: null,
  recipients: [],
  searchContact: () => null,
  titleEnabled: undefined,
  autoFocus: false,
  multiple: false,
  inputRef: undefined,
  phoneTypeRenderer: undefined,
  contactInfoRenderer: undefined,
  contactPhoneRenderer: undefined,
};

export default RecipientsInput;
