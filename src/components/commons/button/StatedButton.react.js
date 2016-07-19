import React from 'react';
import styles from './button.css';

import classNames from 'classnames';

export default class StatedButton extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    onClick: React.PropTypes.func,
    onEnterState: React.PropTypes.func,
    onLeaveState: React.PropTypes.func,
    className: React.PropTypes.string,
    initStyles: React.PropTypes.string,
    stateStyles: React.PropTypes.string,
    handleClick: React.PropTypes.func,
  };

  static defaultProps = {
    stateStyles: styles.buttonStated,
    initStyles: styles.button,
  }

  state = {
    isInState: false,
  };

  handleClick(event) {
    if (this.props.handleClick) {
      this.props.handleClick.call(this, event);
    } else {
      this.setState({ isInState: !this.state.isInState });
    }
  }

  render() {
    let content = this.props.children;
    return (
      <button
        className={classNames({
          [this.props.className]: true,
          [this.props.stateStyles]: this.state.isInState,
          [this.props.initStyles]: !this.state.isInState,
        })}
        onClick={() => this.handleClick}
      >
        {content}
      </button>
    );
  }
}
