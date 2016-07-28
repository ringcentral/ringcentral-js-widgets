import React from 'react';
import Menu from './Menu.react';

import Cleave from 'cleave.js/dist/cleave-react';
import 'cleave.js/dist/addons/cleave-phone.us';

export default class Input extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    items: React.PropTypes.array,
    className: React.PropTypes.string,
    placeholder: React.PropTypes.string,
  }

  static defaultProps = {
    onChange() {},
    items: [],
  };

  state = {
    isOpen: false,
    value: '',
    candidates: [],
  }

  componentWillReceiveProps(nextProps) {
    // Because setState is async, we need to wait for the parent component update the 'value' prop
    if (nextProps.value !== this.props.value) {
      this.autocomplete(nextProps.value);
    }
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
    this.props.onChange(event, event.target.value);
  }

  handleInput(event) {
    this.setState({
      value: event.target.value,
    });
    this.autocomplete(event.target.value);
  }

  autocomplete(value) {
    const items = this.props.items;
    const candidates = items.filter(item => item.indexOf(value) === 0);
    if (value !== '' && items.length > 0) {
      this.setState({
        isOpen: true,
        candidates,
        value,
      });
    } else {
      this.setState({
        isOpen: false,
        candidates: [],
        value,
      });
    }
    return candidates;
  }

  render() {
    return (
      <div>
        <Cleave
          className={this.props.className}
          onChange={(event) => this.handleChange(event)}
          onInput={(event) => this.handleInput(event)}
          value={this.state.value}
          options={{ phone: true, phoneRegionCode: 'US' }}
          placeholder={this.props.placeholder}
        />
        {this.state.isOpen ? <Menu candidates={this.state.candidates} /> : null}
      </div>
    );
  }
}
