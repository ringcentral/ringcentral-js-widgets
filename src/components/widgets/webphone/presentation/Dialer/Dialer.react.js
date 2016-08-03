import React from 'react';
import { line as lineStyle } from '../../index.css';
import { dialer, dialerButton, dialerNumber, dialerSymbol } from './Dialer.css';

const Dialer = (props) => (
  <div className={dialer}>
    {[
      [{ 1: '' }, { 2: 'ABC' }, { 3: 'DEF' }],
      [{ 4: 'GHI' }, { 5: 'JKL' }, { 6: 'MNO' }],
      [{ 7: 'PQRS' }, { 8: 'TUV' }, { 9: 'WXYZ' }],
      [{ '*': '' }, { 0: '+' }, { '#': '' }],
    ].map((line, index) => (
      <div
        key={`line-${index}`}
        className={lineStyle}
      >
        {
          line.map(symbol => (
            <button
              key={Object.keys(symbol)[0]}
              onClick={() => props.handleClick(Object.keys(symbol)[0])}
              className={dialerButton}
            >
              <div className={dialerNumber}>{Object.keys(symbol)[0]}</div>
              <div className={dialerSymbol}>{symbol[Object.keys(symbol)[0]]}</div>
            </button>
          ))
        }
      </div>
    ))}
  </div>
);

Dialer.propTypes = {
  handleClick: React.PropTypes.func,
  scale: React.PropTypes.number,
};

export default Dialer;
