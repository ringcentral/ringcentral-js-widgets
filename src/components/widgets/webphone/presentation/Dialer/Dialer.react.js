import React from 'react';
import styles from '../../index.css';

const Dialer = (props) => (
  <div className={styles.dialer} style={{ fontSize: `${(props.scale || 1)} em` }}>
    {[
      [{ 1: '' }, { 2: 'ABC' }, { 3: 'DEF' }],
      [{ 4: 'GHI' }, { 5: 'JKL' }, { 6: 'MNO' }],
      [{ 7: 'PQRS' }, { 8: 'TUV' }, { 9: 'WXYZ' }],
      [{ '*': '' }, { 0: '+' }, { '#': '' }],
    ].map((line, index) => (
      <div
        key={`line-${index}`}
        className={styles.line}
      >
        {
          line.map(symbol => (
            <button
              key={Object.keys(symbol)[0]}
              onClick={() => props.handleClick(Object.keys(symbol)[0])}
              className={styles.dialerButton}
            >
              <div className={styles.dialerNumber}>{Object.keys(symbol)[0]}</div>
              <div className={styles.dialerSymbol}>{symbol[Object.keys(symbol)[0]]}</div>
            </button>
          ))
        }
      </div>
    ))}
  </div>
);

Dialer.propTypes = {
  handleClick: React.PropTypes.func.isRequired,
  scale: React.PropTypes.number,
};

export default Dialer;
