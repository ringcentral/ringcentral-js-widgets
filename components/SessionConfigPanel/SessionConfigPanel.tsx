import type { FunctionComponent } from 'react';
import React from 'react';

import {
  palette2,
  RcButton,
  RcIconButton,
  RcTypography,
  styled,
} from '@ringcentral/juno';
import { ArrowLeft2 as arrowLeftSvg } from '@ringcentral/juno-icon';

import type {
  EvAgentSessionUIFunctions,
  EvAgentSessionUIProps,
} from '../../interfaces/EvAgentSessionUI.interface';
import type { BasicSessionPanelProps } from '../BasicSessionPanel';
import { BasicSessionPanel } from '../BasicSessionPanel';
import { EvLoginHeader } from '../EvLoginHeader';
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

const StyledGoBackBack = styled.div<{ show: boolean }>`
  background: ${palette2('neutral', 'b03')};

  visibility: ${({ show }) => !show && 'hidden'};
`;

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
      <StyledGoBackBack show={showReChooseAccount}>
        <div onClick={onAccountReChoose} className={styles.goBack}>
          <RcIconButton
            className={styles.back}
            variant="round"
            size="medium"
            symbol={arrowLeftSvg}
            color="interactive.b02"
            data-sign="reChooseAccountButton"
          />
          <RcTypography variant="body1" color="interactive.f01">
            {i18n.getString('switchAccount', currentLocale)}
          </RcTypography>
        </div>
      </StyledGoBackBack>
      <div data-sign="accountInfo" className={styles.accountInfo}>
        <RcTypography color="neutral.f06" variant="body1">
          {selectedAgent?.accountName}
        </RcTypography>
        <RcTypography
          variant="caption1"
          color="neutral.f04"
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
