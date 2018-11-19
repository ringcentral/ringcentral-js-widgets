import React from 'react';

export default function GText(id, initialSize) {
  const portraitChar = '\ue904'; // HACK: &#xe904; is the font code for the portrait icon
  const iconFont = 'dynamics_icon';// Hard coding this for firefox to load iconfont
  const $blue = '#0684bd';
  return (
    <g id={id}>
      <text
        x="0"
        y="0"
        dy={`${initialSize - 10}px`}
        dx="2"
        style={{
            fontSize: `${(initialSize / 2 - 2) * 2}px`,
            fill: $blue,
            opacity: '.5'
          }}
        fontFamily={iconFont}
    >
        {portraitChar}
      </text>
    </g>
  );
}
