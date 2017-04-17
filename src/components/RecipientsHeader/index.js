import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import RecipientHeader from '../RecipientHeader';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';

import styles from './styles.scss';

function Recipient(props) {
  return (
    <a href="#recipient" className={styles.recipient} onClick={props.onClick} title={props.title}>
      {props.name}
    </a>
  );
}

Recipient.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

function RecipientList(props) {
  const recipients = props.recipients;
  return (
    <div className={props.className}>
      {
        recipients.map(receiver => (
          <Recipient
            key={`${receiver.extensionNumber}${receiver.phoneNumber}${receiver.name}`}
            name={props.getRecipientName(receiver)}
            title={props.titleEnabled && props.getRecipientName(receiver)}
            onClick={
              () => props.setDefaultRecipient(
                receiver.extensionNumber || receiver.phoneNumber
              )
            }
          />
        ))
      }
    </div>
  );
}

RecipientList.propTypes = {
  getRecipientName: PropTypes.func.isRequired,
  setDefaultRecipient: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  titleEnabled: PropTypes.bool,
  recipients: PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string,
    extensionNumber: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

class RecipientsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdownList: false,
    };
    this.toggleDropdown = () => {
      this.setState(preState => ({
        showDropdownList: !preState.showDropdownList,
      }));
    };
    this.setDefaultRecipient = (phoneNumber) => {
      this.context.changeDefaultRecipient(phoneNumber);
      this.setState(preState => ({
        showDropdownList: !preState.showDropdownList,
      }));
    };
  }

  render() {
    const recipients = this.props.recipients;
    if (recipients.length === 0) {
      return null;
    }
    console.debug('recipients', recipients);
    let dropdownClass = styles.dropdownList;
    let dropdownArrowClass = classnames(dynamicsFont.arrow, styles.dropdownIcon);
    if (recipients.length === 1) {
      return (
        <h1 className={styles.container}>
          <RecipientHeader
            recipient={recipients[0]}
            currentLocale={this.props.currentLocale}
            dropdownClassName={dropdownClass}
          />
        </h1>
      );
    }
    const defaultRecipient = recipients[0];
    if (this.state.showDropdownList) {
      dropdownClass = classnames(dropdownClass, styles.active);
      dropdownArrowClass = classnames(dynamicsFont.arrow, styles.dropdownActiveIcon);
    }
    return (
      <h1 className={styles.container}>
        <Recipient
          name={this.context.getRecipientName(defaultRecipient)}
          title={this.context.getRecipientName(defaultRecipient)}
          onClick={this.toggleDropdown}
        />
        <i
          className={dropdownArrowClass}
          onClick={this.toggleDropdown}
        />
        <RecipientList
          recipients={recipients}
          className={dropdownClass}
          setDefaultRecipient={this.setDefaultRecipient}
          getRecipientName={this.context.getRecipientName}
          titleEnabled
        />
      </h1>
    );
  }
}

RecipientsHeader.propTypes = {
  recipients: RecipientList.propTypes.recipients,
  currentLocale: PropTypes.string.isRequired,
};

RecipientsHeader.contextTypes = {
  getRecipientName: PropTypes.func.isRequired,
  changeDefaultRecipient: PropTypes.func.isRequired,
};

export default RecipientsHeader;
