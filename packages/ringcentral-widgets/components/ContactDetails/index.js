import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DndStatus from 'ringcentral-integration/modules/Presence/dndStatus';
import { map } from 'ramda';

import PresenceStatusIcon from '../PresenceStatusIcon';
import PlaceholderImage from '../PlaceholderImage';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import DefaultAvatar from '../../assets/images/DefaultAvatar.svg';
import phoneTypes from '../../enums/phoneTypes';
import i18n from './i18n';

import styles from './styles.scss';

export function getPresenceStatusName(presence, currentLocale) {
  const { presenceStatus, dndStatus } = presence;
  if (dndStatus === DndStatus.doNotAcceptAnyCalls) {
    return i18n.getString(dndStatus, currentLocale);
  }
  return i18n.getString(presenceStatus, currentLocale);
}

function AvatarNode({ name, avatarUrl, isInactive }) {
  const avatarStyle = isInactive ? styles.inactiveAvatarNode : styles.avatarNode;
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

export default class ContactDetails extends PureComponent {
  onClickToDial = (contact, phoneNumber) => {
    this.props.onClickToDial({
      ...contact,
      phoneNumber
    });
  };

  onClickToSMS = (contact, phoneNumber) => {
    this.props.onClickToSMS({
      ...contact,
      phoneNumber
    });
  };

  onClickMailTo = (email, contactType) => {
    if (typeof this.props.onClickMailTo === 'function') {
      this.props.onClickMailTo(email, contactType);
    }
  };

  renderPresence = (contactStatus, presence, presenceName, currentLocale) => {
    if (contactStatus === 'NotActivated') {
      return (
        <div className={styles.presence}>
          <div>
            <span className={styles.inactiveText}>
              {i18n.getString('notActivated', currentLocale)}
            </span>
          </div>
        </div>
      );
    }

    return presence ? (
      <div className={styles.presence}>
        <div className={styles.presenceNodeContainer}>
          <PresenceStatusIcon className={styles.presenceNode} {...presence} />
        </div>
        <span className={styles.presenceStatus}>{presenceName}</span>
      </div>
    ) : null;
  };

  renderProfile() {
    const { contactItem, sourceNodeRenderer, currentLocale } = this.props;
    const {
      name,
      presence,
      profileImageUrl,
      type,
      contactStatus
    } = contactItem;
    const sourceNode = sourceNodeRenderer({ sourceType: type });
    const presenceName = presence
      ? getPresenceStatusName(presence, currentLocale)
      : null;
    return (
      <div className={styles.contactProfile}>
        <div className={styles.avatar}>
          <div className={styles.avatarNodeContainer}>
            <AvatarNode name={name} avatarUrl={profileImageUrl} isInactive={contactStatus === 'NotActivated'} />
            {sourceNode ? (
              <div className={styles.sourceNodeContainer}>{sourceNode}</div>
            ) : null}
          </div>
        </div>
        <div className={styles.info}>
          <div
            className={classnames(
              styles.name,
              !presence ? styles.nameWithoutPresence : null
            )}
          >
            <span style={contactStatus === 'NotActivated' ? { color: '#999999', fontSize: '12px' } : null} title={name}>{name}</span>
          </div>
          {this.renderPresence(
            contactStatus,
            presence,
            presenceName,
            currentLocale
          )}
        </div>
      </div>
    );
  }

  getListContainerBuilder(label, listComp) {
    return (
      <div className={styles.item} key={label}>
        <div className={styles.label}>
          <span>{label}</span>
        </div>
        <ul>
          { listComp }
        </ul>
      </div>
    );
  }

  getListItem({
    showCallBtn,
    showTextBtn,
    key,
    number,
    currentLocale,
    contactItem,
    needFormat = true,
  }) {
    let displayedPhoneNumber;
    if (needFormat) {
      const { phoneNumber } = this.props.formatNumber(number);
      displayedPhoneNumber = phoneNumber;
    } else {
      displayedPhoneNumber = number;
    }

    return (
      <li key={key}>
        <div className={styles.number}>
          <span title={displayedPhoneNumber}>{displayedPhoneNumber}</span>
        </div>
        <div className={styles.menu}>
          {showCallBtn
            ? (
              <button
                title={i18n.getString('call', currentLocale)}
                onClick={() => this.onClickToDial(contactItem, number)}
              >
                <i className={dynamicsFont.call} />
              </button>
            )
            : null
          }
          {showTextBtn
            ? (
              <button
                title={i18n.getString('text', currentLocale)}
                onClick={() => this.onClickToSMS(contactItem, number)}
            >
                <i className={dynamicsFont.composeText} />
              </button>
            )
            : null
          }
        </div>
      </li>
    );
  }

  getPhoneSections() {
    const { contactItem, currentLocale } = this.props;
    const { phoneNumbers, phoneMaps, schema } = contactItem;
    if (!phoneNumbers.length) {
      return null;
    }

    return (
      <div className={styles.contacts}>
        {
          map(
            (key) => {
              switch (key) {
                case phoneTypes.extension: {
                  return this.getListContainerBuilder(
                    i18n.getString(phoneTypes.extension, currentLocale),
                    map(
                      phoneNumberElm => this.getListItem({
                        showCallBtn: this.props.internalSmsPermission,
                        showTextBtn: this.props.onClickToDial,
                        key: phoneNumberElm.phoneNumber,
                        number: phoneNumberElm.phoneNumber,
                        currentLocale,
                        contactItem,
                      }),
                      phoneMaps[key]
                    )
                  );
                }
                case phoneTypes.fax: {
                  return this.getListContainerBuilder(
                    i18n.getString(phoneTypes.fax, currentLocale),
                    map(
                      phoneNumberElm => this.getListItem({
                        showCallBtn: false,
                        showTextBtn: false,
                        key: phoneNumberElm.phoneNumber,
                        number: phoneNumberElm.phoneNumber,
                        currentLocale,
                        contactItem,
                      }),
                      phoneMaps[key]
                    )
                  );
                }
                default: {
                  return this.getListContainerBuilder(
                    i18n.getString(phoneTypes[key], currentLocale),
                    map(
                      phoneNumberElm => this.getListItem({
                        showCallBtn: this.props.onClickToDial,
                        showTextBtn: this.props.outboundSmsPermission,
                        key: phoneNumberElm.phoneNumber,
                        number: phoneNumberElm.phoneNumber,
                        currentLocale,
                        contactItem,
                      }),
                      phoneMaps[key]
                    )
                  );
                }
              }
            },
            schema,
          )
        }
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
        <a
          title={email}
          className={hasMailToHandler ? styles.underline : null}
          onClick={() => this.onClickMailTo(email, type)}
        >
          {email}
        </a>
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
    return (
      <div className={styles.root}>
        <div className={styles.profile}>{this.renderProfile()}</div>
        { this.getPhoneSections() }
        <div className={styles.email}>{this.renderEmailCell()}</div>
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
  profileImageUrl: PropTypes.string,
  phoneNumbers: PropTypes.arrayOf(
    PropTypes.shape({
      phoneNumber: PropTypes.string,
      phoneType: PropTypes.string
    })
  ),
  contactStatus: PropTypes.string
};

ContactDetails.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  contactItem: PropTypes.shape(contactItemPropTypes).isRequired,
  sourceNodeRenderer: PropTypes.func,
  onClickToSMS: PropTypes.func,
  onClickToDial: PropTypes.func,
  onClickMailTo: PropTypes.func,
  formatNumber: PropTypes.func.isRequired,
  outboundSmsPermission: PropTypes.bool,
  internalSmsPermission: PropTypes.bool
};

ContactDetails.defaultProps = {
  onClickToSMS: undefined,
  onClickToDial: undefined,
  onClickMailTo: undefined,
  sourceNodeRenderer: () => null,
  outboundSmsPermission: false,
  internalSmsPermission: false
};
