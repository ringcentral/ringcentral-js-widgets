import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import styles from './styles.scss';
import i18n from './i18n';

function RecipientName(props) {
  return (
    <a href="#recipient" className={styles.recipient} onClick={props.onClick}>
      {props.name}
    </a>
  );
}

RecipientName.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

function MatchedNameList(props) {
  const matchedNames = props.matchedNames;
  return (
    <div className={props.className}>
      {
        matchedNames.map(matchedName => (
          <RecipientName
            key={matchedName}
            name={matchedName}
            onClick={
              () => props.setDefaultMatchedName(matchedName)
            }
          />
        ))
      }
    </div>
  );
}

MatchedNameList.propTypes = {
  className: PropTypes.string.isRequired,
  matchedNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

class RecipientHeader extends Component {
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
    this.setDefaultMatchedName = () => {
      this.setState(preState => ({
        showDropdownList: !preState.showDropdownList,
      }));
    };
  }

  hasDropdown() {
    const recipient = this.props.recipient;
    const phoneNumber = recipient.phoneNumber || recipient.extensionNumber;
    const matchedNames = this.context.getMatcherContactList(phoneNumber);
    return matchedNames.length > 1;
  }

  render() {
    const recipient = this.props.recipient;
    const hasDropdown = this.hasDropdown();
    if (!hasDropdown) {
      return (
        <span className={styles.title}>
          {this.context.getRecipientName(recipient)}
        </span>
      );
    }
    let dropdownClass = this.props.dropdownClassName;
    if (this.state.showDropdownList) {
      dropdownClass = classnames(dropdownClass, styles.active);
    }
    const phoneNumber = recipient.phoneNumber || recipient.extensionNumber;
    let matchedNames = this.context.getMatcherContactList(phoneNumber);
    let defaultRecipient = i18n.getString('selectMatchedName', this.props.currentLocale);
    // if it have old data
    if (recipient.matchedNames && recipient.matchedNames[0]) {
      const firstMatchedName = recipient.matchedNames[0];
      const isFind = matchedNames.find(name => name === firstMatchedName);
      if (isFind) {
        defaultRecipient = firstMatchedName;
      }
      const oldMatchedNames = recipient.matchedNames.slice().sort();
      if (matchedNames.sort().join('') === oldMatchedNames.join('')) {
        matchedNames = oldMatchedNames;
      }
    }
    return (
      <div>
        <RecipientName
          name={defaultRecipient}
          onClick={this.toggleDropdown}
        />
        {this.props.dropdownIcon}
        <MatchedNameList
          matchedNames={matchedNames}
          className={dropdownClass}
          setDefaultMatchedName={this.setDefaultMatchedName}
        />
      </div>
    );
  }
}

RecipientHeader.propTypes = {
  recipient: PropTypes.shape({
    phoneNumber: PropTypes.string,
    extensionNumber: PropTypes.string,
    name: PropTypes.string,
    matchedNames: PropTypes.array,
  }).isRequired,
  currentLocale: PropTypes.string.isRequired,
  dropdownIcon: PropTypes.node.isRequired,
  dropdownClassName: PropTypes.string.isRequired,
};

RecipientHeader.contextTypes = {
  getRecipientName: PropTypes.func.isRequired,
  getMatcherContactList: PropTypes.func.isRequired,
};

export default RecipientHeader;
