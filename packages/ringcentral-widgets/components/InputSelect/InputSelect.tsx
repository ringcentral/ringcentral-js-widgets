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
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
    subject: null,
    onChange: undefined,
    onSave: undefined,
    timeout: 500,
    onSelectOption: undefined,
  };

  checkPropsUpdate = bindNextPropsUpdate(this);
  debounce = bindDebounce(this, this.props.timeout);

  // @ts-expect-error TS(2564): Property 'wrapper' has no initializer and is not d... Remove this comment to see the full error message
  wrapper: HTMLDivElement;
  constructor(props: any) {
    super(props);
    const { subject } = this.props;
    this.state = {
      subject,
      expand: false,
    };
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
    this.checkPropsUpdate(nextProps, 'subject');
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
          {/* @ts-expect-error TS(2532): Object is possibly 'undefined'. */}
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

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const { subjectPicklist, required, label } = this.props;
    const { subject = '' } = this.state;
    const hasError = required && subject.trim() === '';
    return (
      <div
        className={styles.root}
        ref={(ref) => {
          // @ts-expect-error TS(2322): Type 'HTMLDivElement | null' is not assignable to ... Remove this comment to see the full error message
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
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
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

  updateValue(subject: any, time: any) {
    const { onChange, onSave, timeout } = this.props;
    this.setState({ subject }, () => {
      this.debounce(() => {
        const { subject } = this.state;
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        onChange(subject).then(() => {
          // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
          this.debounce(() => onSave(), timeout - time);
        });
      }, time);
    });
  }

  onSelectChange = (subject: any) => {
    const { onSelectOption, onSave, onChange } = this.props;
    this.setState({ subject }, () => {
      this.debounce(() => {
        if (onSelectOption) {
          onSelectOption();
        }
        const { subject } = this.state;
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
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

  _handleDocumentClick = (e: any) => {
    if (this.wrapper && this.wrapper.contains(e.target)) {
      return;
    }
    this.toggleDropDownList();
  };
}
