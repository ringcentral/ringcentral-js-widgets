import {
  RcList,
  RcListItem,
  RcListItemText,
  RcTextField,
} from '@ringcentral/juno';
import { ArrowDown2 as arrowDownSvg } from '@ringcentral/juno-icon';
import React, { Component } from 'react';

import { bindDebounce } from '../../lib/bindDebounce';
import { bindNextPropsUpdate } from '../../lib/bindNextPropsUpdate';
import { CustomArrowButton } from '../Rcui/CustomArrowButton';

import styles from './styles.scss';

type InputSelectProps = {
  required?: boolean;
  subjectPicklist?: any[];
  subject?: string | null;
  onChange?: (...args: any[]) => any;
  onSave?: (...args: any[]) => any;
  timeout?: number;
  onSelectOption?: (...args: any[]) => any;
  label?: string;
};
type InputSelectState = {
  subject: any;
  expand: boolean;
};
export default class InputSelect extends Component<
  InputSelectProps,
  InputSelectState
> {
  static defaultProps: Partial<InputSelectProps> = {
    required: false,
    subjectPicklist: [],
    subject: null,
    onChange: undefined,
    onSave: undefined,
    timeout: 500,
    onSelectOption: undefined,
  };

  checkPropsUpdate = bindNextPropsUpdate(this);
  debounce = bindDebounce(this, this.props.timeout);

  wrapper: HTMLDivElement | null = null;
  inputRef: React.RefObject<HTMLInputElement> = React.createRef();
  constructor(props: any) {
    super(props);
    const { subject } = this.props;
    this.state = {
      subject,
      expand: false,
    };
  }

  override UNSAFE_componentWillReceiveProps(nextProps: any) {
    const isFocused = document.activeElement === this.inputRef?.current;
    if (!isFocused) {
      this.checkPropsUpdate(nextProps, 'subject', false);
    }
  }

  override componentWillUnmount() {
    window.removeEventListener('click', this._handleDocumentClick, false);
  }

  _renderPickList = () => {
    const { subjectPicklist } = this.props;
    const { expand } = this.state;
    if (!expand) {
      return null;
    }
    return (
      <div className={styles.select}>
        <RcList>
          {subjectPicklist?.map((option, i) => (
            <RcListItem
              key={i}
              button
              singleLine
              onClick={() => this.onSelectChange(option)}
              data-sign={`match${i}`}
            >
              <RcListItemText
                primary={option}
                classes={{
                  primary: styles.listText,
                }}
              />
            </RcListItem>
          ))}
        </RcList>
      </div>
    );
  };

  override render() {
    const { subjectPicklist, required, label } = this.props;
    const { subject = '' } = this.state;
    const hasError = required && subject.trim() === '';
    return (
      <div
        className={styles.root}
        ref={(ref) => {
          this.wrapper = ref;
        }}
      >
        <RcTextField
          label={label || 'Subject'}
          data-sign="subject"
          gutterBottom
          title={subject}
          fullWidth
          clearBtn={false}
          required={required}
          value={subject}
          error={hasError}
          inputProps={{
            maxLength: 255,
          }}
          inputRef={this.inputRef}
          InputProps={{
            endAdornment: subjectPicklist?.length && (
              <CustomArrowButton
                symbol={arrowDownSvg}
                onClick={this.toggleDropDownList}
                size="large"
              />
            ),
          }}
          onChange={(e) => this.updateValue(e.target, 500)}
        />
        {this._renderPickList()}
      </div>
    );
  }

  updateValue({ value }: any, time: any) {
    const { onChange, onSave, timeout = 2e3 } = this.props;
    this.setState(
      {
        subject: value,
      },
      () => {
        this.debounce(() => {
          const { subject } = this.state;
          onChange?.(subject).then(() => {
            this.debounce(() => onSave?.(), timeout - time);
          });
        }, time);
      },
    );
  }

  onSelectChange = (subject: any) => {
    const { onSelectOption, onSave, onChange } = this.props;
    this.setState({ subject }, () => {
      this.debounce(() => {
        if (onSelectOption) {
          onSelectOption();
        }
        const { subject } = this.state;
        onChange?.(subject).then(() => onSave?.());
      }, 0);
    });
    this.toggleDropDownList();
  };

  toggleDropDownList = () => {
    const { expand } = this.state;
    if (!expand) {
      window.addEventListener('click', this._handleDocumentClick, false);
    } else {
      window.removeEventListener('click', this._handleDocumentClick, false);
    }
    this.setState({ expand: !expand });
  };

  _handleDocumentClick = (e: any) => {
    if (this.wrapper && this.wrapper.contains(e.target)) {
      return;
    }
    this.toggleDropDownList();
  };
}
