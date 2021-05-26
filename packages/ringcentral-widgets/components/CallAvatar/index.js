import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as uuid from 'uuid';
import classnames from 'classnames';
import styles from './styles.scss';
import SpinnerIcon from '../../assets/images/Spinner.svg';

const REGEXP_BLOB_URL = /^blob:.+\/[\w-]{36,}(?:#.+)?$/;
const REGEXP_BASE64_URL = /^(data:\w+\/[a-zA-Z+\-.]+;base64,)?(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gi;

function isBlobURL(value) {
  return REGEXP_BLOB_URL.test(value);
}

function isBase64(value) {
  return REGEXP_BASE64_URL.test(value);
}

class CallAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUrl: null,
    };
    this._mounted = false;
  }

  loadImg(props = this.props) {
    const { avatarUrl } = props;

    if (isBase64(avatarUrl)) {
      this.setState({
        avatarUrl,
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
          avatarUrl,
        });
      };
      $img.onerror = () => {
        if (!this._mounted) {
          return;
        }
        this.setState({
          avatarUrl: null,
        });
      };
    }
  }

  UNSAFE_componentWillMount() {
    this.loadImg();
  }

  componentDidMount() {
    this._mounted = true;
    if (!this.state.avatarUrl) {
      this.loadImg();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.avatarUrl !== this.props.avatarUrl) {
      this.loadImg(nextProps);
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    const {
      extraNum,
      isOnConferenceCall,
      spinnerMode,
      className,
      onClick,
    } = this.props;
    const { avatarUrl } = this.state;
    const initialSize = 38;
    const margin = 4;
    const avatarCircleRadius = 15;
    const extraNumCircleRadius = 8.5;
    const extraNumCircleBorder = 1;
    const circleBorder = 1;
    const $snow = '#fff';
    const $blueLight = '#cee7f2';
    const $blue = '#066FAC';
    const $dark = '#e2e2e2';
    const $transparency = '0.8';
    const defaultAvatarStyle = { opacity: +$transparency };
    const hash = uuid.v4();
    const portraitChar = '\ue904'; // HACK: &#xe904; is the font code for the portrait icon
    const iconFont = 'dynamics_icon'; // Hard coding this for firefox to load iconfont
    const textId = `text-${hash}`;
    const clipId = `circleClip-${hash}`;
    const avatarStyle = { stroke: $dark, strokeWidth: `${circleBorder}px` };
    const showingSpinner = spinnerMode;
    const aspectRatio = 'xMidYMid meet';
    const xmlns = 'http://www.w3.org/2000/svg';
    const svgCls = classnames(
      styles.callAvatar,
      onClick ? styles.autoPointerEvents : styles.disabledPointerEvents,
      className,
    );
    // spinner sizing
    const spinnerId = `spinner-${hash}`;
    const spinnerScaleSize = 1.5;
    const spinnerSize = 12;
    const spinnerTranslateTo =
      (initialSize - spinnerSize * spinnerScaleSize) / 2;
    const isOnConferenceCallWithExtraNum = isOnConferenceCall && extraNum > 0;
    const spinnerTransform = `translate(${
      spinnerTranslateTo - (isOnConferenceCallWithExtraNum ? margin : 0)
    },${spinnerTranslateTo}) scale(${spinnerScaleSize}, ${spinnerScaleSize})`;

    if (isOnConferenceCallWithExtraNum) {
      return (
        <svg
          onClick={onClick ? () => onClick() : null}
          className={svgCls}
          style={avatarUrl ? avatarStyle : null}
          viewBox={`0 0 ${initialSize} ${initialSize}`}
          preserveAspectRatio={aspectRatio}
          xmlns={xmlns}
        >
          <defs>
            <g id={textId}>
              <text
                x="0"
                y="0"
                dy={`${initialSize - 10}px`}
                style={{
                  fontSize: `${avatarCircleRadius * 2}px`,
                  fill: $blue,
                  opacity: '.5',
                }}
                fontFamily={iconFont}
              >
                {portraitChar}
              </text>
            </g>
            <SpinnerIcon id={spinnerId} />
          </defs>
          <circle
            cx={avatarCircleRadius}
            cy={margin + avatarCircleRadius}
            r={avatarCircleRadius}
            fill={$snow}
            stroke={showingSpinner ? $dark : 'inherit'}
            strokeOpacity={showingSpinner ? $transparency : '1'}
          />
          <g>
            <clipPath id={clipId}>
              <circle
                cx={avatarCircleRadius}
                cy={margin + avatarCircleRadius}
                r={avatarCircleRadius}
                fill={$snow}
              />
            </clipPath>
          </g>
          {showingSpinner && (
            <g transform={spinnerTransform}>
              <use xlinkHref={`#${spinnerId}`} />
            </g>
          )}
          {avatarUrl && (
            <image
              clipPath={`url(#${clipId})`}
              height="100%"
              width="100%"
              xlinkHref={avatarUrl}
            />
          )}
          {!avatarUrl && !showingSpinner && (
            <use
              xlinkHref={`#${textId}`}
              clipPath={`url(#${clipId})`}
              style={defaultAvatarStyle}
            />
          )}
          <circle
            cx={initialSize - extraNumCircleRadius}
            cy={extraNumCircleRadius}
            r={extraNumCircleRadius}
            fill={$snow}
          />
          <circle
            cx={initialSize - extraNumCircleRadius}
            cy={extraNumCircleRadius}
            r={extraNumCircleRadius - extraNumCircleBorder}
            fill={$blueLight}
          />

          <text
            x={initialSize - extraNumCircleRadius}
            y={extraNumCircleRadius}
            dy="3px"
            textAnchor="middle"
            style={{
              fontSize: '9px',
              stroke: 'none',
              fill: $blue,
              fontWeight: 'bolder',
              opacity: '.5',
            }}
          >
            {`+${extraNum}`}
          </text>
        </svg>
      );
    }
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
          <g id={textId}>
            <text
              x="0"
              y="0"
              dy={`${initialSize - 10}px`}
              dx="2"
              style={{
                fontSize: `${(initialSize / 2 - 2) * 2}px`,
                fill: $blue,
                opacity: '.5',
              }}
              fontFamily={iconFont}
            >
              {portraitChar}
            </text>
          </g>
          <SpinnerIcon id={spinnerId} />
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
        {showingSpinner && (
          <g transform={spinnerTransform}>
            <use xlinkHref={`#${spinnerId}`} />
          </g>
        )}
        {showingSpinner && (
          <g transform={spinnerTransform}>
            <use xlinkHref={`#${spinnerId}`} />
          </g>
        )}
        {avatarUrl && (
          <image
            clipPath={`url(#${clipId})`}
            height="100%"
            width="100%"
            xlinkHref={avatarUrl}
            preserveAspectRatio="xMinYMin slice"
          />
        )}
        {!avatarUrl && !showingSpinner && (
          <use
            xlinkHref={`#${textId}`}
            clipPath={`url(#${clipId})`}
            style={defaultAvatarStyle}
          />
        )}
      </svg>
    );
  }
}

CallAvatar.propTypes = {
  isOnConferenceCall: PropTypes.bool,
  avatarUrl: PropTypes.string,
  extraNum: PropTypes.number,
  /**
   * Set to true to make it always show the loading spinner.
   */
  spinnerMode: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

CallAvatar.defaultProps = {
  isOnConferenceCall: false,
  avatarUrl: null,
  extraNum: 0,
  spinnerMode: false,
  className: null,
  onClick: null,
};

export default CallAvatar;
