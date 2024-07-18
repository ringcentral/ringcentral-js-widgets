import clsx from 'clsx';
import React, { Component } from 'react';

import { bindDebounce } from '../../lib/bindDebounce';
import type { Task } from '../CallLogPanel';
import { CountdownTimer } from '../CountdownTimer';

import type { CallLogFieldsProps } from './CallLogFields.interface';
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
    classes: {},
    refs: {},
  };

  debounce = bindDebounce(this, DEFAULT_INPUT_SAVE_TIMEOUT);

  renderDelaySavingTimer = () => {
    const { currentLocale, currentDelaySavingState } = this.props;
    const { delayUpdatingStartTime, delayUpdatingMinutes } =
      currentDelaySavingState ?? {};
    return (
      delayUpdatingStartTime &&
      delayUpdatingMinutes && (
        <CountdownTimer
          variant="info"
          currentLocale={currentLocale}
          creationTime={delayUpdatingStartTime}
          duration={delayUpdatingMinutes}
        />
      )
    );
  };

  renderFields = () => {
    const {
      currentLog: {
        // @ts-expect-error TS(2339): Property 'customLogFields' does not exist on type ... Remove this comment to see the full error message
        customLogFields,
        // @ts-expect-error TS(2339): Property 'currentLogCall' does not exist on type '... Remove this comment to see the full error message
        currentLogCall: { isAutoSave } = {},
        // @ts-expect-error TS(2339): Property 'call' does not exist on type 'CallLog | ... Remove this comment to see the full error message
        call,
        // @ts-expect-error TS(2339): Property 'task' does not exist on type 'CallLog | ... Remove this comment to see the full error message
        task = {} as Task,
      },
      refs,
      onSaveCallLog,
    } = this.props;
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    const onSave = () => isAutoSave && task.id && onSaveCallLog(call);
    return [...customLogFields]
      .sort((a, b) => a.sort - b.sort)
      .map((fieldOption, i) => {
        return (
          <FieldItem
            {...this.props}
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            fieldRef={refs[fieldOption.value]}
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

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const { currentLog, classes } = this.props;
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    if (!currentLog.task) {
      return null;
    }
    return (
      <div
        data-sign="callLogFieldsSection"
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        className={clsx(styles.callLogFieldsSection, classes.root)}
      >
        {this.renderDelaySavingTimer()}
        {this.renderFields()}
      </div>
    );
  }
}
