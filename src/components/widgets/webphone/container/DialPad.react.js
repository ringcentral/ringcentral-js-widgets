import React from 'react'
import styles from '../index.css';
import { PanelHeader, PanelContent, PanelFooter } from '../../../commons/panel/'
import { Input } from '../../../commons/autocomplete/'
import Dialer from '../presentation/Dialer.react'

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
    return (
      <div>
        <PanelHeader />
        <PanelContent>
          <div>
            <Input 
              onChange={ this.handleInput.bind(this) }
              value={ this.state.dialingNumber }
              items={['aa', 'ab', 'ac']}
            />
            <div>
              <Dialer handleClick={ this.handleClick.bind(this) }/>
            </div>
          </div>
        </PanelContent>
        <PanelFooter>
          <button>Call</button>
        </PanelFooter>
      </div>
    )
  }
}
