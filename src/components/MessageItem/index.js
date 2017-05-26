import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import ContactDisplay from '../ContactDisplay';
import ActionMenu from '../ActionMenu';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

function ConversationIcon({
  group,
}) {
  return (
    <div className={styles.conversationIcon}>
      <span
        className={classnames(
          group ? dynamicsFont.groupConversation : dynamicsFont.composeText
        )} />
    </div>
  );
}
ConversationIcon.propTypes = {
  group: PropTypes.bool,
};
ConversationIcon.defaultProps = {
  group: false,
};

export default class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.getInitialContactIndex(),
      userSelection: false,
      isLogging: false,
      isCreating: false,
    };
  }
  componentDidMount() {
    this._mounted = true;
  }
  componentWillReceiveProps(nextProps) {
    if (
      !this.state.userSelection &&
      (
        nextProps.conversation.conversationMatches !==
        this.props.conversation.conversationMatches ||
        nextProps.conversation.correspondentMatches !==
        this.props.conversation.correspondentMatches
      )
    ) {
      this.setState({
        selected: this.getInitialContactIndex(nextProps),
      });
    }
  }
  componentWillUnmount() {
    this._mounted = false;
  }
  onSelectContact = (value, idx) => {
    const selected = parseInt(idx, 10) - 1;
    this.setState({
      selected,
      userSelection: true,
    });
    if (
      this.props.conversation.conversationMatches.length > 0 &&
      this.props.autoLog
    ) {
      this.logConversation({ redirect: false, selected, prefill: false });
    }
  }
  getInitialContactIndex(nextProps = this.props) {
    const {
      correspondentMatches,
      conversationMatches,
    } = nextProps.conversation;
    for (const conversation of conversationMatches) {
      const index = correspondentMatches.findIndex(contact => (
        this.props.isLoggedContact(nextProps.conversation, conversation, contact)
      ));
      if (index > -1) return index;
    }
    return -1;
  }
  getSelectedContact = (selected = this.state.selected) => {
    const contactMatches = this.props.conversation.correspondentMatches;
    return (selected > -1 && contactMatches[selected]) ||
      (contactMatches.length === 1 && contactMatches[0]) ||
      null;
  }

  getPhoneNumber() {
    const correspondents = this.props.conversation.correspondents;
    return (correspondents.length === 1 &&
      (correspondents[0].phoneNumber || correspondents[0].extensionNumber)) || undefined;
  }
  getGroupPhoneNumbers() {
    const correspondents = this.props.conversation.correspondents;
    const groupNumbers = correspondents.length > 1 ?
      correspondents.map(correspondent =>
        correspondent.extensionNumber || correspondent.phoneNumber || undefined
      )
      : null;
    return groupNumbers;
  }
  getFallbackContactName() {
    const correspondents = this.props.conversation.correspondents;
    return (correspondents.length === 1 &&
      (correspondents[0].name)) || undefined;
  }
  viewSelectedContact = () => {
    if (typeof this.props.onViewContact === 'function') {
      this.props.onViewContact({
        phoneNumber: this.getPhoneNumber(),
        contact: this.getSelectedContact(),
      });
    }
  }
  createSelectedContact = async (entityType) => {
    // console.log('click createSelectedContact!!', entityType);
    if (typeof this.props.onCreateContact === 'function' &&
      this._mounted &&
      !this.state.isCreating) {
      this.setState({
        isCreating: true,
      });
      // console.log('start to create: isCreating...', this.state.isCreating);
      const phoneNumber = this.getPhoneNumber();
      await this.props.onCreateContact({
        phoneNumber,
        name: this.props.enableContactFallback ? this.getFallbackContactName() : '',
        entityType,
      });

      if (this._mounted) {
        this.setState({
          isCreating: false,
        });
        // console.log('created: isCreating...', this.state.isCreating);
      }
    }
  }

  logConversation = async ({ redirect = true, selected, prefill = true }) => {
    if (typeof this.props.onLogConversation === 'function' &&
      this._mounted &&
      !this.state.isLogging
    ) {
      this.setState({
        isLogging: true,
      });
      await this.props.onLogConversation({
        correspondentEntity: this.getSelectedContact(selected),
        conversationId: this.props.conversation.conversationId,
        redirect,
        prefill,
      });
      if (this._mounted) {
        this.setState({
          isLogging: false,
        });
      }
    }
  }
  clickToDial = () => {
    if (this.props.onClickToDial) {
      this.props.onClickToDial(this.getPhoneNumber());
    }
  }
  showConversationDetail = (e) => {
    if (e.captureClick === false) {
      delete e.captureClick;
      return;
    }
    this.props.showConversationDetail(this.props.conversation.conversationId);
  }

  render() {
    const {
      areaCode,
      countryCode,
      currentLocale,
      conversation: {
        unreadCounts,
        correspondents,
        correspondentMatches,
        creationTime,
        subject,
        isLogging,
        conversationMatches,
      },
      disableLinks,
      disableClickToDial,
      onClickToDial,
      onLogConversation,
      onViewContact,
      onCreateContact,
      dateTimeFormatter,
      enableContactFallback,
    } = this.props;

    const groupNumbers = this.getGroupPhoneNumbers();
    const phoneNumber = this.getPhoneNumber();
    const fallbackName = this.getFallbackContactName();

    return (
      <div
        className={classnames(
          styles.root,
          unreadCounts && styles.unread
        )}
        onClick={this.showConversationDetail}
      >
        <ConversationIcon group={correspondents.length > 1} />
        <ContactDisplay
          className={classnames(
            styles.contactDisplay,
            unreadCounts && styles.unread
          )}
          contactMatches={correspondentMatches}
          selected={this.state.selected}
          onSelectContact={this.onSelectContact}
          disabled={disableLinks}
          isLogging={isLogging || this.state.isLogging}
          fallBackName={fallbackName}
          areaCode={areaCode}
          countryCode={countryCode}
          phoneNumber={phoneNumber}
          groupNumbers={groupNumbers}
          currentLocale={currentLocale}
          enableContactFallback={enableContactFallback}
        />
        <div className={styles.details}>
          {dateTimeFormatter({ utcTimestamp: creationTime })} | {subject}
        </div>
        <ActionMenu
          currentLocale={currentLocale}
          onLog={onLogConversation && this.logConversation}
          onViewEntity={onViewContact && this.viewSelectedContact}
          onCreateEntity={onCreateContact && this.createSelectedContact}
          hasEntity={correspondents.length === 1 && !!correspondentMatches.length}
          onClickToDial={onClickToDial && this.clickToDial}
          phoneNumber={phoneNumber}
          disableLinks={disableLinks}
          disableClickToDial={disableClickToDial}
          isLogging={isLogging || this.state.isLogging}
          isLogged={conversationMatches.length > 0}
          isCreating={this.state.isCreating}
        />
      </div>
    );
  }
}

