import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.children.props.selected
    };
  }
  render() {
    const { children } = this.props;
    return (
      <children.type
        {...children.props}
        selected={this.state.selected}
        onSelect={({ key }) => {
          children.props.onSelect({ key });
          this.setState({ selected: key });
        }}
      />
    );
  }
}

// Usage:
// const CheckBoxWrap = wrapCheckBox(CheckBox);
export const hoc = (WrappedComponent) => {
  class Comp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        newSelected: props.selected
      };
    }
    render() {
      return (
        <WrappedComponent
          {...this.props}
          onSelect={({ key }) => {
            this.props.onSelect({ key });
            this.setState({ newSelected: key });
          }}
          selected={this.state.newSelected}
        />
      );
    }
  }
  Comp.defaultProps = {
    onSelect() {},
    selected: undefined
  };
  Comp.propTypes = {
    onSelect: PropTypes.func,
    selected: PropTypes.string
  };
  return Comp;
};
