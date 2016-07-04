import React from 'react'

import { PanelHeader, PanelContent, PanelFooter } from '../../../commons/panel/'
import { Input } from '../../../commons/autocomplete/'

import Dialer from './Dialer.react'
import UserCallerBar from '../container/UserCallerBar.react'

import styles from '../index.css'
import iconsStyles from '../../../../styles/icon.css'

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
      <div className={ styles.main + ' ' + styles.container }>
        <PanelHeader>
          <UserCallerBar />
        </PanelHeader>
        <PanelContent>
          <div>
            <Input
              className={ styles.phoneInput }
              onChange={ this.handleInput.bind(this) }
              value={ this.state.dialingNumber }
              items={ this.props.contacts } />
            <div>
              <Dialer handleClick={ this.handleClick.bind(this) } />
            </div>
          </div>
        </PanelContent>
        <PanelFooter>
          <div className={ styles.line }>
            <button className={ styles.callButton }>
              <span className={ `${iconsStyles['icon-uniAE']} ${iconsStyles['icon']}` }></span>
            </button>
          </div>
        </PanelFooter>
      </div>
    )
  }
}
