import type { FunctionComponent } from 'react';
import React from 'react';

import { CustomArrowButton } from '@ringcentral-integration/widgets/components/Rcui/CustomArrowButton';

import type {
  EvTransferCallUIFunctions,
  EvTransferCallUIProps,
} from '../../../interfaces';
import type { EvAvailableRequeueQueue } from '../../../lib/EvClient';
import { ListItem, SelectList } from '../../SelectList';
import i18n from './i18n';

export type RequeueCallGroupPanelProps = Partial<
  EvTransferCallUIProps & EvTransferCallUIFunctions
>;
export const RequeueCallGroupPanel: FunctionComponent<RequeueCallGroupPanelProps> =
  ({
    currentLocale,
    goToRequeueCallPage,
    searchGroup,
    queueGroups,
    selectedQueueGroupId,
    goToRequeueGroupDetailPage,
  }) => {
    return (
      <SelectList
        searchOption={searchGroup}
        currentLocale={currentLocale}
        onBackClick={goToRequeueCallPage}
        title={i18n.getString('queueGroup', currentLocale)}
        options={queueGroups}
        renderListItem={({
          option,
          index,
        }: {
          option: EvAvailableRequeueQueue;
          index: number;
        }) => {
          return (
            <ListItem
              onClick={() =>
                goToRequeueGroupDetailPage({
                  groupId: option.gateGroupId,
                })
              }
              selected={option.gateGroupId === selectedQueueGroupId}
              key={index}
            >
              {option.groupName}
              <CustomArrowButton />
            </ListItem>
          );
        }}
      />
    );
  };
