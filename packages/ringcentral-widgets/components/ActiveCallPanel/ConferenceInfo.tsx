import React, { Component } from 'react';

import classnames from 'classnames';

import debounce from '@ringcentral-integration/commons/lib/debounce';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import { CallAvatar } from '../CallAvatar';
import i18n from './i18n';
import styles from './styles.scss';

const MAXIMUM_AVATARS = 4;
const WIDTH_PER_AVATAR = parseInt(styles.conferenceAvatarSize, 10); // 51
const AVATAR_MERGIN_LEFT = parseInt(styles.avatarMerginLeftSize, 10); // -20
const PEDDING_WIDTH = parseInt(styles.avatarPaddingSize, 10); // 15
const minWidthCalculator = (count: any) =>
  WIDTH_PER_AVATAR * count +
  AVATAR_MERGIN_LEFT * (count - 1) +
  PEDDING_WIDTH * 2 +
  1 +
  2;
// when the container width reachs below item of width, display the avatar amount of count.
const KINDS_OF_WIDTH_THAT_NEED_ADAPATER = [
  { avartarCount: 0, width: minWidthCalculator(1) },
  { avartarCount: 1, width: minWidthCalculator(3) },
  { avartarCount: 2, width: minWidthCalculator(MAXIMUM_AVATARS) },
  { avartarCount: 3, width: minWidthCalculator(MAXIMUM_AVATARS + 1) },
];
type ConferenceInfoProps = {
  currentLocale: string;
  partyProfiles?: {
    avatarUrl?: string;
    partyName?: string;
  }[];
  onClick?: (...args: any[]) => any;
};
type ConferenceInfoState = {
  avatarCount: any | number;
};
class ConferenceInfo extends Component<
  ConferenceInfoProps,
  ConferenceInfoState
> {
  _container: any;
  _mounted: any;
  constructor(props: any) {
    super(props);
    this.state = {
      avatarCount: MAXIMUM_AVATARS,
    };
    this._container = React.createRef();
  }
  _computeAvatarCountByWindowWidth(props: any) {
    const { partyProfiles } = props;
    const avatarProfilesCount = (partyProfiles && partyProfiles.length) || 0;
    if (!this._mounted) {
      if (avatarProfilesCount >= MAXIMUM_AVATARS) {
        return MAXIMUM_AVATARS;
      }
      return avatarProfilesCount;
    }
    const width =
      this._container &&
      this._container.current &&
      this._container.current.clientWidth;
    let avatarCount = avatarProfilesCount;
    const firstMatchWidth = KINDS_OF_WIDTH_THAT_NEED_ADAPATER.find(
      (it) => width < it.width,
    );
    if (firstMatchWidth) {
      avatarCount = firstMatchWidth.avartarCount;
      if (avatarCount + 1 === avatarProfilesCount) {
        avatarCount = avatarProfilesCount;
      }
    } else if (avatarCount >= MAXIMUM_AVATARS) {
      avatarCount = MAXIMUM_AVATARS;
    }
    return avatarCount;
  }
  onWindowResize = debounce(() => {
    this.updateAvatarAmounts(this.props);
  }, 100);
  updateAvatarAmounts(props: any) {
    if (!this._mounted) {
      return;
    }
    const avatarCount = this._computeAvatarCountByWindowWidth(props);
    if (avatarCount !== this.state.avatarCount) {
      this.setState({
        avatarCount,
      });
    }
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    this.updateAvatarAmounts(nextProps);
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    this._mounted = true;
    window.addEventListener('resize', this.onWindowResize);
    this.updateAvatarAmounts(this.props);
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    this._mounted = false;
    window.removeEventListener('resize', this.onWindowResize);
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  shouldComponentUpdate(nextProps: any, nextState: any) {
    const { partyProfiles } = nextProps;
    const oldpartyProfiles = this.props.partyProfiles;
    let showUpdate = true;
    if (partyProfiles !== oldpartyProfiles) {
      if (
        Array.isArray(partyProfiles) &&
        Array.isArray(oldpartyProfiles) &&
        partyProfiles.length === oldpartyProfiles.length
      ) {
        showUpdate = false;
        for (let i = 0; i < partyProfiles.length; i += 1) {
          // @ts-expect-error TS(2339): Property 'id' does not exist on type '{ avatarUrl?... Remove this comment to see the full error message
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
  computeDisplayedProfiles({ profiles, avatarCount }: any) {
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
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const { currentLocale, partyProfiles, onClick } = this.props;
    const profiles = partyProfiles || [];
    const { avatarCount } = this.state;
    const { displayedProfiles, remains } = this.computeDisplayedProfiles({
      profiles,
      avatarCount,
    });
    return (
      <div className={styles.conferenceCallInfoContainer} ref={this._container}>
        {displayedProfiles.length || (avatarCount === 0 && remains > 0) ? (
          <div
            data-sign="conferenceInfo"
            className={classnames(styles.avatarContainer, styles.clickable)}
            onClick={(e) => {
              e.preventDefault();
              // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
              onClick();
            }}
          >
            {displayedProfiles.map(
              ({ avatarUrl, partyName }: any, idx: any) => (
                <div key={`${partyName}_${idx}`} className={styles.avatar}>
                  <CallAvatar avatarUrl={avatarUrl} />
                </div>
              ),
            )}
            {remains > 0 ? (
              <div className={classnames(styles.avatar, styles.remains)}>
                {`+${remains}`}
              </div>
            ) : null}
          </div>
        ) : (
          <div className={styles.avatarContainer}>
            <div className={styles.avatar} style={{ backgroundColor: '#fff' }}>
              <i className={classnames(dynamicsFont.portrait, styles.icon)} />
            </div>
          </div>
        )}
        <p className={styles.info} data-sign="conferenceCall">
          {i18n.getString('conferenceCall', currentLocale)}
        </p>
      </div>
    );
  }
}
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
ConferenceInfo.defaultProps = {
  partyProfiles: null,
  onClick: (i: any) => i,
};
export default ConferenceInfo;
