import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, createRef } from 'react';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

class DropdownSelect extends Component {
  inputRef = createRef();

  saveContent;

  _optionsWithLabel;

  constructor(props) {
    super(props);
    const selectedOption = this.props.options.find(
      (x) => x.value === this.props.value,
    );
    this.state = {
      open: this.props.open,
      filter: null,
      selectedOption: selectedOption || {
        value: this.props.value,
        label: 'Custom',
      },
    };
    this._optionsWithLabel =
      this.props.optionsWithLabel && this.props?.options[0]?.label;
  }

  _toggleShowDropdown = (e) => {
    const {
      searchOption,
      stopPropagation,
      disabled,
      onToggle,
      customInputEnabled,
    } = this.props;
    if (!this.state.open) {
      window.addEventListener('click', this._handleDocumentClick, false);

      if (searchOption) {
        this.saveContent = this.inputRef.current.value;
        this.inputRef.current.focus();
        if (!customInputEnabled && document.execCommand) {
          document.execCommand('selectAll', false, null);
        }
      }
      if (this._optionsWithLabel) {
        this.inputRef.current.style.textAlign = 'left';
        if (customInputEnabled) {
          const valueLength = this.inputRef.current.value.length;
          this.inputRef.current.setSelectionRange(valueLength, valueLength);
        }
      }
    } else {
      window.removeEventListener('click', this._handleDocumentClick, false);
      if (searchOption) {
        this.setState({ filter: null });
        if (!customInputEnabled) {
          this._reSetBoxValue();
        }
        if (document.getSelection) {
          document.getSelection().removeAllRanges();
        }
      }
      if (this._optionsWithLabel) {
        this.inputRef.current.style.textAlign = 'right';
      }
    }

    if (e && stopPropagation) {
      e.stopPropagation();
    }

    if (disabled) {
      return;
    }

    onToggle(!this.state.open);

    this.setState((preState) => ({
      open: !preState.open,
    }));
  };

  onChange = (e, option, idx) => {
    e.stopPropagation();
    if (!(this.props.placeholder && idx === 0)) {
      let selectedValue = option;
      if (this._optionsWithLabel) {
        selectedValue = option.value;
        this.setState({ selectedOption: option });
      }
      this.props.onChange(selectedValue, idx);
    }
    this._toggleShowDropdown();
  };

  _handleDocumentClick = (e) => {
    if (this.wrapper && this.wrapper.contains(e.target)) {
      return;
    }
    if (this.dropdownMenu && this.dropdownMenu.contains(e.target)) {
      return;
    }
    this._toggleShowDropdown();
  };

  _textChangeEmit = (e) => {
    const { customInputLimit } = this.props;
    if (
      customInputLimit &&
      e.target.value &&
      e.target.value.length > customInputLimit
    ) {
      return;
    }
    if (this._optionsWithLabel) {
      const oneOfOptions = this.props.options.find(
        (option) => option.value === e.target.value,
      );
      if (oneOfOptions) {
        this.setState({ selectedOption: oneOfOptions });
      } else {
        this.setState({
          selectedOption: {
            label: e.target.value ? 'Custom' : null,
            value: e.target.value,
          },
        });
      }
    }
    if (this.props.searchOption) {
      this.setState({ filter: e.target.value });
    }
    this.props.onChange(e.target.value);
  };

