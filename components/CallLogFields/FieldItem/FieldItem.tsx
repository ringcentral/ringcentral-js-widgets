import { RcAlert, RcDatePicker, RcTypography } from '@ringcentral/juno';
import React, { Component } from 'react';

import { getDateFromUTCDay, setUTCTime } from '../../../lib/timeFormatHelper';
import InputSelect from '../../InputSelect';
import type {
  CallLogFieldsProps,
  FieldMetadata,
} from '../CallLogFields.interface';

import type {
  FieldItemOption,
  FieldsMap,
  PickListOption,
} from './FieldItem.interface';
import { FullSelectField } from './FullSelectField';
import { LogFieldsInput } from './LogFieldsInput';
import { RadioField } from './RadioField';
import { SelectField } from './SelectField';
import styles from './styles.scss';

export const DEFAULT_FINDER = {
  getValue: (item: any) => (typeof item === 'object' ? item.id : item) || null,
  searchOption: (option: any, text: string) =>
    option.name && option.name.toLowerCase().includes(text.toLowerCase()),
};

const appDefaultValue = '[None]';

export type FieldItemProps = {
  fieldRef?: React.RefObject<HTMLDivElement>;
  timeout: number;
  fieldOption: FieldItemOption;
  onSave(): any;
  debounce(cb: any, time2?: any): void;
} & CallLogFieldsProps;

export class FieldItem extends Component<FieldItemProps, {}> {
  get currentValue() {
    const {
      fieldOption: { value },
    } = this.props;
    const {
      // @ts-expect-error TS(2339): Property 'task' does not exist on type 'CallLog | ... Remove this comment to see the full error message
      currentLog: { task },
    } = this.props;
    return (task as any)[value];
  }

  // eslint-disable-next-line react/destructuring-assignment
  fieldItemRef = this.props.fieldRef || React.createRef<HTMLDivElement>();

