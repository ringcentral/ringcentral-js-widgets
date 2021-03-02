import { RcTextField, RcTextFieldProps } from '@ringcentral/juno';
import classnames from 'classnames';
import React, { Component } from 'react';

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

  checkPropsUpdate = bindNextPropsUpdate(this);
  debounce = bindDebounce(this, 500);

  constructor(props: LogFieldsInputProps) {
    super(props);
    const { value } = props;
    this.state = {
      value: value || '',
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    this.checkPropsUpdate(nextProps, 'value');
  }

  updateValue(
    value: string | number,
    onChange: LogFieldsInputProps['onChange'],
  ) {
    this.setState({ value });
    this.debounce(() => onChange(value));
  }

  render() {
    const { onChange, required, error, type, ...rest } = this.props;
    const { value } = this.state;
    const styleRequired = required ? styles.isRequired : null;
    return (
      <div className={classnames(styleRequired, styles.commonStyle)}>
        <RcTextField
          {...rest}
          type={type}
          required={required}
          error={error}
          value={value}
          gutterBottom
          onChange={(e) =>
            this.updateValue(
              type === 'number' ? Number(e.target.value) : e.target.value,
              onChange,
            )
          }
          fullWidth
          clearBtn={false}
        />
      </div>
    );
  }
}
