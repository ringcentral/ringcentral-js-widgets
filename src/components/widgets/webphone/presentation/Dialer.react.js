import React from 'react'
import styles from '../index.css';

const Dialer = (props) => (
  <div>
    {[
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['#', '0', '*']
    ].map((line, index) => (
      <div 
        key={`line-${index}`} 
        className={ styles.dialLine }>
        {
          line.map(symbol => (
            <button 
              key={symbol}
              onClick={ props.handleClick.bind(null, symbol) }
              className={ styles.dialButton }>
              {symbol}
            </button>
          ))
        }
      </div>
    ))}
  </div>
)

Dialer.propType = {
  handleClick: React.PropTypes.func.isRequired,
}

export default Dialer
