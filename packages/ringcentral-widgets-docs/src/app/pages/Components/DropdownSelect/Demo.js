import React, { Component } from 'react';
// eslint-disable-next-line
import DropdownSelect from 'ringcentral-widgets/components/DropdownSelect';

/**
 * A example of `DropdownSelect`
 */
const options = [{
  display: 'Option1',
  value: '1'
},{
  display: 'Option2',
  value: '2'
}];
class DropdownSelectDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '1',
    };

  }
  onChange = (option) => {
    this.setState({
      value: option.value
    });
  }
  renderValue = (value) => {
    const selected = options.find((option) =>  option.value === value );
    return selected.display;
  }
  render() {
    return (
      <div>
        <DropdownSelect
          value={this.state.value}
          options={options}
          onChange={this.onChange}
          renderFunction={option => option.display}
          valueFunction={option => option.value}
          renderValue={this.renderValue}
        />

        <p>{`The value you selected is ${this.state.value}`}</p>
      </div>
    );
  }
}

export default DropdownSelectDemo;
