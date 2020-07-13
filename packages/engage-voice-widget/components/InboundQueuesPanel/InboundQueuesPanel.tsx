import {
  RcButton,
  RcCheckbox,
  RcListItem,
} from '@ringcentral-integration/rcui';
import formatMessage from 'format-message';
import React, { FunctionComponent, useState } from 'react';

import {
  AvailableQueue,
  EvInboundQueuesUIFunctions,
  EvInboundQueuesUIProps,
} from '../../interfaces';
import { SelectList } from '../SelectList';
import i18n from './i18n';
import styles from './styles.scss';

export type InboundQueuesProps = EvInboundQueuesUIProps &
  EvInboundQueuesUIFunctions;

const InboundQueuesPanel: FunctionComponent<InboundQueuesProps> = ({
  searchOption,
  currentLocale,
  inboundQueues: inboundQueueSource,
  submitInboundQueues,
  getAssignedInboundQueues,
  isAllAssign,
  isSeveralAssign,
  checkBoxOnChange,
  allCheckBoxOnChange,
  goBack,
}) => {
  const [inboundQueuesState, setInboundQueuesState] = useState(
    inboundQueueSource,
  );

  const assignedInboundQueues = getAssignedInboundQueues(inboundQueuesState);
  const assignedInboundQueuesNumber = assignedInboundQueues.length;
  const allAssign = isAllAssign(assignedInboundQueues, inboundQueuesState);
  const severalAssign = isSeveralAssign(
    assignedInboundQueues,
    inboundQueuesState,
  );

  const renderListView = ({
    option,
    index,
  }: {
    option: AvailableQueue;
    index: number;
  }) => {
    const { gateName, gateId, checked } = option;
    return (
      <RcListItem
        key={index}
        title={gateName}
        button
        singleLine
        size="small"
        onClick={(e) => {
          e.preventDefault();
          checkBoxOnChange(gateId, inboundQueuesState, setInboundQueuesState);
        }}
      >
        <RcCheckbox
          color="primary"
          formControlLabelProps={{
            classes: {
              root: styles.checkbox,
              label: styles.label,
            },
          }}
          label={gateName}
          checked={checked}
        />
      </RcListItem>
    );
  };

  return (
    <div className={styles.container}>
      <SelectList
        title={i18n.getString('inboundQueues', currentLocale)}
        placeholder={i18n.getString('search', currentLocale)}
        options={inboundQueuesState}
        searchOption={searchOption}
        currentLocale={currentLocale}
        renderListItem={renderListView}
        onBackClick={goBack}
      />
      <div className={styles.footer}>
        <div className={styles.selected}>
          <RcCheckbox
            color="primary"
            label={i18n.getString('selectAll', currentLocale)}
            data-sign="bulkChangeCheckBox"
            onClick={() =>
              allCheckBoxOnChange(
                severalAssign,
                inboundQueuesState,
                setInboundQueuesState,
              )
            }
            checked={allAssign}
            indeterminate={!!assignedInboundQueuesNumber && !allAssign}
          />
          <div className={styles.selectedTips} data-sign="selectedTips">
            {formatMessage(i18n.getString('selectedTips', currentLocale), {
              totalInboundQueuesNumber: inboundQueueSource.length,
              assignedInboundQueuesNumber,
            })}
          </div>
        </div>
        <RcButton
          data-sign="update"
          onClick={() => submitInboundQueues(assignedInboundQueues)}
          size="medium"
          fullWidth
        >
          {i18n.getString('update', currentLocale)}
        </RcButton>
      </div>
    </div>
  );
};

export { InboundQueuesPanel };