  _reSetBoxValue() {
    if (
      this.inputRef.current &&
      this.inputRef.current.value !== this.saveContent
    ) {
      this.props.onChange(this.saveContent);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { renderDropdownMenu, open } = this.props;
    if (prevState.open !== open) {
      if (renderDropdownMenu && this.wrapper) {
        const menu = this.renderDropdownMenu();
        const buttomPosition = this.wrapper.getBoundingClientRect();
        renderDropdownMenu(menu, open, buttomPosition);
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.open !== undefined && nextProps.open !== this.props.open) {
      this.setState({
        open: nextProps.open,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this._handleDocumentClick, false);
  }

  valueFunction(_, idx) {
    return this.props.valueFunction(
      _,
      this.props.placeholder ? `${idx - 1}` : idx,
    );
  }

  renderFunction(option, idx) {
    if (this._optionsWithLabel) {
      return (
        <>
          <span className={styles.optionLabel}>{option.label}</span>
          <span className={styles.optionValue}>{option.value}</span>
        </>
      );
    }
    const { placeholder, renderFunction } = this.props;
    return placeholder && idx === 0 ? placeholder : renderFunction(option, idx);
  }

  renderValue(value) {
    const { placeholder, renderValue } = this.props;
    if (placeholder) {
      value = parseInt(value, 10) + 1;
      return value === 0 ? placeholder : renderValue(value - 1);
    }
    return renderValue(value);
  }

  renderTitle(selectedOption, defaultTitle) {
    const { titleEnabled, renderTitle } = this.props;
    if (titleEnabled) {
      return typeof renderTitle === 'function'
        ? renderTitle(selectedOption)
        : defaultTitle;
    }
    return '';
  }

  renderDropdownMenu() {
    const {
      placeholder,
      ellipsis,
      options,
      dropdownClassName,
      value,
      searchOption,
      dropdownAlign,
    } = this.props;

    const { filter } = this.state;

    let currentOptions = placeholder ? [{}, ...options] : options;

    if (searchOption && filter) {
      if (this._optionsWithLabel) {
        currentOptions = currentOptions.filter((option) =>
          searchOption(option.value, filter),
        );
      } else {
        currentOptions = currentOptions.filter((option) =>
          searchOption(option, filter),
        );
      }
    }
    return (
      <ul
        className={classnames(
          styles.dropdown,
          dropdownClassName,
          placeholder && styles.placeholder,
        )}
        ref={(ref) => {
          this.dropdownMenu = ref;
        }}
      >
        {currentOptions.map((option, idx) => {
          const currentValue = this.valueFunction(option, idx);
          const className = classnames(
            styles.dropdownItem,
            value === currentValue ? styles.selected : null,
          );
          const display = this.renderFunction(option, idx);
          return (
            <li
              data-sign="selectMenuItem"
              key={currentValue || idx}
              className={classnames(
                className,
                styles[dropdownAlign],
                ellipsis && styles.ellipsis,
                placeholder && styles.placeholder,
                this._optionsWithLabel && styles.withLabel,
              )}
              value={currentValue}
              title={this.renderTitle(option, option.value || display)}
              onClick={(e) => this.onChange(e, option, idx)}
            >
              {display}
            </li>
          );
        })}
      </ul>
    );
  }

  renderSelectedOptionLabel() {
    const { open, selectedOption } = this.state;
    if (!this._optionsWithLabel) return null;
    return (
      <span
        data-sign="selectedLabel"
        className={classnames(
          styles.selectedOptionLabel,
          open ? styles.selectedOptionLabelHide : null,
        )}
      >
        {selectedOption.label}
      </span>
    );
  }

  render() {
    const {
      reference,
      ellipsis,
      label,
      iconClassName,
      className,
      disabled,
      noPadding,
      renderDropdownMenu,
      value,
      dataSign,
      wrapperStyle,
      buttonStyle,
      options,
      selectedClassName,
      icon,
      searchOption,
      customInputEnabled,
    } = this.props;
    const { open, selectedOption } = this.state;
    const currentLabel = label ? (
      <label htmlFor="searchInput">{label}</label>
    ) : null;
    const currentIconClassName = classnames(
      styles.icon,
      open ? styles.iconUp : null,
      iconClassName,
    );
    const containerClassName = classnames(
      styles.root,
      className,
      disabled ? styles.disabled : null,
      open ? styles.open : null,
      noPadding ? styles.noPadding : null,
    );
    const buttonClassName = classnames(
      styles.button,
      disabled ? styles.disabled : null,
    );
    const dropdownMenu = renderDropdownMenu ? null : this.renderDropdownMenu();
    const renderValue = this.renderValue(value);
    const selectedOptionLabel = this.renderSelectedOptionLabel();
    return (
      <div
        data-sign={dataSign}
        className={classnames(containerClassName, wrapperStyle)}
        ref={(ref) => {
          if (reference) reference(ref);
          this.wrapper = ref;
        }}
      >
        <div
          type="button"
          className={classnames(buttonClassName, buttonStyle)}
          onClick={this._toggleShowDropdown}
          title={this.renderTitle(options[value], renderValue)}
        >
          {currentLabel}
          {searchOption || customInputEnabled ? (
            <input
              ref={this.inputRef}
              data-sign="selectedItem"
              className={classnames(
                styles.customInput,
                ellipsis && styles.ellipsis,
                selectedClassName,
                this._optionsWithLabel && styles.inputWithLabel,
                open && this._optionsWithLabel && styles.active,
              )}
              value={
                this._optionsWithLabel ? selectedOption.value : renderValue
              }
              onChange={this._textChangeEmit}
              id="searchInput"
              autoComplete="off"
            />
          ) : (
            <span
              ref={this.inputRef}
              data-sign="selectedItem"
              className={classnames(
                styles.selectedValue,
                ellipsis && styles.ellipsis,
                selectedClassName,
                this._optionsWithLabel && styles.inputWithLabel,
              )}
            >
              {renderValue}
            </span>
          )}
          <span className={currentIconClassName}>
            {icon === undefined ? <i className={dynamicsFont.arrow} /> : icon}
          </span>
          {this._optionsWithLabel && selectedOptionLabel}
        </div>
        {dropdownMenu}
      </div>
    );
  }
}

DropdownSelect.propTypes = {
  icon: PropTypes.node,
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
  // the render of dropdown menu item
  renderFunction: PropTypes.func,
  // the button display render
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
  searchOption: PropTypes.func,
  open: PropTypes.bool,
  wrapperStyle: PropTypes.string,
  buttonStyle: PropTypes.string,
  dataSign: PropTypes.string,
  customInputEnabled: PropTypes.bool,
  optionsWithLabel: PropTypes.bool,
  customInputLimit: PropTypes.number,
};

DropdownSelect.defaultProps = {
  icon: undefined,
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
  renderFunction: (option) => option,
  renderValue: (option) => option,
  dropdownAlign: 'center',
  titleEnabled: undefined,
  stopPropagation: false,
  placeholder: undefined,
  ellipsis: true,
  noPadding: false,
  onToggle() {},
  searchOption: null,
  open: false,
  wrapperStyle: '',
  buttonStyle: '',
  dataSign: 'dropdownSelect',
  customInputEnabled: false,
  optionsWithLabel: false,
  customInputLimit: null,
};

export default DropdownSelect;
