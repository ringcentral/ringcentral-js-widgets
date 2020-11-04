import { RcButton } from '@ringcentral/juno';
import React, { FunctionComponent } from 'react';

import {
  EvAgentSessionUIFunctions,
  EvAgentSessionUIProps,
} from '../../interfaces/EvAgentSessionUI.interface';
import { EvLoginHeader } from '../EvLoginHeader';
import {
  BasicSessionPanel,
  BasicSessionPanelProps,
} from '../BasicSessionPanel';
import i18n from './i18n';
import styles from './styles.scss';

export type SessionConfigPanelProps = BasicSessionPanelProps &
  Pick<
    EvAgentSessionUIProps & EvAgentSessionUIFunctions,
    'setConfigure' | 'isLoading'
  >;

export const SessionConfigPanel: FunctionComponent<SessionConfigPanelProps> = ({
  currentLocale,
  setConfigure,
  isLoading,
  ...rest
}) => {
  return (
    <div className={styles.root}>
      <EvLoginHeader
        wrapperStyle={styles.wrapperStyle}
        svgStyle={styles.svgStyle}
      />
      <BasicSessionPanel {...rest} currentLocale={currentLocale} />
      <RcButton
        data-sign="setConfigure"
        fullWidth
        disabled={isLoading}
        loading={isLoading}
        size="medium"
        onClick={setConfigure}
        classes={{
          root: styles.button,
        }}
      >
        {i18n.getString('continue', currentLocale)}
      </RcButton>
    </div>
  );
};
