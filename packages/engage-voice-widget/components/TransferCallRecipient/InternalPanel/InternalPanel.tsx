import type { FunctionComponent } from 'react';
import React, { useEffect } from 'react';

import classNames from 'classnames';

import type {
  EvTransferCallUIFunctions,
  EvTransferCallUIProps,
} from '../../../interfaces';
import { getInternalTransferName } from '../../../modules/EvTransferCallUI';
import { ListItem, SelectList } from '../../SelectList';
import transferCallI18n from '../i18n';
import transferCallStyles from '../styles.scss';
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
    <SelectList
      onBackClick={goBack}
      title={i18n.getString('internalCallRecipient', currentLocale)}
      placeholder={transferCallI18n.getString('search', currentLocale)}
      options={transferAgentList}
      searchOption={searchAgent}
      currentLocale={currentLocale}
      renderListItem={({
        option: agent,
        index: i,
      }: {
        option: EvTransferCallUIProps['transferAgentList'][number];
        index: number;
      }) => {
        const { agentId, available } = agent;
        const status = available ? 'available' : 'unavailable';
        const statusText = i18n.getString(status, currentLocale);
        const internalTransferName = getInternalTransferName(agent);
        return (
          <ListItem
            onClick={() => changeTransferAgentId(agentId)}
            selected={agentId === transferAgentId}
            key={i}
            className={transferCallStyles.listItem}
            data-sign="agentItem"
          >
            <div className={styles.agentItem}>
              <div className={classNames(styles.dot, styles[status])} />
              <div className={isWide ? styles.content : undefined}>
                <p
                  className={classNames(
                    styles.agentName,
                    transferCallStyles.ellipsis,
                  )}
                >
                  {internalTransferName}
                </p>
                <p className={styles.statusText}>{statusText}</p>
              </div>
            </div>
          </ListItem>
        );
      }}
    />
  );
};

export { InternalPanel };
