import { RcButton, RcIconButton, RcTypography } from '@ringcentral/juno';
import React, { FunctionComponent } from 'react';
import arrowLeftSvg from '@ringcentral/juno/icon/ArrowLeft2';
import classNames from 'classnames';

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
    | 'setConfigure'
    | 'isLoading'
    | 'onAccountReChoose'
    | 'selectedAgent'
    | 'showReChooseAccount'
  >;

export const SessionConfigPanel: FunctionComponent<SessionConfigPanelProps> = ({
  currentLocale,
  setConfigure,
  isLoading,
  onAccountReChoose,
  selectedAgent,
  showReChooseAccount,
  ...rest
}) => {
  return (
    <div className={styles.root}>
      <EvLoginHeader
        wrapperStyle={styles.wrapperStyle}
        svgStyle={styles.svgStyle}
      />
      <div
        className={classNames(
          styles.goBackBg,
          !showReChooseAccount && styles.hideGoBack,
        )}
      >
        <div onClick={onAccountReChoose} className={styles.goBack}>
          <RcIconButton
            className={styles.back}
            variant="round"
            size="medium"
            symbol={arrowLeftSvg}
            color="interactive.b02"
            data-sign="reChooseAccountButton"
          />
          <RcTypography variant="body1" className={styles.backText}>
            {i18n.getString('switchAccount', currentLocale)}
          </RcTypography>
        </div>
      </div>
      <div data-sign="accountInfo" className={styles.accountInfo}>
        <RcTypography variant="body1" className={styles.accountName}>
          {selectedAgent?.accountName}
        </RcTypography>
        <RcTypography
          variant="caption1"
          className={styles.agentType}
          data-sign="agentType"
        >
          {i18n.getString(selectedAgent?.agentType, currentLocale)}
        </RcTypography>
      </div>
      <BasicSessionPanel
        classes={{
          root: styles.basicSession,
        }}
        {...rest}
        currentLocale={currentLocale}
      />
      <RcButton
        data-sign="setConfigure"
        fullWidth
        disabled={isLoading}
        loading={isLoading}
        size="medium"
        onClick={setConfigure}
        classes={{
          root: styles.configureButton,
        }}
      >
        {i18n.getString('continue', currentLocale)}
      </RcButton>
    </div>
  );
};
