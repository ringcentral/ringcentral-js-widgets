import {
  RcDatePicker,
  RcIconButton,
  RcLineSelect,
  RcMenuItem,
  RcTextField,
} from '@ringcentral-integration/rcui';
import React, { Component } from 'react';

import { setUTCTime } from '../../../lib/timeFormatHelper';
import InputSelect from '../../InputSelect';
import { CustomArrowButton } from '../../Rcui/CustomArrowButton';
import { SelectList } from '../../SelectList';
import { CallLogFieldsProps, FieldMetadata } from '../CallLogFields.interface';
import { FieldItemOption, FieldsMap } from './FieldItem.interface';
import styles from './styles.scss';
import { LogFieldsInput } from './utils';

const DEFAULT_FINDER = {
  getValue: (item) => (typeof item === 'object' ? item.id : item) || null,
  searchOption: (option, text) =>
    option.name && option.name.toLowerCase().includes(text.toLowerCase()),
};

const appDefaultValue = '[None]';

export type FieldItemProps = {
  timeout: number;
  fieldOption: FieldItemOption;
  onSave(): any;
  debonce(cb: any, time2?: any): void;
} & CallLogFieldsProps;

export class FieldItem extends Component<FieldItemProps, {}> {
  get currentValue() {
    const {
      fieldOption: { value },
    } = this.props;
    const {
      currentLog: { task },
    } = this.props;
    return task[value];
  }

  // this is click to new popup window page
  private renderReference = () => {
    const {
      fieldOption: {
        label,
        value,
        disabled: currentDisabled,
        onChange: fieldOnChange,
      },
      onSave,
      onSelectViewVisible,
    } = this.props;
    const {
      currentLog,
      startAdornmentRender,
      referenceFieldOptions,
      currentLocale,
    } = this.props;
    const {
      task,
      currentLogCall: { phoneNumber },
    } = currentLog;
    const referenceFieldOption = referenceFieldOptions[value];
    if (!referenceFieldOption) {
      console.warn(
        `Reference field "${value}" requires options in renderEditLogSection`,
      );
      return;
    }
    const {
      getLabel,
      getValue: _getValue,
      onChange,
      metadata = {} as FieldMetadata,
      rightIconRender,
      matchedEntitiesGetter,
      otherEntitiesGetter,
      associatedEntitiesGetter,
      shouldShowAssociatedSection,
      shouldDisable = () => false,
      disableReason = '',
      currentOptionFinder,
      searchOptionFinder: _searchOptionFinder,
    } = referenceFieldOption;
    const matchedEntities = matchedEntitiesGetter(currentLog);
    const otherEntities = otherEntitiesGetter(currentLog);
    const showAssociatedSection = shouldShowAssociatedSection
      ? shouldShowAssociatedSection(currentLog)
      : false;
    const associatedEntities =
      showAssociatedSection && associatedEntitiesGetter
        ? associatedEntitiesGetter(currentLog)
        : [];
    const getValue = _getValue || DEFAULT_FINDER.getValue;
    const searchOptionFinder =
      _searchOptionFinder || DEFAULT_FINDER.searchOption;
    const currentOption = [
      ...matchedEntities,
      ...otherEntities,
      ...associatedEntities,
    ].find(currentOptionFinder(task));
    const disabled = currentDisabled || shouldDisable(task);
    const title = metadata.title || label;
    const rightIcon = rightIconRender
      ? rightIconRender(phoneNumber)
      : undefined;
    return (
      <SelectList
        title={title}
        rightIcon={rightIcon}
        placeholder={metadata.placeholder}
        options={matchedEntities}
        otherOptions={otherEntities}
        associatedOptions={associatedEntities}
        showAssociatedSection={showAssociatedSection}
        startAdornment={startAdornmentRender}
        field={value}
        value={task[metadata.valueField] || ''}
        onChange={async (args) => {
          await onChange(this.props)(args);
          await onSave();
          if (fieldOnChange) fieldOnChange(args);
        }}
        onSelectViewVisible={onSelectViewVisible}
        valueFunction={getValue}
        renderFunction={getLabel}
        searchOption={searchOptionFinder}
        disabled={disabled}
        currentLocale={currentLocale}
      >
        {this.renderTextField({
          disabled,
          title,
          dataSign: value,
          disableReason,
          value: getLabel(currentOption, matchedEntities.length, currentLog),
        })}
      </SelectList>
    );
  };

  private renderInput = () => {
    const {
      fieldOption: { label, value, type, required },
      onSave,
    } = this.props;
    return (
      <LogFieldsInput
        label={label}
        type={type === 'string' ? 'text' : 'number'}
        required={required}
        placeholder={label}
        value={this.currentValue || ''}
        data-sign={value}
        onChange={(args) => this._updateValue(value, args, onSave)}
      />
    );
  };

