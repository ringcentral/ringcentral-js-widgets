import React from 'react'
import { PanelHeader, PanelContent, PanelFooter } from '../../../commons/panel/'

import UserFlip from '../container/UserFlip.react'
import UserTransfer from '../container/UserTransfer.react'

import CallConsole from './CallConsole.react'
import Dialer from './Dialer.react'
import CallFooter from './CallFooter.react'
import Closeable from './Closable.react'

import iconsStyles from '../../../../styles/icon.css'
import styles from '../index.css'

export default class ActiveCall extends React.Component {

  state = {
    openedPanel: null, 
  }

  static propTypes = {
    
  }

  constructor(props) {
    super(props)
  }

  render() {

    let content = () => {
      if (this.state.openedPanel === 'keypad') {
        return (
          <Closeable close={() => { this.setState({ openedPanel: null }) }}>
            <Dialer handleClick={() => {}} scale={ .9 } />
          </Closeable>
        )
      } else if (this.state.openedPanel === 'flip') {
        return (
          <Closeable close={() => { this.setState({ openedPanel: null }) }}>
            <UserFlip />
          </Closeable>
        )
      } else if (this.state.openedPanel === 'transfer') {
        return (
          <Closeable close={() => { this.setState({ openedPanel: null }) }}>
            <UserTransfer />
          </Closeable>
        )
      } else {
        return (
          <CallConsole
            handleHoldClick={() => {}}
            handleRecordClick={() => {}}
            handleKeypadClick={() => { this.setState({ openedPanel: 'keypad' }) }}
            handleFlipClick={() => { this.setState({ openedPanel: 'flip' }) }}
            handleTransferClick={() => { this.setState({ openedPanel: 'transfer' }) }}
            handleParkClick={() => {}}
          />
        )
      }
    }

    return (
      <div className={ styles.main }>
        <div>
          <div className={ styles.title }>
            { this.props.phoneNumber }
          </div>
          <div className={ styles.time }>
            00:30
          </div>
          <div className={ styles.subtitle }>
            You are on a WebPhone call.
          </div>
        </div>
        <div>
          { content() }
        </div>
        <CallFooter />
      </div>
    )
  }
}

export default ActiveCall