MessageItem.propTypes = {
  conversation: PropTypes.shape({
    conversationId: PropTypes.string.isRequired,
    isLogging: PropTypes.bool,
    correspondents: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      phoneNumber: PropTypes.string,
      extensionNumber: PropTypes.string,
    })),
    correspondentMatches: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      entityType: PropTypes.string,
    })),
    conversationMatches: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
    })),
  }).isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  onLogConversation: PropTypes.func,
  onViewContact: PropTypes.func,
  onCreateContact: PropTypes.func,
  onClickToDial: PropTypes.func,
  isLoggedContact: PropTypes.func,
  disableLinks: PropTypes.bool,
  disableClickToDial: PropTypes.bool,
  dateTimeFormatter: PropTypes.func.isRequired,
  showConversationDetail: PropTypes.func.isRequired,
  autoLog: PropTypes.bool,
  enableContactFallback: PropTypes.bool,
};

MessageItem.defaultProps = {
  onLogConversation: undefined,
  onClickToDial: undefined,
  onViewContact: undefined,
  onCreateContact: undefined,
  isLoggedContact: () => false,
  disableClickToDial: false,
  outboundSmsPermission: false,
  internalSmsPermission: false,
  disableLinks: false,
  autoLog: false,
  enableContactFallback: undefined,
};
