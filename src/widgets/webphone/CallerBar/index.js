import React from 'react';
import classNames from 'classnames';

import Dropdown from '../Dropdown';
import prefix from '../../../utils/style';

import Icon from '../../shared/Icon';

const { caller, callerSpan, callerButton, callerIcon } =
  prefix(['caller', 'callerSpan', 'callerButton', 'callerIcon'], 'CallerBar');

export default class CallerBar extends React.Component {
  static propTypes = {
    caller: React.PropTypes.object,
    numbers: React.PropTypes.array,
    setCaller: React.PropTypes.func,
    getString: React.PropTypes.func,
  }

  static defaultProps = {
    getString: (key) => key,
    numbers: [],
  }

  state = {
    isDropdownOpen: false,
  }

  triggerDropdown() {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen,
    });
  }

  handleClick(number) {
    this.props.setCaller(number);
  }

  render() {
    return (
      <div className={caller} onClick={() => this.triggerDropdown()}>
        <span className={callerSpan}>{this.props.getString('From')}</span>
        <button className={callerButton}>
          {this.props.caller ? this.props.caller.mid : ''}
        </button>
        <div className={callerIcon}>
          <Icon id={'icon-uni2463'} />
        </div>
        {
          this.state.isDropdownOpen ?
            <Dropdown
              items={this.props.numbers}
              onClick={
                (selectedCaller) => this.handleClick(selectedCaller)
              }
            /> :
            null
        }
      </div>
    );
  }
}
