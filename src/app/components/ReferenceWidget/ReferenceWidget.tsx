import { FullSelectField } from '@ringcentral-integration/widgets/components/CallLogFields/FieldItem';
import React from 'react';

import styles from './styles.scss';

export interface FieldMetadata {
  title: string;
  placeholder: string;
  valueField: string;
}

export const DEFAULT_FINDER = {
  getValue: (item: any) => (typeof item === 'object' ? item.id : item) || null,
  searchOption: (option: any, text: string) =>
    option.name && option.name.toLowerCase().includes(text.toLowerCase()),
};

/**
 * This is old reference widget, not spring-ui version
 *
 * @deprecated
 */
export const ReferenceWidget = (filedProps: any) => {
  const {
    uiSchema: { 'ui:options': props },
    formData,
  } = filedProps;

  const {
    fieldOption: {
      label,
      value,
      disabled: currentDisabled,
      onChange: fieldOnChange,
      onlyShowInMultipleMatches,
      showOtherSection,
      showMatched,
      showFoundFromServer,
    },
    onSelectViewVisible,
    contactSearch,
    onFullSelectFieldClick,
    currentLog,
    startAdornmentRender,
    referenceFieldOption,
    currentLocale,
    disabled,
    leftNav,
  } = props;
  const { task, currentLogCall: { phoneNumber } = { phoneNumber: '' } } =
    currentLog;
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
    showRecentlySection,
    shouldDisable = () => false,
    disableReason = '',
    currentOptionFinder,
    searchOptionFinder: _searchOptionFinder,
    foundFromServerEntityGetter,
    onBackClick,
    backHeaderClassName,
    multiple,
    autoClose,
    recentlyEntitiesGetter,
  } = referenceFieldOption;
  const matchedEntities = matchedEntitiesGetter(currentLog);
  if (onlyShowInMultipleMatches && matchedEntities.length <= 1) {
    return;
  }
  const otherEntities = otherEntitiesGetter(currentLog);

  const foundFromServerEntities =
    typeof foundFromServerEntityGetter === 'function'
      ? foundFromServerEntityGetter(currentLog)
      : [];
  const showAssociatedSection = shouldShowAssociatedSection
    ? shouldShowAssociatedSection(currentLog)
    : false;
  const associatedEntities =
    showAssociatedSection && associatedEntitiesGetter
      ? associatedEntitiesGetter(currentLog)
      : [];

  const recentlyEntities =
    showRecentlySection && recentlyEntitiesGetter
      ? recentlyEntitiesGetter(currentLog)
      : [];
  const getValue = _getValue || DEFAULT_FINDER.getValue;
  const searchOptionFinder = _searchOptionFinder || DEFAULT_FINDER.searchOption;
  const currentOption = [
    ...recentlyEntities,
    ...matchedEntities,
    ...otherEntities,
    ...associatedEntities,
    ...foundFromServerEntities,
  ].find(currentOptionFinder(task));
  const disabledReference = currentDisabled || shouldDisable(task) || disabled;
  const title = metadata.title || label;
  const rightIcon = rightIconRender ? rightIconRender(phoneNumber) : undefined;

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
      {...props}
      selectListBasicClassName={
        leftNav ? styles.selectListBasicWithLeftNav : styles.selectListBasic
      }
      backHeaderClassName={backHeaderClassName}
      onBackClick={onBackClick}
      title={title}
      rightIcon={rightIcon}
      placeholder={metadata.placeholder}
      options={matchedEntities}
      otherOptions={otherEntities}
      associatedOptions={associatedEntities}
      showMatched={showMatched}
      showOtherSection={showOtherSection}
      showAssociatedSection={showAssociatedSection}
      recentlyEntities={recentlyEntities}
      showRecentlySection={showRecentlySection}
      startAdornment={startAdornmentRender}
      field={value}
      value={formData || ''}
      onChange={async (args) => {
        await onChange(props)(args);
        // await onSave();
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
      autoClose={autoClose ?? props.autoClose}
    />
  );
};
