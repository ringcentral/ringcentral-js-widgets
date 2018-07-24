import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';

class DropdownSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
    };
  }
  toggleShowDropdown = (e) => {
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
    this.props.onToggle(!this.state.open);
    this.setState(preState => ({
      open: !preState.open,
    }));
  }

  onChange = (e, option, idx) => {
    e.stopPropagation();
    if (this.props.placeholder && idx === 0) {
      this.toggleShowDropdown();
      return;
    }
    this.props.onChange(option, idx);
    this.toggleShowDropdown();
  };

  _handleDocumentClick = (e) => {
    if (!this.mounted) {
      return;
    }
    if (this.wrapper && this.wrapper.contains(e.target)) {
      return;
    }
    if (this.dropdownMenu && this.dropdownMenu.contains(e.target)) {
      return;
    }
    this.props.onToggle(false);
    this.setState({
      open: false,
    });
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== undefined &&
      nextProps.open !== this.props.open) {
      this.setState({
        open: nextProps.open,
      });
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
    if (this.props.placeholder) {
      value = parseInt(value, 10) + 1;
      return value === 0 ? this.props.placeholder : this.props.renderValue(value - 1);
    }
    return this.props.renderValue(value);
  }

  renderTitle(selectedOption, defaultTitle) {
    if (this.props.titleEnabled) {
      return typeof this.props.renderTitle === 'function' ?
        this.props.renderTitle(selectedOption) : defaultTitle;
    }
    return '';
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
          this.props.dropdownClassName,
          placeholder && styles.placeholder)}
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
                key={currentValue || idx}
                className={classnames(className,
                  styles[this.props.dropdownAlign],
                  ellipsis && styles.ellipsis,
                  placeholder && styles.placeholder)}
                value={currentValue}
                title={this.renderTitle(option, display)}
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
    const reference = this.props.reference;
    const label = this.props.label ?
      (
        <label>
          {this.props.label}
        </label>
      ) : null;
    const iconClassName = classnames(
      styles.icon,
      this.state.open ? styles.iconUp : null,
      this.props.iconClassName,
    );
    const containerClassName = classnames(
      styles.root,
      this.props.className,
      this.props.disabled ? styles.disabled : null,
      this.state.open ? styles.open : null,
      this.props.noPadding ? styles.noPadding : null,
    );
    const buttonClassName = classnames(
      styles.button,
      this.props.disabled ? styles.disabled : null,
    );
    const dropdownMenu = this.props.renderDropdownMenu ?
      null :
      this.renderDropdownMenu();

    const renderValue = this.renderValue(this.props.value);
    return (
      <div
        className={classnames(containerClassName,
          this.props.wrapperStyle
        )}
        ref={(ref) => {
          if (reference) reference(ref);
          this.wrapper = ref;
        }}
      >
        <div
          type="button"
          className={classnames(buttonClassName,
            this.props.buttonStyle
          )}
          onClick={this.toggleShowDropdown}
          title={this.renderTitle(this.props.options[this.props.value], renderValue)}>
          {label}
          <span
            className={classnames(
              styles.selectedValue,
              ellipsis && styles.ellipsis,
              this.props.selectedClassName,
            )}>
            {renderValue}
          </span>
          <span className={iconClassName}>
            <i className={dynamicsFont.arrow} />
          </span>
        </div>
        {dropdownMenu}
      </div>
    );
  }
}

DropdownSelect.propTypes = {
  reference: PropTypes.func,
  className: PropTypes.string,
  selectedClassName: PropTypes.string,
  dropdownClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]),
  label: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  valueFunction: PropTypes.func,
  renderFunction: PropTypes.func,
  renderValue: PropTypes.func,
  renderDropdownMenu: PropTypes.func,
  renderTitle: PropTypes.func,
  titleEnabled: PropTypes.bool,
  dropdownAlign: PropTypes.oneOf(['left', 'center', 'right']),
  stopPropagation: PropTypes.bool,
  placeholder: PropTypes.string,
  ellipsis: PropTypes.bool,
  noPadding: PropTypes.bool,
  onToggle: PropTypes.func,
  open: PropTypes.bool,
  wrapperStyle: PropTypes.string,
  buttonStyle: PropTypes.string,
};

DropdownSelect.defaultProps = {
  reference: undefined,
  className: null,
  selectedClassName: null,
  dropdownClassName: null,
  iconClassName: null,
  value: null,
  label: null,
  onChange: undefined,
  disabled: false,
  renderDropdownMenu: undefined,
  renderTitle: undefined,
  valueFunction: (_, idx) => idx,
  renderFunction: option => option,
  renderValue: option => option,
  dropdownAlign: 'center',
  titleEnabled: undefined,
  stopPropagation: false,
  placeholder: undefined,
  ellipsis: true,
  noPadding: false,
  onToggle: () => {},
  open: false,
  wrapperStyle: '',
  buttonStyle: ''
};

export default DropdownSelect;
