import React from 'react';
import {
  RcExpansionPanel,
  RcExpansionPanelDetails,
  RcExpansionPanelSummary,
  RcIconButton,
} from '@ringcentral-integration/rcui';
import arrowDownSvg from '@ringcentral-integration/rcui/icons/icon-arrow_down.svg';
import styles from './styles.scss';

interface VideoSettingsGroupProps {
  dateSign: string;
  summary: string;
  expandable: boolean;
  defaultExpanded?: boolean;
}

export const VideoSettingsGroup: React.FunctionComponent<VideoSettingsGroupProps> = ({
  dateSign,
  summary,
  expandable,
  defaultExpanded = true,
  children,
}) => {
  return (
    <RcExpansionPanel
      classes={{
        root: styles.expansionPanel,
      }}
      defaultExpanded={defaultExpanded}
      disabled={!expandable}
    >
      <RcExpansionPanelSummary
        classes={{
          root: styles.expansionPanelSummary,
          content: styles.expansionPanelSummaryContent,
          disabled: expandable ? null : styles.expansionPanelSummaryDisabled,
        }}
        expandIcon={
          expandable ? (
            <RcIconButton variant="round" symbol={arrowDownSvg} />
          ) : null
        }
        data-sign={`${dateSign}Summary`}
      >
        {summary}
      </RcExpansionPanelSummary>
      <RcExpansionPanelDetails
        classes={{
          root: styles.expansionPanelDetails,
        }}
        data-sign={`${dateSign}Details`}
        className={styles.expansionPanelDetailsDirection}
      >
        {children}
      </RcExpansionPanelDetails>
    </RcExpansionPanel>
  );
};
