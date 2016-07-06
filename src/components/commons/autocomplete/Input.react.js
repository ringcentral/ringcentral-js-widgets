import React from 'react';
import Menu from './Menu.react';

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

  handleOnChange(event) {
    this.setState({
      value: event.target.value,
    });
    this.props.onChange(event, event.target.value);
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
        <input
          className={this.props.className}
          onChange={() => this.handleOnChange}
          value={this.state.value}
          placeholder={this.props.placeholder}
        />
        {this.state.isOpen ? <Menu candidates={this.state.candidates} /> : null}
      </div>
    );
  }
}
