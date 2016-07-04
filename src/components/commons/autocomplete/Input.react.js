import React from 'react';
import Menu from './Menu.react'

export default class Input extends React.Component {

  state = {
    isOpen: false,
    value: '',
    candidates: [],
  }

  static propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    items: React.PropTypes.array,
    className: React.PropTypes.string,
  }

  static defaultProps = {
    onChange: function() {},
  };

  constructor(props) {
    super(props);
  }

  handleOnChange(event) {
    this.setState({
      value: event.target.value
    })
    this.props.onChange(event, event.target.value)
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
        value,
      })
    else
      this.setState({
        isOpen: false,
        candidates: [],
        value,
      })
    return candidates
  }

  render() {
    return (
      <div>
        <input 
          className={ this.props.className }
          onChange={ this.handleOnChange.bind(this) }
          value={ this.state.value }
          placeholder={ this.props.placeholder }
        />
        { this.state.isOpen? <Menu candidates={ this.state.candidates } />: null }
      </div>
    )
  }
}
