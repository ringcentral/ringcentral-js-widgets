import React from 'react'
import styles from '../index.css';
console.log(styles);
export default class DialPad extends React.Component {
  state = {
    dialingNumber: ''
  }

  static propTypes = {
  }
  
  constructor(props) {
    super(props);
  }

  handleInput(event) {
    this.dial(event.target.value)
  }

  handleClick(number) {
    this.dial(this.state.dialingNumber + number)
  }

  dial(dialingNumber) {
    this.setState({ dialingNumber })
  }
  
  render() {

    const dialpadButtons = () => {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '#', '*'].map(symbol => {
        return (
          <button 
            key={symbol} 
            onClick={ this.handleClick.bind(this, symbol) }
            className={ styles.dialButton }
            >
            {symbol}
          </button>
        )
      })
    }

    return (
      <div>
        <input 
          onChange={ this.handleInput.bind(this) }
          value={ this.state.dialingNumber }
        />
        <div>
          { dialpadButtons() }
        </div>
      </div>
    )
  }
}
