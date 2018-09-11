import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'ringcentral-integration/lib/debounce';

import CallAvatar from '../CallAvatar';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';
import i18n from './i18n';

const MAXIMUM_AVATARS = 4;
const WIDTH_PER_AVATAR = 51;
const PEDDING_WIDTH = 15;
const MINIUM_WIDTH = 140;

export class ConferenceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarCount: this._computeAvatarCountByWindowWidth(),
    };
  }

  _computeAvatarCountByWindowWidth() {
    const w = window;
    const width = w.innerWidth;

    const { partyProfiles } = this.props;

    const avatarProfilesCount = (partyProfiles && partyProfiles.length) || 0;

    let avatarCount = avatarProfilesCount;

    const minWith4Avatars = WIDTH_PER_AVATAR * (MAXIMUM_AVATARS) + PEDDING_WIDTH;

    if (
      width <= MINIUM_WIDTH
    ) {
      avatarCount = 1; // meets the minium window width, shows 1 avart + num
    } else if (
      width <= minWith4Avatars
    ) {
      avatarCount = 2; // meets the minium width of 2 avatars, show 2 avart + num
    } else if (
      avatarCount >= MAXIMUM_AVATARS
    ) {
      avatarCount = MAXIMUM_AVATARS;
    }

    return avatarCount;
  }

  _updateAvatarAmounts = debounce(() => {
    if (!this._mounted) {
      return;
    }

    const avatarCount = this._computeAvatarCountByWindowWidth();

    this.setState({
      avatarCount,
    });
  }, 100);


  componentDidMount() {
    this._mounted = true;
    window.addEventListener('resize', this._updateAvatarAmounts);
  }

  componentWillUnmount() {
    this._mounted = false;
    window.removeEventListener('resize', this._updateAvatarAmounts);
  }

  shouldComponentUpdate(nextProps, nextState) {
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
    } else if (nextState.avatarCount !== this.state.avatarCount) {
      showUpdate = true;
    } else {
      showUpdate = false;
    }

    return showUpdate;
  }

  computeDisplayedProfiles({
    profiles,
    avatarCount,
  }) {
    const displayedProfiles =
      profiles.length >= avatarCount
        ? profiles.slice(0, avatarCount)
        : profiles;

    const remains = profiles.length - avatarCount;

    return {
      displayedProfiles,
      remains,
    };
  }

  render() {
    const {
      currentLocale,
      partyProfiles,
      onClick,
    } = this.props;
    const profiles = partyProfiles || [];

    const { avatarCount } = this.state;

    const {
      displayedProfiles,
      remains
    } = this.computeDisplayedProfiles({ profiles, avatarCount });

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
                  displayedProfiles.map(({ avatarUrl, toUserName }, idx) =>
                  (
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
