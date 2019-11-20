import React, { Component } from 'react';

import { bindDebonce } from '../../lib/bindDebonce';
import { Task } from '../CallLogPanel';
import { CallLogFieldsProps } from './CallLogFields.interface';
import { FieldItem } from './FieldItem/FieldItem';
import styles from './styles.scss';

const DEFAULT_INPUT_SAVE_TIMEOUT = 2e3;

export default class CallLogFields extends Component<CallLogFieldsProps, {}> {
  static defaultProps: Partial<CallLogFieldsProps> = {
    fieldSize: 'small',
    currentLog: {},
    onUpdateCallLog: undefined,
    onSaveCallLog: undefined,
    customInputDataStruct: undefined,
    subjectDropdownsTracker: undefined,
    startAdornmentRender: () => null,
  };

  debonce = bindDebonce(this, DEFAULT_INPUT_SAVE_TIMEOUT);

  renderFields = () => {
    const {
      currentLog: {
        customLogFields,
        currentLogCall: { isAutoSave },
        call,
        task = {} as Task,
      },
      onSaveCallLog,
    } = this.props;
    const onSave = () => isAutoSave && task.id && onSaveCallLog(call);
    return customLogFields
      .sort((a, b) => a.sort - b.sort)
      .map((fieldOption, i) => {
        return (
          <FieldItem
            {...this.props}
            fieldOption={fieldOption}
            debonce={this.debonce}
            data-sign="callLogField"
            key={`field-${i}`}
            onSave={onSave}
            timeout={DEFAULT_INPUT_SAVE_TIMEOUT}
          />
        );
      });
  };

  render() {
    const { currentLog } = this.props;
    if (!currentLog.task) {
      return null;
    }
    return (
      <div className={styles.callLogFieldsSection}>{this.renderFields()}</div>
    );
  }
}
