import React from 'react'

import Dropdown from './Dropdown.react'

import styles from '../index.css'
import iconsStyles from '../../../../styles/icon.css'

export default class CallerBar extends React.Component {
  static propTypes = {
    caller: React.PropTypes.string,
  }

  state = {
    isDropdownOpen: false
  }

  triggerDropdown() {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen 
    })
  }

  constructor(props) {
    super(props)
  }

  render() {
    let content = this.props.children
    return (
      <div className={ styles.caller } onClick={ this.triggerDropdown.bind(this) }>
        <span className={ styles.callerSpan }>From</span>
        <button className={ styles.callerButton }>
          { this.props.numbers[0].value }
        </button>
        <div className={ styles.callerIcon }>
          <span className={ iconsStyles['icon-uni2463'] + ' ' +iconsStyles['icon'] }></span>
        </div>
        { this.state.isDropdownOpen? <Dropdown items={ this.props.numbers } />: null }
      </div>
    )
  }
}
