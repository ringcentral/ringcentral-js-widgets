import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import CallAvatar from '../CallAvatar';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';
import i18n from './i18n';

function ConferenceInfo({
  currentLocale,
  partyProfiles,
  onClick,
}) {
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
    <a
      className={styles.conferenceCallInfoContainer}
      onClick={(e) => { e.preventDefault(); onClick(); }}
    >
      {
        displayedProfiles.length
          ? (
            <div className={styles.avatarContainer}>
              {
                displayedProfiles.map(({ avatarUrl, toUserName }, idx) => (
                  <div
                    key={`${toUserName}_${idx}`}
                    className={styles.avatar}>
                    <CallAvatar avatarUrl={avatarUrl} />
                  </div>
                )
                )
              }{
                remains > 0
                  ? (<div className={classnames(styles.avatar, styles.remains)}>{`+${remains}`}</div>)
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
    </a>
  );
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
