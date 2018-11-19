import React from 'react';

export default function GConference(conferenceId, initialSize, extraNum) {
  const extraNumCircleRadius = 8.5;
  const extraNumCircleBorder = 1;
  const $snow = '#fff';
  const $blueLight = '#cee7f2';
  const $blue = '#0684bd';

  return (
    <g id={conferenceId}>
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
      }}>
        {`+${extraNum}`}
      </text>
    </g>
  );
}
