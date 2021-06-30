import { RcTypography } from '@ringcentral/juno';
import React, { FunctionComponent } from 'react';
import { CustomArrowButton } from '@ringcentral-integration/widgets/components/Rcui/CustomArrowButton';

import {
  EvChooseAccountUIFunctions,
  EvChooseAccountUIProps,
} from '../../interfaces/EvChooseAccountUI.interface';
import { EvLoginHeader } from '../EvLoginHeader';
import { ListItem } from '../SelectList';
import i18n from './i18n';
import styles from './styles.scss';

export type ChooseAccountPanelProps = EvChooseAccountUIProps &
  EvChooseAccountUIFunctions;

export const ChooseAccountPanel: FunctionComponent<ChooseAccountPanelProps> = ({
  currentLocale,
  agents,
  onAccountItemClick,
}) => {
  return (
    <div className={styles.root}>
      <EvLoginHeader
        wrapperStyle={styles.wrapperStyle}
        svgStyle={styles.svgStyle}
      />
      <RcTypography variant="caption2" className={styles.title}>
        {i18n.getString('chooseAccount', currentLocale)}
      </RcTypography>
      <div className={styles.lists}>
        {agents.map((agent) => {
          return (
            <ListItem
              onClick={() => onAccountItemClick(agent.agentId)}
              key={agent.agentId}
              className={styles.listItem}
            >
              <div className={styles.content} data-sign="subAccount">
                <div>
                  <RcTypography variant="body1" className={styles.accountName}>
                    {agent.accountName}
                  </RcTypography>
                  <RcTypography
                    variant="caption1"
                    className={styles.agentType}
                    data-sign={agent.agentType}
                  >
                    {i18n.getString(agent.agentType, currentLocale)}
                  </RcTypography>
                </div>
                <CustomArrowButton />
              </div>
            </ListItem>
          );
        })}
      </div>
    </div>
  );
};
