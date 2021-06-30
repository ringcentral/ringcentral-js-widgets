import { RcButton } from '@ringcentral/juno';
import React, { FunctionComponent, useState } from 'react';
import { Tooltip } from '@ringcentral-integration/widgets/components/Rcui/Tooltip';
import { TOOLTIP_LONG_DELAY_TIME } from '@ringcentral-integration/widgets/lib/toolTipDelayTime';

import { EvGate } from '../../../../lib/EvClient';
import { SelectList, ListItem } from '../../../SelectList';
import { RequeueCallGroupPanelProps } from '../RequeueCallGroupPanel';
import styles from '../styles.scss';
import i18n from './i18n';

export const RequeueCallGroupDetailPanel: FunctionComponent<RequeueCallGroupPanelProps> = ({
  currentLocale,
  goBack,
  searchGate,
  selectedQueueGroup,
  selectedGateId,
  submitSelection,
}) => {
  const selectText = i18n.getString('selectCheck', currentLocale);
  const [queueId, setQueueId] = useState(selectedGateId);

  return (
    <SelectList
      searchOption={searchGate}
      currentLocale={currentLocale}
      onBackClick={goBack}
      title={selectedQueueGroup.groupName}
      options={selectedQueueGroup.gates}
      renderListItem={({
        option,
        index,
      }: {
        option: EvGate;
        index: number;
      }) => {
        const selected = option.gateId === queueId;
        return (
          <ListItem
            onClick={() => {
              setQueueId(selected ? null : option.gateId);
            }}
            selected={selected}
            key={index}
          >
            <Tooltip
              title={option.gateName}
              enterDelay={TOOLTIP_LONG_DELAY_TIME}
            >
              <span className={styles.gateName}>{option.gateName}</span>
            </Tooltip>
          </ListItem>
        );
      }}
    >
      <div className={styles.checkContainer}>
        <RcButton
          title={selectText}
          disabled={!queueId}
          onClick={() => submitSelection(queueId)}
          fullWidth
          size="medium"
          data-sign="select-group-item"
        >
          {selectText}
        </RcButton>
      </div>
    </SelectList>
  );
};
