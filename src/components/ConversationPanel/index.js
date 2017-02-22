import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import rcFont from '../../assets/RcFont/RcFont.scss';

import Spinner from '../Spinner';
import RecipientsHeader from '../RecipientsHeader';
import ConversationMessageList from '../ConversationMessageList';

import styles from './styles.scss';
import i18n from './i18n';

class ConversationPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: '',
    };
    this.onTextChange = (e) => {
      this.setState({
        textValue: e.currentTarget.value,
      });
    };
    this.handleSubmit = (e) => {
      this.props.replyToReceivers(this.state.textValue);
      this.setState({
        textValue: '',
      });
      e.preventDefault();
    };
  }

  render() {
    let conversationBody = null;
    const loading = this.props.showSpinner;
    if (loading) {
      conversationBody = (
        <div className={styles.spinerContainer}>
          <Spinner />
        </div>
      );
    } else {
      conversationBody = (
        <ConversationMessageList
          messages={this.props.messages}
        />
      );
    }
    const recipients = this.props.recipients;
    return (
      <div>
        <div className={styles.header}>
          <Link
            to={'/messages'}
            className={styles.backButton}
          >
            <span className={rcFont.icon_back} />
          </Link>
          <RecipientsHeader
            recipients={recipients}
          />
        </div>
        {conversationBody}
        <div className={styles.messageForm}>
          <form onSubmit={this.handleSubmit}>
            <textarea
              placeholder={i18n.getString('typeAnyToSend', this.props.currentLocale)}
              value={this.state.textValue}
              maxLength="1000"
              onChange={this.onTextChange}
            />
            <input
              type="submit"
              value={i18n.getString('send', this.props.currentLocale)}
              className={styles.submitButton}
              disabled={this.props.sendButtonDisabled || loading}
            />
          </form>
        </div>
      </div>
    );
  }
}

ConversationPanel.propTypes = {
  replyToReceivers: PropTypes.func.isRequired,
  messages: ConversationMessageList.propTypes.messages,
  recipients: RecipientsHeader.propTypes.recipients,
  sendButtonDisabled: PropTypes.bool.isRequired,
  currentLocale: PropTypes.string.isRequired,
  showSpinner: PropTypes.bool.isRequired,
};

export default ConversationPanel;
