import React from 'react';

import SpinnerIcon from '../../../assets/images/Spinner.svg';

export default function GSpinner(id, initialSize) {
  const spinnerScaleSize = 1.5;
  const spinnerSize = 12;
  const spinnerTranslateTo = (initialSize - (spinnerSize * spinnerScaleSize)) / 2;
  const spinnerTransform = `translate(${spinnerTranslateTo},${spinnerTranslateTo}) scale(${
    spinnerScaleSize
  }, ${spinnerScaleSize})`;

  return (
    <g transform={spinnerTransform} id={id}>
      <SpinnerIcon />;
    </g>
  );
}
