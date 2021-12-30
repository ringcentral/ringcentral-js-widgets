import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { formatSameSiteExtension } from '@ringcentral-integration/phone-number/lib/format';

import DefaultAvatar from '../../assets/images/DefaultAvatar.svg';
import PlaceholderImage from '../PlaceholderImage';
import PresenceStatusIcon from '../PresenceStatusIcon';
import i18n from './i18n';
import styles from './styles.scss';

function AvatarNode({ name, avatarUrl, isInactive }) {
  const avatarStyle = isInactive
    ? styles.inactiveAvatarNode
    : styles.avatarNode;
  return (
    <PlaceholderImage
      className={avatarStyle}
      alt={name}
      src={avatarUrl}
      placeholder={<DefaultAvatar className={avatarStyle} />}
    />
  );
}

AvatarNode.propTypes = {
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
  isInactive: PropTypes.bool,
};
AvatarNode.defaultProps = {
  name: undefined,
  avatarUrl: undefined,
  isInactive: false,
};

class ContactItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.onItemSelected = this.onItemSelected.bind(this);
  }

  componentDidMount() {
    this._mounted = true;
    this._loadingTimeout = setTimeout(() => {
      if (this._mounted) {
        this.setState({
          loading: false,
        });
      }
    }, 3);
    setTimeout(() => {
      if (this._mounted) {
        this.props.getAvatarUrl(this.props.contact);
        this.props.getPresence(this.props.contact);
      }
    }, 500);
  }

  componentWillUnmount() {
    this._mounted = false;
    if (this._loadingTimeout) {
      clearTimeout(this._loadingTimeout);
    }
  }

  onItemSelected() {
    const func = this.props.onSelect;
    if (func) {
      func(this.props.contact);
    }
  }

  renderPresence = (contact) => {
    const { presence, contactStatus } = contact;
    if (contactStatus === 'NotActivated') {
      return null;
    }

    return presence ? (
      <div className={styles.presenceNodeContainer}>
        <PresenceStatusIcon className={styles.presenceNode} {...presence} />
      </div>
    ) : null;
  };

  renderMiddle = (contact, currentLocale) => {
    const { name, contactStatus } = contact;
    if (contactStatus === 'NotActivated') {
      return (
        <div className={styles.infoWrapper}>
          <div className={styles.inactiveContactName} title={name}>
            {name}
          </div>
          <div className={styles.inactiveText}>
            {i18n.getString('notActivated', currentLocale)}
          </div>
        </div>
      );
    }

    return (
      <div className={styles.contactName} title={name}>
        {name}
      </div>
    );
  };

  render() {
    if (this.state.loading) {
      return <div className={styles.root} />;
    }
    const { contact, currentLocale, currentSiteCode, isMultipleSiteEnabled } =
      this.props;
    const { name, extensionNumber, type, profileImageUrl, contactStatus } =
      contact;

    let displayingNumber = extensionNumber;

    if (isMultipleSiteEnabled) {
      displayingNumber = formatSameSiteExtension({
        currentSiteCode,
        extension: extensionNumber,
      });
    }

    const { sourceNodeRenderer } = this.props;
    const sourceNode = sourceNodeRenderer({ sourceType: type });
    return (
      <div
        className={styles.root}
        onClick={this.onItemSelected}
        data-sign="contactItem"
      >
        <div className={styles.contactProfile}>
          <div className={styles.avatarNodeContainer}>
            <AvatarNode
              name={name}
              avatarUrl={profileImageUrl}
              isInactive={contactStatus === 'NotActivated'}
            />
          </div>
          {sourceNode ? (
            <div className={styles.sourceNodeContainer}>{sourceNode}</div>
          ) : null}
          {this.renderPresence(this.props.contact)}
        </div>
        {this.renderMiddle(contact, currentLocale)}
        <div className={styles.phoneNumber} title={displayingNumber}>
          {displayingNumber}
        </div>
      </div>
    );
  }
}

ContactItem.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  currentSiteCode: PropTypes.string,
  isMultipleSiteEnabled: PropTypes.bool,
  contact: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    extensionNumber: PropTypes.string,
    email: PropTypes.string,
    profileImageUrl: PropTypes.string,
    presence: PropTypes.object,
    contactStatus: PropTypes.string,
  }).isRequired,
  getAvatarUrl: PropTypes.func.isRequired,
  getPresence: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  sourceNodeRenderer: PropTypes.func,
};

ContactItem.defaultProps = {
  onSelect: undefined,
  currentSiteCode: '',
  isMultipleSiteEnabled: false,
  sourceNodeRenderer: () => null,
};

export default ContactItem;
