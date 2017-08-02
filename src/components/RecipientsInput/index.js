import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import RemoveButton from '../RemoveButton';
import ContactDropdownList from '../ContactDropdownList';

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

function SelectedRecipients(props) {
  const items = props.items;
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
            onRemove={() => props.removeFromRecipients(item.phoneNumber)}
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

class RecipientsInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocusOnInput: false,
      selectedContactIndex: 0,
      scrollDirection: null,
      currentValue: props.value.replace(',', ''),
    };

    this.onReceiversInputFocus = () => {
      this.setState({
        isFocusOnInput: true,
      });
    };

    this.onReceiversInputBlur = () => {
      this.setState({
        isFocusOnInput: false,
      });
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
      const length = this.props.searchContactList.length;
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
            name: this.props.value.replace(',', ''),
            phoneNumber: this.props.value.replace(',', ''),
          });
          this.props.onClean();
        }
        this.props.onClean();
      }
    };
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
  render() {
    const relatedContactList = this.props.value.length >= 3 ?
      this.props.searchContactList : [];
    const label = this.props.label ?
      (
        <label>{this.props.label}</label>
      ) : null;
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
              onKeyUp={this.props.onKeyUp}
              onKeyDown={this.props.onKeyDown}
              className={styles.numberInput}
              maxLength={30}
              onFocus={this.onReceiversInputFocus}
              onBlur={this.onReceiversInputBlur}
              placeholder={this.props.placeholder}
              autoComplete="off"
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
          scrollDirection={this.state.scrollDirection}
          selectedIndex={this.state.selectedContactIndex}
          setSelectedIndex={this.setSelectedIndex}
          addToRecipients={this.props.addToRecipients}
          items={relatedContactList}
          formatContactPhone={this.props.formatContactPhone}
          className={styles.contactsDropdown}
          visibility={this.state.isFocusOnInput}
          titleEnabled={this.props.titleEnabled}
        />
      </div>
    );
  }
}

RecipientsInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  searchContactList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    entityType: PropTypes.string.isRequired,
    phoneType: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  })).isRequired,
  recipients: PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string,
  })).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClean: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func,
  onKeyDown: PropTypes.func,
  addToRecipients: PropTypes.func.isRequired,
  removeFromRecipients: PropTypes.func.isRequired,
  formatContactPhone: PropTypes.func.isRequired,
  titleEnabled: PropTypes.bool,
};

RecipientsInput.defaultProps = {
  label: null,
  placeholder: '',
  onKeyUp: () => null,
  onKeyDown: () => null,
  titleEnabled: undefined,
};

export default RecipientsInput;
