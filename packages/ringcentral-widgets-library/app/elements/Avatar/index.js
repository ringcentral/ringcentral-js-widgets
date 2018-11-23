import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { GText, GConference, GOnline, GSpinner } from './parts';

import styles from './styles.scss';


const REGEXP_BASE64_URL = /^(data:\w+\/[a-zA-Z\+\-\.]+;base64,)?(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/gi;

function isBase64(value) {
  return REGEXP_BASE64_URL.test(value);
}

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUrl: null
    };
    this._mounted = false;
  }

  loadImg(props = this.props) {
    const { avatarUrl } = props;

    if (isBase64(avatarUrl)) {
      this.setState({
        avatarUrl
      });
      return;
    }

    // means we have to load it
    if (!this._mounted) {
      return;
    }
    if (avatarUrl) {
      const $img = document.createElement('img');
      $img.src = avatarUrl;
      $img.onload = () => {
        if (!this._mounted) {
          return;
        }
        this.setState({
          avatarUrl
        });
      };
      $img.onerror = () => {
        if (!this._mounted) {
          return;
        }
        this.setState({
          avatarUrl: null
        });
      };
    }
  }

  componentWillMount() {
    this.loadImg();
  }

  componentDidMount() {
    this._mounted = true;
    if (!this.state.avatarUrl) {
      this.loadImg();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.avatarUrl !== this.props.avatarUrl) {
      this.loadImg(nextProps);
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    const {
      extraNum, isOnConferenceCall, spinnerMode, className, onClick, isOnline, id
    } = this.props;
    const { avatarUrl } = this.state;

    // styles
    const initialSize = 38;
    const circleBorder = 1;
    const $snow = '#fff';
    const $dark = '#e2e2e2';
    const $transparency = '0.8';
    const defaultAvatarStyle = { opacity: +$transparency };
    const avatarStyle = { stroke: $dark, strokeWidth: `${circleBorder}px` };
    const svgCls = classnames(
      styles.avatar,
      onClick ? styles.autoPointerEvents : styles.disabledPointerEvents,
      className
    );

    // ids
    const textId = `text-${id}`;
    const clipId = `circleClip-${id}`;
    const conferenceId = `conferenced-${id}`;
    const onLineId = `online-${id}`;
    const spinnerId = `spinner-${id}`;

    const showingSpinner = spinnerMode;
    const aspectRatio = 'xMidYMid meet';
    const xmlns = 'http://www.w3.org/2000/svg';

    const isOnConferenceCallWithExtraNum = isOnConferenceCall && extraNum > 0;

    return (
      <svg
        className={svgCls}
        onClick={onClick ? () => onClick() : null}
        style={avatarUrl ? avatarStyle : null}
        viewBox={`0 0 ${initialSize} ${initialSize}`}
        preserveAspectRatio={aspectRatio}
        xmlns={xmlns}
      >
        <defs>
          {GText(textId, initialSize)}
          {GConference(conferenceId, initialSize, extraNum)}
          {GOnline(onLineId, initialSize)}
          {GSpinner(spinnerId, initialSize)}
        </defs>
        <circle
          cx={initialSize / 2}
          cy={initialSize / 2}
          r={initialSize / 2 - circleBorder}
          fill={$snow}
          stroke={showingSpinner ? $dark : 'inherit'}
          strokeOpacity={showingSpinner ? $transparency : '1'}
          />
        <g>
          <clipPath id={clipId}>
            <circle
              cx={initialSize / 2}
              cy={initialSize / 2}
              r={initialSize / 2 - 1}
              />
          </clipPath>
        </g>
        {
            showingSpinner && <use xlinkHref={`#${spinnerId}`} />
        }
        {
            avatarUrl && (<image
              clipPath={`url(#${clipId})`}
              height="100%"
              width="100%"
              xlinkHref={avatarUrl}
              preserveAspectRatio="xMinYMin slice" />
            )
        }
        {
            (!avatarUrl && !showingSpinner) &&
            <use
              xlinkHref={`#${textId}`}
              clipPath={`url(#${clipId})`}
              style={defaultAvatarStyle}
            />
        }
        {
          isOnConferenceCallWithExtraNum &&
          <use
            xlinkHref={`#${conferenceId}`}
            strokeWidth={0}
          />
        }
        {
          isOnline &&
          <use
            xlinkHref={`#${onLineId}`}
            strokeWidth={0}
          />
        }
      </svg>
    );
  }
}


Avatar.propTypes = {
  isOnConferenceCall: PropTypes.bool,
  isOnline: PropTypes.bool,
  avatarUrl: PropTypes.string,
  extraNum: PropTypes.number,
  /**
   * Set to true to make it always show the loading spinner.
   */
  spinnerMode: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.any.isRequired
};

Avatar.defaultProps = {
  isOnConferenceCall: false,
  isOnline: false,
  avatarUrl: null,
  extraNum: 0,
  spinnerMode: false,
  className: null,
  onClick: null,
};


export default Avatar;
