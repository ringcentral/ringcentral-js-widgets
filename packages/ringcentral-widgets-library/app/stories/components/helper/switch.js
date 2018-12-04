import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.children.props.checked
    };
  }
  render() {
    const { children } = this.props;
    return (
      <children.type
        {...children.props}
        checked={this.state.checked}
        onChange={() => this.setState({ checked: !this.state.checked })}
      />
    );
  }
}

// Usage :
// const SwitchWrap = wrapSwitch(Switch);
export const hoc = (WrappedComponent) => {
  class Comp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        newChecked: props.checked
      };
    }
    render() {
      return (
        <WrappedComponent
          {...this.props}
          onChange={() => {
            // this.props.onChange();
            this.setState({ newChecked: !this.state.newChecked });
          }}
          checked={this.state.newChecked}
        />
      );
    }
  }
  Comp.defaultProps = {
    onSelect() {},
    checked: undefined
  };
  Comp.propTypes = {
    onSelect: PropTypes.func,
    checked: PropTypes.bool
  };
  return Comp;
};
