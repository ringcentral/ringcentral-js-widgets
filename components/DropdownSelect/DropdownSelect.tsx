import {
  ellipsis,
  flexWidth,
  RcListItemText,
  RcMenuItem,
  RcMenuList,
  RcThemeProvider,
  spacing,
  styled,
} from '@ringcentral/juno';
import clsx from 'clsx';
import React, { Component, createRef } from 'react';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';

import styles from './styles.scss';

const gutter = spacing(2.5);
const StyledMenuItem = styled(RcMenuItem)`
  ${RcListItemText} {
    .RcListItemText-primary {
      font-size: 13px;
    }
    margin: 0;
  }

  padding-left: ${gutter};
  padding-right: ${gutter};
`;

const Label = styled.span`
  ${flexWidth('40%')};
  margin-right: ${spacing(2)};
`;

const Value = styled.span`
  flex: 1 1 auto;
  text-align: right;
`;

const WithLabelWrapper = styled.div`
  display: flex;

  span {
    ${ellipsis};
  }
`;

StyledMenuItem.defaultProps = {
  disableGutters: true,
};

type DropdownSelectProps = {
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
  customInputEnabled?: boolean;
  optionsWithLabel?: boolean;
  customInputLimit?: number;
};

type DropdownSelectState = {
  open: boolean;
  selectedOption: any;
  filter: unknown;
};

class DropdownSelect extends Component<
  DropdownSelectProps,
  DropdownSelectState
