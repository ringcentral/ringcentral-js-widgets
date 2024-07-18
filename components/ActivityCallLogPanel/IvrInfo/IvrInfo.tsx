import {
  RcAccordion,
  RcAccordionDetails,
  RcAccordionSummary,
} from '@ringcentral/juno';
import { ArrowDown2 } from '@ringcentral/juno-icon';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React, { useEffect, useState } from 'react';

import type {
  EvActivityCallUIFunctions,
  EvActivityCallUIProps,
} from '../../../interfaces';

import styles from './styles.scss';

export type IvrInfoProps = { isCallEnd: boolean } & Pick<
  EvActivityCallUIProps & EvActivityCallUIFunctions,
  'ivrAlertData' | 'agentScriptData'
>;
export const IvrInfo: FunctionComponent<IvrInfoProps> = ({
  isCallEnd,
  ivrAlertData,
  agentScriptData,
}) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (isCallEnd) {
      setExpanded(false);
    }
  }, [isCallEnd]);

  return (
    <div className={styles.ivrPanel}>
      <i className={styles.remain} />
      <div className={styles.container}>
        <RcAccordion
          onChange={() => setExpanded(!expanded)}
          expanded={expanded}
          classes={{
            root: clsx(styles.panelRoot, isCallEnd && styles.endCall),
            expanded: styles.expanded,
          }}
        >
          <RcAccordionSummary
            classes={{
              root: clsx(
                styles.summaryRoot,
                agentScriptData && styles.summaryAgentScriptIconPaddingRight,
              ),
              content: clsx(
                styles.summaryContent,
                agentScriptData && styles.summaryAgentScriptIconWidth,
              ),
            }}
            IconButtonProps={{
              size: 'small',
            }}
            expandIcon={ArrowDown2}
          >
            <span
              className={clsx(
                styles.ivrMainSubject,
                agentScriptData && styles.summaryAgentScriptIconWidth,
              )}
            >
              {ivrAlertData[0].subject || ''}
            </span>
            {ivrAlertData.length > 1 ? (
              <span className={styles.count}> +{ivrAlertData.length - 1}</span>
            ) : null}
          </RcAccordionSummary>
          <RcAccordionDetails
            classes={{
              root: styles.detailsRoot,
            }}
          >
            {ivrAlertData.map(({ subject = '', body = '' }, i) => {
              const bodyRender = () => {
                if (body.length > 0) {
                  return <div className={styles.body}>{body}</div>;
                }
                return null;
              };

              return (
                <div className={styles.item} key={i}>
                  {i !== 0 && subject.length > 0 && (
                    <div className={styles.subject}>{subject}</div>
                  )}
                  {bodyRender()}
                </div>
              );
            })}
          </RcAccordionDetails>
        </RcAccordion>
      </div>
    </div>
  );
};
