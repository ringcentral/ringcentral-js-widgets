import React, { Component } from 'react';

import { bindDebounce } from '../../lib/bindDebounce';
import { Task } from '../CallLogPanel';
import { CallLogFieldsProps } from './CallLogFields.interface';
import { FieldItem } from './FieldItem';
import styles from './styles.scss';

const DEFAULT_INPUT_SAVE_TIMEOUT = 2e3;

export default class CallLogFields extends Component<CallLogFieldsProps, {}> {
  static defaultProps: Partial<CallLogFieldsProps> = {
    currentLog: {},
    onUpdateCallLog: undefined,
    onSelectViewVisible: () => null,
    onSaveCallLog: undefined,
    customInputDataStruct: undefined,
    subjectDropdownsTracker: undefined,
    startAdornmentRender: () => null,
    contactSearch: undefined,
  };

  debounce = bindDebounce(this, DEFAULT_INPUT_SAVE_TIMEOUT);

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
            debounce={this.debounce}
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
