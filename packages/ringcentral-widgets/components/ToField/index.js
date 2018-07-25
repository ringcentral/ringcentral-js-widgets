import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import RemoveButton from '../RemoveButton';
import ContactDropdownList from '../ContactDropdownList';
import i18n from './i18n';

function SelectedRecipientItem({
  phoneNumber,
  name = phoneNumber,
  onRemove,
}) {
  const className = phoneNumber.length > 5 ? styles.phoneNumber : styles.extension;
  return (
    <li className={className}>
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
  name: PropTypes.string,
  phoneNumber: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};
SelectedRecipientItem.defaultProps = {
  name: undefined,
};

function SelectedRecipients({
  items,
  removeFromRecipients,
}) {
  if (items.length < 1) {
    return null;
  }
  return (
    <ul className={styles.selectReceivers}>
      {
        items.map(item => (
          <SelectedRecipientItem
            key={item.phoneNumber}
            name={item.name}
            phoneNumber={item.phoneNumber}
            onRemove={() => removeFromRecipients(item.phoneNumber)}
          />
        ))
      }
    </ul>
  );
}

SelectedRecipients.propTypes = {
  removeFromRecipients: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string,
  })).isRequired,
};

export default class ToField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocusOnInput: false,
      selectedContactIndex: 0,
      scrollDirection: null,
      currentValue: props.value.replace(',', ''),
    };
  }
  onReceiversInputFocus = () => {
    this.setState({
      isFocusOnInput: true,
    });
  }

  onReceiversInputBlur = () => {
    this.setState({
      isFocusOnInput: false,
    });
  }
  onReceiversInputKeyUp = (e) => {
    this.props.searchContact({ searchString: e.currentTarget.value });
  }

  setSelectedIndex = (index) => {
    this.setState({
      selectedContactIndex: index,
      scrollDirection: null,
    });
  }
  scrollOperation = (direction) => {
    if (direction === 'ArrowDown' || direction === 'ArrowUp') {
      this.setState({
        scrollDirection: direction,
      });
    }
  }
  addSelectedContactIndex = () => {
    const length = this.props.searchResults.length;
    if (this.state.selectedContactIndex >= (length - 1)) {
      this.setState({
        selectedContactIndex: length - 1,
      });
    } else {
      this.setState(preState => ({
        selectedContactIndex: (preState.selectedContactIndex + 1),
      }));
    }
  }

  reduceSelectedContactIndex = () => {
    if (this.state.selectedContactIndex > 0) {
      this.setState(preState => ({
        selectedContactIndex: (preState.selectedContactIndex - 1),
      }));
    } else {
      this.setState({
        selectedContactIndex: 0,
      });
    }
  }

  isSplitter = (e) => {
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
  }
  // using React SyntheticEvent to deal with cross browser issue
  handleHotKey = (e: React.KeyboardEvent) => {
    if (this.state.isFocusOnInput && this.props.value.length >= 3) {
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
      if (this.props.value.length === 0) {
        return;
      }
      const relatedContactList = this.props.value.length >= 3 ?
        this.props.searchResults : [];
      const currentSelected
        = relatedContactList[this.state.selectedContactIndex];
      if (currentSelected && e.key === 'Enter') {
        this.props.addToRecipients({
          name: currentSelected.name,
          phoneNumber: currentSelected.phoneNumber,
        });
      } else {
        this.props.addToRecipients({
          name: this.props.value.replace(',', ''),
          phoneNumber: this.props.value.replace(',', ''),
        });
        this.props.onClean();
      }
      this.props.onClean();
    }
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      currentValue: newProps.value.replace(',', '')
    });
    if (newProps.value &&
      newProps.value !== this.props.value &&
      this.props.value[this.props.value.length - 1] === ',') {
      this.setState({
        isFocusOnInput: true,
      });
      this.props.addToRecipients({
        name: this.props.value.replace(',', ''),
        phoneNumber: this.props.value.replace(',', ''),
      }, false);
    }
  }
  componentDidMount() {
    this.props.searchContact({ searchString: this.props.value });
  }
  render() {
    const relatedContactList = this.props.value.length >= 3 ?
      this.props.searchResults : [];
    const label = (
      <label>
        {
          this.props.label ||
          i18n.getString('to', this.props.currentLocale)
        }
      </label>
    );
    return (
      <div className={styles.container} onKeyDown={this.handleHotKey}>
        {label}
        <div className={styles.rightPanel}>
          <SelectedRecipients
            items={this.props.recipients}
            removeFromRecipients={this.props.removeFromRecipients}
          />
          <div className={styles.inputField}>
            <input
              name="receiver"
              value={this.state.currentValue}
              onChange={this.props.onChange}
              onKeyUp={this.onInputKeyUp}
              className={styles.numberInput}
              maxLength={30}
              onFocus={this.onReceiversInputFocus}
              onBlur={this.onReceiversInputBlur}
              placeholder={
                this.props.placeholder ||
                i18n.getString('enterNameOrNumber', this.props.currentLocale)
              }
              autoComplete="off"
              autoFocus={this.props.autoFocus} // eslint-disable-line
            />
          </div>
          <RemoveButton
            className={styles.removeButton}
            onClick={this.props.onClean}
            visibility={
              this.props.value.length > 0 &&
              this.state.isFocusOnInput
            }
          />
        </div>
        <ContactDropdownList
          currentLocale={this.props.currentLocale}
          scrollDirection={this.state.scrollDirection}
          selectedIndex={this.state.selectedContactIndex}
          setSelectedIndex={this.setSelectedIndex}
          addToRecipients={this.props.addToRecipients}
          items={relatedContactList}
          formatContactPhone={this.props.formatPhone}
          visibility={this.state.isFocusOnInput}
          titleEnabled={this.props.titleEnabled}
        />
      </div>
    );
  }
}

ToField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  searchContact: PropTypes.func,
  searchResults: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    entityType: PropTypes.string.isRequired,
    phoneType: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  })),
  recipients: PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string,
  })).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClean: PropTypes.func.isRequired,
  addToRecipients: PropTypes.func.isRequired,
  removeFromRecipients: PropTypes.func.isRequired,
  formatPhone: PropTypes.func,
  titleEnabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  currentLocale: PropTypes.string.isRequired,
};

ToField.defaultProps = {
  label: null,
  placeholder: null,
  titleEnabled: undefined,
  autoFocus: false,
  searchContact: () => null,
  formatPhone: phoneNumber => phoneNumber,
  searchResults: [],
};

