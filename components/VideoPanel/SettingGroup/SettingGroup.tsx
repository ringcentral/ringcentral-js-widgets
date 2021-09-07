import React from 'react';
import {
  RcAccordion,
  RcAccordionDetails,
  RcAccordionSummary,
  RcFormGroup,
} from '@ringcentral/juno';

import { ArrowDown2 } from '@ringcentral/juno/icon';
import styles from './styles.scss';

interface SettingGroupProps {
  dataSign: string;
  summary: string;
  expandable: boolean;
  defaultExpanded?: boolean;
}

export const SettingGroup: React.FunctionComponent<SettingGroupProps> = ({
  dataSign,
  summary,
  expandable,
  defaultExpanded = true,
  children,
}) => {
  return (
    <RcAccordion
      classes={{
        root: styles.accordion,
      }}
      defaultExpanded={defaultExpanded}
      disabled={!expandable}
    >
      <RcAccordionSummary
        classes={{
          root: styles.accordionSummary,
          disabled: expandable ? null : styles.accordionSummaryDisabled,
        }}
        expandIcon={expandable ? ArrowDown2 : undefined}
        data-sign={`${dataSign}Summary`}
      >
        {summary}
      </RcAccordionSummary>
      <RcAccordionDetails
        classes={{
          root: styles.accordionDetails,
        }}
        data-sign={`${dataSign}Details`}
      >
        <RcFormGroup
          classes={{
            root: styles.toggleGroup,
          }}
        >
          {children}
        </RcFormGroup>
      </RcAccordionDetails>
    </RcAccordion>
  );
};
