import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import i18n from './i18n';

export default function ConferenceInfo({
  currentLocale,
  displayedProfiles,
  remains,
  onClick,
}) {
  return (
    <a
      className={styles.conferenceCallInfoContainer}
      onClick={(e) => { e.preventDefault(); onClick(); }}
    >
      {
        Array.isArray(displayedProfiles) && displayedProfiles.length
          ? (
            <div className={styles.avatarContainer}>
              {
                displayedProfiles.map(({ avatarUrl, toUserName }, idx) => (
                  <div
                    key={`${toUserName}_${idx}`}
                    className={styles.avatar}
                    style={avatarUrl
                      ? { backgroundImage: `url(${avatarUrl})` }
                      : { backgroundColor: '#fff' }
                    }>
                    {avatarUrl
                      ? null
                      : <i className={classnames(dynamicsFont.portrait, styles.icon)} />}
                  </div>
                )
                )
              }{
                remains
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
  displayedProfiles: PropTypes.arrayOf(PropTypes.shape({
    avatarUrl: PropTypes.string,
    toUserName: PropTypes.string,
  })).isRequired,
  remains: PropTypes.number,
  onClick: PropTypes.func
};

ConferenceInfo.defaultProps = {
  remains: 0,
  onClick: i => i,
};
