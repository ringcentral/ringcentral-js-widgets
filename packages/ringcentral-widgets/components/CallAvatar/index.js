import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import styles from './styles.scss';
import SpinnerIcon from '../../assets/images/Spinner.svg';

const REGEXP_BLOB_URL = /^blob:.+\/[\w-]{36,}(?:#.+)?$/;

function isBlobURL(value) {
  return REGEXP_BLOB_URL.test(value);
}

class CallAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUrl: null,
      avatarUrlLoadFailed: false
    };
    this._mounted = false;
  }

  loadImg(props = this.props) {
    const { avatarUrl } = props;

    if (isBlobURL(avatarUrl)) {
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
          avatarUrl: null,
          avatarUrlLoadFailed: true
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
    const { extraNum, isOnConferenceCall, spinnerMode } = this.props;
    const avatarUrlSource = this.props.avatarUrl;
    const { avatarUrl } = this.state;
    const initialSize = 38;
    const margin = 4;
    const avatarCircleRadius = 15;
    const extraNumCircleRadius = 8.5;
    const extraNumCircleBorder = 1;
    const $snow = '#fff';
    const $blueLight = '#cee7f2';
    const $blue = '#0684bd';
    const $dark = '#e2e2e2';
    const $transparency = '0.8';
    let res;
    const hash = uuid.v4();
    const textId = `text-${hash}`;
    const clipId = `circleClip-${hash}`;
    const avatarStyle = { stroke: $dark, strokeWidth: '1px' };
    const avatarUrlLoadFailed = this.state.avatarUrlLoadFailed;
    const showSpinner = spinnerMode;

    // spinner sizing
    const spinnerId = `spinner-${hash}`;
    const spinnerScaleSize = 1.5;
    const spinnerSize = 12;
    const spinnerTranslateTo = (initialSize - (spinnerSize * spinnerScaleSize)) / 2;
    const isOnConferenceCallWithExtraNum = isOnConferenceCall && extraNum > 0;
    const spinnerTransform = `translate(${spinnerTranslateTo - (isOnConferenceCallWithExtraNum ? margin : 0)},${spinnerTranslateTo}) scale(${spinnerScaleSize}, ${spinnerScaleSize})`;
    if (isOnConferenceCallWithExtraNum) {
      res = (
        <svg
          className={styles.callAvatar}
          style={avatarUrl ? avatarStyle : null}
          viewBox={`0 0 ${initialSize} ${initialSize}`}
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <g id={textId}>
              <text
                x="0"
                y="0"
                dy="29px"
                style={{
                      fontSize: `${avatarCircleRadius * 2}px`,
                      fill: $blue,
                      opacity: '.5'
                    }}
                className={styles.portrait}
                // HACK: &#xe904; is the font code for the portrait icon
                >
                {'\ue904'}
              </text>
            </g>
            <SpinnerIcon id={spinnerId} />
          </defs>
          <circle
            cx={avatarCircleRadius}
            cy={margin + avatarCircleRadius}
            r={avatarCircleRadius}
            fill={$snow}
            stroke={showSpinner ? $dark : 'inherit'}
            strokeOpacity={showSpinner ? $transparency : '1'}
          />
          <g>
            <clipPath id={clipId}>
              <circle
                cx={avatarCircleRadius}
                cy={margin + avatarCircleRadius}
                r={avatarCircleRadius}
                fill={$snow} />
            </clipPath>
          </g>
          {
            showSpinner && (
              <g transform={spinnerTransform}>
                <use xlinkHref={`#${spinnerId}`} />
              </g>
            )
          }
          {
            avatarUrl && (
              <image clipPath={`url(#${clipId})`} height="100%" width="100%" xlinkHref={avatarUrl} />
            )
          }
          {
            (!showSpinner && (!avatarUrlSource || !avatarUrl || avatarUrlLoadFailed)) && <use xlinkHref={`#${textId}`} clipPath={`url(#${clipId})`} />
          }
          <circle
            cx={initialSize - extraNumCircleRadius}
            cy={extraNumCircleRadius}
            r={extraNumCircleRadius}
            fill={$snow} />
          <circle
            cx={initialSize - extraNumCircleRadius}
            cy={extraNumCircleRadius}
            r={extraNumCircleRadius - extraNumCircleBorder}
            fill={$blueLight} />

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
              opacity: '.5'
            }}>
            {`+${extraNum}`}
          </text>
        </svg>
      );
    } else {
      res = (
        <svg
          className={styles.callAvatar}
          style={avatarUrl ? avatarStyle : null}
          viewBox={`0 0 ${initialSize} ${initialSize}`}
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <g id={textId}>
              <text
                x="0"
                y="0"
                dy="29px"
                dx="2"
                style={{
                      fontSize: `${(initialSize / 2 - 2) * 2}px`,
                      fill: $blue,
                      opacity: '.5'
                    }}
                className={styles.portrait}>
                {'\ue904'}
              </text>
            </g>
            <SpinnerIcon id={spinnerId} />
          </defs>
          <circle
            cx={initialSize / 2}
            cy={initialSize / 2}
            r={initialSize / 2}
            fill={$snow}
            stroke={showSpinner ? $dark : 'inherit'}
            strokeOpacity={showSpinner ? $transparency : '1'}
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
            showSpinner && (
              <g transform={spinnerTransform} >
                <use xlinkHref={`#${spinnerId}`} />
              </g>
            )
          }
          {
            showSpinner && (
              <g transform={spinnerTransform} >
                <use xlinkHref={`#${spinnerId}`} />
              </g>
            )
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
            (!showSpinner && (!avatarUrlSource || !avatarUrl || avatarUrlLoadFailed)) && <use xlinkHref={`#${textId}`} clipPath={`url(#${clipId})`} />
          }
        </svg>
      );
    }
    return res;
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
};

CallAvatar.defaultProps = {
  isOnConferenceCall: false,
  avatarUrl: null,
  extraNum: 0,
  spinnerMode: false,
};


export default CallAvatar;
