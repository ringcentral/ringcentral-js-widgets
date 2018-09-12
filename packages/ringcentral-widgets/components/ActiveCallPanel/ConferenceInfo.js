import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'ringcentral-integration/lib/debounce';

import CallAvatar from '../CallAvatar';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';
import i18n from './i18n';

const MAXIMUM_AVATARS = 4;

const WIDTH_PER_AVATAR = parseInt(styles.conferenceAvatarSize, 0); // 51

const AVATAR_MERGIN_LEFT = parseInt(styles.avatarMerginLeftSize, 0); // -20
const PEDDING_WIDTH = parseInt(styles.avatarPaddingSize, 0); // 15

const minWidthCalculator = count =>
  (WIDTH_PER_AVATAR * count) +
  AVATAR_MERGIN_LEFT * (count - 1) + (PEDDING_WIDTH * 2) + 1 + 2;

// when the container width reachs below item of width, display the avatar amount of count.
const KINDS_OF_WIDTH_THAT_NEED_ADAPATER = [
  { avartarCount: 0, width: minWidthCalculator(2), },
  { avartarCount: 1, width: minWidthCalculator(3), },
  { avartarCount: 2, width: minWidthCalculator(MAXIMUM_AVATARS), },
  { avartarCount: 3, width: minWidthCalculator(MAXIMUM_AVATARS + 1), },
];

export class ConferenceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarCount: this._computeAvatarCountByWindowWidth(window && window.innerWidth),
    };

    this._container = React.createRef();
  }

  _computeAvatarCountByWindowWidth(alternativeContainerWidth) {
    const { partyProfiles } = this.props;
    const avatarProfilesCount = (partyProfiles && partyProfiles.length) || 0;

    if (!this._mounted) {
      if (avatarProfilesCount >= MAXIMUM_AVATARS) {
        return MAXIMUM_AVATARS;
      }
      return avatarProfilesCount;
    }

    const width = (
      this._container &&
      this._container.current &&
      this._container.current.clientWidth
    ) || alternativeContainerWidth;

    let avatarCount = avatarProfilesCount;

    const firstMatchWidth = KINDS_OF_WIDTH_THAT_NEED_ADAPATER.find(it => width < it.width);

    if (firstMatchWidth) {
      avatarCount = firstMatchWidth.avartarCount;
      if (avatarCount === -1) {
        avatarCount = 0;
      }
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
  }, 50);

  componentWillReceiveProps() {
    this._updateAvatarAmounts();
  }

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
        ref={this._container}
        >
        {
            (displayedProfiles.length || (avatarCount === 0 && remains > 0))
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
