import React, { PropTypes, Component } from 'react';
import styles from './styles.scss';
import RemoveButton from '../RemoveButton';
import ContactDropdownList from '../ContactDropdownList';

function SelectedRecipientItem(props) {
  const className = props.phoneNumber.length > 5 ? styles.blue : null;
  return (
    <li className={className}>
      <span>{props.name}</span>
      <RemoveButton
        className={styles.removeReceiver}
        onClick={props.onRemove}
        visibility
      />
    </li>
  );
}

SelectedRecipientItem.propTypes = {
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
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
  items: React.PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

class RecipientsInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocusOnInput: false,
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
  }

  render() {
    const props = this.props;
    let relatedContactList = [];
    if (props.value.length >= 3) {
      relatedContactList = this.props.searchContactList;
    }
    return (
      <div className={styles.container}>
        <SelectedRecipients
          items={props.recipients}
          removeFromRecipients={props.removeFromRecipients}
        />
        <input
          name="receiver"
          value={props.value}
          onChange={props.onChange}
          onKeyUp={props.onKeyUp}
          className={styles.numberInput}
          maxLength={30}
          onFocus={this.onReceiversInputFocus}
          onBlur={this.onReceiversInputBlur}
          placeholder={props.placeholder}
          autoComplete="off"
        />
        <RemoveButton
          className={styles.removeButton}
          onClick={props.onClean}
          visibility={
            props.value.length > 0 &&
            this.state.isFocusOnInput
          }
        />
        <ContactDropdownList
          addToRecipients={props.addToRecipients}
          items={relatedContactList}
          formatPhone={props.formatPhone}
          className={styles.contactsDropdown}
          visibility={this.state.isFocusOnInput}
        />
      </div>
    );
  }
}

RecipientsInput.propTypes = {
  placeholder: PropTypes.string,
  searchContactList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    entityType: PropTypes.string.isRequired,
    phoneType: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  })).isRequired,
  recipients: React.PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClean: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func,
  addToRecipients: PropTypes.func,
  removeFromRecipients: PropTypes.func,
};

RecipientsInput.defaultProps = {
  placeholder: '',
  onKeyUp: () => null,
};

export default RecipientsInput;