  private renderTextArea = () => {
    const {
      fieldOption: { label, value, error, helperText, required, onChange },
      onSave,
    } = this.props;
    return (
      <LogFieldsInput
        label={label}
        required={required}
        error={error}
        helperText={helperText}
        placeholder={label}
        data-sign={value}
        multiline
        value={this.currentValue || ''}
        onChange={(text) => {
          this._updateValue(value, text, onSave);
          if (onChange) onChange(text);
        }}
      />
    );
  };

  private renderDatePicker = () => {
    const {
      fieldOption: { label, value: fieldValue, required },
      onSave,
    } = this.props;
    const { fieldSize } = this.props;
    const date = this.currentValue ? new Date(this.currentValue) : null;
    return (
      <RcDatePicker
        fullWidth
        size={fieldSize}
        data-sign={fieldValue}
        required={required}
        label={label}
        value={date}
        onChange={async (value) => {
          const timeStamp = setUTCTime(value);
          await this.onInputSelectChange(fieldValue)(timeStamp);
          await onSave;
        }}
        format="MM/DD/YYYY"
        autoOk
        InputProps={{
          endAdornment: (
            <RcIconButton variant="round" size="small" icon="event-new" />
          ),
          fullWidth: true,
        }}
      />
    );
  };

  private renderSubjectField = () => {
    const {
      currentLog: { task, subjectPicklist },
      subjectDropdownsTracker,
      timeout,
    } = this.props;
    const {
      fieldOption: { required },
      onSave,
    } = this.props;
    return (
      <InputSelect
        required={required}
        subjectPicklist={subjectPicklist}
        subject={task.subject || ''}
        onChange={this.onInputSelectChange('subject')}
        onSelectOption={subjectDropdownsTracker}
        onSave={onSave}
        timeout={timeout}
      />
    );
  };

  private renderSelectMenu = () => {
    const {
      fieldOption: {
        label,
        value: fieldValue,
        picklistOptions,
        required,
        defaultValue,
        helperText,
        error,
        onChange,
      },
      onSave,
    } = this.props;

    const selectList = (picklistOptions || []).map((item) => {
      let value: string = item as any;
      let label =
        item !== null ? (item as any) : defaultValue || appDefaultValue;
      if (item instanceof Object) {
        value = item.value;
        label = item.label;
      }
      return {
        label,
        value,
      };
    });

    return (
      <RcLineSelect
        data-sign={fieldValue}
        SelectProps={{
          classes: {
            icon: styles.select,
          },
        }}
        fullWidth
        helperText={helperText}
        error={error}
        required={required}
        label={label}
        value={this.currentValue || defaultValue || ''}
        onChange={async ({ target: { value } }) => {
          if (picklistOptions[value]) {
            value = picklistOptions[value].value;
          }
          await this.onInputSelectChange(fieldValue)(value);
          await onSave();
          if (onChange) onChange(value);
        }}
      >
        {selectList.map((item, i) => (
          <RcMenuItem
            key={i}
            value={`${item.value}`}
            data-sign={`option${i}`}
            classes={{ root: styles.item }}
          >
            {item.label}
          </RcMenuItem>
        ))}
      </RcLineSelect>
    );
  };

  private renderTextField({ disabled, title, dataSign, value, disableReason }) {
    return (
      <RcTextField
        title={value}
        disabled={disabled}
        data-sign={dataSign}
        InputProps={{
          classes: {
            input: styles.customTextField,
          },
        }}
        helperText={disableReason}
        label={title}
        value={value || ''}
        readonly
        fullWidth
        endAdornment={(disabled) => this.getRightButtons(disabled)}
      />
    );
  }

  private onInputSelectChange = (value) => async (item) => {
    const {
      currentLog: { currentSessionId, task = {} },
      onUpdateCallLog,
      customInputDataStruct,
    } = this.props;
    const defaultLogData = {
      isSaved: false,
      task: {
        [value]: item || '',
      },
    };
    const logData =
      (customInputDataStruct &&
        customInputDataStruct({
          value,
          item,
          task,
          currentSessionId,
        })) ||
      defaultLogData;
    await onUpdateCallLog(logData, currentSessionId);
  };

  private _updateValue(value, args, onSave) {
    const { debonce } = this.props;
    this.onInputSelectChange(value)(args);
    debonce(onSave);
  }

  private getRightButtons(disabled) {
    return <CustomArrowButton disabled={disabled} />;
  }

  private fieldsRenderMap: FieldsMap = {
    reference: this.renderReference,
    picklist: this.renderSelectMenu,
    textarea: this.renderTextArea,
    date: this.renderDatePicker,
    string: this.renderInput,
    integer: this.renderInput,
    double: this.renderInput,
    combobox: this.renderSubjectField,
  };

  render() {
    const {
      fieldOption: { value, type },
    } = this.props;

    if (this.fieldsRenderMap[type]) {
      return (
        <div data-sign="callLogField" className={styles.row}>
          {this.fieldsRenderMap[type]()}
        </div>
      );
    }
    console.warn(`Not support field type '${type}' on ${value}.`);
    return null;
  }
}
