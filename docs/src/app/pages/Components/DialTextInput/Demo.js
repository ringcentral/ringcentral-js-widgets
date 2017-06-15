import React, { Component } from 'react';
// eslint-disable-next-line
import DialTextInput from 'ringcentral-widget/components/DialTextInput';

/**
 * A example of `DialTextInput`
 */

class DialTextInputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  onDelete = () => {
    this.setState({
      value: ''
    });
  }
  onChangeEvent = (e) => {
    this.setState({
      value: e.target.value
    });
  }
  render() {
    return (
      <DialTextInput
        value={this.state.value}
        onDelete={this.onDelete}
        onChangeEvent={this.onChangeEvent}
      />
    );
  }
}
export default DialTextInputDemo;
