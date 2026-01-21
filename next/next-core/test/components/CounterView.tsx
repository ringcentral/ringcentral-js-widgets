import React, { FunctionComponent } from 'react';

export const CounterView: FunctionComponent<{
  count: number;
  increase: () => void;
}> = ({ count, increase }) => {
  return (
    <>
      <div id="count">{count}</div>
      <button id="increase" type="button" onClick={() => increase()}>
        +
      </button>
    </>
  );
};
