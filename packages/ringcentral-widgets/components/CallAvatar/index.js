import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import styles from './styles.scss';

class CallAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUrl: null,
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
          avatarUrl: props.avatarUrl,
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
    const { avatarUrl } = this.state;
    const initialSize = 38;
    const margin = 4;
    const avatarCircleRadius = 15;
    const extraNumCircleRadius = 8.5;
    const extraNumCircleBorder = 1;
    const $snow = '#fff';
    const $gray = '#cee7f2';
    const $blue = '#0684bd';
    let res;
    const hash = uuid.v4();
    const textId = `text-${hash}`;
    const clipId = `circleClip-${hash}`;
    const avatarStyle = { stroke: '#e2e2e2', strokeWidth: '1px' };
    if (isOnConferenceCall && extraNum > 0) {
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
          </defs>
          <circle
            cx={avatarCircleRadius}
            cy={margin + avatarCircleRadius}
            r={avatarCircleRadius}
            fill={$snow}
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
            avatarUrl ?
              <image clipPath={`url(#${clipId})`} height="100%" width="100%" xlinkHref={avatarUrl} /> :
              <use xlinkHref={`#${textId}`} clipPath={`url(#${clipId})`} />
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
            fill={$gray} />

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
          </defs>
          <circle
            cx={initialSize / 2}
            cy={initialSize / 2}
            r={initialSize / 2}
            fill={$snow}
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
            avatarUrl ?
              <image
                clipPath={`url(#${clipId})`}
                height="100%"
                width="100%"
                xlinkHref={avatarUrl}
                preserveAspectRatio="xMinYMin slice" /> :
              <use xlinkHref={`#${textId}`} clipPath={`url(#${clipId})`} />
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
