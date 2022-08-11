import React, { FunctionComponent } from 'react';

import {
  RcAccordion,
  RcAccordionDetails,
  RcAccordionSummary,
  RcFormGroup,
} from '@ringcentral/juno';
import { ArrowDown2 as arrowDownSvg } from '@ringcentral/juno-icon';

import styles from './styles.scss';

interface VideoSettingGroupProps {
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
            // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
            disabled: expandable ? null : styles.accordionSummaryDisabled,
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