  // this is click to new popup window page
  private renderReference = () => {
    const {
      fieldOption: {
        label,
        value,
        disabled: currentDisabled,
        onChange: fieldOnChange,
        onlyShowInMultipleMatches,
        showOtherSection,
        showFoundFromServer,
      },
      onSave,
      onSelectViewVisible,
      contactSearch,
      onFullSelectFieldClick,
      currentLog,
      startAdornmentRender,
      referenceFieldOptions,
      currentLocale,
      disabled,
    } = this.props;
    // @ts-expect-error TS(2339): Property 'task' does not exist on type 'CallLog | ... Remove this comment to see the full error message
    const { task, currentLogCall: { phoneNumber } = {} } = currentLog;
    const referenceFieldOption = referenceFieldOptions[value];
    if (!referenceFieldOption) {
      console.warn(
        `Reference field "${value}" requires options in renderEditLogSection`,
      );
      return;
    }
    const {
      getLabel,
      getSelectedOptionLabel,
      getType,
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
      foundFromServerEntityGetter,
      onBackClick,
      backHeaderClassName,
      multiple,
    } = referenceFieldOption;
    // @ts-expect-error TS(2345): Argument of type 'CallLog | undefined' is not assi... Remove this comment to see the full error message
    const matchedEntities = matchedEntitiesGetter(currentLog);
    if (onlyShowInMultipleMatches && matchedEntities.length <= 1) {
      return;
    }
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    const otherEntities = otherEntitiesGetter(currentLog);

    const foundFromServerEntities =
      typeof foundFromServerEntityGetter === 'function'
        ? // @ts-expect-error TS(2345): Argument of type 'CallLog | undefined' is not assi... Remove this comment to see the full error message
          foundFromServerEntityGetter(currentLog)
        : [];
    const showAssociatedSection = shouldShowAssociatedSection
      ? // @ts-expect-error TS(2345): Argument of type 'CallLog | undefined' is not assi... Remove this comment to see the full error message
        shouldShowAssociatedSection(currentLog)
      : false;
    const associatedEntities =
      showAssociatedSection && associatedEntitiesGetter
        ? // @ts-expect-error TS(2345): Argument of type 'CallLog | undefined' is not assi... Remove this comment to see the full error message
          associatedEntitiesGetter(currentLog)
        : [];
    const getValue = _getValue || DEFAULT_FINDER.getValue;
    const searchOptionFinder =
      _searchOptionFinder || DEFAULT_FINDER.searchOption;
    const currentOption = [
      ...matchedEntities,
      ...otherEntities,
      ...associatedEntities,
      ...foundFromServerEntities,
    ].find(currentOptionFinder(task));
    const disabledReference =
      currentDisabled || shouldDisable(task, currentLog?.call) || disabled;
    const title = metadata.title || label;
    const rightIcon = rightIconRender
      ? rightIconRender(phoneNumber)
      : undefined;

    const currentValue =
      (getSelectedOptionLabel &&
        getSelectedOptionLabel(
          currentOption,
          matchedEntities.length,
          currentLog,
        )) ||
      getLabel(currentOption, matchedEntities.length, currentLog) ||
      '';

    return (
      <FullSelectField
        {...this.props}
        backHeaderClassName={backHeaderClassName}
        // @ts-expect-error TS(2322): Type '(() => void) | undefined' is not assignable ... Remove this comment to see the full error message
        onBackClick={onBackClick}
        title={title}
        rightIcon={rightIcon}
        placeholder={metadata.placeholder}
        options={matchedEntities}
        otherOptions={otherEntities}
        associatedOptions={associatedEntities}
        showOtherSection={showOtherSection}
        showAssociatedSection={showAssociatedSection}
        startAdornment={startAdornmentRender}
        field={value}
        value={(task as any)[metadata.valueField] || ''}
        onChange={async (args) => {
          await onChange(this.props)(args);
          await onSave();
          if (fieldOnChange) fieldOnChange(args);
        }}
        onSelectViewVisible={onSelectViewVisible}
        onFullSelectFieldClick={onFullSelectFieldClick}
        valueFunction={getValue}
        renderFunction={getLabel}
        secondaryRenderFunction={getType}
        searchOption={searchOptionFinder}
        disabled={disabledReference}
        currentLocale={currentLocale}
        foundFromServerEntities={foundFromServerEntities}
        contactSearch={contactSearch}
        showFoundFromServer={showFoundFromServer}
        TextFieldProps={{
          helperText: disableReason,
          value: currentValue,
        }}
        multiple={multiple}
      />
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
        value={this.currentValue ?? ''}
        data-sign={value}
        onChange={(args: any) => this._updateValue(value, args, onSave)}
      />
    );
  };

  private renderTextArea = () => {
    const {
      fieldOption: {
        label,
        value,
        error,
        helperText,
        required,
        onChange,
        disabled,
      },
      onSave,
      onTextAreaFocus,
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
        disabled={disabled}
        value={this.currentValue || ''}
        onChange={(text: any) => {
          this._updateValue(value, text, onSave);
          if (onChange) onChange(text);
        }}
        onFocus={onTextAreaFocus}
      />
    );
  };

  private renderDatePicker = () => {
    const {
      fieldOption: { label, value: fieldValue, required },
      onSave,
    } = this.props;
    const { fieldSize } = this.props;
    const date = this.currentValue
      ? getDateFromUTCDay(this.currentValue)
      : null;
    return (
      <RcDatePicker
        fullWidth
        size={fieldSize}
        data-sign={fieldValue}
        required={required}
        label={label}
        value={date}
        onChange={async (value) => {
          const timeStamp = value ? setUTCTime(value) : value;
          await this.onInputSelectChange(fieldValue)(timeStamp);
          await onSave();
        }}
        formatString="MM/DD/YYYY"
      />
    );
  };

