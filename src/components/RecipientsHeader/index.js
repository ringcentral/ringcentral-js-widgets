import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import rcFont from '../../assets/RcFont/RcFont.scss';

import styles from './styles.scss';

function Recipient(props) {
  return (
    <span className={styles.recipient} onClick={props.onClick}>
      {props.name}
    </span>
  );
}

Recipient.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

function RecipientList(props) {
  const recipients = this.props.recipients;
  return (
    <div className={props.className}>
      {
        recipients.map(receiver => (
          <Recipient
            key={JSON.stringify(receiver)}
            name={this.context.getRecipientName(receiver)}
            onClick={
              () => this.props.setDefaultRecipient(
                receiver.extensionNumber || receiver.phoneNumber
              )
            }
          />
        ))
      }
    </div>
  );
}

RecipientList.contextTypes = {
  getRecipientName: PropTypes.func.isRequired,
};

RecipientList.propTypes = {
  setDefaultRecipient: PropTypes.func.isRequired,
  className: PropTypes.string,
  recipients: React.PropTypes.arrayOf(PropTypes.shape({
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
      if (!this.hasDropdown()) {
        return;
      }
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

  hasDropdown() {
    return this.props.recipients.length > 1;
  }

  render() {
    const recipients = this.props.recipients;
    const defaultRecipient = recipients[0];
    let dropdownList = null;
    const hasDropdown = this.hasDropdown();
    if (hasDropdown) {
      let dropdownClass = styles.dropdownList;
      if (this.state.showDropdownList) {
        dropdownClass = classnames(dropdownClass, styles.active);
      }
      dropdownList = (
        <RecipientList
          recipients={recipients}
          className={dropdownClass}
          setDefaultRecipient={this.setDefaultRecipient}
        />
      );
    }
    return (
      <h1 className={styles.container}>
        {
          defaultRecipient &&
          <Recipient
            name={this.context.getRecipientName(defaultRecipient)}
            onClick={this.toggleDropdown}
          />
        }
        {
          hasDropdown &&
          <span
            href="#"
            className={classnames(rcFont.icon_dropdown_arrow, styles.dropdownIcon)}
            onClick={this.toggleDropdown}
          />
        }
        {dropdownList}
      </h1>
    );
  }
}

RecipientsHeader.propTypes = {
  recipients: RecipientList.propTypes.recipients,
};

RecipientsHeader.contextTypes = {
  getRecipientName: PropTypes.func.isRequired,
  changeDefaultRecipient: PropTypes.func.isRequired,
};

export default RecipientsHeader;
