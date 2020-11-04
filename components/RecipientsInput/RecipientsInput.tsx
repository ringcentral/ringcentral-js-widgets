import classnames from 'classnames';
import React, { Component, ClipboardEvent } from 'react';

import ContactDropdownList from '../ContactDropdownList';
import { RemoveButton } from '../RemoveButton';
import { focusCampo } from './focusCampo';
import i18n from './i18n';
import { SelectedRecipients } from './SelectedRecipients';
import styles from './styles.scss';

type RecipientsInputProps = {
  className?: string;
  recipientsClassName?: string;
  label?: string;
  placeholder?: string;
  searchContactList: {
    name: string;
    entityType: string;
    phoneType: string;
    phoneNumber: string;
  }[];
  recipient?: {
    phoneNumber: string;
    name?: string;
  };
  recipients?: {
    phoneNumber: string;
    name?: string;
  }[];
  value: string;
  onChange: (...args: any[]) => any;
  onClean: (...args: any[]) => any;
  addToRecipients: (...args: any[]) => any;
  removeFromRecipients: (...args: any[]) => any;
  formatContactPhone: (...args: any[]) => any;
  detectPhoneNumbers: (...args: any[]) => any;
  searchContact?: (...args: any[]) => any;
  titleEnabled?: boolean;
  autoFocus?: boolean;
  currentLocale: string;
  multiple?: boolean;
  inputRef?: (...args: any[]) => any;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  contactInfoRenderer?: (...args: any[]) => any;
  contactPhoneRenderer?: (...args: any[]) => any;
  useRCUI?: boolean;
  isLastInputFromDialpad?: boolean;
};
type RecipientsInputState = {
  value: any;
  lastInputTimestamp: number;
  isFocusOnInput: boolean;
  selectedContactIndex: number;
  scrollDirection: null;
};

class RecipientsInput extends Component<
  RecipientsInputProps,
  RecipientsInputState
