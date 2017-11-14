import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import PresenceStatusIcon from '../PresenceStatusIcon';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import DefaultAvatar from '../../assets/images/DefaultAvatar.svg';
import FaxIcon from '../../assets/images/Fax.svg';
import i18n from './i18n';

import styles from './styles.scss';

export function getPresenceStatusName(currentUserStatus, currentDndStatus, currentLocale) {
  if (currentUserStatus !== presenceStatus.busy) {
    return i18n.getString(currentUserStatus, currentLocale);
  }
  return i18n.getString(currentUserStatus + currentDndStatus, currentLocale);
}

function AvatarNode({ name, avatarUrl }) {
  return avatarUrl ?
    (
      <img
        className={styles.avatarNode}
        alt={name}
        src={avatarUrl}
      />
    ) :
    (
      <DefaultAvatar
        className={styles.avatarNode}
      />
    );
}
AvatarNode.propTypes = {
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
};
AvatarNode.defaultProps = {
  name: undefined,
  avatarUrl: undefined,
};

export default class ContactDetails extends PureComponent {
  onClickToDial = (phoneNumber) => {
    this.props.onClickToDial(phoneNumber);
  }

  onClickToSMS = (contact, phoneNumber) => {
    this.props.onClickToSMS({
      ...contact,
      phoneNumber
    });
  }

  onClickMailTo = (email, contactType) => {
    if (typeof this.props.onClickMailTo === 'function') {
      this.props.onClickMailTo(email, contactType);
    }
  }

  renderProfile() {
    const { contactItem, sourceNodeRenderer, currentLocale } = this.props;
    const { name, presence, profileImageUrl, type } = contactItem;
    const sourceNode = sourceNodeRenderer({ sourceType: type });
    const presenceName = presence
      ? getPresenceStatusName(presence.userStatus, presence.dndStatus, currentLocale)
      : null;
    return (
      <div className={styles.contactProfile}>
        <div className={styles.avatar}>
          <div className={styles.avatarNodeContainer}>
            <AvatarNode
              name={name}
              avatarUrl={profileImageUrl}
            />
            {
              sourceNode
                ? (
                  <div className={styles.sourceNodeContainer}>
                    {sourceNode}
                  </div>
                ) : null
            }
          </div>
        </div>
        <div className={styles.info}>
          <div className={classnames(styles.name, !presence ? styles.nameWithoutPresence : null)}>
            <span title={name}>{name}</span>
          </div>
          {
            presence
              ? (
                <div className={styles.presence}>
                  <div className={styles.presenceNodeContainer}>
                    <PresenceStatusIcon
                      className={styles.presenceNode}
                      {...presence}
                    />
                  </div>
                  <span className={styles.presenceStatus}>
                    {presenceName}
                  </span>
                </div>
              ) : null
          }
        </div>
      </div>
    );
  }

  renderExtensionCell() {
    const { contactItem, currentLocale } = this.props;
    const { extensionNumber } = contactItem;
    if (!extensionNumber) return null;
    return (
      <div className={styles.item}>
        <div className={styles.label}>
          <span>{ i18n.getString('extensionLabel', currentLocale) }</span>
        </div>
        <ul>
          <li>
            <div className={styles.number}>
              <span title={extensionNumber}>{extensionNumber}</span>
            </div>
            <div className={styles.menu}>
              <button title={i18n.getString('call', currentLocale)} onClick={() => this.onClickToDial(extensionNumber)}>
                <i className={dynamicsFont.call} />
              </button>
              <button title={i18n.getString('text', currentLocale)} onClick={() => this.onClickToSMS(contactItem, extensionNumber)}>
                <i className={dynamicsFont.composeText} />
              </button>
            </div>
          </li>
        </ul>
      </div>
    );
  }

  renderDirectNumberCell() {
    const { contactItem, currentLocale } = this.props;
    const { phoneNumbers } = contactItem;
    const phoneNumberListView = phoneNumbers.map(({ phoneType, phoneNumber }, index) => {
      if (phoneType === 'extension') return null;
      const formattedPhoneNumber = this.props.formatNumber(phoneNumber);
      return (
        <li key={index}>
          <div className={styles.number}>
            <span title={formattedPhoneNumber}>{formattedPhoneNumber}</span>
          </div>
          <div className={styles.menu}>
            <button title={i18n.getString('call', currentLocale)} onClick={() => this.onClickToDial(phoneNumber)}>
              <i className={dynamicsFont.call} />
            </button>
            <button title={i18n.getString('text', currentLocale)} onClick={() => this.onClickToSMS(contactItem, phoneNumber)}>
              <i className={dynamicsFont.composeText} />
            </button>
            <button>
              <FaxIcon className={styles.faxIcon} />
            </button>
          </div>
        </li>
      );
    }).filter(v => !!v);
    if (phoneNumberListView.length <= 0) return null;
    return (
      <div className={styles.item}>
        <div className={styles.label}>
          <span>{i18n.getString('directLabel', currentLocale)}</span>
        </div>
        <ul>
          {phoneNumberListView}
        </ul>
      </div>
    );
  }

  renderEmailCell() {
    const { onClickMailTo } = this.props;
    const { emails, type } = this.props.contactItem;
    if (!emails || emails.length <= 0) return null;
    const hasMailToHandler = typeof onClickMailTo === 'function';
    const emailListView = emails.map((email, index) => (
      <li key={index}>
        <a className={hasMailToHandler ? styles.underline : null} onClick={() => this.onClickMailTo(email, type)}>{email}</a>
      </li>
    ));
    return (
      <div>
        <div className={styles.label}>
          <span>{i18n.getString('emailLabel', this.props.currentLocale)}</span>
        </div>
        <ul>{emailListView}</ul>
      </div>
    );
  }

  render() {
    const extensionCellView = this.renderExtensionCell();
    const directNumberCellView = this.renderDirectNumberCell();
    return (
      <div className={styles.root}>
        <div className={styles.profile}>
          {this.renderProfile()}
        </div>
        {
          extensionCellView || directNumberCellView
            ? (
              <div className={styles.contacts}>
                {extensionCellView}
                {directNumberCellView}
              </div>
            ) : null
        }
        <div className={styles.email}>
          {this.renderEmailCell()}
        </div>
      </div>
    );
  }
}

export const contactItemPropTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  hasProfileImage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  phoneNumbers: PropTypes.arrayOf(PropTypes.shape({
    phoneNumber: PropTypes.string,
    phoneType: PropTypes.string,
  })),
};

ContactDetails.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  contactItem: PropTypes.shape(contactItemPropTypes).isRequired,
  sourceNodeRenderer: PropTypes.func,
  onClickToSMS: PropTypes.func,
  onClickToDial: PropTypes.func,
  onClickMailTo: PropTypes.func,
  formatNumber: PropTypes.func.isRequired,
};

ContactDetails.defaultProps = {
  onClickToSMS: undefined,
  onClickToDial: undefined,
  onClickMailTo: undefined,
  onClickMailTo: undefined,
  sourceNodeRenderer: () => null,
};