  private renderSubjectField = () => {
    const {
      // @ts-expect-error TS(2339): Property 'task' does not exist on type 'CallLog | ... Remove this comment to see the full error message
      currentLog: { task, subjectPicklist },
      subjectDropdownsTracker,
      timeout,
    } = this.props;
    const {
      fieldOption: { required, label },
      onSave,
    } = this.props;
    return (
      <InputSelect
        required={required}
        subjectPicklist={subjectPicklist}
        subject={task.subject || ''}
        label={label}
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
        helperText,
        error,
        onChange,
        disabled: propsDisabled = false,
        placeholder,
        controller,
      },
      currentLog,
      onSave,
      onSelectListOpen = () => {},
    } = this.props;

    const selectList = (picklistOptions || []).reduce<PickListOption[]>(
      (acc, item) => {
        if (
          item &&
          typeof item === 'object' &&
          controller &&
          currentLog?.task &&
          item.validFor
        ) {
          // check for field dependency and filter out options that are not valid
          if (!item.validFor.includes(currentLog.task[controller] as string)) {
            return acc;
          }
        }

        let value: string = item as any;
        let label = item !== null ? (item as any) : appDefaultValue;
        let disabled = false;
        let title;

        if (item instanceof Object) {
          value = item.value;
          label = item.label;
          // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
          disabled = item.disabled;
          title = item?.title;
        }
        acc.push({
          label,
          value,
          disabled,
          title,
        });

        return acc;
      },
      [],
    );