> {
  inputRef = createRef<HTMLInputElement>();

  // @ts-expect-error TS(2564): Property 'saveContent' has no initializer and is n... Remove this comment to see the full error message
  saveContent: string;

  _optionsWithLabel;
  wrapper: any;
  dropdownMenu: any;

  static defaultProps: Partial<DropdownSelectProps> = {
    icon: undefined,
    reference: undefined,
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
    className: null,
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
    selectedClassName: null,
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
    dropdownClassName: null,
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
    iconClassName: null,
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | nu... Remove this comment to see the full error message
    value: null,
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type '((...args: ... Remove this comment to see the full error message
    searchOption: null,
    open: false,
    wrapperStyle: '',
    buttonStyle: '',
    dataSign: 'dropdownSelect',
    customInputEnabled: false,
    optionsWithLabel: false,
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'number | un... Remove this comment to see the full error message
    customInputLimit: null,
  };

  constructor(props: DropdownSelectProps) {
    super(props);
    const selectedOption = this.props.options.find(
      (x) => x.value === this.props.value,
    );
    this.state = {
      // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
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

  _toggleShowDropdown = (e?: any) => {
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
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        this.saveContent = this.inputRef.current.value;
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        this.inputRef.current.focus();
        if (!customInputEnabled && document.execCommand) {
          // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
          document.execCommand('selectAll', false, null);
        }
      }
      if (this._optionsWithLabel) {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        this.inputRef.current.style.textAlign = 'left';
        if (customInputEnabled) {
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          const valueLength = this.inputRef.current.value.length;
          // @ts-expect-error TS(2531): Object is possibly 'null'.
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
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          document.getSelection().removeAllRanges();
        }
      }
      if (this._optionsWithLabel) {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        this.inputRef.current.style.textAlign = 'right';
      }
    }

    if (e && stopPropagation) {
      e.stopPropagation();
    }

    if (disabled) {
      return;
    }

    const { open: isPrevOpen } = this.state;
    onToggle && onToggle(!isPrevOpen);

    this.setState((preState) => ({
      open: !preState.open,
    }));
  };

  onChange = (e: any, option: any, idx: number) => {
    e.stopPropagation();
    if (!(this.props.placeholder && idx === 0)) {
      let selectedValue = option;
      if (this._optionsWithLabel) {
        selectedValue = option.value;
        this.setState({ selectedOption: option });
      }
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      this.props.onChange(selectedValue, idx);
    }
    this._toggleShowDropdown();
  };

  _handleDocumentClick = (e: any) => {
    if (this.wrapper && this.wrapper.contains(e.target)) {
      return;
    }
    if (this.dropdownMenu && this.dropdownMenu.contains(e.target)) {
      return;
    }
    this._toggleShowDropdown();
  };

  _textChangeEmit = (e: any) => {
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
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.onChange(e.target.value);
  };

  _reSetBoxValue() {
    if (
      this.inputRef.current &&
      this.inputRef.current.value !== this.saveContent
    ) {
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      this.props.onChange(this.saveContent);
    }
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidUpdate(
    prevProps: DropdownSelectProps,
    prevState: DropdownSelectState,
  ) {
    const { renderDropdownMenu, open } = this.props;
    if (prevState.open !== open) {
      if (renderDropdownMenu && this.wrapper) {
        const menu = this.renderDropdownMenu();
        const buttonPosition = this.wrapper.getBoundingClientRect();
        renderDropdownMenu(menu, open, buttonPosition);
      }
    }
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: DropdownSelectProps) {
    if (nextProps.open !== undefined && nextProps.open !== this.props.open) {
      this.setState({
        open: nextProps.open,
      });
    }
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    window.removeEventListener('click', this._handleDocumentClick, false);
  }

  valueFunction(option: any, idx: number) {
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    return this.props.valueFunction(
      option,
      this.props.placeholder ? `${idx - 1}` : idx,
    );
  }

  renderFunction(option: any, idx: number) {
    if (this._optionsWithLabel) {
      return (
        <WithLabelWrapper>
          <Label data-sign="optionLabel">{option.label}</Label>
          <Value data-sign="optionValue">{option.value}</Value>
        </WithLabelWrapper>
      );
    }
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

  renderTitle(selectedOption: any, defaultTitle: string) {
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

    const { filter, open } = this.state;

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
    if (!open) {
      currentOptions = [];
    }
    return (
      <RcMenuList
        className={clsx(styles.dropdown, dropdownClassName)}
        ref={(ref: any) => {
          this.dropdownMenu = ref;
        }}
      >
        {currentOptions.map((option, idx) => {
          const currentValue = this.valueFunction(option, idx);
          const selected = value === currentValue;

          const display = this.renderFunction(option, idx);
          const isOptionDisabled = option?.disabled ?? false;
          return (
            <StyledMenuItem
              data-sign="selectMenuItem"
              key={currentValue || idx}
              selected={selected}
              className={clsx(
                // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
                styles[dropdownAlign],
                ellipsis && styles.ellipsis,
                placeholder && styles.placeholder,
              )}
              title={this.renderTitle(option, option.value || display)}
              onClick={(e) => {
                if (!isOptionDisabled) {
                  this.onChange(e, option, idx);
                }
              }}
            >
              <RcListItemText data-sign={display}>{display}</RcListItemText>
            </StyledMenuItem>
          );
        })}
      </RcMenuList>
    );
  }

  renderSelectedOptionLabel() {
    const { open, selectedOption } = this.state;
    if (!this._optionsWithLabel) return null;
    return (
      <span
        data-sign="selectedLabel"
        className={clsx(
          styles.selectedOptionLabel,
          open ? styles.selectedOptionLabelHide : null,
        )}
      >
        {selectedOption.label}
      </span>
    );
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
      <label htmlFor="searchInput" title={label}>
        {label}
      </label>
    ) : null;
    const currentIconClassName = clsx(
      styles.icon,
      open ? styles.iconUp : null,
      iconClassName,
    );
    const containerClassName = clsx(
      styles.root,
      className,
      disabled ? styles.disabled : null,
      open ? styles.open : null,
      noPadding ? styles.noPadding : null,
    );
    const buttonClassName = clsx(
      styles.button,
      disabled ? styles.disabled : null,
    );
    const dropdownMenu =
      renderDropdownMenu || !this.state.open ? null : this.renderDropdownMenu();
    const renderValue = this.renderValue(value);
    const selectedOptionLabel = this.renderSelectedOptionLabel();
    return (
      <RcThemeProvider>
        <div
          data-sign={dataSign}
          className={clsx(containerClassName, wrapperStyle)}
          ref={(ref) => {
            if (reference) reference(ref);
            this.wrapper = ref;
          }}
        >
          <div
            data-sign="selectRoot"
            className={clsx(buttonClassName, buttonStyle)}
            onClick={this._toggleShowDropdown}
            title={this.renderTitle(options[value as number], renderValue)}
          >
            {currentLabel}
            {searchOption || customInputEnabled ? (
              <input
                ref={this.inputRef}
                data-sign="selectedItem"
                className={clsx(
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
                className={clsx(
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
      </RcThemeProvider>
    );
  }
}

export const StyledDropdownSelect = styled(DropdownSelect)``;
export default DropdownSelect;
