import React, { Component, createRef } from 'react';

import classnames from 'classnames';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

type ComboBoxProps = {
  icon?: React.ReactNode;
  reference?: (...args: any[]) => any;
  className?: string;
  selectedClassName?: string;
  dropdownClassName?: string;
  iconClassName?: string;
  value?: string | object | number;
  label?: string;
  onChange?: (...args: any[]) => any;
  disabled?: boolean;
  options: any[];
  valueFunction?: (...args: any[]) => any;
  renderFunction?: (...args: any[]) => any;
  renderValue?: (...args: any[]) => any;
  renderDropdownMenu?: (...args: any[]) => any;
  renderTitle?: (...args: any[]) => any;
  titleEnabled?: boolean;
  dropdownAlign?: 'left' | 'center' | 'right';
  stopPropagation?: boolean;
  placeholder?: string;
  ellipsis?: boolean;
  noPadding?: boolean;
  onToggle?: (...args: any[]) => any;
  searchOption?: (...args: any[]) => any;
  open?: boolean;
  wrapperStyle?: string;
  buttonStyle?: string;
  dataSign?: string;
};
type ComboBoxState = {
  filter: null;
  open: any;
};
class ComboBox extends Component<ComboBoxProps, ComboBoxState> {
  inputRef = createRef();
  saveContent;
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      filter: null,
    };
  }
  _toggleShowDropdown = (e) => {
    const { searchOption, stopPropagation, disabled, onToggle } = this.props;
    if (!this.state.open) {
      window.addEventListener('click', this._handleDocumentClick, false);
      if (searchOption) {
        this.saveContent = this.inputRef.current.textContent;
        this.inputRef.current.focus();
        document.execCommand('selectAll', false, null);
      }
    } else {
      window.removeEventListener('click', this._handleDocumentClick, false);
      if (searchOption) {
        document.getSelection().removeAllRanges();
      }
    }
    if (e && stopPropagation) {
      e.stopPropagation();
    }
    if (disabled) {
      return;
    }
    onToggle(!this.state.open);
    if (searchOption) {
      this._reSetBoxValue();
    }
    this.setState((preState) => ({
      open: !preState.open,
    }));
  };
  onChange = (e, option, idx) => {
    e.stopPropagation();
    if (!(this.props.placeholder && idx === 0)) {
      this.props.onChange(option, idx);
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
    this.setState({ filter: e.target.textContent });
  };
  _textPasteEmit = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
  };
  _reSetBoxValue() {
    if (this.inputRef.current.textContent !== this.saveContent) {
      this.inputRef.current.textContent = this.saveContent;
      this.setState({ filter: null });
    }
  }
  _bindInputListener() {
    if (this.props.searchOption) {
      const inputElm = this.inputRef.current;
      inputElm.setAttribute('contenteditable', 'true');
      inputElm.addEventListener('input', this._textChangeEmit, false);
      inputElm.addEventListener('paste', this._textPasteEmit, false);
    }
  }
  _removeInputListener() {
    if (this.props.searchOption) {
      const inputElm = this.inputRef.current;
      inputElm.removeEventListener('input', this._textChangeEmit, false);
      inputElm.removeEventListener('paste', this._textPasteEmit, false);
    }
  }
  componentDidMount() {
    this._bindInputListener();
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== undefined && nextProps.open !== this.props.open) {
      this.setState({
        open: nextProps.open,
      });
    }
  }
  componentWillUnmount() {
    this._removeInputListener();
  }
  valueFunction(_, idx) {
    return this.props.valueFunction(
      _,
      this.props.placeholder ? `${idx - 1}` : idx,
    );
  }
  renderFunction(option, idx) {
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
      currentOptions = currentOptions.filter((option) =>
        searchOption(option, filter),
      );
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
              )}
              value={currentValue}
              title={this.renderTitle(option, display)}
              onClick={(e) => this.onChange(e, option, idx)}
            >
              {display}
            </li>
          );
        })}
      </ul>
    );
  }
  render() {
    const {
      reference,
      ellipsis,
      label,
      open,
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
    } = this.props;
    const currentLabel = label ? <span>{label}</span> : null;
    const currentIconClassName = classnames(
      styles.icon,
      this.state.open ? styles.iconUp : null,
      iconClassName,
    );
    const containerClassName = classnames(
      styles.root,
      className,
      disabled ? styles.disabled : null,
      this.state.open ? styles.open : null,
      noPadding ? styles.noPadding : null,
    );
    const buttonClassName = classnames(
      styles.button,
      disabled ? styles.disabled : null,
    );
    const dropdownMenu = renderDropdownMenu ? null : this.renderDropdownMenu();
    const renderValue = this.renderValue(value);
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
          <span
            ref={this.inputRef}
            data-sign="selectedItem"
            className={classnames(
              styles.selectedValue,
              ellipsis && styles.ellipsis,
              selectedClassName,
            )}
          >
            {renderValue}
          </span>
          <span className={currentIconClassName}>
            {icon === undefined ? <i className={dynamicsFont.arrow} /> : icon}
          </span>
        </div>
        {dropdownMenu}
      </div>
    );
  }
}
ComboBox.defaultProps = {
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
  dataSign: 'ComboBox',
};
export default ComboBox;
