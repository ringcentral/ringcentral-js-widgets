import {
  RcAccordion,
  RcAccordionDetails,
  RcAccordionSummary,
  RcFormGroup,
} from '@ringcentral/juno';
import { ArrowDown2 as arrowDownSvg } from '@ringcentral/juno-icon';
import type { FunctionComponent } from 'react';
import React from 'react';

import styles from './styles.scss';

interface VideoSettingGroupProps {
  children?: React.ReactNode;
  dataSign: string;
  summary?: string;
  expandable: boolean;
  defaultExpanded?: boolean;
}

export const VideoSettingGroup: FunctionComponent<VideoSettingGroupProps> = ({
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
      {summary ? (
        <RcAccordionSummary
          classes={{
            root: styles.accordionSummary,
            disabled: expandable ? undefined : styles.accordionSummaryDisabled,
          }}
          expandIcon={expandable ? arrowDownSvg : undefined}
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
