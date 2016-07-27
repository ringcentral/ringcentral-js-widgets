import React from 'react';
import classNames from 'classnames';

import Dropdown from '../Dropdown/Dropdown.react';

import { caller, callerSpan, callerButton, callerIcon } from './CallerBar.css';
import iconsStyles from '../../../../../styles/icon.css';

export default class CallerBar extends React.Component {
  static propTypes = {
    caller: React.PropTypes.string,
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
    caller: null,
  }

  componentWillMount() {
    if (this.props.numbers[0]) {
      this.setDefaultCaller(this.props.numbers);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.caller && nextProps.numbers[0]) {
      this.setDefaultCaller(nextProps.numbers);
    }
  }

  setDefaultCaller(numbers) {
    this.setState({ caller: numbers[0].phoneNumber });
  }

  triggerDropdown() {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen,
    });
  }

  handleClick(number) {
    this.props.setCaller(number);
    this.setState({ caller: number });
  }

  render() {
    const items = this.props.numbers.map(number => ({
      left: number.country.name,
      mid: number.phoneNumber,
      right: number.usageType.slice(0, number.usageType.indexOf('Number')),
    }));
    return (
      <div className={caller} onClick={() => this.triggerDropdown()}>
        <span className={callerSpan}>{this.props.getString('From')}</span>
        <button className={callerButton}>{this.state.caller}</button>
        <div className={callerIcon}>
          <span className={classNames(iconsStyles['icon-uni2463'], iconsStyles.icon)}></span>
        </div>
        {
          this.state.isDropdownOpen ?
            <Dropdown items={items} onClick={(left, mid, right) => this.handleClick(mid)} /> :
            null
        }
      </div>
    );
  }
}
