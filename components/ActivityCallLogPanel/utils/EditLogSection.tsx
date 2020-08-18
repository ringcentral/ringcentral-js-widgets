import React from 'react';
import CallLogFields, {
  FieldItemProps,
} from 'ringcentral-widgets/components/CallLogFields';
import { CallLogFieldsProps } from 'ringcentral-widgets/components/CallLogFields/CallLogFields.interface';
import { CallLogPanelProps } from 'ringcentral-widgets/components/CallLogPanel';

import i18n from '../i18n';
import styles from './styles.scss';

const rightIconRender = () => {
  return <div className={styles.fillRight} />;
};

const _getReferenceFieldOptions = (
  currentLocale: string,
): CallLogFieldsProps['referenceFieldOptions'] => {
  const getNameLabel = (item: any = {}, length) => {
    const { id, name, type } = item;
    if (!id) {
      return length > 1
        ? `${i18n.getString('multipleNameMatch', currentLocale)} (${length})`
        : i18n.getString('none', currentLocale);
    }
    return name ? `${name}` : `${type}(${id})`;
  };

  const getRelatedToLabel = (item: any = {}, length) => {
    const { id, name, type } = item;
    if (Object.keys(item).length === 0) {
      return length > 1
        ? `${i18n.getString(
            'multipleRelatedToMatch',
            currentLocale,
          )} (${length})`
        : i18n.getString('none', currentLocale);
    }
    return name ? `${name}` : `${type}(${id})`;
  };

  const onNameChange = ({
    currentLog: { task, currentSessionId },
    onUpdateCallLog,
  }: FieldItemProps) => async (item) => {
    const id = item.id;
    const relatedTo = task.whatid;
    await onUpdateCallLog(
      {
        isSaved: false,
        task: {
          whoid: id || '',
          whatid: relatedTo || '',
        },
      },
      currentSessionId,
    );
  };

  const onRelatedToChange = ({
    currentLog: { currentSessionId },
    onUpdateCallLog,
  }: FieldItemProps) => async (args) => {
    const id = (typeof args === 'object' ? args.id : args) || null;
    await onUpdateCallLog(
      {
        isSaved: false,
        task: {
          whatid: id || '',
        },
      },
      currentSessionId,
    );
  };

  return {
    whoid: {
      getLabel: getNameLabel,
      onChange: onNameChange,
      metadata: {
        title: i18n.getString('name', currentLocale),
        placeholder: i18n.getString('namePlaceholder', currentLocale),
        valueField: 'whoid',
      },
      currentOptionFinder: (task) => (item) => item.id === task.whoid,
      matchedEntitiesGetter: ({ nameEntities }) => nameEntities,
      otherEntitiesGetter: ({ navigateToEntities: { name } }) => name,
      rightIconRender,
      backHeaderClassName: styles.backHeader,
    },
    whatid: {
      getLabel: getRelatedToLabel,
      onChange: onRelatedToChange,
      metadata: {
        title: i18n.getString('relatedTo', currentLocale),
        placeholder: i18n.getString('relatedToPlaceholder', currentLocale),
        valueField: 'whatid',
      },
      currentOptionFinder: (task) => (item) => item.id === task.whatid,
      matchedEntitiesGetter: ({ relatedToEntities }) => relatedToEntities,
      otherEntitiesGetter: ({ navigateToEntities: { relatedTo } }) => relatedTo,
      rightIconRender,
      backHeaderClassName: styles.backHeader,
    },
  };
};

export const EditLogSection: CallLogPanelProps['renderEditLogSection'] = ({
  onUpdateCallLog,
  currentLog,
  currentLocale,
  onSaveCallLog,
  subjectDropdownsTracker,
  editSectionScrollBy,
  startAdornmentRender,
}) => {
  return (
    <CallLogFields
      referenceFieldOptions={_getReferenceFieldOptions(currentLocale)}
      subjectDropdownsTracker={subjectDropdownsTracker}
      onUpdateCallLog={onUpdateCallLog}
      onSaveCallLog={onSaveCallLog}
      currentLog={currentLog}
      currentLocale={currentLocale}
      startAdornmentRender={startAdornmentRender}
      editSectionScrollBy={editSectionScrollBy}
      classes={{
        root: styles.root,
      }}
    />
  );
};
