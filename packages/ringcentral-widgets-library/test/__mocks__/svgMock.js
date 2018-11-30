import React from 'react';

export default function ({ onClick }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon"
      viewBox="0 0 500 500"
      width="100%"
      height="100%"
      x="0"
      y="0"
      onClick={onClick}
    >
      <g>
        <circle cx="250" cy="250" r="245" />
      </g>
    </svg>
  );
}
