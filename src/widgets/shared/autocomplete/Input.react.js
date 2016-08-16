import React from 'react';
import Menu from './Menu.react';

export default class Input extends React.PureComponent {
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
    value: '',
  };

  state = {
    isOpen: false,
    candidates: [],
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
    // this.autocomplete(event.target.value);
  }

  autocomplete(value) {
    const items = this.props.items;
    const candidates = items.filter(item => item.indexOf(value) === 0);
    if (value !== '' && items.length > 0) {
      this.setState({ isOpen: true, candidates });
    } else {
      this.setState({ isOpen: false, candidates: [] });
    }
    return candidates;
  }

  render() {
    return (
      <div>
        <input
          type={"text"}
          className={this.props.className}
          onChange={(event) => this.handleChange(event)}
          value={this.props.value}
          placeholder={this.props.placeholder}
        />
        {this.state.isOpen ? <Menu candidates={this.state.candidates} /> : null}
      </div>
    );
  }
}
