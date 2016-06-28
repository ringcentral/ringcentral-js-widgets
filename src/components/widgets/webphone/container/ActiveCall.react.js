import React from 'react'
import { PanelHeader, PanelContent, PanelFooter } from '../../../commons/panel/'
import CallConsole from '../presentation/CallConsole.react'
import Dialer from '../presentation/Dialer.react'
import Flip from '../presentation/Flip.react'
import Transfer from '../presentation/Transfer.react'

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
      if (this.state.openedPanel === 'keypad')
        return <Dialer handleClick={() => {}}/>
      else if (this.state.openedPanel === 'flip')
        return <Flip handleClick={() => {}}/>
      else if (this.state.openedPanel === 'transfer')
        return <Transfer handleClick={() => {}}/>
      else
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