    return (
      <SelectField
        data-sign={fieldValue}
        labelClassName={styles.selectLabel}
        disabled={propsDisabled}
        placeholder={placeholder}
        fullWidth
        helperText={helperText}
        error={error}
        required={required}
        label={label}
        value={this.currentValue}
        onChange={async ({ target: { value } }) => {
          if (
            Object.prototype.toString.call(picklistOptions) ===
              '[object Object]' &&
            // @ts-expect-error TS(2538): Type 'unknown' cannot be used as an index type.
            (picklistOptions as any)[value]
          ) {
            // @ts-expect-error TS(2538): Type 'unknown' cannot be used as an index type.
            value = (picklistOptions as any)[value].value;
          }
          await this.onInputSelectChange(fieldValue)(value);
          await onSave();
          if (onChange) onChange(value);
        }}
        options={selectList}
        onOpen={() => onSelectListOpen(fieldValue)}
      />
    );
  };

  private renderRadio = () => {
    const {
      fieldOption: { picklistOptions, label },
      currentLog,
      disabled: disableAllFields,
    } = this.props;
    // @ts-expect-error TS(2339): Property 'task' does not exist on type 'CallLog | ... Remove this comment to see the full error message
    const { task, disableSaveLog, disableUpdateLog } = currentLog;
    const options = [
      {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        value: (picklistOptions[0] as PickListOption).value,
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        label: (picklistOptions[0] as PickListOption).label,
        disabled: disableAllFields || disableSaveLog,
      },
      {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        value: (picklistOptions[1] as PickListOption).value,
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        label: (picklistOptions[1] as PickListOption).label,
        disabled: !!(
          !task.tickets ||
          task.tickets?.length === 0 ||
          (task.matches?.length > 1 && !task.whoid) ||
          disableAllFields ||
          disableUpdateLog
        ),
      },
    ];
    const defaultOption =
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      task.option || (picklistOptions[0] as PickListOption).value;
    return (
      <>
        <RcTypography
          color="inherit"
          variant="caption2"
          component="div"
          className={styles.radioLabel}
        >
          {label}
        </RcTypography>
        <RadioField
          value={defaultOption}
          options={options}
          onChange={this.onRadioChange}
          classes={{
            root: styles.radio,
          }}
        />
      </>
    );
  };

  private onRadioChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    const { currentLog, onUpdateCallLog } = this.props;
    // @ts-expect-error TS(2339): Property 'currentSessionId' does not exist on type... Remove this comment to see the full error message
    const { currentSessionId, task = {} } = currentLog;
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    await onUpdateCallLog(
      {
        ...currentLog,
        task: {
          ...task,
          option: value,
          ticketId: task.ticketId || task.tickets[0]?.id,
        },
      },
      currentSessionId,
    );
  };

  private renderAlert = () => {
    const {
      fieldOption: { label },
      currentLog,
    } = this.props;
    if (!currentLog?.shouldPromoteAlert) {
      return;
    }
    return <RcAlert icon>{label}</RcAlert>;
  };

  // this is the dropdown to render ticket lists
  private renderTicketSelectList = () => {
    const { currentLog, fieldOption, disabled } = this.props;
    const { renderCondition, label } = fieldOption;
    // @ts-expect-error TS(2339): Property 'task' does not exist on type 'CallLog | ... Remove this comment to see the full error message
    const { task } = currentLog;
    // TODO: consider move this logic to zendesk
    if (task.option !== renderCondition || task.tickets?.length === 0) {
      return null;
    }
    const options =
      task.tickets && task.tickets.length > 0
        ? task.tickets.map((ticket: any) => {
            return {
              value: ticket.id,
              label: `#${ticket.id} ${ticket.subject}`,
              title: `#${ticket.id} ${ticket.subject}`,
            };
          })
        : [];
    return (
      <div className={styles.ticketSelectList}>
        <SelectField
          labelClassName={styles.selectLabel}
          options={options}
          fullWidth
          disabled={
            options.length === 0 || disabled || currentLog?.disableUpdateLog
          }
          value={task.ticketId}
          label={label}
          onChange={(
            event: React.ChangeEvent<{ name?: string; value: unknown }>,
          ) => this.onSelectChange(event)}
        />
      </div>
    );
  };

  private onSelectChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const { value } = event.target;
    const { currentLog, onUpdateCallLog } = this.props;
    // @ts-expect-error TS(2339): Property 'currentSessionId' does not exist on type... Remove this comment to see the full error message
    const { currentSessionId, task = {} } = currentLog;
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    onUpdateCallLog(
      { ...currentLog, task: { ...task, ticketId: value } },
      currentSessionId,
    );
  };

  private onInputSelectChange = (value: string) => async (item: any) => {
    const {
      // @ts-expect-error TS(2339): Property 'currentSessionId' does not exist on type... Remove this comment to see the full error message
      currentLog: { currentSessionId, task = {} },
      onUpdateCallLog,
      customInputDataStruct,
    } = this.props;
    const defaultLogData = {
      isSaved: false,
      task: {
        [value]: item,
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
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    await onUpdateCallLog(logData, currentSessionId);
  };

  private _updateValue(value: any, args: any, onSave: Function) {
    const { debounce } = this.props;
    this.onInputSelectChange(value)(args);
    debounce(onSave);
  }

  private fieldsRenderMap: FieldsMap = {
    // @ts-expect-error TS(2322): Type '() => JSX.Element | undefined' is not assign... Remove this comment to see the full error message
    reference: this.renderReference,
    picklist: this.renderSelectMenu,
    textarea: this.renderTextArea,
    date: this.renderDatePicker,
    string: this.renderInput,
    integer: this.renderInput,
    double: this.renderInput,
    long: this.renderInput,
    combobox: this.renderSubjectField,
    radio: this.renderRadio,
    alert: this.renderAlert,
    // @ts-expect-error TS(2322): Type '() => JSX.Element | null' is not assignable ... Remove this comment to see the full error message
    ticketSelectList: this.renderTicketSelectList,
  };

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const {
      fieldOption: { value, type, error, enableScrollError },
      editSectionScrollBy,
    } = this.props;
    if (this.fieldsRenderMap[type] && this.fieldsRenderMap[type]()) {
      if (error && enableScrollError && this.fieldItemRef.current) {
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        editSectionScrollBy(this.fieldItemRef.current.offsetTop);
      }
      return (
        <div
          ref={this.fieldItemRef}
          // TODO: replace it with new-Data-sign
          data-sign="callLogField"
          new-data-sign={`${value}-field`}
          className={styles.row}
        >
          {this.fieldsRenderMap[type]()}
        </div>
      );
    }
    console.warn(`Not support field type '${type}' on ${value}.`);
    return null;
  }
}
