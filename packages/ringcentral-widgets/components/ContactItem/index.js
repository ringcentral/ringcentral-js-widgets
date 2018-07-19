import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import PresenceStatusIcon from '../PresenceStatusIcon';
import DefaultAvatar from '../../assets/images/DefaultAvatar.svg';

import styles from './styles.scss';

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

export default class ContactItem extends PureComponent {
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

  render() {
    if (this.state.loading) {
      return (
        <div className={styles.root} />
      );
    }
    const {
      name,
      extensionNumber,
      type,
      profileImageUrl,
      presence,
    } = this.props.contact;

    const { sourceNodeRenderer } = this.props;
    const sourceNode = sourceNodeRenderer({ sourceType: type });
    return (
      <div
        className={styles.root}
        onClick={this.onItemSelected}
      >
        <div className={styles.contactProfile}>
          <div className={styles.avatarNodeContainer}>
            <AvatarNode
              name={name}
              avatarUrl={profileImageUrl}
            />
          </div>
          {
            sourceNode
              ? (
                <div className={styles.sourceNodeContainer}>
                  {sourceNode}
                </div>
              )
              : null
          }
          {
            presence ? (
              <div className={styles.presenceNodeContainer}>
                <PresenceStatusIcon
                  className={styles.presenceNode}
                  {...presence}
                />
              </div>
            ) : null
          }
        </div>
        <div className={styles.contactName} title={name}>
          {name}
        </div>
        <div className={styles.phoneNumber} title={extensionNumber}>
          {extensionNumber}
        </div>
      </div>
    );
  }
}

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    extensionNumber: PropTypes.string,
    email: PropTypes.string,
    profileImageUrl: PropTypes.string,
    presence: PropTypes.object,
  }).isRequired,
  getAvatarUrl: PropTypes.func.isRequired,
  getPresence: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  sourceNodeRenderer: PropTypes.func,
};

ContactItem.defaultProps = {
  onSelect: undefined,
  sourceNodeRenderer: () => null,
};
