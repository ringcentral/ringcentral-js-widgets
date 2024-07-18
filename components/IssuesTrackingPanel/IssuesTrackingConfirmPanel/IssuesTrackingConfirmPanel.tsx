import {
  createGlobalStyle,
  RcButton,
  RcDialog,
  RcIconButton,
  RcText,
  RcTypography,
  spacing,
} from '@ringcentral/juno';
import { Close } from '@ringcentral/juno-icon';
import React, { FunctionComponent } from 'react';

import { t } from './i18n';

const modalClasses = {
  paper: 'issues-tracking-dialog-paper',
};

const IssuesTrackingGlobalStyle = createGlobalStyle`
  .${modalClasses.paper} {
    margin: ${spacing(4)};
    width: 100%;

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: ${spacing(2, 2, 0, 4)};
    }

    main {
      margin: ${spacing(2, 4)};
    }

    footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: ${spacing(4)};
      gap: ${spacing(4)};
    }
  }
`;

export type IssuesTrackingCloseConfirmPanelProps = {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
};
export const IssuesTrackingCloseConfirmPanel: FunctionComponent<
  IssuesTrackingCloseConfirmPanelProps
> = ({ open, onClose, onCancel, onConfirm }) => {
  return (
    <RcDialog open={open} classes={modalClasses}>
      <IssuesTrackingGlobalStyle />
      <header>
        <RcText
          variant="body2"
          color="action.grayDark"
          component="h2"
          weight="bold"
          flexFull
        >
          {t('header')}
        </RcText>
        <div>
          <RcIconButton symbol={Close} onClick={() => onClose()} />
        </div>
      </header>
      <main>
        <RcTypography color="action.grayDark">{t('content')}</RcTypography>
      </main>
      <footer>
        <RcButton
          radius="round"
          variant="outlined"
          fullWidth
          onClick={(e) => onCancel()}
        >
          {t('cancel')}
        </RcButton>
        <RcButton
          radius="round"
          onClick={(e) => onConfirm()}
          variant="contained"
          fullWidth
        >
          {t('confirm')}
        </RcButton>
      </footer>
    </RcDialog>
  );
};
