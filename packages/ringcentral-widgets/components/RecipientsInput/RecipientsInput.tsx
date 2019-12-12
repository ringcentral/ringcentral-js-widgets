import classnames from 'classnames';
import React, { Component } from 'react';

import ContactDropdownList from '../ContactDropdownList';
import RemoveButton from '../RemoveButton';
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
  isSplitter: (e: any) => boolean;
  handleHotKey: (e: any) => void;
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
    this.isSplitter = (e) => {
      if (
        e.key === ',' ||
        e.key === ';' ||
        e.key === 'Enter' ||
        (e.key === 'Unidentified' && // for Safari (FF cannot rely on keyCode...)
          (e.keyCode === 186 || // semicolon
          e.keyCode === 188 || // comma
            e.keyCode === 13)) // enter
      ) {
        return true;
      }
      return false;
    };
    // using React SyntheticEvent to deal with cross browser issue
    this.handleHotKey = (e) => {
      if (this.state.isFocusOnInput && this.state.value.length >= 3) {
        if (e.key === 'ArrowUp') {
          this.reduceSelectedContactIndex();
          this.scrollOperation(e.key);
        } else if (e.key === 'ArrowDown') {
          this.addSelectedContactIndex();
          this.scrollOperation(e.key);
        }
      } else {
        this.setState({
          selectedContactIndex: 0,
        });
      }
      if (this.isSplitter(e)) {
        e.preventDefault();
        if (this.state.value.length === 0) {
          return;
        }
        const relatedContactList =
          this.state.value.length >= 3 ? this.props.searchContactList : [];
        const currentSelected =
          relatedContactList[this.state.selectedContactIndex];
        if (currentSelected && e.key === 'Enter') {
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

  onInputKeyUp = (e) => {
    this.props.searchContact(e.currentTarget.value);
    this.setState({
      isFocusOnInput: true,
    });
  };

  onInputFocus = () => {
    this.setState({
      isFocusOnInput: true,
    });
  };

  onInputChange = (e) => {
    const { value } = e.currentTarget;
    this.setState({ value }, () => {
      this.props.onChange(value);
    });
    if (this.listRef) {
      this.listRef.scrollTop = 0;
    }
  };

  onClean = () => {
    this.setState({ value: '' });
    this.props.onClean();
  };

  componentWillReceiveProps(nextProps) {
    if (
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

  clickHandler = (evt) => {
    if (this.listRef && this.listRef.contains(evt.target)) return;
    if (this.inputRef && this.inputRef.contains(evt.target)) {
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
    const { useRCUI, className, isLastInputFromDialpad } = this.props;
    // TODO a temporary fix for rendering slower search result.
    const relatedContactList =
      this.state.value.length >= 3
        ? this.props.searchContactList.slice(0, 50)
        : [];
    const label = (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label className={styles.label}>
        {this.props.label === undefined
          ? `${i18n.getString('to', this.props.currentLocale)}:`
          : this.props.label}
      </label>
    );
    const toNumberInput =
      !this.props.multiple && this.props.recipient ? null : (
        <div className={styles.inputWrapper}>
          <div
            className={classnames(
              styles.inputField,
              this.state.isFocusOnInput ? 'Mui-focused' : null,
              'MuiInput-underline',
            )}
          >
            <input
              data-sign="recipientsInput"
              ref={this.setInputRef}
              name="receiver"
              value={this.state.value}
              onChange={this.onInputChange}
              className={styles.numberInput}
              maxLength={30}
              onFocus={this.onInputFocus}
              onKeyUp={this.onInputKeyUp}
              placeholder={
                this.props.placeholder === undefined
                  ? i18n.getString(
                      'enterNameOrNumber',
                      this.props.currentLocale,
                    )
                  : this.props.placeholder
              }
              autoComplete="off"
            />
          </div>
          <RemoveButton
            className={styles.removeButton}
            onClick={this.onClean}
            visibility={this.state.value.length > 0}
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
        {label}
        <div
          className={classnames(
            useRCUI ? styles.rcuiStyle : null,
            this.props.label === undefined ? styles.rightPanel : '',
          )}
        >
          <SelectedRecipients
            recipient={this.props.recipient}
            recipients={this.props.recipients}
            multiple={this.props.multiple}
            onRemove={this.props.removeFromRecipients}
            className={this.props.recipientsClassName}
          />
          {toNumberInput}
        </div>
        <ContactDropdownList
          currentLocale={this.props.currentLocale}
          listRef={(ref) => {
            this.listRef = ref;
          }}
          scrollDirection={this.state.scrollDirection}
          selectedIndex={this.state.selectedContactIndex}
          setSelectedIndex={this.setSelectedIndex}
          addToRecipients={this._addToRecipients}
          items={relatedContactList}
          formatContactPhone={this.props.formatContactPhone}
          visibility={this.state.isFocusOnInput && !isLastInputFromDialpad}
          titleEnabled={this.props.titleEnabled}
          phoneTypeRenderer={this.props.phoneTypeRenderer}
          phoneSourceNameRenderer={this.props.phoneSourceNameRenderer}
          contactInfoRenderer={this.props.contactInfoRenderer}
          contactPhoneRenderer={this.props.contactPhoneRenderer}
        />
      </div>
    );
  }
}

export default RecipientsInput;
