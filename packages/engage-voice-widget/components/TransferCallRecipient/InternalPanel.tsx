import React, { FunctionComponent, useEffect } from 'react';

import {
  EvTransferCallUIFunctions,
  EvTransferCallUIProps,
} from '../../interfaces';
import { getInternalTransferName } from '../../modules/EvTransferCallUI';
import { ListItemWithScrollCheck } from '../ListItemWithScrollCheck';
import { SearchSelectField } from '../SearchSelectField';
import i18n from './i18n';
import styles from './styles.scss';

export type InternalPanelProps = Pick<
  EvTransferCallUIProps & EvTransferCallUIFunctions,
  | 'currentLocale'
  | 'goBack'
  | 'transferAgentList'
  | 'transferAgentListUpdateTTL'
  | 'fetchAgentList'
  | 'transferAgentId'
  | 'changeTransferAgentId'
  | 'searchAgent'
  | 'isWide'
>;

const InternalPanel: FunctionComponent<InternalPanelProps> = ({
  currentLocale,
  transferAgentList,
  goBack,
  transferAgentListUpdateTTL,
  fetchAgentList,
  transferAgentId,
  changeTransferAgentId,
  searchAgent,
  isWide,
}) => {
  useEffect(() => {
    const timerId = setInterval(() => {
      fetchAgentList();
    }, transferAgentListUpdateTTL);
    return () => clearInterval(timerId);
  }, []);
  return (
    <SearchSelectField
      open
      onBackClick={goBack}
      title={i18n.getString('internalCallRecipient', currentLocale)}
      placeholder={i18n.getString('search', currentLocale)}
      options={transferAgentList}
      searchOption={searchAgent}
      currentLocale={currentLocale}
      listRenderer={(
        transferAgentList: EvTransferCallUIProps['transferAgentList'],
        scrollCheck,
      ) => {
        return (
          <>
            {transferAgentList.map((agent, i) => {
              const { agentId, available } = agent;
              const status = available ? 'available' : 'unavailable';
              const statusText = i18n.getString(status, currentLocale);
              const internalTransferName = getInternalTransferName(agent);
              return (
                <ListItemWithScrollCheck
                  onClick={() => changeTransferAgentId(agentId)}
                  selected={agentId === transferAgentId}
                  key={i}
                  scrollCheck={scrollCheck}
                  data-sign="agentItem"
                >
                  <div className={styles.agentItem}>
                    <div className={styles[status]} />
                    <div className={isWide ? styles.content : undefined}>
                      <p className={styles.agentName}>{internalTransferName}</p>
                      <p className={styles.statusText}>{statusText}</p>
                    </div>
                  </div>
                </ListItemWithScrollCheck>
              );
            })}
          </>
        );
      }}
    />
  );
};

export { InternalPanel };
