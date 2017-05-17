import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';

class DropdownSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.mounted = true;

    this.toggleShowDropdown = (e) => {
      console.debug('this.state.open', this.state.open);
      if (!this.state.open) {
        window.addEventListener('click', this._handleDocumentClick, false);
      } else {
        window.removeEventListener('click', this._handleDocumentClick, false);
      }
      if (e && this.props.stopPropagation) {
        e.stopPropagation();
      }
      if (this.props.disabled) {
        return;
      }
      this.setState(preState => ({
        open: !preState.open,
      }));
    };

    this.onChange = (e, option, idx) => {
      e.stopPropagation();
      if (idx === 0) {
        this.toggleShowDropdown();
        return;
      }
      this.props.onChange(option, idx);
      this.toggleShowDropdown();
    };

    this._handleDocumentClick = (e) => {
      console.debug('_handleDocumentClick', e);
      if (!this.mounted) {
        return;
      }
      if (this.wrapper && this.wrapper.contains(e.target)) {
        return;
      }
      if (this.dropdownMenu && this.dropdownMenu.contains(e.target)) {
        return;
      }
      this.setState({
        open: false,
      });
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.open !== this.state.open) {
      if (this.props.renderDropdownMenu && this.wrapper) {
        const menu = this.renderDropdownMenu();
        const buttomPosition = this.wrapper.getBoundingClientRect();
        this.props.renderDropdownMenu(menu, this.state.open, buttomPosition);
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    window.removeEventListener('click', this._handleDocumentClick, false);
  }

  valueFunction(_, idx) {
    if (this.props.placeholder) {
      idx = `${idx - 1}`;
    }
    return this.props.valueFunction(_, idx);
  }

  renderFunction(option, idx) {
    if (this.props.placeholder) {
      return idx === 0 ? this.props.placeholder : this.props.renderFunction(option, idx);
    }
    return this.props.renderFunction(option, idx);
  }

  renderValue(value) {
    value = parseInt(value, 10) + 1;
    if (this.props.placeholder) {
      return value === 0 ? this.props.placeholder : this.props.renderValue(value - 1);
    }
    return this.props.renderValue(value);
  }

  renderDropdownMenu() {
    let options;
    const { placeholder, ellipsis } = this.props;
    if (placeholder) {
      options = [
        {},
        ...this.props.options,
      ];
    } else {
      options = this.props.options;
    }
    return (
      <ul
        className={classnames(styles.dropdown,
          placeholder && styles.placeholder,
          ellipsis && styles.ellipsis)}
        ref={(ref) => { this.dropdownMenu = ref; }}>
        {
          options.map((option, idx) => {
            const currentValue = this.valueFunction(option, idx);
            const className = classnames(
              styles.dropdownItem,
              this.props.value === currentValue ? styles.selected : null,
            );
            const display = this.renderFunction(option, idx);
            return (
              <li
                key={currentValue}
                className={classnames(className,
                  styles[this.props.dropdownAlign],
                  placeholder && styles.placeholder)}
                value={currentValue}
                title={this.props.titleEnabled && display}
                onClick={e => this.onChange(e, option, idx)}
              >
                {display}
              </li>
            );
          })
        }
      </ul>
    );
  }

  render() {
    const ellipsis = this.props.ellipsis;
    const label = this.props.label ?
      (
        <label>
          {this.props.label}
        </label>
      ) : null;
    const iconClassName = classnames(
      styles.icon,
      this.state.open ? styles.iconUp : null,
    );
    const containerClassName = classnames(
      styles.root,
      this.props.className,
      this.props.disabled ? styles.disabled : null,
      this.state.open ? styles.open : null,
    );
    const dropdownMenu = this.props.renderDropdownMenu ?
      null :
      this.renderDropdownMenu();

    const renderValue = this.renderValue(this.props.value);
    return (
      <div
        className={containerClassName}
        ref={(ref) => { this.wrapper = ref; }}
      >
        <button
          className={styles.button}
          onClick={this.toggleShowDropdown}
          title={this.props.titleEnabled && renderValue}>
          {label}
          <span className={classnames(this.props.className, styles.selectedValue, ellipsis && styles.ellipsis)}>
            {renderValue}
          </span>
          <span className={iconClassName}>
            <i className={dynamicsFont.arrow} />
          </span>
        </button>
        { dropdownMenu }
      </div>
    );
  }
}

DropdownSelect.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  valueFunction: PropTypes.func,
  renderFunction: PropTypes.func,
  renderValue: PropTypes.func,
  renderDropdownMenu: PropTypes.func,
  dropdownAlign: PropTypes.oneOf(['left', 'center', 'right']),
  titleEnabled: PropTypes.bool,
  stopPropagation: PropTypes.bool,
  placeholder: PropTypes.string,
  ellipsis: PropTypes.bool,
};

DropdownSelect.defaultProps = {
  className: null,
  value: null,
  label: null,
  onChange: undefined,
  disabled: false,
  renderDropdownMenu: undefined,
  valueFunction: (_, idx) => idx,
  renderFunction: option => option,
  renderValue: option => option,
  dropdownAlign: 'center',
  titleEnabled: undefined,
  stopPropagation: false,
  placeholder: undefined,
  ellipsis: true,
};

export default DropdownSelect;
