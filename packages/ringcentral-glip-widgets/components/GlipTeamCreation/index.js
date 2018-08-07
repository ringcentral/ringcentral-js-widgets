import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'ringcentral-widgets/components/Modal';
import SearchInput from 'ringcentral-widgets/components/SearchInput';
import TextInput from 'ringcentral-widgets/components/TextInput';

import styles from './styles.scss';

export default class GlipTeamCreationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedContacts: [],
      teamName: '',
      creating: false,
      error: null
    };

    this.updateSeachString = (e) => {
      this.setState({
        error: null
      });
      const searchString = e.target.value;
      this.props.updateFilter(searchString);
    };

    this.updateTeamName = (e) => {
      const name = e.target.value;
      this.setState({
        teamName: name,
        error: null
      });
    };

    this.removeContact = (email) => {
      this.setState(previousState => ({
        selectedContacts:
          previousState.selectedContacts.filter(c => c.email !== email)
      }));
    };

    this.onCancel = () => {
      this.props.updateFilter('');
      this.props.closeModal();
      this.setState({
        selectedContacts: [],
        teamName: ''
      });
    };

    this.onConfirm = async () => {
      if (this.state.creating) {
        return;
      }
      if (this.state.teamName === '') {
        this.setState({ error: 'Please enter a valid team name.' });
        return;
      }
      if (this.state.selectedContacts.length === 0) {
        this.setState({ error: 'Please select team number.' });
        return;
      }
      this.setState({ creating: true });
      try {
        await this.props.createTeam(this.state);
        this.props.updateFilter('');
        this.setState({
          selectedContacts: [],
          teamName: '',
          creating: false
        });
        this.props.closeModal();
      } catch (e) {
        console.log(e.message);
        this.setState({ error: e.message, creating: false });
      }
    };

    this.addContact = (contact) => {
      this.setState({
        error: null
      });
      const oldIndex = this.state.selectedContacts
                           .findIndex(c => c.email === contact.email);
      if (oldIndex > -1) {
        return;
      }

      this.setState({
        selectedContacts: [{
          name: contact.name,
          email: contact.email
        }].concat(this.state.selectedContacts)
      });
      this.props.updateFilter('');
    };
  }

  render() {
    let contacts;
    if (this.props.searchFilter.length < 3) {
      contacts = [];
    } else {
      contacts = this.props.filteredContacts.slice(0, 10);
    }
    return (
      <Modal
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
        currentLocale="en-US"
        show={this.props.show}
        title="Create Team"
        textCancel="Close"
        textConfirm={this.state.creating ? 'Creating' : 'Create'}
      >
        {
          this.state.error ? (
            <div className={styles.errorMessage}>
              {this.state.error}
            </div>
          ) : null
        }
        <TextInput
          className={styles.teamName}
          value={this.state.teamName}
          onChange={this.updateTeamName}
          placeholder={'Team name'}
        />
        <SearchInput
          className={styles.searchInput}
          value={this.props.searchFilter}
          onChange={this.updateSeachString}
          placeholder={'Search and add people..'}
        />
        <div className={styles.selectedContacts}>
          {
            this.state.selectedContacts.map(contact => (
              <span
                className={styles.selectedContactItem}
                key={contact.email}
              >
                {contact.name}
                <span
                  className={styles.closeIcon}
                  onClick={() => this.removeContact(contact.email)}
                >
                  x
                </span>
              </span>
            ))
          }
        </div>
        <div className={styles.contacts}>
          {
            contacts.map(contact => (
              <div
                className={styles.contactItem}
                key={contact.email}
                onClick={() => this.addContact(contact)}
              >
                <div className={styles.contactName} title={contact.name}>{contact.name}</div>
                <div className={styles.contactEmail} title={contact.email}>{contact.email}</div>
              </div>
            ))
          }
        </div>
      </Modal>
    );
  }
}

GlipTeamCreationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  createTeam: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
  searchFilter: PropTypes.string.isRequired,
  filteredContacts: PropTypes.array.isRequired
};
