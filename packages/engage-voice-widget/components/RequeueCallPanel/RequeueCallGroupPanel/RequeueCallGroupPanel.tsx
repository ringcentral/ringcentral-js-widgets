import { RcList } from '@ringcentral-integration/rcui';
import React, { FunctionComponent } from 'react';
import { SelectListBasicWithScrollCheck } from 'ringcentral-widgets/components/SelectList';
import { CustomArrowButton } from 'ringcentral-widgets/components/Rcui/CustomArrowButton';

import {
  EvTransferCallUIFunctions,
  EvTransferCallUIProps,
} from '../../../interfaces';
import { EvAvailableRequeueQueue } from '../../../lib/EvClient';
import { ListItemWithScrollCheck } from '../../ListItemWithScrollCheck';
import i18n from './i18n';
import styles from './styles.scss';

export type RequeueCallGroupPanelProps = Partial<
  EvTransferCallUIProps & EvTransferCallUIFunctions
>;
export const RequeueCallGroupPanel: FunctionComponent<RequeueCallGroupPanelProps> = ({
  currentLocale,
  goToRequeueCallPage,
  searchGroup,
  queueGroups,
  selectedQueueGroupId,
  goToRequeueGroupDetailPage,
}) => {
  return (
    <SelectListBasicWithScrollCheck
      listContainerClassName={styles.listContainer}
      backHeaderClassName={styles.backHeader}
      selectListBasicClassName={styles.selectListBasic}
      title={i18n.getString('queueGroup', currentLocale)}
      placeholder={i18n.getString('search', currentLocale)}
      options={queueGroups}
      renderListView={(
        queueGroups: EvAvailableRequeueQueue[],
        type,
        filter,
        scrollCheck,
      ) => {
        return queueGroups.length ? (
          <RcList>
            {queueGroups.map((queueGroup, i) => {
              return (
                <ListItemWithScrollCheck
                  onClick={() =>
                    goToRequeueGroupDetailPage({
                      groupId: queueGroup.gateGroupId,
                    })
                  }
                  className={styles.item}
                  selected={queueGroup.gateGroupId === selectedQueueGroupId}
                  key={i}
                  scrollCheck={scrollCheck}
                >
                  {queueGroup.groupName}
                  <CustomArrowButton />
                </ListItemWithScrollCheck>
              );
            })}
          </RcList>
        ) : null;
      }}
      onBackClick={goToRequeueCallPage}
      searchOption={searchGroup}
      currentLocale={currentLocale}
      open
    />
  );
};
