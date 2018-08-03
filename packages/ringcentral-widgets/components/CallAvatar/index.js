import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import styles from './styles.scss';
import SpinnerIcon from '../../assets/images/Spinner.svg';

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
    if (!this._mounted) {
      return;
    }
    if (props.avatarUrl) {
      const $img = document.createElement('img');
      $img.src = props.avatarUrl;
      $img.onload = () => {
        if (!this._mounted) {
          return;
        }
        this.setState({
          avatarUrl: props.avatarUrl
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

  componentDidMount() {
    this._mounted = true;
    this.loadImg();
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.avatarUrl !== this.props.avatarUrl) {
      this.loadImg(nextProp);
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    const { extraNum, isOnConferenceCall } = this.props;
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
    const avatarNotReady = (avatarUrlSource && !this.state.avatarUrl) && !avatarUrlLoadFailed;

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
            stroke={avatarNotReady ? $dark : 'inherit'}
            strokeOpacity={avatarNotReady ? $transparency : '1'}
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
            avatarNotReady ? (
              <g transform={spinnerTransform}>
                <use xlinkHref={`#${spinnerId}`} />
              </g>
            ) : <image clipPath={`url(#${clipId})`} height="100%" width="100%" xlinkHref={avatarUrl} />
          }
          {
            (!avatarUrlSource || avatarUrlLoadFailed) && <use xlinkHref={`#${textId}`} clipPath={`url(#${clipId})`} />
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
            stroke={avatarNotReady ? $dark : 'inherit'}
            strokeOpacity={avatarNotReady ? $transparency : '1'}
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
            avatarNotReady ? (
              <g transform={spinnerTransform} >
                <use xlinkHref={`#${spinnerId}`} />
              </g>
            ) : <image
              clipPath={`url(#${clipId})`}
              height="100%"
              width="100%"
              xlinkHref={avatarUrl}
              preserveAspectRatio="xMinYMin slice" />
          }
          {
            (!avatarUrlSource || avatarUrlLoadFailed) && <use xlinkHref={`#${textId}`} clipPath={`url(#${clipId})`} />
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
};

CallAvatar.defaultProps = {
  isOnConferenceCall: false,
  avatarUrl: null,
  extraNum: 0,
};


export default CallAvatar;
