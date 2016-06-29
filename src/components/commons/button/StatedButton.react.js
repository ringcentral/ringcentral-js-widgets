import React from 'react';
import styles from './button.css'
export default class StatedButton extends React.Component {

  state = {
    isInState: false
  };

  static propTypes = {
    onClick: React.PropTypes.func,
    onEnterState: React.PropTypes.func,
    onLeaveState: React.PropTypes.func,
    className: React.PropTypes.string,
    initStyles: React.PropTypes.string,
    stateStyles: React.PropTypes.string,
    handleClick: React.PropTypes.func
  };

  static defaultProps = {
    stateStyles: styles['buttonStated'],
    initStyles: styles['button'],
  }

  constructor(props) {
    super(props);
  }

  handleClick(event) {
    if (this.props.handleClick)
      this.props.handleClick.call(this, event)
    else
      this.setState({ isInState: !this.state.isInState })
  }

  render() {
    let content = this.props.children
    return (
      <button 
        className={`
          ${this.props.className}
          ${this.state.isInState? this.props.stateStyles: this.props.initStyles}`}
        onClick={ this.handleClick.bind(this) }>
        { content }
      </button>
    )
  }
}
