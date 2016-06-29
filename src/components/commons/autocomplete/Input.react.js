import React from 'react';
import Menu from './Menu.react'

export default class Input extends React.Component {

  state = {
    isOpen: false,
    candidates: []
  }

  static propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    items: React.PropTypes.array,
  }

  constructor(props) {
    super(props);
  }

  handleOnChange(event) {
    this.props.onChange(event)
  }

  componentWillReceiveProps(nextProps) {
    // Because setState is async, we need to wait for the parent component update the 'value' prop
    if (nextProps.value !== this.props.value)
      this.autocomplete(nextProps.value)
  }

  autocomplete(value) {
    let items = this.props.items
    let candidates = items.filter(item => item.indexOf(value) === 0)
    if (value !== '' && items.length > 0)
      this.setState({
        isOpen: true,
        candidates,
      })
    else
      this.setState({
        isOpen: false,
        candidates: [],
      })
    return candidates
  }

  render() {
    console.log(this.state.isOpen);
    return (
      <div>
        <input 
          onChange={ this.handleOnChange.bind(this) }
          value={ this.props.value }
        />
        { this.state.isOpen? <Menu candidates={ this.state.candidates } />: null}
      </div>
    )
  }
}
