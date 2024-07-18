import {
  RcDialog,
  RcDialogActions,
  RcButton,
  RcDialogContent,
  RcTypography,
} from '@ringcentral/juno';
import React from 'react';
import type { FunctionComponent } from 'react';

import { t } from '../i18n';

export const RemoveRingtoneDialog: FunctionComponent<{
  open: boolean;
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ name, open, onConfirm, onCancel }) => {
  return (
    <RcDialog open={open}>
      <RcDialogContent>
        <RcTypography
          data-test-automation-id="DialogTitle"
          variant="body2"
          color="neutral.f06"
        >
          {t('confirmToDelete', { name })}
        </RcTypography>
      </RcDialogContent>
      <RcDialogActions>
        <RcButton
          variant="text"
          data-test-automation-id="DialogCancelButton"
          onClick={onCancel}
        >
          {t('cancel')}
        </RcButton>
        <RcButton
          color="danger.b03"
          data-test-automation-id="DialogOKButton"
          onClick={onConfirm}
        >
          {t('delete')}
        </RcButton>
      </RcDialogActions>
    </RcDialog>
  );
};