> {
  setSelectedIndex: (index: any) => void;
  scrollOperation: (direction: any) => void;
  addSelectedContactIndex: () => void;
  reduceSelectedContactIndex: () => void;
  isSplitter: (ev: React.KeyboardEvent<HTMLInputElement>) => boolean;
  handleHotKey: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  listRef: any;
  inputRef: any;
  _focusTimeout: NodeJS.Timeout;

  static defaultProps: Partial<RecipientsInputProps> = {
    recipients: [],
    searchContact: () => null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      lastInputTimestamp: 0,
      isFocusOnInput: false,
      selectedContactIndex: 0,
      scrollDirection: null,
    };
    this.setSelectedIndex = (index) => {
      this.setState({
        selectedContactIndex: index,
        scrollDirection: null,
      });
    };
    this.scrollOperation = (direction) => {
      if (direction === 'ArrowDown' || direction === 'ArrowUp') {
        this.setState({
          scrollDirection: direction,
        });
      }
    };
    this.addSelectedContactIndex = () => {
      const { length } = this.props.searchContactList;
      if (this.state.selectedContactIndex >= length - 1) {
        this.setState({
          selectedContactIndex: length - 1,
        });
      } else {
        this.setState((preState) => ({
          selectedContactIndex: preState.selectedContactIndex + 1,
        }));
      }
    };
    this.reduceSelectedContactIndex = () => {
      if (this.state.selectedContactIndex > 0) {
        this.setState((preState) => ({
          selectedContactIndex: preState.selectedContactIndex - 1,
        }));
      } else {
        this.setState({
          selectedContactIndex: 0,
        });
      }
    };
    this.isSplitter = (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        ev.key === ',' ||
        ev.key === ';' ||
        ev.key === 'Enter' ||
        (ev.key === 'Unidentified' && // for Safari (FF cannot rely on keyCode...)
          (ev.keyCode === 186 || // semicolon
            ev.keyCode === 188 || // comma
            ev.keyCode === 13)) // enter
      ) {
        return true;
      }
      return false;
    };
    // using React SyntheticEvent to deal with cross browser issue
    this.handleHotKey = (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (this.state.isFocusOnInput && this.state.value.length >= 3) {
        if (ev.key === 'ArrowUp') {
          this.reduceSelectedContactIndex();
          this.scrollOperation(ev.key);
        } else if (ev.key === 'ArrowDown') {
          this.addSelectedContactIndex();
          this.scrollOperation(ev.key);
        }
      } else {
        this.setState({
          selectedContactIndex: 0,
        });
      }
      if (this.isSplitter(ev)) {
        ev.preventDefault();
        if (this.state.value.length === 0) {
          return;
        }
        const relatedContactList =
          this.state.value.length >= 3 ? this.props.searchContactList : [];
        const currentSelected =
          relatedContactList[this.state.selectedContactIndex];
        if (currentSelected && ev.key === 'Enter') {
          this.props.addToRecipients({
            name: currentSelected.name,
            phoneNumber: currentSelected.phoneNumber,
          });
        } else {
          this.props.addToRecipients({
            name: this.state.value.replace(',', ''),
            phoneNumber: this.state.value.replace(',', ''),
          });
        }
      }
    };
  }

  onInputKeyUp = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    this.props.searchContact(ev.currentTarget.value);
    this.setState({
      isFocusOnInput: true,
    });
  };

  onInputFocus = () => {
    this.setState({
      isFocusOnInput: true,
    });
  };

  onInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.currentTarget;
    const lastInputTimestamp = Date.now();
    this.setState({ value, lastInputTimestamp }, () => {
      this.props.onChange(value);
    });
    if (this.listRef) {
      this.listRef.scrollTop = 0;
    }
  };

  onPaste = async (ev: ClipboardEvent) => {
    if (
      this.props.detectPhoneNumbers &&
      ev.clipboardData &&
      ev.clipboardData.getData
    ) {
      ev.preventDefault();
      const pastedText = ev.clipboardData.getData('text/plain');
      const result = await this.props.detectPhoneNumbers(pastedText);
      const currentVal = this.state.value || '';
      if (!result) {
        const newVal = `${currentVal}${pastedText.replace(/\n/g, ' ')}`;
        this.setState({ value: newVal }, () => {
          this.props.onChange(newVal);
        });
      }
    }
  };

  onClean = () => {
    this.setState({ value: '' });
    this.props.onClean();
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const isNotEditing =
      !this.state.isFocusOnInput ||
      Date.now() - this.state.lastInputTimestamp > 2000;
    if (
      isNotEditing &&
      nextProps.value !== undefined &&
      nextProps.value !== this.props.value &&
      nextProps.value !== this.state.value
    ) {
      this.setState({ value: nextProps.value }, () => {
        if (this.inputRef) {
          focusCampo(this.inputRef);
        }
      });
      this.props.searchContact(nextProps.value);
    }
  }

  componentDidMount() {
    this.props.searchContact(this.props.value);
    window.addEventListener('click', this.clickHandler);
    if (this.props.autoFocus) {
      this._focusTimeout = setTimeout(() => {
        if (this.inputRef) {
          this.inputRef.focus();
        }
      }, 300);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.clickHandler);
  }

  clickHandler = (ev: MouseEvent) => {
    if (this.listRef && this.listRef.contains(ev.target)) {
      return;
    }
    if (this.inputRef && this.inputRef.contains(ev.target)) {
      this.setState({
        isFocusOnInput: true,
      });
      return;
    }
    this.setState({
      isFocusOnInput: false,
    });
  };

  _addToRecipients = (item) => {
    this.setState({ value: '', isFocusOnInput: false });
    this.props.addToRecipients(item);
  };

  setInputRef = (ref) => {
    this.inputRef = ref;
    if (typeof this.props.inputRef === 'function') {
      this.props.inputRef(ref);
    }
  };

  render() {
    const {
      className,
      contactInfoRenderer,
      contactPhoneRenderer,
      currentLocale,
      formatContactPhone,
      isLastInputFromDialpad,
      label,
      multiple,
      phoneSourceNameRenderer,
      phoneTypeRenderer,
      placeholder,
      recipient,
      recipients,
      recipientsClassName,
      removeFromRecipients,
      searchContactList,
      titleEnabled,
      useRCUI,
    } = this.props;

    const {
      value,
      isFocusOnInput,
      scrollDirection,
      selectedContactIndex,
    } = this.state;
    // TODO a temporary fix for rendering slower search result.
    const relatedContactList =
      value.length >= 3 ? searchContactList.slice(0, 50) : [];
    const labelEl = (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label className={styles.label}>
        {label === undefined
          ? `${i18n.getString('to', currentLocale)}:`
          : label}
      </label>
    );
    const toNumberInput =
      !multiple && recipient ? null : (
        <div className={styles.inputWrapper}>
          <div
            className={classnames(
              styles.inputField,
              isFocusOnInput ? 'Mui-focused' : null,
              'MuiInput-underline',
            )}
          >
            <input
              data-sign="recipientsInput"
              ref={this.setInputRef}
              name="receiver"
              value={value}
              onChange={this.onInputChange}
              onPaste={this.onPaste}
              className={styles.numberInput}
              maxLength={30}
              onFocus={this.onInputFocus}
              onKeyUp={this.onInputKeyUp}
              placeholder={
                placeholder === undefined
                  ? i18n.getString('enterNameOrNumber', currentLocale)
                  : placeholder
              }
              autoComplete="off"
            />
          </div>
          <RemoveButton
            className={styles.removeButton}
            onClick={this.onClean}
            visibility={value.length > 0}
          />
        </div>
      );
    return (
      <div
        className={classnames(
          styles.container,
          useRCUI ? styles.rcuiStyle : null,
          className,
        )}
        onKeyDown={this.handleHotKey}
      >
        {labelEl}
        <div
          className={classnames(
            useRCUI ? styles.rcuiStyle : null,
            label === undefined ? styles.rightPanel : '',
          )}
        >
          <SelectedRecipients
            recipient={recipient}
            recipients={recipients}
            multiple={multiple}
            onRemove={removeFromRecipients}
            className={recipientsClassName}
          />
          {toNumberInput}
        </div>
        <ContactDropdownList
          currentLocale={currentLocale}
          listRef={(ref) => {
            this.listRef = ref;
          }}
          scrollDirection={scrollDirection}
          selectedIndex={selectedContactIndex}
          setSelectedIndex={this.setSelectedIndex}
          addToRecipients={this._addToRecipients}
          items={relatedContactList}
          formatContactPhone={formatContactPhone}
          visibility={isFocusOnInput && !isLastInputFromDialpad}
          titleEnabled={titleEnabled}
          phoneTypeRenderer={phoneTypeRenderer}
          phoneSourceNameRenderer={phoneSourceNameRenderer}
          contactInfoRenderer={contactInfoRenderer}
          contactPhoneRenderer={contactPhoneRenderer}
        />
      </div>
    );
  }
}

export default RecipientsInput;
