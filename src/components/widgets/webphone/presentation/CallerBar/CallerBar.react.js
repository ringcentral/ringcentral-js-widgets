import React from 'react';
import classNames from 'classnames';

import Dropdown from '../Dropdown/Dropdown.react';

import { caller, callerSpan, callerButton, callerIcon } from './CallerBar.css';
import iconsStyles from '../../../../../styles/icon.css';

export default class CallerBar extends React.Component {
  static propTypes = {
    caller: React.PropTypes.string,
    numbers: React.PropTypes.array,
  }

  static defaultProps = {
    numbers: ['unknown'],
  }

  state = {
    isDropdownOpen: false,
  }

  triggerDropdown() {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen,
    });
  }

  render() {
    return (
      <div className={caller} onClick={() => this.triggerDropdown}>
        <span className={callerSpan}>From</span>
        <button className={callerButton}>
          {this.props.numbers[0].value}
        </button>
        <div className={callerIcon}>
          <span className={classNames(iconsStyles['icon-uni2463'], iconsStyles.icon)}></span>
        </div>
        {this.state.isDropdownOpen ? <Dropdown items={this.props.numbers} /> : null}
      </div>
    );
  }
}
