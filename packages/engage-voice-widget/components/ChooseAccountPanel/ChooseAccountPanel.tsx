import type { FunctionComponent } from 'react';
import React from 'react';

import { CustomArrowButton } from '@ringcentral-integration/widgets/components/Rcui/CustomArrowButton';
import { palette2, RcTypography, spacing, styled } from '@ringcentral/juno';

import type {
  EvChooseAccountUIFunctions,
  EvChooseAccountUIProps,
} from '../../interfaces/EvChooseAccountUI.interface';
import { EvLoginHeader } from '../EvLoginHeader';
import { ListItem } from '../SelectList';
import i18n from './i18n';
import styles from './styles.scss';

export type ChooseAccountPanelProps = EvChooseAccountUIProps &
  EvChooseAccountUIFunctions;

const StyledTitle = styled(RcTypography)`
  margin: ${spacing(2, 0, 8)};
`;

const ContentItem = styled.div`
  height: 56px;
  width: 100%;
  border-bottom: 1px solid ${palette2('neutral', 'l02')};
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: inline-block;
  }
`;

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
      <StyledTitle align="center" variant="caption2" color="neutral.f04">
        {i18n.getString('chooseAccount', currentLocale)}
      </StyledTitle>
      <div className={styles.lists}>
        {agents.map((agent) => {
          return (
            <ListItem
              onClick={() => onAccountItemClick(agent.agentId)}
              key={agent.agentId}
              className={styles.listItem}
            >
              <ContentItem data-sign="subAccount">
                <div>
                  <RcTypography variant="body1" color="neutral.f06">
                    {agent.accountName}
                  </RcTypography>
                  <RcTypography variant="caption1" color="neutral.f04">
                    {i18n.getString(agent.agentType, currentLocale)}
                  </RcTypography>
                </div>
                <CustomArrowButton />
              </ContentItem>
            </ListItem>
          );
        })}
      </div>
    </div>
  );
};
