import React, { Component } from 'react';

import classnames from 'classnames';

import { RcTextField, RcTextFieldProps } from '@ringcentral/juno';

import { bindDebounce } from '../../../../lib/bindDebounce';
import { bindNextPropsUpdate } from '../../../../lib/bindNextPropsUpdate';
import styles from '../styles.scss';

type LogFieldsInputProps = {
  onChange: (...args: any[]) => any;
} & Omit<RcTextFieldProps, 'ref'>;

type LogFieldsInputState = {
  value: any;
};

export class LogFieldsInput extends Component<
  LogFieldsInputProps,
  LogFieldsInputState
> {
  static defaultProps: Partial<LogFieldsInputProps> = {
    type: 'text',
    required: false,
    placeholder: 'no label',
    value: undefined,
    multiline: false,
  };
  inputRef = React.createRef();

  checkPropsUpdate = bindNextPropsUpdate(this);
  debounce = bindDebounce(this, 500);

  constructor(props: LogFieldsInputProps) {
    super(props);
    const { value } = props;
    this.state = {
      value: value || '',
    };
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  // eslint-disable-next-line react/no-deprecated
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    const isFocus = document.activeElement === this.inputRef.current;
    this.checkPropsUpdate(nextProps, 'value', isFocus);
  }

  updateValue(
    value: string | number,
    onChange: LogFieldsInputProps['onChange'],
  ) {
    this.setState({ value });
    this.debounce(() => onChange(value));
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const { onChange, required, error, type, onFocus, ...rest } = this.props;
    const { value } = this.state;
    const styleRequired = required ? styles.isRequired : null;
    return (
      <div className={classnames(styleRequired, styles.commonStyle)}>
        <RcTextField
          {...rest}
          inputRef={this.inputRef}
          type={type}
          required={required}
          error={error}
          value={value}
          gutterBottom
          onChange={(e) =>
            this.updateValue(
              type === 'number' && e.target.value !== ''
                ? Number(e.target.value)
                : e.target.value,
              onChange,
            )
          }
          fullWidth
          clearBtn={false}
          onFocus={onFocus}
        />
      </div>
    );
  }
}
