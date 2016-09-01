import React from 'react';

import prefix from '../../../utils/style';

const { dialer, dialerButton, dialerNumber, dialerSymbol, line } =
  prefix(['dialer', 'dialerButton', 'dialerNumber', 'dialerSymbol', 'line'], 'Dialer');

const Dialer = (props) => (
  <div className={dialer}>
    {[
      [{ 1: '' }, { 2: 'ABC' }, { 3: 'DEF' }],
      [{ 4: 'GHI' }, { 5: 'JKL' }, { 6: 'MNO' }],
      [{ 7: 'PQRS' }, { 8: 'TUV' }, { 9: 'WXYZ' }],
      [{ '*': '' }, { 0: '+' }, { '#': '' }],
    ].map((row, index) => (
      <div
        key={`line-${index}`}
        className={line}
      >
        {
          row.map(symbol => (
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
