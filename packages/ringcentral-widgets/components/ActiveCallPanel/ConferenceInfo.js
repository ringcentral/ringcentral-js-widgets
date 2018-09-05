import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import CallAvatar from '../CallAvatar';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';
import i18n from './i18n';

export class ConferenceInfo extends Component {
  shouldComponentUpdate(nextProps) {
    const { partyProfiles } = nextProps;
    const oldpartyProfiles = this.props.partyProfiles;
    let showUpdate = true;
    if (partyProfiles !== oldpartyProfiles) {
      if (
        Array.isArray(partyProfiles) && Array.isArray(oldpartyProfiles)
        && partyProfiles.length === oldpartyProfiles.length
      ) {
        showUpdate = false;
        for (let i = 0; i < partyProfiles.length; i += 1) {
          if (partyProfiles[i].id !== oldpartyProfiles[i].id) {
            showUpdate = true;
            break;
          }
        }
      }
    } else {
      showUpdate = false;
      for (const p in nextProps) {
        if (nextProps::Object.prototype.hasOwnProperty(p)) {
          const val = nextProps[p];

          if (
            val !== this.props[p] &&
            (typeof val !== 'function')
          ) {
            showUpdate = true;
            break;
          }
        }
      }
    }

    return showUpdate;
  }

  render() {
    const {
      currentLocale,
      partyProfiles,
      onClick,
    } = this.props;
    const MAXIMUM_AVATARS = 4;
    const profiles = partyProfiles || [];

    const displayedProfiles =
      profiles.length >= MAXIMUM_AVATARS
        ? profiles.slice(0, MAXIMUM_AVATARS)
        : profiles;

    const remains = profiles.length > MAXIMUM_AVATARS
      ? profiles.length - MAXIMUM_AVATARS
      : 0;

    return (
      <div
        className={styles.conferenceCallInfoContainer}
        >
        {
            displayedProfiles.length
              ? (
                <div
                  className={classnames(styles.avatarContainer, styles.clickable)}
                  onClick={(e) => { e.preventDefault(); onClick(); }}
                >
                  {
                    displayedProfiles.map(({ avatarUrl, toUserName }, idx) => (
                      <div
                        key={`${toUserName}_${idx}`}
                        className={styles.avatar}>
                        <CallAvatar
                          avatarUrl={avatarUrl}
                        />
                      </div>
                    )
                    )
                  }{
                    remains > 0
                      ? (
                        <div
                          className={classnames(styles.avatar, styles.remains)}
                        >
                          {`+${remains}`}
                        </div>
                      )
                      : null
                  }
                </div>
              )
              : (
                <div className={styles.avatarContainer}>
                  <div className={styles.avatar} style={{ backgroundColor: '#fff' }}>
                    <i className={classnames(dynamicsFont.portrait, styles.icon)} />
                  </div>
                </div>
              )
          }
        <p className={styles.info}>
          {i18n.getString('conferenceCall', currentLocale)}
        </p>
      </div>
    );
  }
}

ConferenceInfo.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  partyProfiles: PropTypes.arrayOf(PropTypes.shape({
    avatarUrl: PropTypes.string,
    toUserName: PropTypes.string,
  })),
  onClick: PropTypes.func,
};

ConferenceInfo.defaultProps = {
  partyProfiles: null,
  onClick: i => i,
};

export default ConferenceInfo;
