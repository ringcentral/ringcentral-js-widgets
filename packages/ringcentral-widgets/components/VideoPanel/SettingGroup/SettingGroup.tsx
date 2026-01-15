import {
  RcAccordion,
  RcAccordionDetails,
  RcAccordionSummary,
  RcFormGroup,
} from '@ringcentral/juno';
import type { FunctionComponent, ReactElement } from 'react';
import React from 'react';

import styles from './styles.scss';

interface SettingGroupProps {
  dataSign: string;
  summary?: ReactElement | string;
  defaultExpanded?: boolean;
}

export const SettingGroup: FunctionComponent<SettingGroupProps> = ({
  dataSign,
  summary,
  defaultExpanded = true,
  children,
}) => {
  return (
    <RcAccordion
      classes={{
        root: styles.accordion,
      }}
      defaultExpanded={defaultExpanded}
      disabled
    >
      {summary ? (
        <RcAccordionSummary
          classes={{
            root: styles.accordionSummary,
            disabled: styles.accordionSummaryDisabled,
          }}
          data-sign={`${dataSign}Summary`}
        >
          {summary}
        </RcAccordionSummary>
      ) : null}
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
