import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';
import DefaultAvatar from '../../assets/images/DefaultAvatar.svg';
import GoogleLogo from '../../assets/images/GoogleLogo.svg';

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

function SourceNode({ sourceType }) {
  switch (sourceType) {
    case 'google':
      return (<GoogleLogo
        className={styles.sourceNode}
      />);
    default:
      return null;
  }
}
SourceNode.propTypes = {
  sourceType: PropTypes.string,
};
SourceNode.defaultProps = {
  sourceType: undefined,
};

function PresenceNode({ presence }) {
  switch (presence.presenceStatus) {
    case 'Busy':
      return (
        <div className={classnames(styles.presenceNode, styles.presenceBusy)}>
          <div className={styles.solidLine} />
        </div>
      );
    case 'Available':
      return <div className={classnames(styles.presenceNode, styles.presenceAvailable)} />;
    case 'Offline':
      return <div className={classnames(styles.presenceNode, styles.presenceOffline)} />;
    default:
      return null;
  }
}
PresenceNode.propTypes = {
  presence: PropTypes.shape({
    dndStatus: PropTypes.string,
    presenceStatus: PropTypes.string,
    telephonyStatus: PropTypes.string,
    userStatus: PropTypes.string,
  }),
};
PresenceNode.defaultProps = {
  presence: undefined,
};

export default class ContactItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      avatarUrl: undefined,
      presence: undefined,
    };

    this.onItemSelected = this.onItemSelected.bind(this);
  }

  componentDidMount() {
    this._mounted = true;
    setTimeout(() => {
      // clear timeout is probably not necessary
      if (this._mounted) {
        this.setState({
          loading: false,
        });
      }
    }, 10);

    this.props.getAvatarUrl(this.props.contact).then((avatarUrl) => {
      if (this._mounted) {
        this.setState({
          avatarUrl,
        });
      }
    });

    this.props.getPresence(this.props.contact).then((presence) => {
      if (this._mounted) {
        this.setState({
          presence,
        });
      }
    });
  }

  componentWillUnmount() {
    this._mounted = false;
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
      phoneNumber,
    } = this.props.contact;

    // TODO:
    const type = '';

    return (
      <div
        className={styles.root}
        onClick={this.onItemSelected}
      >
        <div className={styles.contactProfile}>
          <div className={styles.avatarNodeContainer} title={name}>
            <AvatarNode
              name={name}
              avatarUrl={this.state.avatarUrl}
            />
          </div>
          {
            type ? (
              <div className={styles.sourceNodeContainer}>
                <SourceNode
                  sourceType={type}
                />
              </div>
            ) : null
          }
          {
            this.state.presence ? (
              <div className={styles.presenceNodeContainer}>
                <PresenceNode
                  presence={this.state.presence}
                />
              </div>
            ) : null
          }
        </div>
        <div className={styles.contactName} title={name}>
          {name}
        </div>
        <div className={styles.phoneNumber} title={phoneNumber}>
          {phoneNumber}
        </div>
      </div>
    );
  }
}

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    hasProfileImage: PropTypes.bool,
    entityType: PropTypes.string,
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  getAvatarUrl: PropTypes.func.isRequired,
  getPresence: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
};

ContactItem.defaultProps = {
  onSelect: undefined,
};
