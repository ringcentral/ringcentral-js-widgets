import type { FunctionComponent } from 'react';
import React from 'react';

import { RcButton } from '@ringcentral/juno';

import type {
  EvAgentSessionUIFunctions,
  EvAgentSessionUIProps,
} from '../../interfaces/EvAgentSessionUI.interface';
import type { BasicSessionPanelProps } from '../BasicSessionPanel';
import { BasicSessionPanel } from '../BasicSessionPanel';
import { BackHeader } from '../SelectList';
import i18n from './i18n';
import styles from './styles.scss';

export type SessionUpdatePanelProps = BasicSessionPanelProps &
  Pick<
    EvAgentSessionUIProps & EvAgentSessionUIFunctions,
    'goToSettingsPageWhetherSessionChanged' | 'onSaveUpdate'
  >;

export const SessionUpdatePanel: FunctionComponent<SessionUpdatePanelProps> = ({
  currentLocale,
  goToSettingsPageWhetherSessionChanged,
  onSaveUpdate,
  ...rest
}) => {
  return (
    <div className={styles.root}>
      <BackHeader
        currentLocale={currentLocale}
        title={i18n.getString('editSession', currentLocale)}
        onBackClick={goToSettingsPageWhetherSessionChanged}
      />
      <div className={styles.container}>
        <BasicSessionPanel
          {...rest}
          currentLocale={currentLocale}
          classes={{ root: styles.basicSessionPanel }}
        />
        <RcButton
          data-sign="saveUpdate"
          fullWidth
          size="medium"
          onClick={onSaveUpdate}
          classes={{
            root: styles.saveUpdateButton,
          }}
        >
          {i18n.getString('saveUpdate', currentLocale)}
        </RcButton>
        <RcButton
          data-sign="cancel"
          fullWidth
          size="medium"
          onClick={goToSettingsPageWhetherSessionChanged}
          variant="outlined"
        >
          {i18n.getString('cancel', currentLocale)}
        </RcButton>
      </div>
    </div>
  );
};
