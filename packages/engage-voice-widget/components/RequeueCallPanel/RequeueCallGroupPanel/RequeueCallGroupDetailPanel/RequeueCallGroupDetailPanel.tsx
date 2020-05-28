import React, { FunctionComponent, useState } from 'react';
import { RcButton, RcList } from '@ringcentral-integration/rcui';
import { SelectListBasicWithScrollCheck } from 'ringcentral-widgets/components/SelectList';

import { Tooltip } from 'ringcentral-widgets/components/Rcui/Tooltip';
import { TOOLTIP_DEFAULT_DELAY_TIME } from 'ringcentral-widgets/lib/toolTipDelayTime';
import { EvGate } from '../../../../lib/EvClient';
import { ListItemWithScrollCheck } from '../../../ListItemWithScrollCheck';
import i18n from '../i18n';
import { RequeueCallGroupPanelProps } from '../RequeueCallGroupPanel';
import styles from '../styles.scss';
import currentI18n from './i18n';

export const RequeueCallGroupDetailPanel: FunctionComponent<RequeueCallGroupPanelProps> = ({
  currentLocale,
  goBack,
  searchGate,
  selectedQueueGroup,
  selectedGateId,
  submitSelection,
}) => {
  const selectText = currentI18n.getString('selectCheck', currentLocale);
  const [queueId, setQueueId] = useState(selectedGateId);

  const disabled = !queueId;
  return (
    <>
      <SelectListBasicWithScrollCheck
        listContainerClassName={styles.listContainer}
        backHeaderClassName={styles.backHeader}
        selectListBasicClassName={styles.selectListBasic}
        title={selectedQueueGroup.groupName}
        placeholder={i18n.getString('search', currentLocale)}
        options={selectedQueueGroup.gates}
        renderListView={(gates: EvGate[], type, filter, scrollCheck) => {
          return gates.length ? (
            <RcList>
              {gates.map((gate, i) => {
                return (
                  <ListItemWithScrollCheck
                    onClick={() => {
                      setQueueId(gate.gateId !== queueId ? gate.gateId : null);
                    }}
                    className={styles.item}
                    selected={gate.gateId === queueId}
                    key={i}
                    scrollCheck={scrollCheck}
                  >
                    <Tooltip
                      title={gate.gateName}
                      enterDelay={TOOLTIP_DEFAULT_DELAY_TIME}
                    >
                      <span className={styles.gateName}>{gate.gateName}</span>
                    </Tooltip>
                  </ListItemWithScrollCheck>
                );
              })}
            </RcList>
          ) : null;
        }}
        onBackClick={goBack}
        searchOption={searchGate}
        currentLocale={currentLocale}
        open
      />
      <div className={styles.checkContainer}>
        <RcButton
          title={selectText}
          disabled={disabled}
          onClick={() => submitSelection(queueId)}
          fullWidth
          size="medium"
          data-sign="select-group-item"
        >
          {selectText}
        </RcButton>
      </div>
    </>
  );
};
