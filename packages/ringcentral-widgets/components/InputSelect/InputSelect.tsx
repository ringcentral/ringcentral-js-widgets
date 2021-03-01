import {
  RcList,
  RcListItem,
  RcListItemText,
  RcTextField,
} from '@ringcentral/juno';
import arrowDownSvg from '@ringcentral/juno/icon/ArrowDown2';
import React, { Component } from 'react';

import { bindDebounce } from '../../lib/bindDebounce';
import { bindNextPropsUpdate } from '../../lib/bindNextPropsUpdate';
import { CustomArrowButton } from '../Rcui/CustomArrowButton';
import styles from './styles.scss';

type InputSelectProps = {
  required?: boolean;
  subjectPicklist?: any[];
  subject?: string;
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

  wrapper: HTMLDivElement;
  constructor(props) {
    super(props);
    const { subject } = this.props;
    this.state = {
      subject,
      expand: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.checkPropsUpdate(nextProps, 'subject');
  }

  componentWillUnmount() {
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
          {subjectPicklist.map((option, i) => (
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

  render() {
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
          InputProps={{
            endAdornment: subjectPicklist.length > 0 && (
              <CustomArrowButton
                symbol={arrowDownSvg}
                onClick={this.toggleDropDownList}
                size="large"
              />
            ),
          }}
          onChange={(e) => this.updateValue(e.target.value, 500)}
        />
        {this._renderPickList()}
      </div>
    );
  }

  updateValue(subject, time) {
    const { onChange, onSave, timeout } = this.props;
    this.setState({ subject }, () => {
      this.debounce(() => {
        const { subject } = this.state;
        onChange(subject).then(() => {
          this.debounce(() => onSave(), timeout - time);
        });
      }, time);
    });
  }

  onSelectChange = (subject) => {
    const { onSelectOption, onSave, onChange } = this.props;
    this.setState({ subject }, () => {
      this.debounce(() => {
        if (onSelectOption) {
          onSelectOption();
        }
        const { subject } = this.state;
        onChange(subject).then(() => onSave());
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

  _handleDocumentClick = (e) => {
    if (this.wrapper && this.wrapper.contains(e.target)) {
      return;
    }
    this.toggleDropDownList();
  };
}
