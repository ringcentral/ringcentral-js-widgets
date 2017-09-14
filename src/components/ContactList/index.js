import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ContactItem from '../ContactItem';
import styles from './styles.scss';
import i18n from './i18n';

function NoContacts({ currentLocale }) {
  return (
    <p className={styles.noContacts}>
      {i18n.getString('noContacts', currentLocale)}
    </p>
  );
}
NoContacts.propTypes = {
  currentLocale: PropTypes.string.isRequired,
};

function ContactGroup({ caption, contacts, getAvatarUrl, getPresence, onItemSelect }) {
  return (
    <div className={styles.contactGroup}>
      <div className={styles.groupCaption}>
        {caption}
      </div>
      {
        contacts.map(contact => (
          <ContactItem
            key={contact.id}
            contact={contact}
            getAvatarUrl={getAvatarUrl}
            getPresence={getPresence}
            onSelect={onItemSelect}
          />
        ))
      }
    </div>
  );
}
ContactGroup.propTypes = {
  onItemSelect: PropTypes.func,
  getAvatarUrl: PropTypes.func.isRequired,
  getPresence: PropTypes.func.isRequired,
  caption: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(ContactItem.propTypes.contact).isRequired,
};
ContactGroup.defaultProps = {
  onItemSelect: undefined,
};

export default class ContactList extends Component {
  constructor(props) {
    super(props);
    this.goesDown = true;
    this.onScroll = this.onScroll.bind(this);
  }

  onScroll(ev) {
    if (this.goesDown) {
      if (
        ev.target.scrollTop > 0 &&
        (ev.target.scrollTop + ev.target.clientHeight) > (ev.target.scrollHeight - 20)
      ) {
        this.goesDown = false;
        const { currentPage, onNextPage } = this.props;
        if (onNextPage) {
          const curr = (currentPage || 1);
          onNextPage(curr + 1);
        }
      }
    } else if ((ev.target.scrollTop + ev.target.clientHeight) < (ev.target.scrollHeight - 30)) {
      this.goesDown = true;
    }
  }

  render() {
    const {
      currentLocale,
      contactGroups,
      getAvatarUrl,
      getPresence,
      onItemSelect,
    } = this.props;
    return (
      <div
        className={styles.root}
        onScroll={this.onScroll}
      >
        {
          contactGroups.length ?
            contactGroups.map(group => (
              <ContactGroup
                key={group.id}
                caption={group.caption}
                contacts={group.contacts}
                getAvatarUrl={getAvatarUrl}
                getPresence={getPresence}
                onItemSelect={onItemSelect}
              />
            )) :
            <NoContacts
              currentLocale={currentLocale}
            />
        }
      </div>
    );
  }
}

ContactList.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  contactGroups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    contacts: PropTypes.arrayOf(ContactItem.propTypes.contact).isRequired,
  })).isRequired,
  getAvatarUrl: PropTypes.func.isRequired,
  getPresence: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  onNextPage: PropTypes.func,
  onItemSelect: PropTypes.func,
};

ContactList.defaultProps = {
  currentPage: undefined,
  onNextPage: undefined,
  onItemSelect: undefined,
};
