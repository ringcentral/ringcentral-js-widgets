import classnames from 'classnames';
import { RcTextField, RcTextFieldProps } from '@ringcentral-integration/rcui';
import React, { Component } from 'react';

import { bindDebonce } from '../../../../lib/bindDebonce';
import { bindNextPropsUpdate } from '../../../../lib/bindNextPropsUpdate';
import styles from '../styles.scss';

type LogFieldsInputProps = {
  onChange: (...args: any[]) => any;
} & Omit<RcTextFieldProps, 'ref'>;

type LogFieldsInputState = {
  value: any;
};

class LogFieldsInput extends Component<
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
  debonce = bindDebonce(this, 500);

  constructor(props: LogFieldsInputProps) {
    super(props);
    const { value } = props;
    this.state = {
      value: value || '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.checkPropsUpdate(nextProps, 'value');
  }

  updateValue(value: string, onChange: LogFieldsInputProps['onChange']) {
    this.setState({ value });
    this.debonce(() => onChange(value));
  }

  render() {
    const { onChange, required, error, ...rest } = this.props;
    const { value } = this.state;
    const styleRequired = required ? styles.isRequired : null;
    return (
      <div className={classnames(styleRequired, styles.commonStyle)}>
        <RcTextField
          {...rest}
          required={required}
          error={error}
          value={value}
          onChange={(e) => this.updateValue(e.target.value, onChange)}
          fullWidth
        />
      </div>
    );
  }
}

export default LogFieldsInput;
