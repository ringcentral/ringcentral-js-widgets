import { isBase64DataUrl, loadImage } from '@ringcentral-integration/utils';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

import SpinnerIcon from '../../assets/images/Spinner.svg';

import styles from './styles.scss';

export interface CallAvatarProps {
  isOnConferenceCall?: boolean;
  avatarUrl?: string;
  extraNum?: number;
  spinnerMode?: boolean;
  className?: string;
  onClick?: (...args: any[]) => any;
}

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
const portraitChar = '\ue904'; // HACK: &#xe904; is the font code for the portrait icon
const iconFont = 'dynamics_icon'; // Hard coding this for firefox to load iconfont
const avatarStyle = { stroke: $dark, strokeWidth: `${circleBorder}px` };
const spinnerScaleSize = 1.5;
const spinnerSize = 12;
const spinnerTranslateTo = (initialSize - spinnerSize * spinnerScaleSize) / 2;

const aspectRatio = 'xMidYMid meet';
const xmlns = 'http://www.w3.org/2000/svg';

export const CallAvatar: FunctionComponent<CallAvatarProps> = ({
  extraNum = 0,
  isOnConferenceCall,
  spinnerMode: showingSpinner,
  avatarUrl: avatarUrlProp,
  className,
  onClick,
}) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const svgCls = clsx(
    styles.callAvatar,
    onClick ? styles.autoPointerEvents : styles.disabledPointerEvents,
    className,
  );

  const { current: hash } = useRef(uuidV4());
  const textId = `text-${hash}`;
  const clipId = `circleClip-${hash}`;

  // spinner sizing
  const spinnerId = `spinner-${hash}`;
  const isOnConferenceCallWithExtraNum = isOnConferenceCall && extraNum > 0;

  const translateValue =
    spinnerTranslateTo - (isOnConferenceCallWithExtraNum ? margin : 0);

  const spinnerTransform = `translate(${translateValue}, ${spinnerTranslateTo}) scale(${spinnerScaleSize}, ${spinnerScaleSize})`;

  useEffect(() => {
    const loadImg = async () => {
      if (!avatarUrlProp) return;

      if (isBase64DataUrl(avatarUrlProp)) {
        setAvatarUrl(avatarUrlProp);
        return;
      }

      try {
        await loadImage(avatarUrlProp);
        setAvatarUrl(avatarUrlProp);
      } catch (error) {
        setAvatarUrl(null);
      }
    };

    loadImg();
  }, [avatarUrlProp]);

  if (isOnConferenceCallWithExtraNum) {
    return (
      <svg
        onClick={onClick}
        className={svgCls}
        style={avatarUrl ? avatarStyle : {}}
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
      onClick={onClick}
      style={avatarUrl ? avatarStyle : {}}
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
};

export default CallAvatar;
