import React from 'react'
import { PanelHeader, PanelContent, PanelFooter } from '../../../commons/panel/'
import CallConsole from '../presentation/CallConsole.react'
import Dialer from '../presentation/Dialer.react'
import UserFlip from './UserFlip.react'
import UserTransfer from './UserTransfer.react'
import Closeable from '../presentation/Closable.react'

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
            <Dialer />
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
      <div>
        <h2>Active Call</h2>
        <PanelHeader
          title={this.props.displayName}
          subtitle={this.props.phoneNumber}
        />
        <PanelContent>
          { content() }
        </PanelContent>
        <PanelFooter>
          <div>
            <button>Mute</button>
            <button>Hang up</button>
          </div>
        </PanelFooter>
      </div>
    )
  }
}

export default ActiveCall
