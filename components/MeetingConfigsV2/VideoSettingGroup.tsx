import React from 'react';
import { RcIconButton, RcFormGroup } from '@ringcentral/juno';
import { RcAccordion } from '@ringcentral/juno/components/Accordion';
import { RcAccordionDetails } from '@ringcentral/juno/components/Accordion/AccordionDetails';
import { RcAccordionSummary } from '@ringcentral/juno/components/Accordion/AccordionSummary';
import arrowDownSvg from '@ringcentral/juno/icon/ArrowDown2';
import styles from './styles.scss';

interface VideoSettingGroupProps {
  dataSign: string;
  summary?: string;
  expandable: boolean;
  defaultExpanded?: boolean;
}

export const VideoSettingGroup: React.FunctionComponent<VideoSettingGroupProps> = ({
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
