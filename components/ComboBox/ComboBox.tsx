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
  dropdownMenu: any;
  wrapper: any;
  inputRef = createRef();
  saveContent: any;
  constructor(props: any) {
    super(props);
    this.state = {
      open: this.props.open,
      filter: null,
    };
  }
  _toggleShowDropdown = (e: any) => {
    const { searchOption, stopPropagation, disabled, onToggle } = this.props;
    if (!this.state.open) {
      window.addEventListener('click', this._handleDocumentClick, false);
      if (searchOption) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        this.saveContent = this.inputRef.current.textContent;
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        this.inputRef.current.focus();
        // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
        document.execCommand('selectAll', false, null);
      }
    } else {
      window.removeEventListener('click', this._handleDocumentClick, false);
      if (searchOption) {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        document.getSelection().removeAllRanges();
      }
    }
    if (e && stopPropagation) {
      e.stopPropagation();
    }
    if (disabled) {
      return;
    }
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    onToggle(!this.state.open);
    if (searchOption) {
      this._reSetBoxValue();
    }
    this.setState((preState) => ({
      open: !preState.open,
    }));
  };
  onChange = (e: any, option: any, idx: any) => {
    e.stopPropagation();
    if (!(this.props.placeholder && idx === 0)) {
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      this.props.onChange(option, idx);
    }
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
    this._toggleShowDropdown();
  };
  _handleDocumentClick = (e: any) => {
    if (this.wrapper && this.wrapper.contains(e.target)) {
      return;
    }
    if (this.dropdownMenu && this.dropdownMenu.contains(e.target)) {
      return;
    }
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
    this._toggleShowDropdown();
  };
  _textChangeEmit = (e: any) => {
    this.setState({ filter: e.target.textContent });
  };
  _textPasteEmit = (e: any) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
  };
  _reSetBoxValue() {
    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    if (this.inputRef.current.textContent !== this.saveContent) {
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      this.inputRef.current.textContent = this.saveContent;
      this.setState({ filter: null });
    }
  }
  _bindInputListener() {
    if (this.props.searchOption) {
      const inputElm = this.inputRef.current;
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      inputElm.setAttribute('contenteditable', 'true');
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      inputElm.addEventListener('input', this._textChangeEmit, false);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      inputElm.addEventListener('paste', this._textPasteEmit, false);
    }
  }
  _removeInputListener() {
    if (this.props.searchOption) {
      const inputElm = this.inputRef.current;
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      inputElm.removeEventListener('input', this._textChangeEmit, false);
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      inputElm.removeEventListener('paste', this._textPasteEmit, false);
    }
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    this._bindInputListener();
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidUpdate(prevProps: any, prevState: any) {
    const { renderDropdownMenu, open } = this.props;
    if (prevState.open !== open) {
      if (renderDropdownMenu && this.wrapper) {
        const menu = this.renderDropdownMenu();
        const buttomPosition = this.wrapper.getBoundingClientRect();
        renderDropdownMenu(menu, open, buttomPosition);
      }
    }
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (nextProps.open !== undefined && nextProps.open !== this.props.open) {
      this.setState({
        open: nextProps.open,
      });
    }
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    this._removeInputListener();
  }
  valueFunction(_: any, idx: any) {
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    return this.props.valueFunction(
      _,
      this.props.placeholder ? `${idx - 1}` : idx,
    );
  }
  renderFunction(option: any, idx: any) {
    const { placeholder, renderFunction } = this.props;
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    return placeholder && idx === 0 ? placeholder : renderFunction(option, idx);
  }
  renderValue(value: any) {
    const { placeholder, renderValue } = this.props;
    if (placeholder) {
      value = parseInt(value, 10) + 1;
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      return value === 0 ? placeholder : renderValue(value - 1);
    }
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    return renderValue(value);
  }
  renderTitle(selectedOption: any, defaultTitle: any) {
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
                // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
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
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
          // @ts-expect-error TS(2322): Type '{ children: (Element | null)[]; type: string... Remove this comment to see the full error message
          type="button"
          className={classnames(buttonClassName, buttonStyle)}
          onClick={this._toggleShowDropdown}
          // @ts-expect-error TS(2538): Type 'object' cannot be used as an index type.
          title={this.renderTitle(options[value], renderValue)}
        >
          {currentLabel}
          <span
            // @ts-expect-error TS(2322): Type 'RefObject<unknown>' is not assignable to typ... Remove this comment to see the full error message
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
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
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
  valueFunction: (_: any, idx: any) => idx,
  renderFunction: (option: any) => option,
  renderValue: (option: any) => option,
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
