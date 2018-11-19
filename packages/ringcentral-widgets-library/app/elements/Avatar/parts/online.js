import React from 'react';

export default function GOnline(id, initialSize) {
  const onLineCircleRadius = 4;
  const onLineCircleBorder = 1;
  const $snow = '#fff';
  const $green = '#5fb95c';

  return (
    <g id={id}>
      <circle
        cx={initialSize - onLineCircleRadius}
        cy={initialSize - 2 * onLineCircleRadius}
        r={onLineCircleRadius}
        fill={$snow}
    />
      <circle
        cx={initialSize - onLineCircleRadius}
        cy={initialSize - 2 * onLineCircleRadius}
        r={onLineCircleRadius - onLineCircleBorder}
        fill={$green}
    />
    </g>
  );
}
